-- Investor Signals — Startup Funding Directory
-- Initial schema. Run in the Supabase SQL editor (or `supabase db push`).

create extension if not exists pgcrypto;

create table if not exists public.startups (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  founder_name  text,
  tagline       text,
  description   text,
  industry      text not null default 'Other',
  stage         text,
  location      text,
  website       text,
  raise_target  text,
  -- Contact fields are PRIVATE: the app only reads/writes them server-side
  -- (service role) and never returns them from any public endpoint.
  contact_email text,
  contact_phone text,
  source        text not null default 'submission' check (source in ('seed', 'submission')),
  status        text not null default 'approved' check (status in ('approved', 'pending', 'archived')),
  created_at    timestamptz not null default now()
);

create index if not exists startups_created_at_idx on public.startups (created_at desc);
create index if not exists startups_industry_idx   on public.startups (industry);
create index if not exists startups_stage_idx      on public.startups (stage);
create index if not exists startups_status_idx     on public.startups (status);
create index if not exists startups_name_lower_idx on public.startups (lower(name));

-- Lock the table down completely for anon/authenticated clients.
-- The Next.js app talks to this table exclusively through the service role
-- key on the server, so no RLS policies are needed (service role bypasses RLS).
alter table public.startups enable row level security;
