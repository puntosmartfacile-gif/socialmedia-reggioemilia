export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "client" | "admin";
export type ServiceTypeEnum = "photography" | "consultation";
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type ContactStatus = "new" | "read" | "replied" | "archived";
export type WpSyncStatus = "running" | "success" | "failed";

export interface ProfileRow {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  company: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
}

export interface PortfolioItemRow {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string | null;
  category_id: string;
  client_name: string | null;
  results: Json | null;
  cover_image_url: string;
  is_published: boolean;
  published_at: string | null;
  wp_post_id: number | null;
  wp_last_modified: string | null;
  wp_source_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface WpSyncLogRow {
  id: string;
  started_at: string;
  completed_at: string | null;
  posts_synced: number;
  posts_updated: number;
  posts_skipped: number;
  errors: Json;
  status: WpSyncStatus;
}

export interface PortfolioImageRow {
  id: string;
  portfolio_item_id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
}

export interface ServiceTypeRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  duration_minutes: number;
  price_cents: number | null;
  type: ServiceTypeEnum;
  is_active: boolean;
}

export interface AvailabilitySlotRow {
  id: string;
  service_type_id: string | null;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  recurring_rule: Json | null;
  created_at: string;
}

export interface BookingRow {
  id: string;
  user_id: string;
  service_type_id: string;
  slot_id: string | null;
  date: string;
  start_time: string;
  end_time: string;
  status: BookingStatus;
  notes: string | null;
  admin_notes: string | null;
  google_event_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactRequestRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  service_interest: string | null;
  status: ContactStatus;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: { Row: ProfileRow; Insert: Partial<ProfileRow> & { id: string; email: string }; Update: Partial<ProfileRow>; Relationships: [] };
      categories: { Row: CategoryRow; Insert: Partial<CategoryRow>; Update: Partial<CategoryRow>; Relationships: [] };
      portfolio_items: { Row: PortfolioItemRow; Insert: Partial<PortfolioItemRow>; Update: Partial<PortfolioItemRow>; Relationships: [] };
      portfolio_images: { Row: PortfolioImageRow; Insert: Partial<PortfolioImageRow>; Update: Partial<PortfolioImageRow>; Relationships: [] };
      wp_sync_log: { Row: WpSyncLogRow; Insert: Partial<WpSyncLogRow>; Update: Partial<WpSyncLogRow>; Relationships: [] };
      service_types: { Row: ServiceTypeRow; Insert: Partial<ServiceTypeRow>; Update: Partial<ServiceTypeRow>; Relationships: [] };
      availability_slots: { Row: AvailabilitySlotRow; Insert: Partial<AvailabilitySlotRow>; Update: Partial<AvailabilitySlotRow>; Relationships: [] };
      bookings: { Row: BookingRow; Insert: Partial<BookingRow>; Update: Partial<BookingRow>; Relationships: [] };
      contact_requests: { Row: ContactRequestRow; Insert: Partial<ContactRequestRow>; Update: Partial<ContactRequestRow>; Relationships: [] };
    };
  };
}