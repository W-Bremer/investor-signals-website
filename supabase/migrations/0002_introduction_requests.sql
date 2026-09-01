-- Investor Signals — main site
-- Consultation / introduction requests submitted from investorsignals.co.
-- Run in the Supabase SQL editor (or `supabase db push`).

create extension if not exists pgcrypto;

create table if not exists public.introduction_requests (
  id         uuid primary key default gen_random_uuid(),
  audience   text not null check (audience in ('startup', 'fund-manager')),
  name       text not null,
  email      text not null,
  company    text not null,
  role       text not null,
  stage      text not null,
  amount     text not null,
  sector     text not null,
  deck_url   text,
  notes      text,
  created_at timestamptz not null default now()
);

-- Contains contact details: lock it down. The site writes with the service
-- role key only; no anon/authenticated access of any kind.
alter table public.introduction_requests enable row level security;

create index if not exists introduction_requests_created_at_idx
  on public.introduction_requests (created_at desc);
