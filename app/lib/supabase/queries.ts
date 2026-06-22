import { cache } from "react";
import { createClient } from "@/app/lib/supabase/server";
import { getPortfolioItemBySlug, portfolioCategories, portfolioItems } from "@/app/data/portfolio";
import type {
  AvailabilitySlotRow,
  BookingRow,
  CategoryRow,
  ContactRequestRow,
  ProfileRow,
  PortfolioImageRow,
  PortfolioItemRow,
  ServiceTypeRow,
} from "@/app/types/database";

export interface PortfolioListItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  clientName: string;
  shortDescription: string;
  excerpt: string;
  coverImage: string;
  gallery: string[];
  results: Array<{ label: string; value: string }>;
  content: string[];
  isPublished: boolean;
  publishedAt: string | null;
}

export interface AdminPortfolioItem extends PortfolioListItem {
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  categoryId: string;
  status: "published" | "draft";
}

export interface AdminBookingItem extends BookingRow {
  serviceName: string;
  serviceSlug: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
}

export interface DashboardBookingItem {
  id: string;
  serviceName: string;
  date: string;
  time: string;
  status: BookingRow["status"];
  location: string;
  contactPerson: string;
  notes: string;
}

function parseResults(results: unknown) {
  if (!Array.isArray(results)) return [];
  return results
    .filter((item): item is { label: string; value: string } => {
      return typeof item === "object" && item !== null && "label" in item && "value" in item;
    })
    .map((item) => ({ label: String(item.label), value: String(item.value) }));
}

function parseContent(content: string | null) {
  if (!content) return [];
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function mapPortfolioItem(
  item: PortfolioItemRow,
  categories: CategoryRow[],
  images: PortfolioImageRow[],
): PortfolioListItem {
  const category = categories.find((entry) => entry.id === item.category_id);
  const gallery = images
    .filter((image) => image.portfolio_item_id === item.id)
    .sort((left, right) => left.sort_order - right.sort_order)
    .map((image) => image.image_url);

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    category: category?.name ?? "Portfolio",
    clientName: item.client_name ?? item.title,
    shortDescription: item.description,
    excerpt: item.description,
    coverImage: item.cover_image_url,
    gallery: gallery.length > 0 ? gallery : [item.cover_image_url],
    results: parseResults(item.results),
    content: parseContent(item.content),
    isPublished: item.is_published,
    publishedAt: item.published_at,
  };
}

function mapAdminPortfolioItem(
  item: PortfolioItemRow,
  categories: CategoryRow[],
  images: PortfolioImageRow[],
): AdminPortfolioItem {
  const mapped = mapPortfolioItem(item, categories, images);
  return {
    ...mapped,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    sortOrder: item.sort_order,
    categoryId: item.category_id,
    status: item.is_published ? "published" : "draft",
  };
}

export const getPortfolioData = cache(async () => {
  const supabase = await createClient();
  const [{ data: categories }, { data: items }, { data: images }] = await Promise.all([
    supabase.from("categories").select("*").order("sort_order"),
    supabase
      .from("portfolio_items")
      .select("*")
      .eq("is_published", true)
      .order("sort_order")
      .order("published_at", { ascending: false }),
    supabase.from("portfolio_images").select("*").order("sort_order"),
  ]);
  const typedCategories = (categories ?? []) as CategoryRow[];
  const typedItems = (items ?? []) as PortfolioItemRow[];
  const typedImages = (images ?? []) as PortfolioImageRow[];

  if (typedItems.length === 0) {
    return {
      categories: portfolioCategories,
      items: portfolioItems.map((item) => ({
        ...item,
        id: item.slug,
        isPublished: true,
        publishedAt: null,
      })),
      source: "static" as const,
    };
  }

  const mappedCategories = ["Tutti", ...typedCategories.map((category) => category.name)] as string[];
  return {
    categories: mappedCategories,
    items: typedItems.map((item) => mapPortfolioItem(item, typedCategories, typedImages)),
    source: "supabase" as const,
  };
});

export const getPortfolioItemData = cache(async (slug: string) => {
  const portfolioData = await getPortfolioData();
  const supabaseItem = portfolioData.items.find((item) => item.slug === slug);

  if (supabaseItem) {
    const relatedProjects = portfolioData.items
      .filter((project) => project.slug !== slug && project.category === supabaseItem.category)
      .slice(0, 3);
    return { item: supabaseItem, relatedProjects, source: portfolioData.source };
  }

  const fallbackItem = getPortfolioItemBySlug(slug);
  if (!fallbackItem) return null;

  return {
    item: {
      ...fallbackItem,
      id: fallbackItem.slug,
      isPublished: true,
      publishedAt: null,
    },
    relatedProjects: portfolioItems
      .filter((project) => project.slug !== slug && project.category === fallbackItem.category)
      .slice(0, 3)
      .map((project) => ({
        ...project,
        id: project.slug,
        isPublished: true,
        publishedAt: null,
      })),
    source: "static" as const,
  };
});

export const getServiceTypes = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("service_types").select("*").eq("is_active", true).order("name");
  return (data ?? []) as ServiceTypeRow[];
});

export const getServiceTypesByType = cache(async (type: ServiceTypeRow["type"]) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("service_types")
    .select("*")
    .eq("type", type)
    .eq("is_active", true)
    .order("name");
  return (data ?? []) as ServiceTypeRow[];
});

export const getAvailabilitySlots = cache(async (serviceSlug?: string) => {
  const supabase = await createClient();
  let query = supabase
    .from("availability_slots")
    .select("*, service_types(*)")
    .eq("is_available", true)
    .gte("date", new Date().toISOString().slice(0, 10))
    .order("date")
    .order("start_time");

  if (serviceSlug) {
    const { data: service } = await supabase
      .from("service_types")
      .select("id")
      .eq("slug", serviceSlug)
      .maybeSingle<{ id: string }>();
    if (service?.id) {
      query = query.eq("service_type_id", service.id);
    }
  }

  const { data } = await query;
  return (data ?? []) as (AvailabilitySlotRow & { service_types?: ServiceTypeRow | null })[];
});

export const getAvailabilitySlotsByServiceType = cache(async (serviceTypeIds: string[]) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("availability_slots")
    .select("*, service_types(*)")
    .in("service_type_id", serviceTypeIds)
    .eq("is_available", true)
    .gte("date", new Date().toISOString().slice(0, 10))
    .order("date")
    .order("start_time");

  return (data ?? []) as (AvailabilitySlotRow & { service_types?: ServiceTypeRow | null })[];
});

export const getAdminPortfolioItems = cache(async () => {
  const supabase = await createClient();
  const [{ data: categories }, { data: items }, { data: images }] = await Promise.all([
    supabase.from("categories").select("*").order("sort_order"),
    supabase
      .from("portfolio_items")
      .select("*")
      .order("updated_at", { ascending: false })
      .order("sort_order"),
    supabase.from("portfolio_images").select("*").order("sort_order"),
  ]);

  return {
    categories: (categories ?? []) as CategoryRow[],
    items: (items ?? []).map((item) =>
      mapAdminPortfolioItem(item as PortfolioItemRow, (categories ?? []) as CategoryRow[], (images ?? []) as PortfolioImageRow[]),
    ),
  };
});

export const getAdminPortfolioItem = cache(async (id: string) => {
  const supabase = await createClient();
  const [{ data: item }, { data: categories }, { data: images }] = await Promise.all([
    supabase.from("portfolio_items").select("*").eq("id", id).maybeSingle(),
    supabase.from("categories").select("*").order("sort_order"),
    supabase.from("portfolio_images").select("*").eq("portfolio_item_id", id).order("sort_order"),
  ]);

  return {
    item: (item as PortfolioItemRow | null) ?? null,
    categories: (categories ?? []) as CategoryRow[],
    images: (images ?? []) as PortfolioImageRow[],
  };
});

export const getAdminBookings = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bookings")
    .select("*, service_types(*), profiles(*)")
    .order("date")
    .order("start_time");

  return ((data ?? []) as Array<
    BookingRow & { service_types?: ServiceTypeRow | null; profiles?: ProfileRow | null }
  >).map((booking) => ({
    ...booking,
    serviceName: booking.service_types?.name ?? "Servizio",
    serviceSlug: booking.service_types?.slug ?? "",
    clientName: booking.profiles?.full_name ?? booking.profiles?.email ?? "Cliente",
    clientEmail: booking.profiles?.email ?? "",
    clientPhone: booking.profiles?.phone ?? "",
  }));
});

export const getAdminAvailabilitySlots = cache(async () => {
  const supabase = await createClient();
  const [slotsResult, servicesResult] = await Promise.all([
    supabase
      .from("availability_slots")
      .select("*, service_types(*)")
      .gte("date", new Date().toISOString().slice(0, 10))
      .order("date")
      .order("start_time"),
    supabase.from("service_types").select("*").eq("is_active", true).order("name"),
  ]);

  return {
    slots: (slotsResult.data ?? []) as (AvailabilitySlotRow & {
      service_types?: ServiceTypeRow | null;
    })[],
    serviceTypes: (servicesResult.data ?? []) as ServiceTypeRow[],
  };
});

export const getUserBookings = cache(async (userId: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bookings")
    .select("*, service_types(*)")
    .eq("user_id", userId)
    .order("date")
    .order("start_time");

  return ((data ?? []) as Array<BookingRow & { service_types?: ServiceTypeRow | null }>).map(
    (booking): DashboardBookingItem => ({
      id: booking.id,
      serviceName: booking.service_types?.name ?? "Servizio",
      date: booking.date,
      time: booking.start_time.slice(0, 5),
      status: booking.status,
      location:
        booking.service_types?.type === "consultation"
          ? "Videochiamata o studio"
          : "Da concordare con il cliente",
      contactPerson: "Team SocialMediaRE",
      notes: booking.notes ?? "Nessuna nota aggiuntiva.",
    }),
  );
});

export const getAdminOverviewData = cache(async () => {
  const supabase = await createClient();
  const [bookings, portfolioItems, contactRequests, availabilitySlots] = await Promise.all([
    supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("portfolio_items").select("*"),
    supabase.from("contact_requests").select("*").order("created_at", { ascending: false }).limit(3),
    supabase.from("availability_slots").select("*").gte("date", new Date().toISOString().slice(0, 10)),
  ]);
  const typedPortfolioItems = (portfolioItems.data ?? []) as PortfolioItemRow[];
  const typedContactRequests = (contactRequests.data ?? []) as ContactRequestRow[];

  return {
    recentBookings: (bookings.data ?? []) as BookingRow[],
    portfolioItemsCount: typedPortfolioItems.length,
    publishedPortfolioCount: typedPortfolioItems.filter((item) => item.is_published).length,
    unreadMessagesCount: typedContactRequests.filter((item) => item.status === "new").length,
    recentMessages: typedContactRequests,
    upcomingAvailabilityCount: availabilitySlots.data?.length ?? 0,
  };
});