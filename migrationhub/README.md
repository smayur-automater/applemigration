# MigrationHub

CRM suite for education and migration agencies — built for Australian
agents and their worldwide sub-agent networks.

One workspace for the whole business: **clients & students, course
applications, universities & CRICOS courses, agents & sub-agents,
commissions (with GST and split maths), visa cases, coaching classes,
and agency administration.**

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Server Components, Server Actions, Turbopack)
- React 19 · TypeScript · Tailwind CSS v4 · Zod
- Supabase (Postgres + Auth) as the production data backend

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The app boots in **demo mode**
(`DATA_BACKEND=seed`): a realistic in-memory dataset for one agency
tenant, fully interactive — move applications through the pipeline,
reconcile commissions, tick visa checklists, create clients.

## Modules

| Route | Module |
|---|---|
| `/` | Dashboard — KPIs, recent pipeline activity, visa-expiry alerts |
| `/clients` | Client base with search; `/clients/new` intake form (Zod-validated) |
| `/clients/[id]` | 360° client view — applications, visa cases with checklists, notes |
| `/applications` | Kanban pipeline: enquiry → applied → offers → GTE/GS → CoE → enrolled |
| `/universities` | Partner providers, CRICOS codes, courses, commission schedules |
| `/agents` | Sub-agent referral tree with split percentages |
| `/commissions` | Ledger: expected → invoiced → received → sub-agent paid, GST + split maths |
| `/visas` | All visa cases sorted by expiry, with deadline highlighting |
| `/classes` | IELTS / PTE / NAATI CCL coaching batches and enrolments |
| `/settings` | Team, roles and branches |

### Commission engine

`src/lib/commission.ts` is the single source of truth:
gross = first-year tuition × provider rate; GST = 1/11 of gross
(GST-inclusive convention); sub-agent split applies to the net amount.
Advancing an application to **CoE issued** raises the expected
commission automatically.

## Switching to Supabase

1. Create a Supabase project and run `supabase/schema.sql` in the SQL
   editor. It creates all tables **multi-tenant** (every row scoped to
   an `agency`) with row-level security policies driven by
   `memberships`, so one project serves many agencies safely.
2. Copy `.env.example` to `.env.local`, set `DATA_BACKEND=supabase` and
   the Supabase URL/keys.
3. Port the read functions in `src/lib/data.ts` and the mutations in
   `src/lib/actions.ts` to Supabase queries via `src/lib/supabase.ts`.
   Pages and components are backend-agnostic — they only call `data.ts`
   and `actions.ts`.

## Roadmap

- Supabase auth (owner / admin / counsellor / accounts / sub-agent portal roles)
- Document vault with versioning per client
- Xero/QuickBooks sync for commission invoices
- Provider claim batching and remittance reconciliation
- Email/WhatsApp follow-up automations
- Reporting warehouse (conversion funnel, agent league tables)
