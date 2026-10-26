-- Quote-request backup for the Journaly WhatsApp form.
-- Apply in the Supabase SQL editor or via the Supabase CLI.
-- The serverless function writes with SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.
-- The anon key cannot read or write this table.

create table if not exists public.quote_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  quantity text,
  company text,
  email text,
  use_case text,
  branding text,
  deadline text,
  notes text,
  sample_kit boolean not null default false,
  season text,
  source_page text,
  step text,
  journal_type text,
  quantity_tier text,
  branding_method text
);

create index if not exists quote_leads_created_at_idx
  on public.quote_leads (created_at desc);

alter table public.quote_leads enable row level security;

revoke all on table public.quote_leads from anon, authenticated;
