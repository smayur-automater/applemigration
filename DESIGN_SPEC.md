# Apple Education & Immigration — Component Design Specification
**Version:** 1.0  
**Date:** 2026-06-09  
**Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript  

---

## Table of Contents

1. [Design System Tokens](#1-design-system-tokens)
2. [Component Inventory](#2-component-inventory)
3. [Page-by-Page Layout Specs](#3-page-by-page-layout-specs)
4. [Navigation Architecture](#4-navigation-architecture)
5. [Form Design Specs](#5-form-design-specs)
6. [Micro-interaction Notes](#6-micro-interaction-notes)

---

## 1. Design System Tokens

Place the following in `src/app/globals.css` inside `:root {}`. Tailwind v4 reads these as CSS custom properties via `@theme`.

```css
@theme {
  /* ─── Colour ──────────────────────────────────────────── */
  --color-navy:        #1A2E4A;   /* Primary – Deep Navy      */
  --color-gold:        #D4A843;   /* Accent  – Warm Gold      */
  --color-sky:         #4A90C4;   /* Secondary – Sky Blue     */
  --color-off-white:   #F7F5F0;   /* Page background          */
  --color-charcoal:    #2D2D2D;   /* Body text                */
  --color-white:       #FFFFFF;
  --color-navy-light:  #243D5F;   /* Hover state on navy      */
  --color-gold-light:  #E0BC6A;   /* Hover state on gold      */
  --color-gold-dark:   #B8922E;   /* Active/pressed gold      */
  --color-sky-light:   #6BACD4;   /* Hover state on sky       */
  --color-error:       #C0392B;
  --color-success:     #27AE60;
  --color-warning:     #E67E22;
  --color-border:      #D9D4CC;   /* Subtle dividers          */
  --color-surface:     #EFEDE8;   /* Card/panel backgrounds   */

  /* ─── Typography ─────────────────────────────────────── */
  --font-display:      'Playfair Display', Georgia, serif;
  --font-body:         'Inter', system-ui, sans-serif;

  --text-xs:    0.75rem;   /* 12px */
  --text-sm:    0.875rem;  /* 14px */
  --text-base:  1rem;      /* 16px */
  --text-lg:    1.125rem;  /* 18px */
  --text-xl:    1.25rem;   /* 20px */
  --text-2xl:   1.5rem;    /* 24px */
  --text-3xl:   1.875rem;  /* 30px */
  --text-4xl:   2.25rem;   /* 36px */
  --text-5xl:   3rem;      /* 48px */
  --text-6xl:   3.75rem;   /* 60px */

  --leading-tight:  1.25;
  --leading-snug:   1.375;
  --leading-normal: 1.5;
  --leading-relaxed:1.625;

  /* ─── Spacing Scale (4px base) ───────────────────────── */
  --space-1:   0.25rem;   /*  4px */
  --space-2:   0.5rem;    /*  8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-5:   1.25rem;   /* 20px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-10:  2.5rem;    /* 40px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-20:  5rem;      /* 80px */
  --space-24:  6rem;      /* 96px */
  --space-32:  8rem;      /* 128px */

  /* ─── Border Radius ──────────────────────────────────── */
  --radius-sm:   0.25rem;  /*  4px – tags, badges        */
  --radius-md:   0.5rem;   /*  8px – inputs, small cards */
  --radius-lg:   0.75rem;  /* 12px – cards               */
  --radius-xl:   1rem;     /* 16px – large cards, modals */
  --radius-2xl:  1.5rem;   /* 24px – hero panels         */
  --radius-full: 9999px;   /* pill buttons               */

  /* ─── Shadows ────────────────────────────────────────── */
  --shadow-xs:  0 1px 2px 0 rgb(26 46 74 / 0.06);
  --shadow-sm:  0 1px 3px 0 rgb(26 46 74 / 0.10), 0 1px 2px -1px rgb(26 46 74 / 0.10);
  --shadow-md:  0 4px 6px -1px rgb(26 46 74 / 0.10), 0 2px 4px -2px rgb(26 46 74 / 0.10);
  --shadow-lg:  0 10px 15px -3px rgb(26 46 74 / 0.10), 0 4px 6px -4px rgb(26 46 74 / 0.10);
  --shadow-xl:  0 20px 25px -5px rgb(26 46 74 / 0.10), 0 8px 10px -6px rgb(26 46 74 / 0.10);
  --shadow-2xl: 0 25px 50px -12px rgb(26 46 74 / 0.25);
  --shadow-gold: 0 0 0 3px rgb(212 168 67 / 0.35);  /* focus ring */

  /* ─── Z-Index Scale ──────────────────────────────────── */
  --z-below:    -1;
  --z-base:      0;
  --z-raised:   10;   /* cards on hover             */
  --z-dropdown: 100;  /* nav dropdowns              */
  --z-sticky:   200;  /* sticky header              */
  --z-overlay:  300;  /* modal backdrops            */
  --z-modal:    400;  /* modal dialogs              */
  --z-toast:    500;  /* toast notifications        */

  /* ─── Transitions ────────────────────────────────────── */
  --ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
  --duration-fast:   150ms;
  --duration-base:   250ms;
  --duration-slow:   400ms;

  /* ─── Layout ─────────────────────────────────────────── */
  --max-w-content: 1200px;
  --max-w-prose:    720px;
  --max-w-narrow:   560px;
  --header-h:        72px;  /* desktop sticky header height */
  --header-h-mobile: 60px;
}
```

### Tailwind v4 Usage Notes
- Reference tokens in Tailwind classes with `text-[var(--color-navy)]` or configure `@theme` mapping.
- `scroll-padding-top` on `<html>` should be `var(--header-h)` so anchor links clear the sticky header.

---

## 2. Component Inventory

### 2.1 Atoms

#### `Button`
| Prop | Type | Values |
|---|---|---|
| `variant` | string | `primary` \| `secondary` \| `ghost` \| `danger` |
| `size` | string | `sm` \| `md` \| `lg` |
| `loading` | boolean | shows spinner, disables interaction |
| `disabled` | boolean | |
| `href` | string | renders as `<a>` via Next.js `<Link>` when present |
| `icon` | ReactNode | left-side icon slot |
| `iconRight` | ReactNode | right-side icon slot |

**Styles:**
- `primary`: bg `--color-navy`, text white, hover bg `--color-navy-light`, active scale 0.98, border-radius `--radius-full`
- `secondary`: border 2px solid `--color-gold`, text `--color-navy`, hover bg `--color-gold`, hover text white
- `ghost`: text `--color-navy`, hover bg `--color-surface`

**Sizes:**
- `sm`: height 36px, px 16px, text-sm
- `md`: height 44px, px 24px, text-base (default)
- `lg`: height 52px, px 32px, text-lg

**Accessibility:** `role="button"` when rendered as div. Focus ring: `outline: 2px solid var(--color-gold); outline-offset: 2px`. Keyboard: Enter/Space activate. `aria-disabled` when disabled. `aria-busy` when loading.

**Responsive:** Full-width on mobile when `fullWidthMobile` prop is true.

---

#### `Badge`
| Prop | Type | Values |
|---|---|---|
| `variant` | string | `default` \| `success` \| `warning` \| `info` |
| `label` | string | display text |

Styles: pill shape (`--radius-full`), font-size `--text-xs`, font-weight 600, uppercase letter-spacing 0.05em.

---

#### `Icon`
- SVG sprite or Lucide React icons.
- Always pair with `aria-hidden="true"` when decorative.
- When meaningful, add `aria-label` and `role="img"`.
- Standard sizes: 16px, 20px, 24px.

---

#### `Tag`
Inline content label. Used on blog posts and service cards.
- Props: `label`, `color` (maps to brand palette)
- `--radius-sm`, px-8 py-2, text-xs, bg `--color-surface`

---

### 2.2 Typography Components

#### `Heading`
| Prop | Type | Notes |
|---|---|---|
| `as` | `h1`–`h6` | semantic element |
| `visual` | `display` \| `h1`–`h4` | independent visual size |
| `align` | `left`\|`center`\|`right` | |
| `color` | token key | defaults to `--color-navy` |

- `display`: Playfair Display, 48–60px, line-height 1.2, letter-spacing -0.02em
- `h1`: Playfair Display, 36–48px
- `h2`: Playfair Display, 28–36px
- `h3`: Inter SemiBold, 22–28px
- `h4`: Inter SemiBold, 18–22px
- `h5/h6`: Inter Medium, 14–16px

Fluid sizing: use `clamp()` for h1–h3. Example: `clamp(2rem, 4vw, 3rem)`.

---

#### `BodyText`
Prose wrapper. Sets `font-family: var(--font-body)`, `color: var(--color-charcoal)`, `line-height: var(--leading-relaxed)`. Max-width `--max-w-prose` when inside `.prose` layout.

---

#### `Kicker`
Small uppercase label above a heading. Text `--color-gold`, font Inter SemiBold, text-xs, letter-spacing 0.12em. Used to introduce sections ("Student Visas", "Our Story").

---

### 2.3 Layout Components

#### `Container`
```
max-width: var(--max-w-content)
padding-inline: clamp(1rem, 4vw, 2rem)
margin-inline: auto
```
| Prop | Values |
|---|---|
| `size` | `default` \| `prose` \| `narrow` \| `full` |

---

#### `Section`
Semantic `<section>` with vertical padding.
- `size`: `sm` (py-12) \| `md` (py-16) \| `lg` (py-24) \| `xl` (py-32)
- `bg`: `default` (off-white) \| `navy` \| `surface` \| `white`
- Always contains `<Container>` as first child.

---

#### `Grid`
Responsive CSS Grid wrapper.
| Prop | Values |
|---|---|
| `cols` | 1–4 or `{ sm, md, lg }` object |
| `gap` | spacing token key |

---

#### `Stack`
Flex column with gap.
| Prop | Values |
|---|---|
| `gap` | spacing token |
| `align` | flex-start \| center \| stretch |

---

#### `Divider`
`<hr>` styled as 1px `--color-border`. Optional `variant="gold"` for a 2px gold accent divider.

---

### 2.4 Navigation Components

#### `Header`
See Section 4 for full spec. Props: none (reads route from Next.js `usePathname`).

#### `NavLink`
`<Link>` with active state. `aria-current="page"` on active route. Underline grows from left on hover (pseudo-element, `transform: scaleX()`).

#### `DropdownMenu`
Desktop service sub-navigation.
- `trigger`: NavLink with chevron icon
- `panel`: absolute positioned card, `--shadow-lg`, `--radius-lg`, bg white
- Opens on hover (200ms delay) and focus; closes on Escape or click outside
- `role="menu"`, items `role="menuitem"`, `tabIndex={0}` on items
- Arrow key navigation (up/down) between items

#### `MobileMenu`
Full-screen overlay drawer from right.
- `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation menu"`
- Focus trap while open
- Close on Escape, close on overlay click
- Accordion sub-menus for Services

#### `Footer`
See Section 4 for full spec.

---

### 2.5 Card Components

#### `ServiceCard`
Used on Home services section and `/services` overview.
| Prop | Type |
|---|---|
| `icon` | ReactNode |
| `title` | string |
| `description` | string (1–2 sentences) |
| `href` | string |
| `tag` | string (optional) |

Layout: vertical card, icon top, h3 title, body text, arrow link bottom.  
Hover: `--shadow-lg`, translate-y -4px, gold border-bottom 3px.  
`--radius-lg`, bg white, p-8.  
`role="article"`, `aria-labelledby` pointing to card title id.

#### `TeamMemberCard`
| Prop | Type |
|---|---|
| `name` | string |
| `role` | string |
| `credentials` | string (e.g. "MARN 0123456") |
| `bio` | string |
| `photo` | string (image URL) |
| `linkedIn` | string (optional) |

Layout: photo top (aspect-ratio 1:1, `object-fit: cover`, `--radius-xl`), name h3, role text-sm gold, credentials badge, bio, LinkedIn link.

#### `TestimonialCard`
| Prop | Type |
|---|---|
| `quote` | string |
| `name` | string |
| `visa` | string (e.g. "Student Visa 500") |
| `country` | string |
| `rating` | number (1–5) |
| `photo` | string (optional) |

Layout: star rating top, blockquote, author row with photo.  
`role="figure"`, `aria-label="Testimonial from [name]"`.

#### `BlogCard`
| Prop | Type |
|---|---|
| `title` | string |
| `excerpt` | string |
| `date` | string |
| `slug` | string |
| `category` | string |
| `readTime` | string |
| `coverImage` | string |

Entire card is a link. Keyboard: Enter activates. `aria-label` includes title.

#### `StatCard`
Used in hero and About sections.
| Prop | Type |
|---|---|
| `value` | string (e.g. "1,200+") |
| `label` | string |
| `icon` | ReactNode (optional) |

Display: value in Playfair Display, xl–2xl, gold; label in Inter, sm.

---

### 2.6 Form Components

See Section 5 for full field-level specs.

#### `FormField`
Wrapper providing label, input/select/textarea, helper text, and error message.
| Prop | Type |
|---|---|
| `label` | string |
| `required` | boolean |
| `error` | string \| undefined |
| `hint` | string (optional helper text) |
| `id` | string |

Structure:
```html
<div role="group">
  <label for="{id}">{label} <span aria-hidden="true">*</span></label>
  <input id="{id}" aria-required="true" aria-describedby="{id}-hint {id}-error" />
  <p id="{id}-hint">{hint}</p>
  <p id="{id}-error" role="alert" aria-live="polite">{error}</p>
</div>
```

#### `Input`
- States: default, focus, error, disabled, filled
- height 44px, border 1px `--color-border`, `--radius-md`
- Focus: border `--color-gold`, box-shadow `--shadow-gold`
- Error: border `--color-error`, bg tint `rgb(192 57 43 / 0.05)`

#### `Select`
Custom select using native `<select>` with styled wrapper. Chevron icon right. Same height and focus treatment as Input.

#### `Textarea`
min-height 120px, resize vertical only. Same border/focus treatment.

#### `Checkbox`
Custom styled checkbox. 18px, border 2px navy, checked bg navy with white tick.  
`role="checkbox"`, keyboard: Space to toggle. Focus ring gold.

#### `RadioGroup`
Stacked or horizontal radio options.  
`role="radiogroup"`, `aria-labelledby` pointing to group heading.  
Each option: `role="radio"`, keyboard: arrow keys navigate group.

#### `ProgressBar`
Quiz step indicator.
| Prop | Type |
|---|---|
| `current` | number |
| `total` | number |
| `label` | string (e.g. "Step 2 of 6") |

`role="progressbar"`, `aria-valuenow={current}`, `aria-valuemin={1}`, `aria-valuemax={total}`, `aria-label`.

---

### 2.7 Feedback Components

#### `Toast`
Dismissible notification. Slides in from bottom-right.  
Variants: `success` \| `error` \| `warning` \| `info`.  
`role="alert"`, `aria-live="assertive"` for error/success, `aria-live="polite"` for info.  
Auto-dismiss after 5s. Manual dismiss button `aria-label="Dismiss notification"`.

#### `Alert`
Inline contextual message. Same variants as Toast.  
`role="alert"`. Static — does not dismiss.

#### `Spinner`
Animated SVG.  
`role="status"`, `aria-label="Loading"`. 20px or 32px sizes.

#### `SkeletonLoader`
Placeholder shimmer. Matches the shape of the content it replaces.  
`aria-hidden="true"`, sibling `<p className="sr-only">Loading content…</p>`.

---

### 2.8 Content Components

#### `Accordion`
FAQ and expandable content.
| Prop | Type |
|---|---|
| `items` | `{ question: string; answer: ReactNode }[]` |
| `allowMultiple` | boolean |

`role="list"` on container. Each item: `<button aria-expanded aria-controls>` heading, `role="region"` panel.  
Chevron rotates 180° on open (CSS transition).

#### `StepIndicator`
Horizontal step tracker for quiz.
Items: number circle + label. Active: gold fill, Past: navy fill with tick, Future: grey outline.

#### `HeroSection`
Full-bleed section, not a generic component — specific to page type.  
Parameterised variant: `home` \| `interior` \| `service`.

#### `PageHero`
Interior page hero (non-home). Navy bg, white text, max 600px wide content, breadcrumb nav below.

#### `Breadcrumb`
`<nav aria-label="Breadcrumb">`, `<ol>` list, `aria-current="page"` on last item. Items separated by `/` character.

#### `VideoEmbed`
Lazy-loaded YouTube/Vimeo embed.  
Facade pattern: show thumbnail with play button, load iframe on click.  
`title` attribute on iframe for accessibility.

#### `ImageWithCaption`
`<figure>` + `<figcaption>`. Always includes `alt` text on `<img>`.

#### `CTABanner`
Full-width band with heading, sub-copy, and 1–2 buttons. Navy or gold background variants.

#### `MARAdisclaimer`
Fixed-content component. Renders the MARA registration number and mandatory disclaimer text.  
Used in Footer and on all migration service pages.  
`aria-label="MARA registration and legal disclaimer"`.

---

## 3. Page-by-Page Layout Specs

### 3.1 Home Page `/`

#### SEO Metadata
- `<title>`: Apple Education & Immigration — Australian Visa & Education Experts
- `<meta name="description">`: ~155 chars covering key services
- OG image: hero composite

---

#### Section 1 — Hero
**Type:** Full-viewport (`min-height: 100svh`), bg `--color-navy`  
**Layout:** Two-column on desktop (content left 55%, image right 45%), single column stacked on mobile (content above image).

**Content (left column):**
- Kicker: "Registered Migration Agent · MARN 0000000" (gold, top)
- H1 (Playfair Display, 52–64px clamp): "Your Australian Future Starts Here"
- Body (18px, off-white, max 520px): 2–3 sentences; plain English; emphasise expertise, not process.
- CTA Row: [Book a Free Consultation] (primary button, lg) + [Check Your Eligibility →] (ghost, white text, lg)
- Stats row (3 StatCards inline): "1,200+ Visas Granted", "15+ Years Experience", "98% Client Satisfaction"

**Content (right column):**
- `<Image>` of a professional consultation scene. `priority` prop = true (LCP candidate).
- Image has `--radius-2xl` on top-left and bottom-right corners only (asymmetric).
- Subtle gold border-left accent bar 4px wide, positioned absolutely at left edge of image.

**Mobile:** Stack vertically. Image height 300px. Stats wrap 2-column grid. CTA buttons stack full-width.

**Accessibility:** H1 must be the first and only H1 on the page. Hero image `alt` = descriptive scene description. Stats use `aria-label` per StatCard.

---

#### Section 2 — Trust Bar
**Type:** Strip, 80px tall, bg white, `--shadow-sm` on bottom  
**Content:** Row of 5 trust logos/accreditations (MARA, PIER, DHA partner, etc.). Grayscale by default, full colour on hover.  
**Layout:** `display: flex; justify-content: space-evenly; align-items: center`  
`role="complementary"`, `aria-label="Accreditations and memberships"`  
Each logo: `<img alt="[Organisation Name]" />` — never empty alt.

---

#### Section 3 — Services Overview
**Type:** `Section` size=lg, bg `--color-off-white`  
**Header:** Kicker "What We Do" + H2 "Expert Guidance Across All Australian Visa Pathways"  
**Layout:** Kicker + H2 + subtitle left-aligned, then 3-column card grid on desktop (md: 2-col, sm: 1-col).

**Cards (ServiceCard):**
1. Student Visas — graduation cap icon
2. Skilled Migration — briefcase icon
3. Partner & Family Visas — heart icon
4. Employer Sponsored — building icon
5. Education Consulting — book icon

Cards are 5 total. On desktop: first row 3 cards, second row 2 cards centred.  
Below grid: centred CTA "Explore All Services →" (secondary button).

---

#### Section 4 — Why Choose Apple
**Type:** `Section` size=lg, bg `--color-navy`, text white  
**Header:** Kicker "Why Us" + H2 "We Know the System — and We Work It for You"

**Layout:** Two-column desktop (text left, image/graphic right)

**Left column — feature list (4 items):**
Each item: gold check icon + H3 (24px, white) + body text (off-white, 16px)
1. MARA Registered Agents — compliance and professional standards
2. Plain-English Advice — no jargon, no surprises
3. End-to-End Service — from assessment to grant
4. 15+ Years Australian Immigration Experience

**Right column:** Photo of team or illustrated graphic. `--radius-xl`.

Below content: single centred CTA [Book a Free Consultation] (primary gold button).

---

#### Section 5 — Eligibility Quiz Teaser
**Type:** `Section` size=md, bg `--color-surface`  
**Layout:** Centred single column, max-width 640px  
**Content:**
- Kicker: "Find Out in 3 Minutes"
- H2: "Which Australian Visa Is Right for You?"
- Body: 1 sentence description of the quiz.
- Single large CTA: [Check Your Eligibility →] (primary, lg, full-width on mobile)
- Below button: text "No account needed · Takes 3 minutes · Free"

---

#### Section 6 — Testimonials
**Type:** `Section` size=lg, bg white  
**Header:** Kicker "Success Stories" + H2 "Real People, Real Outcomes"

**Layout desktop:** 3-column TestimonialCard grid  
**Layout mobile:** Single column scrollable (overflow-x: auto, scroll-snap)  
Each card: quote, star rating, name, visa type, country flag emoji.  
Below: [Read More Success Stories →] (ghost, navy) link to `/success-stories`

`aria-label="Client testimonials"` on section. Carousel region: `aria-roledescription="carousel"` if using scroll-snap with prev/next controls.

---

#### Section 7 — Blog Preview
**Type:** `Section` size=lg, bg `--color-off-white`  
**Header:** H2 "Latest Insights" right-aligned with "View All Articles →" link

**Layout:** 3 BlogCards in a row (md: 2-col, sm: 1-col)  
Cards fetched server-side (RSC fetch from CMS or MDX).  
Below grid: centred [View All →] ghost button only on mobile (desktop link already in header).

---

#### Section 8 — CTA Banner
**Type:** Full-width `CTABanner`, bg `--color-gold`  
**Content:**
- H2 (navy): "Ready to Take the Next Step?"
- Subtext (navy): "Speak with a MARA-registered agent today — no commitment, no jargon."
- Two buttons: [Book a Free Consultation] (primary navy, lg) + [Call Us Now] (ghost navy, lg)

---

### 3.2 Student Visas Page `/services/student-visas`

#### SEO Metadata
- `<title>`: Student Visa Australia (Subclass 500) — Apple Education & Immigration
- Canonical: `https://applemigration.com.au/services/student-visas`

---

#### Section 1 — PageHero
**Bg:** `--color-navy`. Text white.
**Breadcrumb:** Home / Services / Student Visas  
**H1:** "Australian Student Visa (Subclass 500)" — Playfair Display, 44–52px  
**Subtitle:** 2 sentences: who it's for, processing time ballpark.  
**CTA Row:** [Book a Free Consultation] + [Check Your Eligibility]  
**MARA disclaimer strip** immediately below CTAs (small text, gold border-left):  
> "Apple Education & Immigration is a registered migration agency. MARN 0000000. Migration advice on this page is general in nature and does not constitute personal migration advice."

---

#### Section 2 — Overview
**Layout:** Two-column desktop (prose left 60%, sidebar right 40%)

**Left — body content:**
- H2 "What is the Student Visa (Subclass 500)?"
- Body paragraphs (plain English): eligibility criteria, who can apply, duration, work rights, family members.
- H2 "Key Requirements"
- Numbered list: 1. CoE from registered provider, 2. English proficiency, 3. Genuine Temporary Entrant criteria, 4. Health & character checks, 5. Financial capacity.

**Right — Sticky sidebar (top: calc(var(--header-h) + 16px)):**
- Card (white, `--shadow-md`, `--radius-lg`, p-8):
  - H3 "Get Expert Help"
  - Body: 1–2 sentences
  - [Book a Free Consultation] primary full-width
  - [Check Your Eligibility] secondary full-width
  - Divider
  - "📞 Phone" link (tel:)
  - "✉ Email" link (mailto:)
  - MARA registration number (small text, grey)

---

#### Section 3 — Process Steps
**Layout:** Centred, full-width within container  
**H2:** "How We Help You Get Your Student Visa"  
**Steps:** Horizontal timeline on desktop (numbered nodes connected by line), vertical on mobile.

Step 1 — Initial Consultation (free)  
Step 2 — Eligibility Assessment  
Step 3 — Document Preparation  
Step 4 — Application Lodgement  
Step 5 — Grant & Pre-Departure Support  

Each step: number circle (gold bg), step title (H3), 1–2 sentence description.

---

#### Section 4 — Course Types / Institution Partners
**Layout:** Icon-card grid, 4-col desktop / 2-col tablet / 1-col mobile  
Cards: University, TAFE/VET, English Language Schools, Schools (primary/secondary).  
Each card: icon, heading, 1-line description.

---

#### Section 5 — FAQs
Accordion component, 6–8 questions specific to student visas.  
H2 "Student Visa FAQs"  
Questions: "How long does processing take?", "Can I work on a student visa?", "Can my family come with me?", "What is the GTE requirement?", etc.

---

#### Section 6 — Related Services
H2 "You Might Also Need"  
3 ServiceCards: Education Consulting, Partner/Family Visas (for dependants), Employer Sponsored (post-study).

---

#### Section 7 — CTA Banner
Same as Home CTA Banner.

---

#### MARA Compliance
The `MARAdisclaimer` component must appear:
1. In the PageHero (as described above)
2. At the bottom of the sticky sidebar
3. Immediately above the page Footer

---

### 3.3 Eligibility Check `/eligibility-check`

#### SEO Metadata
- `<title>`: Check Your Australian Visa Eligibility — Free 3-Minute Quiz
- `<meta name="robots">`: index, nofollow (quiz results are not meaningful to index)

---

#### Page Layout
Full-page, minimal chrome. Header remains (sticky). No Footer on quiz steps — replace with "Need help? Call us" bar.

**Outer wrapper:** bg `--color-off-white`, min-height `calc(100svh - var(--header-h))`, centred content.

**Quiz Container:** max-width 640px, mx-auto, px-4. bg white, `--shadow-lg`, `--radius-xl`, p-10 (desktop), p-6 (mobile).

**Top of container:**
- ProgressBar (Step X of 6)
- Back button (ghost, sm, left-aligned, `aria-label="Go to previous step"`)

See Section 5 for full step structure.

**Bottom controls:**
- [Next →] primary right-aligned (or [Submit] on final step)
- [← Back] ghost left-aligned (hidden on step 1)
- Step counter text centre: "Step 2 of 6"

**Keyboard navigation:** Tab through options, Enter to select radio and advance, Escape to go back.

**Results Screen (final):**
- Heading: "Based on your answers, you may be eligible for:"
- List of matched visa types (visually prominent cards)
- Primary CTA: [Book a Free Consultation to Confirm] (full-width, lg)
- Secondary: [Start Again] (ghost)
- Disclaimer: general advice caveat (not personal migration advice)

---

### 3.4 Contact Page `/contact`

#### Section 1 — PageHero
Short hero, bg `--color-navy`, H1 "Get in Touch", subtitle "We respond within 1 business day."

#### Section 2 — Two-Column Layout
**Left (60%) — Contact Form**  
See Section 5 for full form spec.  
H2 "Send Us a Message" (sr-only level or visible h2 `text-2xl`)

**Right (40%) — Contact Details Card**
White card, `--shadow-sm`, `--radius-lg`, p-8, sticky sidebar.

Content:
- H3 "Contact Information"
- Address (formatted, with Google Maps link)
- Phone: linked `tel:`
- Email: linked `mailto:`
- Business hours table: Mon–Fri 9am–5:30pm AEST
- H3 "Emergency / After Hours" — brief note
- H3 "Office Location" — `<iframe>` Google Maps embed, aspect-ratio 4/3, `--radius-md`, border 0, title="Office location map"
- MARA registration number (bottom of card, small text)

---

#### Section 3 — Alternate Contact Methods
3 cards in a row: Phone, Email, Book Online.  
Each: icon, label, value/link.

---

### 3.5 MARA Disclosure Page `/mara-disclosure`

No PageHero. Simple interior layout.

#### Layout
Container `prose` size, py-16.

**Content (top to bottom):**
1. `<nav aria-label="Breadcrumb">`: Home / MARA Disclosure
2. H1 (Playfair Display): "MARA Disclosure Statement"
3. `<p class="text-sm text-charcoal/60">` Last updated: [date]
4. Divider (gold)
5. H2: "Our Registration"  
   Body: Full legal name of agency, MARN number, MARA registration details, link to MARA public register.
6. H2: "Code of Conduct"  
   Body: Reference to the Migration Agents Code of Conduct, obligations.
7. H2: "Complaints Procedure"  
   Body: How to escalate complaints to OMARA. Link to OMARA.
8. H2: "Fees and Charges"  
   Body: Disclosure that fee schedule is provided prior to engagement; link to fee schedule page or booking flow.
9. H2: "Cooling-Off Period"  
   Body: Client rights under the Regulations.
10. H2: "Limitations of This Website"  
    Body: General information disclaimer — not personal migration advice.
11. H2: "Contact"  
    Body: Agency contact details.
12. CTABanner: [Book a Free Consultation] — navy bg

**Accessibility:** All headings form a logical hierarchy. No skip-level headings. Page is crawlable and indexable.

---

## 4. Navigation Architecture

### 4.1 Desktop Navigation — Sticky Header

**Container:** `<header>` element, `position: sticky; top: 0; z-index: var(--z-sticky)`. Height `var(--header-h)` = 72px. bg white (default) or bg `--color-navy` (when `variant="dark"` prop, used on pages with dark hero). `--shadow-sm` on scroll (added via `IntersectionObserver` on a sentinel element at top of page).

**Structure (left to right):**
```
[Logo]          [Nav Links + Dropdowns]          [CTA Buttons]
```

**Logo:** SVG logo, 140px wide, links to `/`. `alt="Apple Education & Immigration"`.

**Nav Links (centre or right-of-logo):**
- Home
- About ▾ (dropdown: About Us, Our Team)
- Services ▾ (mega-dropdown — see below)
- Eligibility Check
- Blog
- Success Stories
- FAQs
- Contact

**Services Mega-Dropdown:**
Panel: full-width below nav, bg white, `--shadow-xl`, py-8.  
Two columns:
- Col 1: Visa Services list (Student Visas, Skilled Migration, Partner & Family, Employer Sponsored)
- Col 2: Education Consulting + Featured Article card (blog snippet)

Opens on hover (250ms delay) or focus on trigger. Closes on Escape, click outside, or focus leaving panel.

`role="navigation"`, `aria-label="Main navigation"`. Dropdown: `role="menu"`, items `role="menuitem"`.

**CTA Buttons (far right):**
- [Check Your Eligibility] — secondary, sm
- [Book Free Consult] — primary, sm

**Active State:** Current route NavLink has gold underline `border-bottom: 2px solid var(--color-gold)`.

**Skip Link:** Visually hidden `<a href="#main-content" class="sr-only focus:not-sr-only ...">Skip to main content</a>` as very first element in DOM. Becomes visible on focus. Positioned absolutely, top-left, bg gold, text navy, p-2.

---

### 4.2 Mobile Navigation — Hamburger Menu

**Breakpoint trigger:** Below 1024px (`lg` breakpoint).

**Header changes at mobile:**
- Logo left
- Hamburger button right: 3-bar icon, `aria-label="Open navigation menu"`, `aria-expanded`, `aria-controls="mobile-menu"`
- CTA buttons hidden (appear in mobile menu)

**Hamburger Button States:**
- Closed: 3 bars icon
- Open: ✕ icon, `aria-label="Close navigation menu"`
- Transition: bars morph to ✕ (SVG path animation, 200ms)

**Mobile Menu Drawer (`id="mobile-menu"`):**
- `position: fixed; inset: 0; z-index: var(--z-modal)`
- Backdrop: semi-transparent navy overlay (left side when drawer slides from right)
- Drawer: bg white, width 320px, slides in from right (transform translateX), `--duration-base` ease-out
- Focus trap: Tab cycles only within drawer while open
- First focusable element: close button (top-right of drawer)
- Close on Escape, close on backdrop click

**Drawer content (top to bottom):**
1. Close button (top-right)
2. Logo
3. Nav list:
   - Home
   - About (tap to expand accordion)
     - About Us
     - Our Team
   - Services (tap to expand accordion)
     - Student Visas
     - Skilled Migration
     - Partner & Family Visas
     - Employer Sponsored
     - Education Consulting
   - Eligibility Check
   - Blog
   - Success Stories
   - FAQs
   - Contact
4. Divider
5. [Check Your Eligibility] — secondary, full-width
6. [Book Free Consult] — primary, full-width
7. Contact details (phone, email) — small text, bottom of drawer

---

### 4.3 Footer Structure

**Container:** `<footer role="contentinfo">`, bg `--color-navy`, text `--color-off-white`.

**Top Strip (py-12):**
Four-column grid desktop / two-column tablet / single-column mobile.

**Column 1 — Brand:**
- Logo (white version, 160px)
- Tagline: 1 sentence
- Social links: LinkedIn, Facebook, Instagram — icon buttons, 40px, hover gold
- `aria-label="[Platform] profile"` on each

**Column 2 — Services:**
- H3 "Our Services" (off-white, Inter SemiBold)
- Links: Student Visas, Skilled Migration, Partner & Family, Employer Sponsored, Education Consulting

**Column 3 — Company:**
- H3 "Company"
- Links: About Us, Our Team, Success Stories, Blog, FAQs, Contact

**Column 4 — Contact:**
- H3 "Contact Us"
- Address
- Phone (linked)
- Email (linked)
- Business hours (2 lines)

**MARA Bar (py-6, border-top 1px `--color-border` in navy tint):**
- Full-width container
- Left: `MARAdisclaimer` component — "Apple Education & Immigration | MARN 0000000 | Registered Migration Agent"
- Right: "Migration advice provided is general in nature and does not constitute personal migration advice. Seek professional advice for your individual circumstances."
- Text: `--text-xs`, `--color-off-white` at 70% opacity

**Bottom Strip (py-4, border-top):**
- Left: © 2026 Apple Education & Immigration. All rights reserved.
- Right: [Privacy Policy] · [Terms of Use] · [MARA Disclosure] links

All footer links: underline on hover, `--color-gold` colour on hover.

---

## 5. Form Design Specs

### 5.1 Contact Form `/contact`

**Form element:** `<form novalidate>` (client-side JS validation; `novalidate` disables browser native UI). `aria-label="Contact form"`. `aria-describedby` pointing to submission result region.

**Fields (in order):**

| # | Field | Type | Required | Validation |
|---|---|---|---|---|
| 1 | Full Name | text input | Yes | Non-empty, min 2 chars |
| 2 | Email Address | email input | Yes | RFC 5322 pattern |
| 3 | Phone Number | tel input | No | AU/international format hint |
| 4 | Visa Type of Interest | select | No | Options: all service types + "Not sure" |
| 5 | Country of Citizenship | select/combobox | Yes | Searchable, ISO country list |
| 6 | Current Location | select | No | "In Australia" / "Outside Australia" |
| 7 | How can we help? | textarea | Yes | Min 20 chars, max 1000 |
| 8 | How did you hear about us? | select | No | Google, referral, social, etc. |
| 9 | Consent checkbox | checkbox | Yes | "I agree to the Privacy Policy" with link |

**Layout:** Single column on mobile, 2-column grid on desktop (fields 1–2 side by side, 3–4 side by side, 5–6 side by side, 7 full-width, 8 full-width, 9 full-width).

**Submit button:** [Send Message →] primary, full-width on mobile, right-aligned on desktop.

**Submission states:**
- Default: button enabled
- Submitting: button disabled, spinner icon, text "Sending…"
- Success: form replaced with success message (green Alert component). "Thank you [name]! We'll be in touch within 1 business day." + [Send Another Message] ghost button.
- Error: inline Alert (red) above submit button. "Something went wrong. Please try again or call us directly."

**Honeypot field:** `<input type="text" name="website" tabIndex={-1} aria-hidden="true" style={{display: 'none'}} />` for spam protection.

---

### 5.2 Eligibility Quiz `/eligibility-check`

**Architecture:** Single-page React state machine. No page navigation between steps. State managed with `useReducer`. Steps determined by logic tree (branching based on answers). Steps stored as array of objects; current step index increments based on answer.

**General step structure:**
```tsx
interface QuizStep {
  id: string
  question: string
  subtext?: string
  type: 'single-choice' | 'multi-choice' | 'text-input' | 'number-input' | 'date-input'
  options?: { label: string; value: string; nextStep?: string }[]
  required: boolean
}
```

---

**Step 1 — Purpose of Visit**
- Question: "What is your main goal in Australia?"
- Type: single-choice (large radio cards with icons)
- Options:
  - Study at a school, TAFE, or university → Step 2A (student path)
  - Work in Australia → Step 2B (skilled/employer path)
  - Join a family member or partner → Step 2C (family path)
  - Invest or start a business → Step 2D (business path)
  - I'm not sure → Step 2E (general assessment)

---

**Step 2A — Student Path: Education Level**
- Question: "What level of study are you planning?"
- Type: single-choice
- Options: Primary/Secondary, English language course, TAFE / VET / Certificate, Bachelor's degree, Postgraduate (Masters/PhD), Other

---

**Step 2B — Skilled Path: Work Type**
- Question: "What best describes your work situation?"
- Options: I have a job offer in Australia, I want to apply without a job offer (points-based), My employer wants to sponsor me, I want to apply for state/territory nomination

---

**Step 2C — Family Path: Relationship**
- Question: "What is your relationship to the person in Australia?"
- Options: Spouse or de facto partner, Child (under 18), Parent, Other family member

---

**Step 2D — Business Path** (simplified)
- Question: "What type of business activity?"
- Options: Start a new business, Invest in an existing business, Manage a business

---

**Step 2E — Not Sure Path**
- Proceeds to Step 3 (age) as generic assessment

---

**Step 3 — Age**
- Question: "How old are you?"
- Type: single-choice (ranges, avoids exposing exact DOB)
- Options: Under 18, 18–24, 25–32, 33–44, 45–54, 55 or older
- Logic: Some visa pathways close at certain age thresholds; UI notes this inline.

---

**Step 4 — Citizenship / Nationality**
- Question: "What is your country of citizenship?"
- Type: text-input with combobox/autocomplete from ISO country list
- Subtext: "This helps us check working holiday and other bilateral agreements."

---

**Step 5 — English Proficiency**
- Question: "How would you describe your English language ability?"
- Type: single-choice
- Options:
  - Native/fluent speaker
  - I have an IELTS / PTE / TOEFL score (reveals sub-field for score)
  - I am still studying English
  - I have not taken a test yet

**Conditional sub-field (if 'I have a score'):**
- Select: IELTS / PTE Academic / TOEFL iBT / OET
- Number input: Overall score

---

**Step 6 — Current Visa Status**
- Question: "What is your current visa situation?"
- Type: single-choice
- Options:
  - I am currently outside Australia
  - I am in Australia on a valid visa (reveals select: Visitor, Student, Working Holiday, Bridging, Other)
  - I am in Australia and my visa has expired
  - I am an Australian permanent resident

---

**Step 7 — Contact Collection (gated results)**
- Question: "Where should we send your personalised eligibility report?"
- Type: text inputs
- Fields:
  - First Name (required)
  - Email Address (required)
  - Phone (optional)
  - Consent checkbox: "I agree to be contacted by Apple Education & Immigration. Privacy Policy applies."
- Submit button: [See My Results →]
- Ghost option below: [View results without saving] (skips contact collection, shows results with less detail)

---

**Results Screen**
- Heading: "Here's What We Found, [First Name]"
- Result cards: 1–3 visa pathway cards, each showing:
  - Visa name and subclass number
  - Match strength (High / Medium confidence badge)
  - 2–3 sentence description
  - [Learn More] link to relevant service page
- Primary CTA: [Book a Free Consultation to Discuss Your Options] — full-width, primary, lg
- Note: "Results are indicative only and do not constitute migration advice. MARN 0000000."
- [Start Again] ghost link

---

### 5.3 Booking Form `/book`

**Integration:** Calendly embed or custom form submitting to CRM. If custom:

**Fields:**
| # | Field | Type | Required |
|---|---|---|---|
| 1 | First Name | text | Yes |
| 2 | Last Name | text | Yes |
| 3 | Email | email | Yes |
| 4 | Phone | tel | Yes |
| 5 | Preferred Date | date picker | Yes |
| 6 | Preferred Time Slot | select (generated from availability) | Yes |
| 7 | Consultation Type | radio: Phone / Video / In-Person | Yes |
| 8 | Visa Type of Interest | select | No |
| 9 | Brief description of your situation | textarea | No |

**Availability Calendar:**
- Month view calendar. Unavailable days greyed out, not focusable.
- Selected day highlighted gold.
- `role="grid"`, cells `role="gridcell"`, `aria-selected`, `aria-disabled`.
- Keyboard: arrow keys navigate dates, Enter/Space select.

**Confirmation Screen:**
- Booking summary card (date, time, consultant name if known)
- Calendar add link (ICS file download)
- "You'll receive a confirmation email at [email]."

---

## 6. Micro-interaction Notes

### 6.1 Hover States

| Element | Hover State |
|---|---|
| Primary Button | bg lightens 10% (`--color-navy-light`), subtle scale(1.02), shadow increases |
| Secondary Button | bg fills gold, text becomes white, border colour unchanged |
| Ghost Button | bg `--color-surface`, no other change |
| ServiceCard | translate-y: -4px, shadow upgrades to `--shadow-lg`, gold bottom border appears |
| NavLink | Gold underline grows from left (scaleX 0→1, 200ms ease-out) |
| Footer links | text colour transitions to gold (150ms) |
| Trust logos | Transition from `filter: grayscale(1)` to `filter: grayscale(0)` (200ms) |
| BlogCard | Image zooms slightly (transform: scale(1.03) on the img only, overflow hidden on wrapper) |

All hover transitions use `transition-property: [specific properties]; transition-duration: var(--duration-base); transition-timing-function: var(--ease-out)`. Never use `transition: all` (performance).

---

### 6.2 Focus States

Every interactive element must have a visible focus indicator that meets WCAG 2.2 AA (3:1 contrast ratio minimum).

**Standard focus ring:** `outline: 2px solid var(--color-gold); outline-offset: 2px; border-radius: inherit`.

**On dark backgrounds (navy sections):** `outline-color: white` or `outline-color: var(--color-gold)` (gold works on both).

No `outline: none` without a custom replacement. Remove via Tailwind's `focus-visible:` variant only, not `focus:`.

---

### 6.3 Button Loading State

When a form is submitting or an async action is in progress:
1. Button: `aria-busy="true"`, `disabled` attribute set
2. Button text replaced: "Sending…" (or contextual equivalent)
3. Spinner icon (20px) appears left of text
4. Button opacity: 0.85
5. Cursor: `not-allowed`
6. Adjacent inputs: disabled, visual opacity 0.6

Spinner: CSS animation, `@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`, duration 700ms linear infinite. Do not use JavaScript for the spin.

---

### 6.4 Form Validation Feedback

**Timing:** Validate on blur (leaving a field), not on every keystroke. On submit, re-validate all fields and focus the first error.

**Visual error state:**
- Input border: `--color-error` (red)
- Error message: appears below input, text-sm, `--color-error`, with warning icon
- Error message uses `role="alert"` so screen readers announce it without needing focus

**Valid state (after correcting an error):**
- Border returns to `--color-border`
- Error message fades out (opacity 0, height 0, 250ms)
- Do not add a green "valid" checkmark on sensitive fields (e.g. password)

**Inline hint text:**
- Shown below inputs that benefit from guidance (e.g. phone: "Include country code, e.g. +61 4xx xxx xxx")
- Colour: charcoal at 60% opacity
- Visible by default, not on hover/focus only (don't hide important instructions)

**Submit-blocked state:**
- If form submitted with errors: page scrolls to first error, first error input receives focus
- Toast (error): "Please fix the highlighted fields before submitting."

---

### 6.5 Page Transitions

**Between routes (Next.js App Router):**
- Use View Transitions API (`unstable_viewTransition`) where supported.
- Fallback: no transition (no JS-animated fades that block navigation).
- Main content (`<main>`) fades in: `@keyframes fadeIn { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }`, 300ms ease-out.

**Scroll into view:**
- Sections below the fold: animate in on scroll using `IntersectionObserver`. Class `.animate-in` added when element enters viewport.
- Animation: `opacity: 0 → 1`, `transform: translateY(20px) → translateY(0)`, 400ms ease-out.
- Stagger child cards by 80ms delay each (CSS `animation-delay`).
- `prefers-reduced-motion`: all animations disabled when `@media (prefers-reduced-motion: reduce)` matches. Set `animation: none; transition: none` within that media query globally.

---

### 6.6 Quiz Step Transitions

Between steps in the Eligibility Quiz:
- Out: current step fades and slides left (opacity 0, translateX(-20px)), 150ms
- In: new step fades and slides from right (opacity 0, translateX(20px) → 0), 200ms, starts after out completes
- ProgressBar fills smoothly: `transition: width 400ms var(--ease-out)`
- Back navigation: reverses the direction (from left, slides to right)
- `prefers-reduced-motion`: skip translate, fade only (100ms)

---

### 6.7 Accordion

- Expand: panel height animates from 0 to `auto` using `grid-template-rows: 0fr → 1fr` technique (CSS-only, no JS height measurement)
- Chevron: `transform: rotate(0deg) → rotate(180deg)`, 200ms ease-in-out
- Collapse: reverse

---

### 6.8 Mobile Menu Drawer

- Open: overlay fades in (opacity 0→0.5, 200ms), drawer translates in from right (translateX(100%) → translateX(0), 250ms ease-out)
- Close: reverse, 200ms
- After close, focus returns to the hamburger button that opened it

---

### 6.9 Toast Notifications

- Enter: slides in from bottom-right, `translateY(20px) opacity(0) → translateY(0) opacity(1)`, 250ms
- Exit: slides out `translateY(0) → translateY(-10px)`, fades, 200ms
- Auto-dismiss: 5 seconds. Reset timer if mouse enters toast.
- Stack: multiple toasts stack vertically with 8px gap

---

### 6.10 Sticky Header Shadow on Scroll

On page load, header has no shadow (transparent/minimal).  
On scroll past 10px, add `--shadow-md`. Use `IntersectionObserver` on a 1px sentinel `<div>` at the top of `<main>`.  
Transition: `box-shadow` 200ms ease.

---

## Appendix A — Accessibility Checklist

- [ ] All images have meaningful `alt` text (or `alt=""` for decorative images)
- [ ] Colour contrast: body text `--color-charcoal` on `--color-off-white` = 12.6:1 ✓
- [ ] Colour contrast: white text on `--color-navy` = 12.4:1 ✓
- [ ] Colour contrast: `--color-gold` on `--color-navy` = 4.6:1 ✓ (large text)
- [ ] Gold text `--color-gold` on white = 2.9:1 — use only for decorative/large text, not body text
- [ ] Skip to main content link present
- [ ] Focus order follows DOM order (no CSS reordering that breaks tab flow)
- [ ] All form fields have labels (no placeholder-only labelling)
- [ ] Error messages associated via `aria-describedby`
- [ ] MARA registration number present in footer of every page
- [ ] MARA disclaimer on all migration service pages
- [ ] `<html lang="en">` set in root layout
- [ ] `<main id="main-content">` present and unique per page
- [ ] No positive `tabIndex` values
- [ ] SVG icons: decorative ones `aria-hidden="true"`, meaningful ones have `aria-label`
- [ ] Video content has captions
- [ ] Page titles are unique and descriptive

---

## Appendix B — Responsive Breakpoints

| Name | Min width | Common use |
|---|---|---|
| `sm` | 640px | Large phones landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop (nav switch point) |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1536px | Ultra-wide (max content at `--max-w-content`) |

Mobile-first: write base styles for mobile, override at breakpoints upward.

---

## Appendix C — Font Loading

Add to `src/app/layout.tsx`:
```tsx
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
})
```

Apply `className={`${playfair.variable} ${inter.variable}`}` to `<html>` element. Fonts are subset and served from Next.js edge — no external request at runtime.

---

*End of Component Design Specification — Apple Education & Immigration v1.0*
