-- JTC Reminder App database schema
-- Apply this migration to the Jubilee Tamil Church Supabase project.

create extension if not exists pgcrypto;

create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('birthday', 'anniversary')),
  name text not null check (char_length(trim(name)) > 0),
  date date not null,
  created_by uuid not null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint reminders_unique_celebration unique (type, name, date)
);

create index if not exists reminders_date_idx on public.reminders (date);
create index if not exists reminders_name_idx on public.reminders (name);

alter table public.reminders enable row level security;

-- JTC admin accounts are created in Supabase Auth by an administrator.
-- Public/anonymous visitors receive no access. Any signed-in JTC admin account
-- can work with the shared church reminder list.
drop policy if exists "JTC admins can read reminders" on public.reminders;
create policy "JTC admins can read reminders"
on public.reminders for select
to authenticated
using (true);

drop policy if exists "JTC admins can add reminders" on public.reminders;
create policy "JTC admins can add reminders"
on public.reminders for insert
to authenticated
with check (auth.uid() is not null and created_by = auth.uid());

drop policy if exists "JTC admins can update reminders" on public.reminders;
create policy "JTC admins can update reminders"
on public.reminders for update
to authenticated
using (true)
with check (auth.uid() is not null);

drop policy if exists "JTC admins can delete reminders" on public.reminders;
create policy "JTC admins can delete reminders"
on public.reminders for delete
to authenticated
using (true);

revoke all on public.reminders from anon;
grant select, insert, update, delete on public.reminders to authenticated;

comment on table public.reminders is 'Private Jubilee Tamil Church birthday and wedding anniversary reminders.';
