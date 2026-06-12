-- MigrationHub — Supabase/Postgres schema
-- Multi-tenant: every row belongs to an agency. RLS scopes all access to the
-- caller's agency via their membership row, so one Supabase project can serve
-- every agency (tenant) on the platform.

create table agencies (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  country     text not null default 'Australia',
  marn        text,
  created_at  timestamptz not null default now()
);

-- Maps Supabase auth users to an agency with a role.
create table memberships (
  user_id     uuid not null references auth.users (id) on delete cascade,
  agency_id   uuid not null references agencies (id) on delete cascade,
  role        text not null check (role in ('owner','admin','counsellor','accounts','subagent')),
  primary key (user_id, agency_id)
);

create table branches (
  id          uuid primary key default gen_random_uuid(),
  agency_id   uuid not null references agencies (id) on delete cascade,
  name        text not null,
  city        text not null,
  country     text not null
);

create table providers (
  id              uuid primary key default gen_random_uuid(),
  agency_id       uuid not null references agencies (id) on delete cascade,
  name            text not null,
  type            text not null check (type in ('university','tafe','college','school')),
  country         text not null,
  city            text not null,
  cricos_code     text,
  commission_pct  numeric(5,2) not null default 0,
  bonus_pct       numeric(5,2),
  bonus_threshold integer
);

create table courses (
  id               uuid primary key default gen_random_uuid(),
  agency_id        uuid not null references agencies (id) on delete cascade,
  provider_id      uuid not null references providers (id) on delete cascade,
  name             text not null,
  level            text not null check (level in ('english','certificate','diploma','bachelor','master','phd')),
  cricos_code      text,
  duration_months  integer not null,
  tuition_per_year numeric(12,2) not null,
  currency         text not null default 'AUD',
  intakes          text[] not null default '{}'
);

create table agents (
  id              uuid primary key default gen_random_uuid(),
  agency_id       uuid not null references agencies (id) on delete cascade,
  parent_agent_id uuid references agents (id),
  name            text not null,
  email           text not null,
  country         text not null,
  split_pct       numeric(5,2) not null default 0,
  status          text not null default 'active' check (status in ('active','suspended'))
);

create table clients (
  id            uuid primary key default gen_random_uuid(),
  agency_id     uuid not null references agencies (id) on delete cascade,
  branch_id     uuid references branches (id),
  agent_id      uuid references agents (id),
  counsellor_id uuid references auth.users (id),
  first_name    text not null,
  last_name     text not null,
  email         text not null,
  phone         text,
  nationality   text,
  date_of_birth date,
  passport_no   text,
  status        text not null default 'lead'
                check (status in ('lead','active','enrolled','visa_holder','archived')),
  created_at    timestamptz not null default now()
);

create table client_notes (
  id          uuid primary key default gen_random_uuid(),
  agency_id   uuid not null references agencies (id) on delete cascade,
  client_id   uuid not null references clients (id) on delete cascade,
  author_id   uuid references auth.users (id),
  body        text not null,
  created_at  timestamptz not null default now()
);

create table applications (
  id          uuid primary key default gen_random_uuid(),
  agency_id   uuid not null references agencies (id) on delete cascade,
  client_id   uuid not null references clients (id) on delete cascade,
  provider_id uuid not null references providers (id),
  course_id   uuid not null references courses (id),
  intake      text not null,
  status      text not null default 'enquiry'
              check (status in ('enquiry','applied','conditional_offer','unconditional_offer',
                                'gte_gs','coe_issued','enrolled','deferred','withdrawn')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table visa_cases (
  id          uuid primary key default gen_random_uuid(),
  agency_id   uuid not null references agencies (id) on delete cascade,
  client_id   uuid not null references clients (id) on delete cascade,
  subclass    text not null,
  status      text not null default 'preparing'
              check (status in ('preparing','lodged','granted','refused','expired')),
  lodged_date date,
  grant_date  date,
  expiry_date date,
  checklist   jsonb not null default '[]'
);

create table commissions (
  id               uuid primary key default gen_random_uuid(),
  agency_id        uuid not null references agencies (id) on delete cascade,
  application_id   uuid not null references applications (id) on delete cascade,
  provider_id      uuid not null references providers (id),
  agent_id         uuid references agents (id),
  gross_amount     numeric(12,2) not null,
  gst_amount       numeric(12,2) not null default 0,
  sub_agent_amount numeric(12,2) not null default 0,
  currency         text not null default 'AUD',
  status           text not null default 'expected'
                   check (status in ('expected','invoiced','received','subagent_paid')),
  invoice_date     date,
  received_date    date
);

create table class_batches (
  id              uuid primary key default gen_random_uuid(),
  agency_id       uuid not null references agencies (id) on delete cascade,
  name            text not null,
  type            text not null check (type in ('IELTS','PTE','NAATI CCL')),
  teacher         text,
  schedule        text,
  start_date      date,
  fee_per_student numeric(10,2) not null default 0,
  capacity        integer not null default 0
);

create table class_enrolments (
  batch_id  uuid not null references class_batches (id) on delete cascade,
  client_id uuid not null references clients (id) on delete cascade,
  agency_id uuid not null references agencies (id) on delete cascade,
  primary key (batch_id, client_id)
);

-- ─── Row-level security: tenant isolation ────────────────────────

create or replace function current_agency_ids()
returns setof uuid
language sql stable security definer set search_path = public as $$
  select agency_id from memberships where user_id = auth.uid()
$$;

do $$
declare t text;
begin
  foreach t in array array[
    'agencies','branches','providers','courses','agents','clients','client_notes',
    'applications','visa_cases','commissions','class_batches','class_enrolments'
  ] loop
    execute format('alter table %I enable row level security', t);
    if t = 'agencies' then
      execute 'create policy tenant_isolation on agencies
               using (id in (select current_agency_ids()))';
    else
      execute format('create policy tenant_isolation on %I
               using (agency_id in (select current_agency_ids()))
               with check (agency_id in (select current_agency_ids()))', t);
    end if;
  end loop;
end $$;

alter table memberships enable row level security;
create policy own_membership on memberships
  using (user_id = auth.uid());

-- Helpful indexes for the hot paths.
create index on clients (agency_id, status);
create index on applications (agency_id, status);
create index on applications (client_id);
create index on commissions (agency_id, status);
create index on visa_cases (agency_id, expiry_date);
