# UX Specification — Apple Education & Immigration Website

> **Business:** Apple Education & Immigration — Australian immigration and student services consultancy.
> **Logo:** Dolphin wearing graduation cap, teal/turquoise brand colour. Use provided logo asset as-is.
> **Design Direction:** Match current site's clean minimal style with a modern upgrade — same brand DNA, elevated execution.

---

## 1. SITEMAP

```
/ (Home)
├── /discover-us                  (About the company)
├── /immigration
│   ├── /immigration/skilled-visa          (Skilled Migration)
│   ├── /immigration/student-visa          (Student Visa - subclass 500)
│   ├── /immigration/partner-visa          (Partner / Family Visa)
│   ├── /immigration/employer-sponsored    (Employer Sponsored)
│   ├── /immigration/bridging-visa         (Bridging Visa)
│   └── /immigration/visitor-visa          (Visitor / Tourist Visa)
├── /student-services
│   ├── /student-services/course-selection (Course Selection)
│   ├── /student-services/enrolment        (Enrolment Assistance)
│   └── /student-services/post-study       (Post-Study Work Rights)
├── /testimonial
├── /faq
├── /contact-us
└── /booking                       (Free consultation booking)
```

**Global elements:** Sticky nav bar, footer.

---

## 2. PAGE-BY-PAGE WIREFRAME DESCRIPTIONS

### 2.1 Home (`/`)

**Navigation Bar** (sticky, white, subtle bottom border on scroll)
- Left: Logo (Apple Education & Immigration — provided asset)
- Centre (logical order): Home 🏠 | Discover Us | Immigration ▾ | Student Services ▾ | Testimonials | FAQ | Contact Us
- Right: "Free Consultation" button (teal, rounded) + "Staff Login" text link (small, `#6E6E80`, separated by a `|` divider)
- "Immigration" and "Student Services" are dropdowns (▾ chevron indicator)
- Mobile: Hamburger → full-screen overlay with same links stacked, "Free Consultation" full-width teal button at bottom, "Staff Login" small link below it

**Hero Section**
- Full-width, white background
- Left side (60%): text content
  - Eyebrow label: "Registered Migration Agents | MARN XXXXXXX"
  - H1: "Your Journey to Australia Starts Here"
  - Sub-copy: "Expert immigration and student visa advice for individuals, families, and businesses. We make the complex simple."
  - CTA Primary: "Book a Free Consultation" → `/booking`
  - CTA Secondary: "Explore Visas" → `/immigration`
- Right side (40%): hero image — diverse group of happy people, students, families (lifestyle)
- Trust strip beneath hero (5 items inline):
  - ✓ MARA Registered Agents
  - ✓ 500+ Visas Approved
  - ✓ 15+ Years Experience
  - ✓ Free Initial Consultation
  - ✓ 5★ Google Reviews

**Services Overview Strip**
- Background: `#F5F5F7`
- H2: "How We Can Help You"
- 3-column grid (desktop) / stacked (mobile):
  1. **Immigration Visas** — icon, headline, 1-sentence desc, "Learn More" link
  2. **Student Services** — icon, headline, 1-sentence desc, "Learn More" link
  3. **Post-Study Pathways** — icon, headline, 1-sentence desc, "Learn More" link

**Why Choose Us**
- White background
- H2: "Why Clients Choose Apple Education & Immigration"
- 4 icon tiles (2×2 grid on desktop, stacked on mobile):
  1. Registered & Accredited — MARA registered, fully compliant
  2. Personalised Advice — Every case is unique, we treat it that way
  3. End-to-End Support — From first consult to visa grant
  4. Proven Track Record — 500+ successful visa outcomes

**Featured Visa Pathways**
- Background: `#F5F5F7`
- H2: "Popular Visa Pathways"
- Horizontal card row (scrollable on mobile), 4 cards:
  - Skilled Migration, Student Visa, Partner Visa, Employer Sponsored
  - Each card: icon, visa name, 2-line desc, "Find Out More" link

**Testimonials**
- White background
- H2: "What Our Clients Say"
- 3 testimonial cards (carousel on mobile)
- Each: star rating, quote, name + visa type granted
- Aggregate: "4.9 / 5 from 200+ verified reviews"

**FAQ Teaser**
- H2: "Frequently Asked Questions"
- 4 accordion items (most searched questions)
- Link: "View All FAQs →" → `/faq`
- Layout: H2 left (40%), accordions right (60%) — matches current site pattern

**Free Consultation CTA Band**
- Background: dark navy `#1D1C2E`
- H2: "Ready to Start Your Australian Journey?"
- Sub: "Book a free 30-minute consultation with one of our registered migration agents."
- Button: "Book Free Consultation" (teal)

---

### 2.2 Discover Us (`/discover-us`)

- H1: "About Apple Education & Immigration"
- Mission statement (2 paragraphs)
- Team section: photo grid, name, MARN number, title, bio
- Stats band: Years active / Visas granted / Countries served / Google rating
- Registered body logos (MARA, PIER, etc.)
- CTA: "Talk to Our Team" → `/contact-us`

---

### 2.3 Immigration Hub (`/immigration`)

- H1: "Immigration Services"
- Intro paragraph
- 6 service cards (2×3 grid desktop, 1 column mobile)
  - Each: icon, visa subclass name, short description, "Learn More" CTA

---

### 2.4 Visa Detail Pages (shared template)

**Structure:**
- Breadcrumb: Home > Immigration > [Visa Name]
- H1: Visa name + subclass number
- Eligibility summary (who can apply)
- What's included / process steps (numbered timeline)
- Processing times + fees note
- Document checklist (accordion)
- "Am I eligible?" CTA → `/booking`
- FAQ (3–4 specific questions)
- Related visas strip

---

### 2.5 Student Services Hub (`/student-services`)

- H1: "Student Services"
- 3 service cards: Course Selection / Enrolment / Post-Study
- Feature list: "What we help with" (checklist)
- Institutions we work with (logo strip)
- CTA: "Talk to a Student Advisor"

---

### 2.6 Testimonial (`/testimonial`)

- H1: "Client Success Stories"
- Filter bar: All | Skilled Visa | Student Visa | Partner Visa | Other
- Masonry grid of testimonial cards
- Each: photo (optional), quote, name, visa type, country of origin

---

### 2.7 FAQ (`/faq`)

- H1: "Frequently Asked Questions"
- Layout: heading + intro left, accordions right (matches current site)
- Categorised sections: General | Student Visa | Skilled Migration | Partner Visa | Fees
- Search field to filter questions (client-side)
- Photo/illustration block between sections (matches current site pattern)
- CTA band at bottom

---

### 2.8 Contact Us (`/contact-us`)

- H1: "Get in Touch"
- 2-column desktop: form left, info right
- Form: Name*, Email*, Phone, Visa type (select)*, Message, Submit
- Info: address, phone, email, hours, map embed
- Note: "All enquiries handled in strict confidence."

---

### 2.9 Booking (`/booking`)

3-step wizard:

**Step 1 — Your Interest**
- What are you looking for? (radio cards): Immigration Visa / Student Services / Not Sure
- Visa subtype dropdown (conditional)

**Step 2 — Your Details**
- Name*, Email*, Phone*, Country of citizenship*, Brief message (optional)

**Step 3 — Choose a Time**
- Calendar + time slots
- In-person (Sydney office) or Phone/Video call toggle
- Confirm button
- Success screen: reference number, confirmation email note, next steps

---

## 3. DESIGN SYSTEM

### 3.1 Colour Palette

**Direction: Match current site DNA + modern uplift.**
Extracted from screenshot + logo. Teal from the dolphin logo becomes the brand accent.

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#00B4B4` | Primary buttons, links, active states (logo teal) |
| `--color-primary-dark` | `#008F8F` | Hover / pressed state |
| `--color-primary-light` | `#E6F9F9` | Teal tint for backgrounds, badges |
| `--color-navy` | `#1D1C2E` | Headings, footer, CTA band background |
| `--color-navy-soft` | `#2E2D45` | Secondary dark sections |
| `--color-surface` | `#F5F5F7` | Alternating section backgrounds, card fills |
| `--color-white` | `#FFFFFF` | Page base, nav, cards |
| `--color-text-primary` | `#1D1C2E` | All headings — matches current site navy |
| `--color-text-body` | `#444455` | Body copy |
| `--color-text-secondary` | `#6E6E80` | Captions, meta, placeholders |
| `--color-border` | `#E5E5EA` | Card borders, input borders, dividers |
| `--color-success` | `#34C759` | Checkmarks, approval badges |
| `--color-danger` | `#FF3B30` | Form errors |

**Key design principles:**
- White backgrounds dominate — matches current site feel
- `#F5F5F7` used for alternating sections and card backgrounds
- Teal `#00B4B4` reserved for CTAs, active links, key icons only (not overused)
- Navy `#1D1C2E` for all headings — strong, authoritative (matches current site)
- No heavy drop shadows — cards use `1px border + very soft shadow`
- Logo always displayed at full colour, never recoloured

---

### 3.2 Typography

| Role | Font | Size Desktop | Size Mobile | Weight | Line Height |
|---|---|---|---|---|---|
| H1 | Poppins | 48px | 32px | 700 | 1.15 |
| H2 | Poppins | 36px | 26px | 700 | 1.2 |
| H3 | Poppins | 24px | 20px | 600 | 1.3 |
| Body Large | Poppins | 18px | 16px | 400 | 1.7 |
| Body | Poppins | 16px | 15px | 400 | 1.7 |
| Caption / Meta | Poppins | 13px | 12px | 400 | 1.5 |
| Button | Poppins | 15px | 15px | 600 | 1 |
| Nav Link | Poppins | 15px | 16px | 500 | 1 |

**Web font:** `'Poppins', -apple-system, BlinkMacSystemFont, sans-serif`
(Poppins matches the rounded, modern feel visible in the current site's typography)

---

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

---

### 3.4 Breakpoints

| Name | Width | Layout |
|---|---|---|
| `sm` | 0px | 1 column, 16px gutters |
| `md` | 768px | 2 columns, 24px gutters |
| `lg` | 1024px | Full nav, 3–4 columns, 32px gutters |
| `xl` | 1280px | Max content width 1200px, centred |

---

### 3.5 Component Library

**Navigation Bar**
- Height: 72px desktop / 60px mobile
- Background: `#FFFFFF`, border-bottom `1px solid #E5E5EA` on scroll
- Logo: left-aligned, 48px tall
- Nav link order: Home 🏠 | Discover Us | Immigration ▾ | Student Services ▾ | Testimonials | FAQ | Contact Us
- Nav link style: Poppins 500 15px, `#1D1C2E`, hover → `#00B4B4`
- Active link: `#00B4B4` with 2px underline
- Dropdowns: Immigration and Student Services show a ▾ chevron; panel appears on hover/click with sub-links listed
- Right side (left to right): "Free Consultation" teal button | vertical divider | "Staff Login" (Poppins 400 13px, `#6E6E80`, hover `#1D1C2E`, links to `/staff/login`)
- Mobile: hamburger icon right; overlay has links stacked, "Free Consultation" full-width button, "Staff Login" small centred link below

**Button — Primary**
- Background: `#00B4B4`
- Text: white, Poppins 600 15px
- Border-radius: 8px
- Height: 48px, padding: 0 28px
- Hover: `#008F8F`
- Focus: 2px `#00B4B4` outline, 2px offset
- Active: scale(0.97)

**Button — Secondary / Ghost**
- Border: `2px solid #00B4B4`
- Text: `#00B4B4`
- Background: transparent
- Hover: background `#E6F9F9`

**Button — Navy (for dark sections)**
- Background: `#FFFFFF`
- Text: `#1D1C2E`
- Hover: background `#F5F5F7`

**Card**
- Background: `#FFFFFF`
- Border: `1px solid #E5E5EA`
- Border-radius: 16px
- Shadow: `0 2px 16px rgba(0,0,0,0.06)`
- Hover: shadow `0 8px 32px rgba(0,0,0,0.10)`, border-color `#00B4B4`

**Accordion** (matches current site pattern)
- Full-width rows
- Question: Poppins 600 16px, `#1D1C2E`
- Toggle icon: `+` / `−` in a light grey circle (exactly as current site)
- Open state: background tint `#F5F5F7`, border-left `3px solid #00B4B4`
- Smooth height transition 250ms ease
- ARIA: `aria-expanded` on button, `aria-controls` on panel

**Input / Textarea**
- Border: `1px solid #E5E5EA`, radius 8px
- Height: 48px (input), min 120px (textarea)
- Focus: border `#00B4B4`
- Error: border `#FF3B30`, message below in `#FF3B30`
- Placeholder: `#6E6E80`

**Trust/Stats Bar**
- Horizontal row of 4–5 items separated by thin vertical dividers
- Each: icon + number/label, `#1D1C2E` text
- Background: white or `#F5F5F7`

**Testimonial Card**
- White card, 16px radius
- Star row: filled teal stars
- Quote: italic body text
- Name + visa type: bold name, caption visa type in teal

**Progress Stepper** (booking)
- 3 circles connected by lines
- Complete: teal fill + white checkmark
- Current: teal outline
- Upcoming: `#E5E5EA` circle

---

## 4. COPY DECK

### 4.1 Navigation

```
Logo alt text: "Apple Education & Immigration"
Nav order: 🏠 Home | Discover Us | Immigration ▾ | Student Services ▾ | Testimonials | FAQ | Contact Us
Right side: [Free Consultation] (teal button)  |  Staff Login (small muted link → /staff/login)

Immigration dropdown:
  - Skilled Migration
  - Student Visa (subclass 500)
  - Partner Visa
  - Employer Sponsored
  - Bridging Visa
  - Visitor Visa

Student Services dropdown:
  - Course Selection
  - Enrolment Assistance
  - Post-Study Work Rights
```

### 4.2 Home Page

**Hero**
```
Eyebrow: MARA Registered Migration Agents
H1: Your Journey to Australia Starts Here
Sub: Expert immigration and student visa advice for individuals,
     families, and businesses. Clear guidance. Real results.
CTA1: Book a Free Consultation
CTA2: Explore Visas →
```

**Trust Bar**
```
✓ MARA Registered Agents
★ 4.9 / 5 Google Reviews
🎓 Student Visa Specialists
✓ 500+ Visas Approved
✓ Free Initial Consultation
```

**Services Strip**
```
H2: How We Can Help You

Immigration Visas
"Skilled migration, partner visas, employer sponsorship and more.
We match you with the right pathway and guide you every step."

Student Services
"Course selection, enrolment support, and student visa applications.
We help international students study in Australia with confidence."

Post-Study Pathways
"Graduated in Australia? We help you explore your work rights,
graduate visas, and permanent residency options."
```

**Why Choose Us**
```
H2: Why Clients Choose Us

Registered & Accredited
"All advice from MARA-registered agents. Compliant, ethical,
and up to date with the latest Department of Home Affairs rulings."

Personalised Advice
"No cookie-cutter solutions. We assess your unique circumstances
and recommend the best pathway for your situation."

End-to-End Support
"From initial consultation to visa grant, we're with you at
every step — document preparation, lodgement, and beyond."

Proven Results
"Over 500 successful visa outcomes for clients from 30+ countries.
Your success is our track record."
```

**FAQ Teaser**
```
H2: Frequently Asked Questions
Sub: At the core of our dedication to delivering outstanding
     immigration solutions is our trusted team of experts.

Q: Can I study two courses simultaneously?
A: Yes, you can study two courses if you are meeting conditions
   of your student visa and studying your principal course.

Q: Can I change my education provider?
A: Yes, with certain conditions. We can advise you on the
   process and ensure you remain compliant with your visa.

Q: Can I study professional year on a Bridging Visa?
A: This depends on the type of Bridging Visa and its conditions.
   Contact us for a personalised assessment.

Q: What would be the best time to lodge TR (485) visa?
A: Generally 3–6 months before your student visa expires. We
   recommend a consultation to review your specific timeline.

[View All FAQs →]
```

**CTA Band**
```
H2: Ready to Start Your Australian Journey?
Sub: Book a free 30-minute consultation with one of our
     registered migration agents. No obligation, no jargon.
Button: Book Free Consultation
```

### 4.3 Booking Flow Microcopy

```
Step 1: "What can we help you with?"
Step 2: "Tell us about yourself"
Step 3: "Choose a time that suits you"

Email helper: "We'll send your confirmation here. No spam."
Phone helper: "In case we need to reach you before your appointment."

No slots: "No availability on this date — try the next available day."

Success heading: "You're booked!"
Success sub: "We'll send a confirmation to your email shortly.
              One of our agents will be in touch to prepare for your consultation."
```

### 4.4 Footer

```
Column 1 — Brand
[Logo]
Apple Education & Immigration
Registered Migration Agents — MARN XXXXXXX
Helping Australians and internationals navigate
the visa system since [year].

Column 2 — Immigration
Skilled Migration
Student Visa
Partner Visa
Employer Sponsored
Bridging Visa
Visitor Visa

Column 3 — Company
Discover Us
Student Services
Testimonials
FAQ
Contact Us
Book a Consultation

Column 4 — Contact
📍 [Office Address], NSW, Australia
📞 [Phone Number]
✉ info@applemigration.com.au
Mon–Fri 9am–5pm AEST

Legal:
© 2026 Apple Education & Immigration. All rights reserved.
Privacy Policy | Terms of Service | Sitemap
Migration advice provided by registered migration agents (MARN XXXXXXX).
```

---

## 5. USER FLOW DIAGRAM

```
[Landing on /]
      │
      ▼
[Hero — reads headline, spots MARA registered trust signal]
      │
      ├─► [Nav: Immigration] ──► [/immigration hub]
      │         │
      │         └──► [Visa detail page] ──► "Am I Eligible?" CTA ──►┐
      │                                                               │
      ├─► [Nav: Student Services] ──► [/student-services] ──────────►│
      │                                                               │
      ▼                                                               │
[Scrolls — Why Choose Us builds trust]                               │
      │                                                               │
      ▼                                                               │
[Testimonials — social proof]                                        │
      │                                                               │
      ▼                                                               │
[FAQ teaser — handles objections]                                    │
      │                                                               │
      ├─► "View All FAQs" ──► [/faq] ──────────────────────────────►│
      │                                                               │
      ▼                                                               │
[CTA Band — "Book Free Consultation"]  ◄───────────────────────────►│
      │                                                               │
      ▼                                                               ▼
[/booking — Step 1: Select interest] ◄─────────────────────────────┘
      │
      ▼
[Step 2: Personal details + citizenship]
      │
      ▼
[Step 3: Pick date, time, in-person or phone/video]
      │
      ▼
[Confirmation screen → email sent]
      │
      ▼
[Agent calls/emails to prepare for consultation]
      │
      ▼
[Client becomes a case]
```

---

## 6. LOGO USAGE

- Use the provided logo asset (dolphin + graduation cap, "Apple Education & Immigration" text)
- Minimum width: 120px
- Clear space: equal to cap height of the "A" on all sides
- On white/light backgrounds: full colour
- On dark/navy backgrounds: white version (if available) or place on white pill container
- Never stretch, recolour, or add effects to the logo
- SVG format preferred; PNG fallback at 2× resolution

---

## 7. ACCESSIBILITY (WCAG 2.1 AA)

1. Contrast — `#1D1C2E` on white = 16.7:1 (exceeds). Teal `#00B4B4` on white = 3.1:1 (large text only; use dark text for small labels on teal backgrounds).
2. Focus rings — 2px `#00B4B4` outline on all interactive elements.
3. Keyboard navigation — full tab order; accordion and booking wizard keyboard operable.
4. Screen readers — semantic HTML, all images with alt text, logo alt = "Apple Education & Immigration".
5. Form accessibility — every input has `<label>`, errors via `aria-describedby`.
6. Accordion — `<button>` with `aria-expanded`, panel with `aria-controls`.
7. Motion — all transitions inside `@media (prefers-reduced-motion: no-preference)`.
8. Touch targets — 44×44px minimum.
9. Skip link — "Skip to main content" visible on focus.
10. Language — `<html lang="en">`.

---

## 8. RESPONSIVE BEHAVIOUR

| Element | Mobile < 768px | Tablet 768–1023px | Desktop ≥ 1024px |
|---|---|---|---|
| Nav | Hamburger, full-screen overlay | Hamburger | Full horizontal |
| Hero | Stacked, image below text | Side by side 50/50 | Side by side 60/40 |
| Services strip | 1 column | 2 columns | 3 columns |
| Visa cards | 1 column | 2 columns | 4 columns |
| FAQ layout | Stacked | Stacked | 40/60 split (matches current) |
| Testimonials | Carousel | 2 columns | 3 columns |
| Footer | 1 column | 2 columns | 4 columns |
| Booking wizard | Full width | Centred 560px | Centred 640px |

---

*End of UX Specification — Hand off to Engineering Agent.*
