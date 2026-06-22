alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.portfolio_images enable row level security;
alter table public.service_types enable row level security;
alter table public.availability_slots enable row level security;
alter table public.bookings enable row level security;
alter table public.contact_requests enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create policy "profiles_select_own_or_admin" on public.profiles
for select using (auth.uid() = id or public.is_admin());

create policy "profiles_update_own_or_admin" on public.profiles
for update using (auth.uid() = id or public.is_admin())
with check (auth.uid() = id or public.is_admin());

create policy "categories_public_read" on public.categories
for select using (true);

create policy "categories_admin_write" on public.categories
for all using (public.is_admin()) with check (public.is_admin());

create policy "portfolio_items_public_read_published" on public.portfolio_items
for select using (is_published or public.is_admin());

create policy "portfolio_items_admin_write" on public.portfolio_items
for all using (public.is_admin()) with check (public.is_admin());

create policy "portfolio_images_public_read_published_parent" on public.portfolio_images
for select using (
  public.is_admin()
  or exists (
    select 1 from public.portfolio_items
    where public.portfolio_items.id = portfolio_item_id
      and public.portfolio_items.is_published = true
  )
);

create policy "portfolio_images_admin_write" on public.portfolio_images
for all using (public.is_admin()) with check (public.is_admin());

create policy "service_types_public_read_active" on public.service_types
for select using (is_active or public.is_admin());

create policy "service_types_admin_write" on public.service_types
for all using (public.is_admin()) with check (public.is_admin());

create policy "availability_slots_public_read_available" on public.availability_slots
for select using (is_available or public.is_admin());

create policy "availability_slots_admin_write" on public.availability_slots
for all using (public.is_admin()) with check (public.is_admin());

create policy "bookings_select_own_or_admin" on public.bookings
for select using (user_id = auth.uid() or public.is_admin());

create policy "bookings_insert_own_or_admin" on public.bookings
for insert with check (user_id = auth.uid() or public.is_admin());

create policy "bookings_update_admin" on public.bookings
for update using (public.is_admin()) with check (public.is_admin());

create policy "contact_requests_public_insert" on public.contact_requests
for insert with check (true);

create policy "contact_requests_admin_read" on public.contact_requests
for select using (public.is_admin());

create policy "contact_requests_admin_update" on public.contact_requests
for update using (public.is_admin()) with check (public.is_admin());