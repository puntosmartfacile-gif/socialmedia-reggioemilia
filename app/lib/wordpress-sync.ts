import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/app/lib/supabase/admin";
import { createClient } from "@/app/lib/supabase/server";
import type { CategoryRow, Database, Json, ProfileRow, WpSyncLogRow } from "@/app/types/database";

const WP_API_BASE = process.env.WP_API_BASE || "https://socialmediareggioemilia.it/wp-json/wp/v2";

type SupabaseAdminClient = NonNullable<ReturnType<typeof createAdminClient>>;

type WordPressRenderedField = {
  rendered: string;
};

type WordPressFeaturedMedia = {
  source_url?: string;
  media_details?: {
    file?: string;
  };
};

type WordPressEmbedded = {
  "wp:featuredmedia"?: WordPressFeaturedMedia[];
};

type WordPressPost = {
  id: number;
  date: string;
  modified: string;
  slug: string;
  link: string;
  title: WordPressRenderedField;
  excerpt: WordPressRenderedField;
  content: WordPressRenderedField;
  categories: number[];
  _embedded?: WordPressEmbedded;
};

type WordPressCategory = {
  id: number;
  name: string;
  slug: string;
};

type SyncError = {
  postId?: number;
  slug?: string;
  message: string;
};

export type SyncResult = {
  startedAt: string;
  completedAt: string;
  postsSynced: number;
  postsUpdated: number;
  postsSkipped: number;
  errors: SyncError[];
  status: "success" | "failed";
  totalPosts: number;
};

type SyncAuthResult = {
  authorized: boolean;
  reason?: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtml(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—");
}

function getFeaturedImage(post: WordPressPost) {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
}

function getImageFilename(url: string, fallbackSlug: string) {
  try {
    const pathname = new URL(url).pathname;
    const lastSegment = pathname.split("/").filter(Boolean).pop();
    return lastSegment ? lastSegment.replace(/[^a-zA-Z0-9._-]/g, "-") : `${fallbackSlug}.jpg`;
  } catch {
    return `${fallbackSlug}.jpg`;
  }
}

async function fetchJson<T>(url: string) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "SocialMediaReggioEmilia-Sync/1.0",
      Accept: "application/json",
    },
    redirect: "follow",
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`WP API error ${response.status} on ${url}: ${body.substring(0, 200)}`);
  }

  const contentType = response.headers.get("content-type") || "";
  const body = await response.text();

  if (!contentType.includes("application/json")) {
    throw new Error(
      `WP API returned non-JSON response on ${url} (content-type: ${contentType}). Body starts with: ${body.substring(0, 200)}`,
    );
  }

  try {
    return JSON.parse(body) as T;
  } catch (error) {
    throw new Error(
      `WP API returned invalid JSON on ${url}: ${error instanceof Error ? error.message : "Unknown parse error"}. Body starts with: ${body.substring(0, 200)}`,
    );
  }
}

async function fetchAllPosts() {
  const posts: WordPressPost[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const response = await fetch(
      `${WP_API_BASE}/posts?per_page=100&page=${page}&_embed`,
      {
        headers: {
          "User-Agent": "SocialMediaReggioEmilia-Sync/1.0",
          Accept: "application/json",
        },
        redirect: "follow",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`WP API error ${response.status} on posts page ${page}: ${body.substring(0, 200)}`);
    }

    totalPages = Number(response.headers.get("x-wp-totalpages") ?? "1");
    const contentType = response.headers.get("content-type") || "";
    const body = await response.text();

    if (!contentType.includes("application/json")) {
      throw new Error(
        `WP API returned non-JSON response on posts page ${page} (content-type: ${contentType}). Body starts with: ${body.substring(0, 200)}`,
      );
    }

    let pagePosts: WordPressPost[];
    try {
      pagePosts = JSON.parse(body) as WordPressPost[];
    } catch (error) {
      throw new Error(
        `WP API returned invalid JSON on posts page ${page}: ${error instanceof Error ? error.message : "Unknown parse error"}. Body starts with: ${body.substring(0, 200)}`,
      );
    }

    posts.push(...pagePosts);
    page += 1;
  }

  return posts;
}

async function ensureCategory(admin: SupabaseAdminClient, wpCategory: WordPressCategory) {
  const slug = slugify(wpCategory.slug || wpCategory.name);
  const { data: existing, error: existingError } = await admin
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<CategoryRow>();

  if (existingError) {
    throw new Error(existingError.message);
  }

  if (existing) {
    return existing;
  }

  const { data, error } = await admin
    .from("categories")
    .insert({
      name: decodeHtml(wpCategory.name),
      slug,
      description: "Categoria sincronizzata da WordPress",
    } as never)
    .select("*")
    .single<CategoryRow>();

  if (error || !data) {
    throw new Error(error?.message ?? "Impossibile creare la categoria.");
  }

  return data;
}

async function uploadFeaturedImage(
  admin: SupabaseAdminClient,
  post: WordPressPost,
  imageUrl: string,
  existingCoverImageUrl?: string | null,
) {
  const filename = getImageFilename(imageUrl, post.slug);
  const storagePath = `wp-sync/${post.id}/${filename}`;

  if (existingCoverImageUrl?.includes(storagePath)) {
    return existingCoverImageUrl;
  }

  const imageResponse = await fetch(imageUrl, { cache: "no-store" });
  if (!imageResponse.ok) {
    throw new Error(`Download immagine fallito (${imageResponse.status})`);
  }

  const arrayBuffer = await imageResponse.arrayBuffer();
  const contentType = imageResponse.headers.get("content-type") ?? "application/octet-stream";

  const { error } = await admin.storage.from("portfolio").upload(storagePath, arrayBuffer, {
    contentType,
    upsert: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = admin.storage.from("portfolio").getPublicUrl(storagePath);
  return data.publicUrl;
}

async function createSyncLog(admin: SupabaseAdminClient, startedAt: string) {
  const { data, error } = await admin
    .from("wp_sync_log")
    .insert({
      started_at: startedAt,
      status: "running",
    } as never)
    .select("id")
    .single<{ id: string }>();

  if (error || !data) {
    throw new Error(error?.message ?? "Impossibile creare il log di sync.");
  }

  return data.id;
}

async function finalizeSyncLog(
  admin: SupabaseAdminClient,
  logId: string,
  result: Omit<SyncResult, "startedAt"> & { startedAt?: string },
) {
  const fullErrorMessage =
    result.errors.length > 0
      ? result.errors
          .map((error) => {
            const prefix = [error.postId ? `postId=${error.postId}` : null, error.slug ? `slug=${error.slug}` : null]
              .filter(Boolean)
              .join(", ");
            return prefix ? `${prefix}: ${error.message}` : error.message;
          })
          .join("\n\n")
      : null;

  await admin
    .from("wp_sync_log")
    .update({
      completed_at: result.completedAt,
      posts_synced: result.postsSynced,
      posts_updated: result.postsUpdated,
      posts_skipped: result.postsSkipped,
      errors: result.errors as unknown as Json,
      error_message: fullErrorMessage,
      status: result.status,
    } as never)
    .eq("id", logId);
}

export async function authorizeWordPressSync(syncToken?: string): Promise<SyncAuthResult> {
  if (syncToken && process.env.SYNC_SECRET && syncToken === process.env.SYNC_SECRET) {
    return { authorized: true };
  }

  const supabase = await createClient();
  if (!supabase) {
    return { authorized: false, reason: "Configurazione Supabase non disponibile." };
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { authorized: false, reason: "Utente non autenticato." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle<Pick<ProfileRow, "role">>();

  if (profile?.role !== "admin") {
    return { authorized: false, reason: "Permessi insufficienti." };
  }

  return { authorized: true };
}

export async function runWordPressSync() {
  const admin = createAdminClient();
  if (!admin) {
    return {
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      postsSynced: 0,
      postsUpdated: 0,
      postsSkipped: 0,
      errors: [{ message: "Configurazione Supabase non disponibile." }],
      status: "failed" as const,
      totalPosts: 0,
    };
  }
  const startedAt = new Date().toISOString();
  const logId = await createSyncLog(admin, startedAt);
  const errors: SyncError[] = [];
  let postsSynced = 0;
  let postsUpdated = 0;
  let postsSkipped = 0;
  let totalPosts = 0;

  try {
    const [posts, categories] = await Promise.all([
      fetchAllPosts(),
      fetchJson<WordPressCategory[]>(`${WP_API_BASE}/categories?per_page=100`),
    ]);
    totalPosts = posts.length;

    const categoryMap = new Map(categories.map((category) => [category.id, category]));

    for (const post of posts) {
      try {
        const wpCategory =
          post.categories
            .map((id) => categoryMap.get(id))
            .find((category): category is WordPressCategory => Boolean(category));

        if (!wpCategory) {
          throw new Error("Categoria WordPress non disponibile per il post.");
        }

        const localCategory = await ensureCategory(admin, wpCategory);
        const { data: existing, error: existingError } = await admin
          .from("portfolio_items")
          .select("*")
          .eq("wp_post_id", post.id)
          .maybeSingle<Database["public"]["Tables"]["portfolio_items"]["Row"]>();

        if (existingError) {
          throw new Error(existingError.message);
        }

        const wpModified = new Date(post.modified).toISOString();
        if (existing?.wp_last_modified && new Date(existing.wp_last_modified) >= new Date(wpModified)) {
          postsSkipped += 1;
          continue;
        }

        const featuredImageUrl = getFeaturedImage(post);
        const coverImageUrl = featuredImageUrl
          ? await uploadFeaturedImage(admin, post, featuredImageUrl, existing?.cover_image_url)
          : existing?.cover_image_url ?? "https://placehold.co/1200x800?text=Case+Study";

        const payload = {
          title: decodeHtml(stripHtml(post.title.rendered)),
          slug: post.slug,
          description: decodeHtml(stripHtml(post.excerpt.rendered)),
          content: post.content.rendered,
          category_id: localCategory.id,
          client_name: decodeHtml(stripHtml(post.title.rendered)),
          results: [],
          cover_image_url: coverImageUrl,
          is_published: true,
          published_at: new Date(post.date).toISOString(),
          wp_post_id: post.id,
          wp_last_modified: wpModified,
          wp_source_url: post.link,
        };

        if (existing) {
          const { error } = await admin.from("portfolio_items").update(payload as never).eq("id", existing.id);
          if (error) throw new Error(error.message);
          postsUpdated += 1;
        } else {
          const { error } = await admin.from("portfolio_items").insert(payload as never);
          if (error) throw new Error(error.message);
          postsSynced += 1;
        }
      } catch (error) {
        errors.push({
          postId: post.id,
          slug: post.slug,
          message: error instanceof Error ? error.message : "Errore sconosciuto durante il sync.",
        });
      }
    }

    const completedAt = new Date().toISOString();
    const result: SyncResult = {
      startedAt,
      completedAt,
      postsSynced,
      postsUpdated,
      postsSkipped,
      errors,
      status: errors.length > 0 ? "failed" : "success",
      totalPosts,
    };

    await finalizeSyncLog(admin, logId, result);
    revalidatePath("/portfolio");
    revalidatePath("/admin");
    revalidatePath("/admin/portfolio");
    revalidatePath("/admin/sync");

    return result;
  } catch (error) {
    const completedAt = new Date().toISOString();
    const failure = {
      startedAt,
      completedAt,
      postsSynced,
      postsUpdated,
      postsSkipped,
      errors: [
        ...errors,
        {
          message: error instanceof Error ? error.message : "Errore fatale durante il sync WordPress.",
        },
      ],
      status: "failed" as const,
      totalPosts,
    };

    await finalizeSyncLog(admin, logId, failure);
    return failure;
  }
}

export async function getWordPressSyncHistory(limit = 10) {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("wp_sync_log")
    .select("*")
    .order("started_at", { ascending: false })
    .limit(limit);

  return (data ?? []) as WpSyncLogRow[];
}