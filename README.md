# Apple Education & Immigration — Website

Marketing and lead-generation website for Apple Education & Immigration, a
MARA-registered Australian migration agency.

Built with **Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript**.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build (Turbopack)
npm start         # serve the production build
npx eslint src    # lint
```

## Project structure

```
src/
  app/                  Routes (App Router)
    contact/actions.ts  Contact form Server Action (zod + rate limit + email)
    book/actions.ts     Booking form Server Action
    eligibility-check/  Quiz page + lead-capture action
    blog/[slug]/        Statically generated articles
    sitemap.ts          /sitemap.xml
    robots.ts           /robots.txt
  components/
    ui/                 Button, Section, Container, Accordion, icons, …
    layout/             Header, Footer, PageHero, Breadcrumb, CTABanner,
                        MaraDisclaimer
    cards/              ServiceCard, TestimonialCard, TeamMemberCard, …
    forms/              ContactForm, BookingForm, shared field components
    quiz/               EligibilityQuiz (useReducer state machine)
  lib/                  site config, navigation, content data, services data,
                        email (nodemailer), rate limiter, countries
```

## Configuration

Set these environment variables (all optional in development — without SMTP
config, form submissions are logged to the server console instead of emailed):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (default `https://applemigration.com.au`) |
| `SMTP_HOST` / `SMTP_PORT` | SMTP server for form notifications |
| `SMTP_USER` / `SMTP_PASS` | SMTP credentials |
| `CONTACT_INBOX` | Destination inbox for enquiries |

## Compliance notes

- The MARA registration number (MARN) renders in the footer of **every** page
  via `src/components/layout/Footer.tsx`, sourced from `src/lib/site.ts`.
- Replace the placeholder `marn: "0000000"` in `src/lib/site.ts` with the real
  registration number before launch.
- Migration service pages additionally show the `MaraDisclaimer` component in
  the hero, sidebar, and above the footer.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the Vercel deployment guide.
