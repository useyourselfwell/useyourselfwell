create extension if not exists pgcrypto;

create table if not exists public.content_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  meta_title text not null,
  meta_description text not null default '',
  hero_image text,
  cta_label text,
  cta_url text,
  tags text[] not null default '{}',
  content_html text not null,
  published_at timestamptz not null,
  source_path text not null unique,
  source_checksum text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists content_posts_published_idx on public.content_posts (published_at desc) where status = 'published';
alter table public.content_posts enable row level security;
create policy "Public can read published content posts" on public.content_posts for select using (status = 'published');
