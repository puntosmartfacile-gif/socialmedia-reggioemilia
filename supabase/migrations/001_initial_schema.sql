create extension if not exists pgcrypto;

create type public.user_role as enum ('client', 'admin');
create type public.service_type_enum as enum ('photography', 'consultation');
create type public.booking_status as enum ('pending', 'confirmed', 'cancelled', 'completed');
create type public.contact_status as enum ('new', 'read', 'replied', 'archived');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  phone text,
  company text,
  role public.user_role not null default 'client',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  icon text,
  sort_order integer not null default 0
);

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  content text,
  category_id uuid not null references public.categories(id) on delete restrict,
  client_name text,
  results jsonb,
  cover_image_url text not null,
  is_published boolean not null default false,
  published_at timestamptz,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_images (
  id uuid primary key default gen_random_uuid(),
  portfolio_item_id uuid not null references public.portfolio_items(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.service_types (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  duration_minutes integer not null,
  price_cents integer,
  type public.service_type_enum not null,
  is_active boolean not null default true
);

create table if not exists public.availability_slots (
  id uuid primary key default gen_random_uuid(),
  service_type_id uuid references public.service_types(id) on delete set null,
  date date not null,
  start_time time not null,
  end_time time not null,
  is_available boolean not null default true,
  recurring_rule jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  service_type_id uuid not null references public.service_types(id) on delete restrict,
  slot_id uuid references public.availability_slots(id) on delete set null,
  date date not null,
  start_time time not null,
  end_time time not null,
  status public.booking_status not null default 'pending',
  notes text,
  admin_notes text,
  google_event_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  service_interest text,
  status public.contact_status not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_categories_sort_order on public.categories(sort_order);
create index if not exists idx_portfolio_items_category_id on public.portfolio_items(category_id);
create index if not exists idx_portfolio_items_is_published on public.portfolio_items(is_published);
create index if not exists idx_portfolio_items_sort_order on public.portfolio_items(sort_order);
create index if not exists idx_portfolio_items_published_at on public.portfolio_items(published_at desc);
create index if not exists idx_portfolio_images_portfolio_item_id on public.portfolio_images(portfolio_item_id);
create index if not exists idx_portfolio_images_sort_order on public.portfolio_images(sort_order);
create index if not exists idx_service_types_type_active on public.service_types(type, is_active);
create index if not exists idx_availability_slots_service_type_date on public.availability_slots(service_type_id, date);
create index if not exists idx_availability_slots_date_available on public.availability_slots(date, is_available);
create index if not exists idx_bookings_user_id on public.bookings(user_id);
create index if not exists idx_bookings_service_type_id on public.bookings(service_type_id);
create index if not exists idx_bookings_slot_id on public.bookings(slot_id);
create index if not exists idx_bookings_date_status on public.bookings(date, status);
create index if not exists idx_contact_requests_status_created_at on public.contact_requests(status, created_at desc);

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger set_portfolio_items_updated_at
before update on public.portfolio_items
for each row execute function public.set_updated_at();

create trigger set_bookings_updated_at
before update on public.bookings
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();