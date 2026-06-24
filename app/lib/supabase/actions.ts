"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/app/lib/supabase/admin";
import { createClient } from "@/app/lib/supabase/server";
import type {
  AvailabilitySlotRow,
  BookingStatus,
  CategoryRow,
  Json,
  PortfolioImageRow,
  PortfolioItemRow,
  ProfileRow,
  ServiceTypeRow,
} from "@/app/types/database";

type ActionState = {
  success: boolean;
  message: string;
};

export type PortfolioFormState = ActionState;
export type BookingFormState = ActionState;
export type AvailabilityFormState = ActionState;

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseResultsJson(value: FormDataEntryValue | null): Json {
  const raw = String(value ?? "[]").trim();
  if (!raw) return [];
  return JSON.parse(raw) as Json;
}

function parseGalleryUrls(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

async function uploadPortfolioFile(file: File, slug: string, prefix: string) {
  if (!file || file.size === 0) return null;

  const admin = createAdminClient();
  if (!admin) {
    throw new Error("Configurazione Supabase non disponibile.");
  }
  const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const filePath = `${slug}/${prefix}-${Date.now()}.${extension}`;
  const arrayBuffer = await file.arrayBuffer();

  const { error } = await admin.storage.from("portfolio").upload(filePath, arrayBuffer, {
    contentType: file.type || "application/octet-stream",
    upsert: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = admin.storage.from("portfolio").getPublicUrl(filePath);
  return data.publicUrl;
}

async function requireAdmin() {
  const supabase = await createClient();
  if (!supabase) {
    redirect("/login");
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle<Pick<ProfileRow, "role">>();

  if (profile?.role !== "admin") {
    redirect("/login");
  }

  return { supabase, user };
}

export async function savePortfolioItem(
  _previousState: PortfolioFormState,
  formData: FormData,
): Promise<PortfolioFormState> {
  try {
    await requireAdmin();
    const admin = createAdminClient();
    if (!admin) {
      throw new Error("Configurazione Supabase non disponibile.");
    }
    const itemId = String(formData.get("itemId") ?? "").trim();
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const content = String(formData.get("content") ?? "").trim();
    const clientName = String(formData.get("clientName") ?? "").trim();
    const categoryId = String(formData.get("categoryId") ?? "").trim();
    const isPublished = String(formData.get("isPublished") ?? "") === "true";
    const slugInput = String(formData.get("slug") ?? "").trim();
    const slug = slugify(slugInput || title);
    const results = parseResultsJson(formData.get("resultsJson"));
    const galleryUrls = parseGalleryUrls(formData.get("existingGalleryUrls"));
    const coverFile = formData.get("coverImage");
    const galleryFiles = formData.getAll("galleryImages").filter((entry): entry is File => entry instanceof File);

    if (!title || !description || !categoryId) {
      return { success: false, message: "Compila titolo, descrizione e categoria." };
    }

    let coverImageUrl = String(formData.get("existingCoverImageUrl") ?? "").trim();
    if (coverFile instanceof File && coverFile.size > 0) {
      coverImageUrl = (await uploadPortfolioFile(coverFile, slug, "cover")) ?? coverImageUrl;
    }

    if (!coverImageUrl) {
      return { success: false, message: "Carica una cover image prima di salvare." };
    }

    const payload = {
      title,
      slug,
      description,
      content,
      client_name: clientName || null,
      category_id: categoryId,
      results,
      cover_image_url: coverImageUrl,
      is_published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null,
    };

    let savedItemId = itemId;
    if (itemId) {
      const { error } = await admin
        .from("portfolio_items")
        .update(payload as never)
        .eq("id", itemId);
      if (error) throw new Error(error.message);
    } else {
      const { data, error } = await admin
        .from("portfolio_items")
        .insert(payload as never)
        .select("id")
        .single();
      if (error) throw new Error(error.message);
      savedItemId = (data as { id: string }).id;
    }

    const uploadedGalleryUrls = (
      await Promise.all(
        galleryFiles.map((file, index) => uploadPortfolioFile(file, slug, `gallery-${index + 1}`)),
      )
    ).filter((value): value is string => Boolean(value));

    const finalGallery = [...galleryUrls, ...uploadedGalleryUrls];

    await admin.from("portfolio_images").delete().eq("portfolio_item_id", savedItemId);
    if (finalGallery.length > 0) {
      const galleryPayload = finalGallery.map((imageUrl, index) => ({
        portfolio_item_id: savedItemId,
        image_url: imageUrl,
        sort_order: index,
      }));
      const { error } = await admin.from("portfolio_images").insert(galleryPayload as never);
      if (error) throw new Error(error.message);
    }

    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${slug}`);
    revalidatePath("/admin/portfolio");
    revalidatePath(`/admin/portfolio/${savedItemId}`);

    return { success: true, message: "Caso studio salvato con successo." };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Impossibile salvare il caso studio.",
    };
  }
}

export async function deletePortfolioItem(itemId: string) {
  await requireAdmin();
  const admin = createAdminClient();
  if (!admin) {
    throw new Error("Configurazione Supabase non disponibile.");
  }
  await admin.from("portfolio_items").delete().eq("id", itemId);
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
}

export async function updateBookingStatus(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();
  if (!admin) {
    throw new Error("Configurazione Supabase non disponibile.");
  }
  const bookingId = String(formData.get("bookingId") ?? "");
  const status = String(formData.get("status") ?? "") as BookingStatus;
  const adminNotes = String(formData.get("adminNotes") ?? "").trim();

  await admin
    .from("bookings")
    .update({ status, admin_notes: adminNotes || null } as never)
    .eq("id", bookingId);

  revalidatePath("/admin/bookings");
  revalidatePath("/dashboard");
  revalidatePath("/prenotazioni");
}

export async function createAvailabilitySlot(formData: FormData): Promise<void> {
  try {
    await requireAdmin();
    const admin = createAdminClient();
    if (!admin) {
      throw new Error("Configurazione Supabase non disponibile.");
    }
    const payload = {
      date: String(formData.get("date") ?? ""),
      start_time: String(formData.get("startTime") ?? ""),
      end_time: String(formData.get("endTime") ?? ""),
      service_type_id: String(formData.get("serviceTypeId") ?? "") || null,
      is_available: true,
      recurring_rule:
        String(formData.get("isRecurring") ?? "") === "true"
          ? { frequency: "weekly" }
          : null,
    };

    const { error } = await admin.from("availability_slots").insert(payload as never);
    if (error) throw new Error(error.message);

    revalidatePath("/admin/availability");
    revalidatePath("/prenota/fotografia");
    revalidatePath("/prenota/consulenza");
  } catch (error) {
    throw error instanceof Error ? error : new Error("Impossibile creare lo slot.");
  }
}

export async function deleteAvailabilitySlot(slotId: string) {
  await requireAdmin();
  const admin = createAdminClient();
  if (!admin) {
    throw new Error("Configurazione Supabase non disponibile.");
  }
  await admin.from("availability_slots").delete().eq("id", slotId);
  revalidatePath("/admin/availability");
  revalidatePath("/prenota/fotografia");
  revalidatePath("/prenota/consulenza");
}

export async function createBooking(
  _previousState: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return {
        success: false,
        message: "Prenotazioni non disponibili: configurazione Supabase mancante.",
      };
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const redirectPath = String(formData.get("redirectPath") ?? "/login");
      redirect(`/login?redirect=${encodeURIComponent(redirectPath)}`);
    }

    const slotId = String(formData.get("slotId") ?? "");
    const serviceTypeId = String(formData.get("serviceTypeId") ?? "");
    const notes = String(formData.get("notes") ?? "").trim();

    const { data: slot, error: slotError } = await supabase
      .from("availability_slots")
      .select("*")
      .eq("id", slotId)
      .eq("is_available", true)
      .single<AvailabilitySlotRow>();

    if (slotError || !slot) {
      return { success: false, message: "Lo slot selezionato non è più disponibile." };
    }

    const { error: bookingError } = await supabase.from("bookings").insert({
      user_id: user.id,
      service_type_id: serviceTypeId,
      slot_id: slot.id,
      date: slot.date,
      start_time: slot.start_time,
      end_time: slot.end_time,
      notes: notes || null,
      status: "pending",
    } as never);

    if (bookingError) throw new Error(bookingError.message);

    await supabase
      .from("availability_slots")
      .update({ is_available: false } as never)
      .eq("id", slot.id);

    revalidatePath("/dashboard");
    revalidatePath("/prenotazioni");
    revalidatePath("/prenota/fotografia");
    revalidatePath("/prenota/consulenza");
    return { success: true, message: "Prenotazione creata con successo." };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Impossibile creare la prenotazione.",
    };
  }
}

export type PortfolioEditorData = {
  item: PortfolioItemRow | null;
  categories: CategoryRow[];
  images: PortfolioImageRow[];
};

export type BookingPageData = {
  serviceTypes: ServiceTypeRow[];
  slots: (AvailabilitySlotRow & { service_types?: ServiceTypeRow | null })[];
};