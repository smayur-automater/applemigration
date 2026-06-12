import type { Metadata } from "next";
import Link from "next/link";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

export const metadata: Metadata = {
  title: "Success Stories | Apple Education & Immigration",
  description:
    "Read real visa success stories from our clients — student visas, skilled migration, partner visas and more, handled by MARA-registered migration agents.",
};

const stats = [
  { value: "98%", label: "Visa Success Rate" },
  { value: "2,500+", label: "Visas Approved" },
  { value: "15+", label: "Years Experience" },
  { value: "40+", label: "Countries Served" },
];

// Placeholder testimonials pending real client stories from the live site.
const testimonials = [
  {
    name: "Priya S.",
    country: "🇮🇳 India",
    visa: "Skilled Independent 189",
    quote:
      "Apple Immigration made a complex process feel simple. My 189 visa was approved in under 8 months. I can't recommend them highly enough.",
    initials: "PS",
  },
  {
    name: "Wei L.",
    country: "🇨🇳 China",
    visa: "Student Visa 500",
    quote:
      "From course selection to visa lodgement, they handled everything professionally. I feel completely supported throughout my study journey.",
    initials: "WL",
  },
  {
    name: "Maria G.",
    country: "🇵🇭 Philippines",
    visa: "Partner Visa 820/801",
    quote:
      "My partner visa was approved with zero issues. The team knew exactly what documents were needed and kept me informed at every step.",
    initials: "MG",
  },
  {
    name: "Ahmed K.",
    country: "🇵🇰 Pakistan",
    visa: "Skilled Nominated 190",
    quote:
      "After two refusals with another agency, Apple Immigration rebuilt my application from scratch. My 190 nomination and visa came through within the year.",
    initials: "AK",
  },
  {
    name: "Sofia R.",
    country: "🇧🇷 Brazil",
    visa: "Temporary Skill Shortage 482",
    quote:
      "They guided both me and my employer through the sponsorship process. Clear timelines, honest advice, and no surprises along the way.",
    initials: "SR",
  },
  {
    name: "Nguyen T.",
    country: "🇻🇳 Vietnam",
    visa: "Student Visa 500",
    quote:
      "As a first-time applicant I had so many questions. The team answered every one patiently and my visa was granted faster than I expected.",
    initials: "NT",
  },
  {
    name: "James O.",
    country: "🇳🇬 Nigeria",
    visa: "Employer Nomination 186",
    quote:
      "Permanent residency through my employer felt out of reach until Apple Immigration mapped out the pathway. Eighteen months later, I'm a PR holder.",
    initials: "JO",
  },
  {
    name: "Elena P.",
    country: "🇷🇺 Russia",
    visa: "Partner Visa 309/100",
    quote:
      "Being apart from my husband was the hardest part. The team treated our case with real care and we were reunited in Australia within a year.",
    initials: "EP",
  },
  {
    name: "Rajesh M.",
    country: "🇮🇳 India",
    visa: "Skilled Work Regional 491",
    quote:
      "The regional pathway was confusing on my own. Their points strategy and state nomination advice made all the difference — visa granted on the first attempt.",
    initials: "RM",
  },
];

export default function Page() {
  return (
    <>
      {/* ── PAGE HERO ────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--color-deep-navy)" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, #4A90C4 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--color-warm-gold)" }}
          >
            Success Stories
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-white leading-tight mb-5">
            Real People, Real Outcomes
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Behind every visa grant is a person, a family, or a career taking a
            new direction. Here are some of the journeys we&rsquo;ve been proud
            to be part of.
          </p>
        </div>
      </section>

      {/* ── STATS TRUST BAR ──────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--color-warm-gold)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  className="text-3xl lg:text-4xl font-bold font-display"
                  style={{ color: "var(--color-deep-navy)" }}
                >
                  {s.value}
                </div>
                <div
                  className="text-sm font-medium mt-1"
                  style={{ color: "var(--color-deep-navy)", opacity: 0.75 }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL GRID ─────────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--color-off-white)" }}
        aria-label="Client testimonials"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--color-deep-navy)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
            Ready to write your own success story?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
            Start with a free consultation or a 3-minute eligibility check —
            no account needed, no obligation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/book"
              className="px-7 py-3.5 rounded-lg text-base font-semibold transition-all hover:opacity-90 hover:shadow-lg"
              style={{
                backgroundColor: "var(--color-warm-gold)",
                color: "var(--color-deep-navy)",
              }}
            >
              Book Free Consultation
            </Link>
            <Link
              href="/eligibility-check"
              className="px-7 py-3.5 rounded-lg text-base font-semibold border-2 transition-all hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.4)", color: "white" }}
            >
              Check My Eligibility →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
