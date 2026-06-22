insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', false)
on conflict (id) do nothing;

create policy "portfolio_public_read" on storage.objects
for select using (bucket_id = 'portfolio');

create policy "portfolio_admin_write" on storage.objects
for all using (
  bucket_id = 'portfolio'
  and exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
) with check (
  bucket_id = 'portfolio'
  and exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

create policy "avatars_authenticated_read" on storage.objects
for select using (bucket_id = 'avatars' and auth.role() = 'authenticated');

create policy "avatars_user_write" on storage.objects
for all using (
  bucket_id = 'avatars'
  and auth.uid() is not null
  and (storage.foldername(name))[1] = auth.uid()::text
) with check (
  bucket_id = 'avatars'
  and auth.uid() is not null
  and (storage.foldername(name))[1] = auth.uid()::text
);