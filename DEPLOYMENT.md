# Deployment Guide — Vercel

This site is a standard Next.js 16 App Router project and deploys to Vercel's
free (Hobby) tier with no special configuration.

## 1. Prerequisites

- A [Vercel account](https://vercel.com/signup) (free)
- The repository pushed to GitHub
- SMTP credentials for form email delivery (any provider — e.g. your email
  host, Amazon SES, or Resend's SMTP endpoint)

## 2. Import the project

1. In the Vercel dashboard, click **Add New… → Project**.
2. Import the `applemigration` GitHub repository.
3. Vercel auto-detects Next.js. Keep the defaults:
   - **Framework preset:** Next.js
   - **Build command:** `next build`
   - **Output:** managed by Vercel
   - **Install command:** `npm install`
4. Do **not** deploy yet — add the environment variables first (next step).

## 3. Environment variables

Under **Project → Settings → Environment Variables**, add:

| Name | Value | Environments |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://applemigration.com.au` | Production |
| `SMTP_HOST` | e.g. `smtp.yourprovider.com` | Production, Preview |
| `SMTP_PORT` | `587` (or `465` for implicit TLS) | Production, Preview |
| `SMTP_USER` | SMTP username | Production, Preview |
| `SMTP_PASS` | SMTP password | Production, Preview |
| `CONTACT_INBOX` | `info@applemigration.com.au` | Production, Preview |

Without SMTP variables the site still works — form submissions are logged to
the function logs instead of emailed, which is convenient for previews.

## 4. Deploy

Click **Deploy**. Every push to the production branch redeploys automatically;
pull requests get preview URLs.

## 5. Custom domain

1. **Project → Settings → Domains → Add** `applemigration.com.au` (and `www`).
2. At your DNS host, add the records Vercel shows (an `A` record to
   `76.76.21.21` for the apex, `CNAME cname.vercel-dns.com` for `www`).
3. Vercel provisions TLS certificates automatically.
4. Confirm `NEXT_PUBLIC_SITE_URL` matches the final domain so canonical URLs,
   the sitemap, and Open Graph tags are correct.

## 6. Post-deploy checklist

- [ ] Replace the placeholder MARN (`0000000`) in `src/lib/site.ts`, plus the
      real office address/phone, then redeploy
- [ ] Submit the contact form and confirm the email arrives at `CONTACT_INBOX`
- [ ] Submit `https://applemigration.com.au/sitemap.xml` in Google Search Console
- [ ] Run Lighthouse (Chrome DevTools → Lighthouse) against the production URL
      and confirm Performance / Accessibility / SEO ≥ 90
- [ ] Verify the MARN appears in the footer on every page

## Staff CRM (`/staff`)

The staff CRM (login at `/staff/login`) needs these environment variables:

| Name | Purpose |
|---|---|
| `CRM_SESSION_SECRET` | JWT signing secret — set a long random string in production |
| `CRM_SEED_PASSWORD` | Initial password for the seeded staff accounts |
| `CRM_DATA_DIR` | Optional: where CRM JSON data is stored (e.g. a mounted volume) |

**Storage caveat:** the CRM stores data as JSON files. On Vercel (and other
serverless hosts) the deployment filesystem is read-only, so the app
automatically falls back to `/tmp` — login works, but **CRM data (clients,
cases, tasks) is ephemeral**: it disappears on redeploys and is not shared
between serverless instances. Staff accounts survive because they are
re-seeded from `CRM_SEED_PASSWORD` on demand. For real production use of the
CRM, either host on a server/container with a persistent disk (set
`CRM_DATA_DIR` to a mounted volume) or replace `src/lib/crm/db.ts` with a
database — all storage access goes through that one module.

## Notes & limitations

- **Rate limiting** for the forms is in-memory per server instance
  (`src/lib/rate-limit.ts`). On Vercel's serverless platform each instance has
  its own counter, so limits are approximate. For strict global limits, swap in
  Upstash Redis (`@upstash/ratelimit`) — the limiter is isolated behind one
  function to make that a small change.
- **No CMS**: blog posts, testimonials, and team data live in
  `src/lib/content.ts`. Editing them requires a commit + redeploy (a few
  minutes). A headless CMS can be added later without restructuring.
- All pages are statically prerendered; form handling uses Server Actions, so
  no separate API routes or servers are needed.
