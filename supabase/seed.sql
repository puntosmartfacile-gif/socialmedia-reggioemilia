insert into public.categories (name, slug, description, icon, sort_order)
values
  ('Fotografia', 'fotografia', 'Servizi fotografici per brand e attività locali.', 'camera', 1),
  ('Local SEO', 'local-seo', 'Ottimizzazione della presenza locale e Google Business Profile.', 'map-pin', 2),
  ('Social Strategy', 'social-strategy', 'Strategia editoriale e crescita della presenza social.', 'sparkles', 3),
  ('Case Studies', 'case-studies', 'Categoria sincronizzata da WordPress.', 'briefcase', 4),
  ('Innovative Solutions', 'innovative-solutions', 'Categoria sincronizzata da WordPress.', 'lightbulb', 5),
  ('Pillole di Digital', 'pillole-di-digital', 'Categoria sincronizzata da WordPress.', 'sparkles', 6),
  ('Content Marketing & Social', 'content-marketing-social', 'Categoria sincronizzata da WordPress.', 'megaphone', 7),
  ('Google Maps', 'google-maps', 'Categoria sincronizzata da WordPress.', 'map', 8),
  ('Local SEO & Google Maps', 'local-seo-google-maps', 'Categoria sincronizzata da WordPress.', 'map-pin', 9),
  ('News', 'news', 'Categoria sincronizzata da WordPress.', 'newspaper', 10),
  ('Useful', 'useful', 'Categoria sincronizzata da WordPress.', 'bookmark', 11)
on conflict (slug) do update
set name = excluded.name,
    description = excluded.description,
    icon = excluded.icon,
    sort_order = excluded.sort_order;

insert into public.service_types (name, slug, description, duration_minutes, price_cents, type, is_active)
values
  ('Sessione Fotografica Standard', 'sessione-fotografica-standard', 'Sessione fotografica standard per contenuti brand.', 90, 25000, 'photography', true),
  ('Sessione Premium', 'sessione-premium', 'Sessione fotografica premium con direzione creativa dedicata.', 90, 45000, 'photography', true),
  ('Consulenza Strategica', 'consulenza-strategica', 'Consulenza dedicata a strategia social e posizionamento.', 60, 12000, 'consultation', true)
on conflict (slug) do update
set name = excluded.name,
    description = excluded.description,
    duration_minutes = excluded.duration_minutes,
    price_cents = excluded.price_cents,
    type = excluded.type,
    is_active = excluded.is_active;

with service_refs as (
  select id, slug from public.service_types
),
slots as (
  select
    service_refs.id as service_type_id,
    (current_date + day_offset)::date as date,
    start_time::time as start_time,
    end_time::time as end_time
  from service_refs
  cross join (
    values
      ('sessione-fotografica-standard', 1, '09:00', '10:30'),
      ('sessione-fotografica-standard', 4, '14:00', '15:30'),
      ('sessione-premium', 6, '10:45', '12:15'),
      ('sessione-premium', 9, '16:00', '17:30'),
      ('consulenza-strategica', 2, '09:30', '10:30'),
      ('consulenza-strategica', 5, '11:00', '12:00'),
      ('consulenza-strategica', 8, '15:00', '16:00'),
      ('consulenza-strategica', 12, '17:00', '18:00')
  ) as seed(slug, day_offset, start_time, end_time)
  where service_refs.slug = seed.slug
)
insert into public.availability_slots (service_type_id, date, start_time, end_time, is_available)
select service_type_id, date, start_time, end_time, true
from slots
where not exists (
  select 1
  from public.availability_slots existing
  where existing.service_type_id = slots.service_type_id
    and existing.date = slots.date
    and existing.start_time = slots.start_time
    and existing.end_time = slots.end_time
);