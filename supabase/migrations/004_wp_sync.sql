create type public.wp_sync_status as enum ('running', 'success', 'failed');

alter table public.portfolio_items
add column if not exists wp_post_id integer unique,
add column if not exists wp_last_modified timestamptz,
add column if not exists wp_source_url text;

create index if not exists idx_portfolio_items_wp_post_id on public.portfolio_items(wp_post_id);
create index if not exists idx_portfolio_items_wp_last_modified on public.portfolio_items(wp_last_modified desc);

create table if not exists public.wp_sync_log (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  posts_synced integer not null default 0,
  posts_updated integer not null default 0,
  posts_skipped integer not null default 0,
  errors jsonb not null default '[]'::jsonb,
  status public.wp_sync_status not null default 'running'
);

create index if not exists idx_wp_sync_log_started_at on public.wp_sync_log(started_at desc);
create index if not exists idx_wp_sync_log_status on public.wp_sync_log(status);