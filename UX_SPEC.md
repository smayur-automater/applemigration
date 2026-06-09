# UX Specification — Apple Migration Service Website

---

## 1. SITEMAP

```
/ (Home)
├── /services
│   ├── /services/mac-to-mac           (Mac-to-Mac Migration)
│   ├── /services/pc-to-mac            (PC-to-Mac Migration)
│   ├── /services/iphone-ipad          (iPhone / iPad Data Transfer)
│   └── /services/business             (Business & Fleet Migration)
├── /how-it-works
├── /pricing
├── /about
├── /faq
├── /blog                              (optional Phase 2)
│   └── /blog/[slug]
├── /contact
└── /booking                           (multi-step booking flow)
    ├── /booking/step-1-service
    ├── /booking/step-2-details
    ├── /booking/step-3-schedule
    └── /booking/step-4-confirm
```

**Global elements present on every page:**
- Sticky top navigation bar
- Footer (links, social, legal, contact)

---

## 2. PAGE-BY-PAGE WIREFRAME DESCRIPTIONS

### 2.1 Home (`/`)

**Hero Section**
- Full-width, light background (white → very light grey gradient)
- Headline (H1): "Seamless Apple Migrations. Zero Stress."
- Sub-headline: "We transfer everything — files, apps, settings, and passwords — from your old device to your new Apple device. In-person or remote."
- Primary CTA button: "Book a Migration" → `/booking`
- Secondary CTA link: "See How It Works" → `/how-it-works`
- Hero visual: clean illustration or photo of a technician handing a MacBook to a smiling customer (right side, desktop only; hidden on mobile below fold)
- Trust bar beneath hero: 5 logos/badges in a row — "Apple Authorised Reseller Partner", "5★ Google Reviews", "Insured & Bonded", "Same-Day Service Available", "10,000+ Migrations Completed"

**Services Strip**
- Section title (H2): "What We Migrate"
- 4 icon cards, horizontal scroll on mobile:
  1. Mac → Mac
  2. PC → Mac
  3. iPhone / iPad
  4. Business Fleet
- Each card: icon, 1-line label, 1-sentence description, "Learn More" text link

**How It Works Preview**
- Section title (H2): "Three Steps to a New Device"
- Numbered steps (1–3), horizontal on desktop / stacked on mobile:
  1. Book Online — "Choose your service and pick a time."
  2. We Migrate — "Our technician transfers everything safely."
  3. You're Done — "Enjoy your new device, nothing missing."
- CTA: "Get Started" → `/booking`

**Social Proof**
- Section title (H2): "What Our Customers Say"
- 3-column testimonial cards (carousel on mobile)
- Each card: star rating (5/5), quote (2–3 sentences), customer first name + city
- Below cards: aggregate stat — "4.9 / 5 from 430+ verified reviews"

**Pricing Teaser**
- Light grey background band
- Headline: "Transparent, Flat-Rate Pricing"
- 3 plan cards (Personal / Professional / Business)
- Each: plan name, price-from figure, bullet list of 4 inclusions, CTA button
- Link: "See full pricing" → `/pricing`

**FAQ Teaser**
- 4 most common questions, accordion-style
- Link: "View all FAQs" → `/faq`

**Final CTA Band**
- Dark background (navy)
- Headline: "Ready to make the switch?"
- Sub-copy: "Book online in under 2 minutes."
- Button: "Book Now" → `/booking`

---

### 2.2 Services — Hub (`/services`)

- H1: "Our Migration Services"
- Intro paragraph (2 sentences)
- 4 large service cards (2×2 grid on desktop, 1 column on mobile)
  - Each: illustration/icon, H2 name, 3-sentence description, "Learn More" CTA

---

### 2.3 Service Detail Pages (shared template)

Layout (desktop: sidebar left, content right; mobile: stacked):

**Hero band**
- Breadcrumb: Home > Services > [Service Name]
- H1: service name
- 1-paragraph intro
- CTA button: "Book This Service"

**What's Included** (checklist with tick icons)

**What We Transfer** (2-column grid of items)

**Before You Come In** (prep checklist)

**Pricing** (inline mini pricing card for that service)

**FAQ** (3–4 service-specific questions, accordion)

**Related Services** strip

---

### 2.4 How It Works (`/how-it-works`)

- H1: "How Apple Migration Works"
- Detailed 5-step timeline (vertical on mobile, horizontal zigzag on desktop):
  1. Book Online
  2. Confirm & Prep
  3. Drop Off or Remote Connect
  4. Migration Performed
  5. Review & Pick Up
- Each step: icon, step number, title, 2–3 sentence description
- Inline CTA after step 3: "Have questions? Read our FAQ"
- Bottom CTA band: "Start Your Migration" → `/booking`

---

### 2.5 Pricing (`/pricing`)

- H1: "Simple, Flat-Rate Pricing"
- Sub-head: "No hidden fees. No surprises."
- Toggle (optional): Personal / Business
- 3 plan cards (highlighted "Most Popular" on Professional):

  | | Personal | Professional | Business |
  |---|---|---|---|
  | Price | from $99 | from $149 | Custom |
  | Devices | 1 | 1 + backup | Fleet |
  | On-site | — | ✓ | ✓ |
  | Priority | — | — | ✓ |

- "What's included in every plan" section (shared features list)
- FAQ strip (pricing-specific questions)
- CTA: "Book Now" / "Get a Quote"

---

### 2.6 About (`/about`)

- H1: "About Us"
- Mission paragraph
- Team grid (photo, name, title, 1-line bio)
- Stats band: Years in business / Migrations completed / Cities served / Rating
- Certifications & partners logos
- CTA: "Work with us" → `/contact`

---

### 2.7 FAQ (`/faq`)

- H1: "Frequently Asked Questions"
- Search input (filter FAQs client-side)
- Categorised accordions: General / Pricing / Data & Privacy / Technical
- Each item: question (bold), answer (paragraph)
- CTA band at bottom

---

### 2.8 Contact (`/contact`)

- H1: "Get in Touch"
- 2-column layout (desktop): form left, info right
- Form fields: Name*, Email*, Phone, Service (select), Message*, Submit button
- Info panel: address, phone, email, business hours, embedded map
- Privacy note beneath form: "We never share your data."

---

### 2.9 Booking Flow (`/booking/*`)

4-step linear wizard with progress indicator at top (steps 1–4).

**Step 1 — Choose Service**
- Radio cards for each service type (icon + label)
- "Next" button (disabled until selection)

**Step 2 — Your Details**
- Fields: Full Name*, Email*, Phone*, Device model (text)*, Notes (optional)
- Back / Next buttons

**Step 3 — Schedule**
- Calendar date picker
- Time slot selector (AM / PM blocks)
- Option: In-person or Remote
- Back / Next buttons

**Step 4 — Confirm**
- Summary card (service, name, date/time, type)
- Price estimate
- Terms checkbox
- "Confirm Booking" button
- On success: confirmation screen with booking reference, next-steps list, "Add to Calendar" link

---

## 3. DESIGN SYSTEM

### 3.1 Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#0071E3` | Primary actions, links (Apple-inspired blue) |
| `--color-primary-dark` | `#0058B0` | Hover state |
| `--color-accent` | `#34C759` | Success, checkmarks, badges |
| `--color-navy` | `#1D2B3A` | CTA bands, footer background, headings |
| `--color-surface` | `#F5F5F7` | Page backgrounds, card fills |
| `--color-white` | `#FFFFFF` | Card backgrounds, hero |
| `--color-text-primary` | `#1D1D1F` | Body text |
| `--color-text-secondary` | `#6E6E73` | Captions, meta, placeholders |
| `--color-border` | `#D2D2D7` | Input borders, dividers |
| `--color-danger` | `#FF3B30` | Form errors |

### 3.2 Typography

| Token | Font | Size | Weight | Line Height |
|---|---|---|---|---|
| H1 | SF Pro Display / Inter | 48px (desktop) / 32px (mobile) | 700 | 1.1 |
| H2 | SF Pro Display / Inter | 36px / 26px | 700 | 1.2 |
| H3 | Inter | 24px / 20px | 600 | 1.3 |
| Body Large | Inter | 18px | 400 | 1.6 |
| Body | Inter | 16px | 400 | 1.6 |
| Small / Caption | Inter | 13px | 400 | 1.5 |
| Button | Inter | 16px | 600 | 1 |
| Label | Inter | 12px | 500 | 1.4 |

**Web font stack:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### 3.3 Spacing Scale (8px base)

```
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  24px
--space-6:  32px
--space-7:  48px
--space-8:  64px
--space-9:  96px
--space-10: 128px
```

### 3.4 Breakpoints

| Name | Min Width | Layout |
|---|---|---|
| `sm` | 0px | 1 column, 16px gutters |
| `md` | 768px | 2 columns, 24px gutters |
| `lg` | 1024px | 3–4 columns, 32px gutters |
| `xl` | 1280px | Max content width 1200px, centred |

### 3.5 Component Library

**Button**
- Primary: `--color-primary` fill, white text, 8px radius, 48px height, 16px horizontal padding
- Secondary: white fill, `--color-primary` border + text
- Destructive: `--color-danger`
- Disabled: 40% opacity, not-allowed cursor
- States: default / hover (darken 10%) / focus (2px `--color-primary` outline, 2px offset) / active (scale 0.98)

**Card**
- Background: white
- Border: 1px `--color-border`
- Border-radius: 16px
- Box-shadow: `0 2px 12px rgba(0,0,0,0.06)`
- Hover: shadow increases to `0 8px 32px rgba(0,0,0,0.10)`

**Input / Textarea**
- Border: 1px `--color-border`, 8px radius
- Height: 48px (input), auto (textarea, min 120px)
- Focus: border becomes `--color-primary`, no box-shadow ring
- Error state: border `--color-danger`, error message beneath in `--color-danger`

**Navigation Bar**
- Height: 64px desktop / 56px mobile
- Background: white, `box-shadow: 0 1px 0 rgba(0,0,0,0.08)` on scroll
- Logo left, nav links centre (desktop), hamburger right (mobile)
- Active link: `--color-primary` underline

**Badge / Tag**
- Small pill, 4px radius, 12px text
- Variants: info (blue), success (green), warning (amber)

**Accordion**
- Border-bottom separator only
- Chevron icon rotates 180° when open
- Smooth height transition (300ms ease)

**Progress Stepper** (booking flow)
- Horizontal bar, 4 numbered circles connected by lines
- Completed: filled `--color-primary` circle with checkmark
- Current: outlined `--color-primary` circle
- Upcoming: grey circle

**Toast / Alert**
- Fixed bottom-right, 320px wide, 48px min-height
- Variants: success (green left border), error (red), info (blue)
- Auto-dismiss after 5 seconds, manual close X

---

## 4. COPY DECK

### 4.1 Global Navigation

```
Logo: [AppleMigration logo mark] + "AppleMigration"
Nav links: Services | How It Works | Pricing | About | FAQ
CTA button: Book Now
Mobile menu: same links stacked + Book Now full-width button
```

### 4.2 Home Page

**Hero**
```
H1: Seamless Apple Migrations. Zero Stress.
Sub: We transfer everything — files, apps, settings, and passwords —
     from your old device to your shiny new Apple device.
     In-person or remote. Same-day slots available.
CTA1: Book a Migration
CTA2: See How It Works
```

**Trust Bar**
```
✓ Apple Ecosystem Specialists
★ 4.9 / 5 Google Rating
🔒 Insured & Bonded
⚡ Same-Day Available
✓ 10,000+ Migrations Done
```

**Services Strip**
```
Section label: WHAT WE MIGRATE
H2: Every Apple Migration, Covered

Card 1 — Mac to Mac
"Upgrading your MacBook or iMac? We move every file, app, setting,
and account — so your new Mac feels like home from day one."

Card 2 — PC to Mac
"Switching from Windows? We migrate your documents, photos, emails,
and contacts, and help you get comfortable in macOS."

Card 3 — iPhone & iPad
"New iPhone day? We transfer contacts, messages, photos, and app data
in minutes — no iCloud plan required."

Card 4 — Business Fleet
"Rolling out new Macs across your team? We handle bulk migrations,
MDM setup, and on-site deployment."
```

**How It Works**
```
H2: Three Steps to a New Device

1. Book Online
   "Choose your service, pick a convenient time, and tell us about
   your devices. Takes less than 2 minutes."

2. We Migrate
   "Our certified technician transfers everything safely and
   completely — usually in 1–3 hours."

3. You're Done
   "Collect your new device, fully set up, everything where you
   left it. No missing files. No surprises."

CTA: Get Started →
```

**Testimonials**
```
H2: What Our Customers Say

Review 1 ★★★★★
"I was terrified of losing 10 years of photos switching to a new Mac.
The team transferred absolutely everything in two hours. Outstanding."
— Sarah M., Sydney

Review 2 ★★★★★
"Switched from a Dell laptop to a MacBook Pro. They even migrated my
Outlook emails and calendar. Couldn't believe how smooth it was."
— James T., Melbourne

Review 3 ★★★★★
"Used them for our 12-person office Mac refresh. Professional, fast,
and zero downtime. Already booked them for next quarter."
— Rachel K., Brisbane

Aggregate: Rated 4.9 / 5 from 430+ verified Google reviews
```

**Pricing Teaser**
```
H2: Transparent, Flat-Rate Pricing
Sub: No hidden fees. What you see is what you pay.

Personal — from $99
✓ 1 device
✓ Up to 500 GB transferred
✓ All files, apps & settings
✓ 30-day support guarantee

Professional — from $149  [MOST POPULAR]
✓ 1 device + external backup
✓ Unlimited data transfer
✓ On-site option available
✓ Priority booking

Business — Custom Quote
✓ Multiple devices / fleet
✓ MDM & profile setup
✓ On-site deployment
✓ Dedicated account manager

[Book Now]  [See Full Pricing →]
```

**FAQ Teaser**
```
Q: How long does a migration take?
A: Most personal migrations take 1–3 hours depending on data size.
   We'll give you an estimate at booking.

Q: Do I need to be there the whole time?
A: No — just drop off your devices and we'll call when it's ready.

Q: What if something goes wrong?
A: We back up before we start. If anything is missing, we fix it free.
   Covered by our 30-day guarantee.

Q: Can you migrate remotely?
A: Yes. We offer secure screen-share remote migrations for Mac-to-Mac
   and most iPhone transfers.

[View all FAQs →]
```

**Final CTA Band**
```
Headline: Ready to make the switch?
Sub: Book online in under 2 minutes. Same-day slots available.
Button: Book Now →
```

### 4.3 Booking Flow Microcopy

```
Step 1 header: "What would you like to migrate?"
Step 1 helper: "Select the service that best fits your needs.
                Not sure? We'll confirm the details after you book."

Step 2 header: "Tell us about yourself"
Required field asterisk note: "* Required fields"
Email helper: "We'll send your confirmation here."
Phone helper: "So we can reach you if anything changes."

Step 3 header: "Pick a date and time"
Remote toggle label: "I'd prefer a remote session"
Remote toggle helper: "Works for Mac-to-Mac and most iPhone transfers."
No slots available: "No slots today — try another date."

Step 4 header: "Confirm your booking"
Terms label: "I agree to the Terms of Service and Privacy Policy."
Submit button: "Confirm Booking"
Success heading: "You're booked! 🎉"
Success sub: "Check your email for confirmation and next steps."
Booking ref label: "Booking reference:"
```

### 4.4 Form Error Messages

```
Required empty: "This field is required."
Invalid email: "Please enter a valid email address."
Invalid phone: "Please enter a valid phone number."
No date selected: "Please select a date."
No time selected: "Please select a time slot."
Terms not accepted: "Please accept the terms to continue."
Generic server error: "Something went wrong. Please try again or call us."
```

### 4.5 Footer

```
Column 1 — Brand
[Logo]
Your local Apple migration specialists.
Insured, certified, and trusted by 10,000+ customers.
[Social icons: Facebook | Instagram | LinkedIn | Google]

Column 2 — Services
Mac to Mac Migration
PC to Mac Migration
iPhone & iPad Transfer
Business Fleet Migration

Column 3 — Company
About Us
How It Works
Pricing
FAQ
Blog
Contact

Column 4 — Contact
📍 123 Tech Street, Sydney NSW 2000
📞 1800 APP MIGRATE
✉ hello@applemigration.com.au
Mon–Fri 8am–6pm, Sat 9am–4pm

Legal row:
© 2026 AppleMigration. All rights reserved.
Privacy Policy | Terms of Service | Sitemap
"Apple, Mac, iPhone and iPad are trademarks of Apple Inc."
```

---

## 5. USER FLOW DIAGRAM

```
[Landing on /]
      │
      ▼
[Hero — reads headline & sub-copy]
      │
      ├─► [Trust bar scanned]
      │
      ▼
[Scrolls to Services strip]
      │
      ├─► "Learn More" on a service card ──► [/services/[service]] ──┐
      │                                                               │
      ▼                                                               │
[How It Works preview]                                               │
      │                                                               │
      ▼                                                               │
[Testimonials — social proof builds trust]                           │
      │                                                               │
      ▼                                                               │
[Pricing teaser — anchors value]                                     │
      │                                                               │
      ├─► "See full pricing" ──► [/pricing]                          │
      │        │                                                      │
      │        └─► CTA on pricing ──────────────────────────────────►│
      │                                                               │
      ▼                                                               │
[Final CTA band / "Book Now"]  ◄───────────────────────────────────►│
      │                                                               │
      ▼                                                               ▼
[/booking — Step 1: Select service] ◄──────────────────────────────┘
      │
      ▼
[Step 2: Enter details]
      │
      ▼
[Step 3: Choose date / time / in-person or remote]
      │
      ▼
[Step 4: Review & confirm]
      │
      ▼
[Confirmation screen — email sent]
      │
      ▼
[Customer awaits confirmation email]
      │
      ▼
[Day of migration: arrives / remote session starts]
      │
      ▼
[Migration complete — happy customer]
```

**Secondary paths:**
- `/faq` ← linked from nav, pricing page, and service pages (handles objections)
- `/contact` ← for users who prefer not to self-book or have a custom requirement
- `/about` ← trust-seekers who want to vet the company before booking

---

## 6. ACCESSIBILITY REQUIREMENTS (WCAG 2.1 AA)

1. **Colour contrast** — all text/background combos must meet 4.5:1 (normal text) and 3:1 (large text). Primary blue `#0071E3` on white passes at 4.6:1.
2. **Focus indicators** — all interactive elements must have a visible 2px focus ring using `--color-primary`. Never `outline: none` without a custom equivalent.
3. **Keyboard navigation** — full tab order across all interactive elements; booking wizard navigable without mouse.
4. **Screen readers** — semantic HTML (`<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`, `<article>`). All images have descriptive `alt` text; decorative images have `alt=""`.
5. **Form labels** — every input has an associated `<label>` (not placeholder-only). Error messages linked via `aria-describedby`.
6. **Accordion** — uses `<button>` with `aria-expanded` toggled; answer panel has matching `aria-controls` / `id`.
7. **Booking stepper** — current step indicated with `aria-current="step"`.
8. **Motion** — respect `prefers-reduced-motion`; all transitions wrapped in `@media (prefers-reduced-motion: no-preference)`.
9. **Touch targets** — minimum 44×44px on all interactive elements.
10. **Page titles** — unique, descriptive `<title>` on every route.
11. **Skip link** — "Skip to main content" visible on focus at top of every page.
12. **Language** — `lang="en"` on `<html>`.

---

## 7. RESPONSIVE BEHAVIOUR SUMMARY

| Element | Mobile (< 768px) | Tablet (768–1023px) | Desktop (≥ 1024px) |
|---|---|---|---|
| Nav | Hamburger menu, full-screen overlay | Hamburger or condensed | Full horizontal links + CTA |
| Hero image | Hidden | Right-aligned, 40% width | Right-aligned, 50% width |
| Services cards | 1 column, horizontal scroll | 2 columns | 4 columns |
| Testimonials | Single card, swipeable carousel | 2 columns | 3 columns |
| Pricing cards | Stacked | 2 columns | 3 columns |
| Footer | Stacked, 1 column | 2 columns | 4 columns |
| Booking wizard | Full-width steps | Centred 560px | Centred 640px |

---

*End of UX Specification — Hand off to Engineering Agent.*
