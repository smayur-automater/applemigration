import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apple Education & Immigration | Registered Migration Agents Australia",
  description:
    "Trusted MARA-registered migration and education consultants. Student visas, skilled migration, partner visas and more. Book your free consultation today.",
};

const stats = [
  { value: "98%", label: "Visa Success Rate" },
  { value: "2,500+", label: "Visas Approved" },
  { value: "15+", label: "Years Experience" },
  { value: "40+", label: "Countries Served" },
];

const services = [
  {
    icon: "🎓",
    title: "Student Visas",
    desc: "Subclass 500 and pathway visas for international students studying in Australia.",
    href: "/services/student-visas",
    colour: "#EEF5FF",
    accent: "#4A90C4",
  },
  {
    icon: "💼",
    title: "Skilled Migration",
    desc: "Points-based visas including 189, 190, and 491 for skilled professionals.",
    href: "/services/skilled-migration",
    colour: "#F0FBF4",
    accent: "#3A7D44",
  },
  {
    icon: "❤️",
    title: "Partner & Family Visas",
    desc: "Reunite with your loved ones through partner, spouse, and family stream visas.",
    href: "/services/partner-family-visas",
    colour: "#FFF5F5",
    accent: "#C0392B",
  },
  {
    icon: "🏢",
    title: "Employer Sponsored",
    desc: "TSS 482, ENS 186, and DAMA visas for businesses sponsoring overseas workers.",
    href: "/services/employer-sponsored",
    colour: "#FFFBEE",
    accent: "#D4A843",
  },
  {
    icon: "📚",
    title: "Education Consulting",
    desc: "Course and institution guidance to match your career goals and visa pathway.",
    href: "/services/education-consulting",
    colour: "#F5F0FF",
    accent: "#7B4FC9",
  },
  {
    icon: "✅",
    title: "Eligibility Check",
    desc: "Not sure which visa suits you? Take our free 5-minute eligibility assessment.",
    href: "/eligibility-check",
    colour: "#F0F9FF",
    accent: "#1A2E4A",
  },
];

const testimonials = [
  {
    name: "Priya S.",
    origin: "India",
    visa: "Skilled Independent 189",
    quote:
      "Apple Immigration made a complex process feel simple. My 189 visa was approved in under 8 months. I can't recommend them highly enough.",
    initials: "PS",
  },
  {
    name: "Wei L.",
    origin: "China",
    visa: "Student Visa 500",
    quote:
      "From course selection to visa lodgement, they handled everything professionally. I feel completely supported throughout my study journey.",
    initials: "WL",
  },
  {
    name: "Maria G.",
    origin: "Philippines",
    visa: "Partner Visa 820/801",
    quote:
      "My partner visa was approved with zero issues. The team knew exactly what documents were needed and kept me informed at every step.",
    initials: "MG",
  },
];

const whyUs = [
  { icon: "🏅", title: "MARA Registered", desc: "All advice is given by fully registered migration agents — not just consultants." },
  { icon: "🌏", title: "Multilingual Team", desc: "We support clients in English, Mandarin, Hindi, and more." },
  { icon: "⚡", title: "Fast Turnaround", desc: "We know how to build strong applications that minimise back-and-forth with the DHA." },
  { icon: "💬", title: "Always Accessible", desc: "Phone, email, or WhatsApp — we're available when you need us." },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--color-deep-navy)" }}
      >
        {/* Background gradient overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, #4A90C4 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ backgroundColor: "rgba(212,168,67,0.15)", color: "var(--color-warm-gold)", border: "1px solid rgba(212,168,67,0.3)" }}>
              ✅ MARA Registered Migration Agents
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight mb-6">
              Your Australian{" "}
              <span style={{ color: "var(--color-warm-gold)" }}>
                Visa &amp; Education
              </span>{" "}
              Journey Starts Here
            </h1>

            <p className="text-lg text-white/70 max-w-xl mb-10 leading-relaxed">
              Expert migration agents and education consultants helping students,
              families, and skilled professionals build their future in Australia.
              Trusted by 2,500+ clients across 40 countries.
            </p>

            <div className="flex flex-wrap gap-4">
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
        </div>
      </section>

      {/* ── STATS TRUST BAR — Aussizz signature ──────────────────────────── */}
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

      {/* ── SERVICES GRID — ATMC pathway card style ───────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "var(--color-off-white)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--color-sky-blue)" }}
            >
              What We Do
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold font-display"
              style={{ color: "var(--color-deep-navy)" }}
            >
              Our Services
            </h2>
            <p className="mt-3 text-base text-gray-500 max-w-xl mx-auto">
              From your first visa inquiry to permanent residency — we cover
              every stage of your Australian journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ backgroundColor: s.colour, border: `1px solid ${s.accent}22` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ backgroundColor: `${s.accent}18` }}
                >
                  {s.icon}
                </div>
                <h3
                  className="font-bold text-lg mb-2 font-display"
                  style={{ color: "var(--color-deep-navy)" }}
                >
                  {s.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {s.desc}
                </p>
                <span
                  className="text-sm font-semibold group-hover:underline"
                  style={{ color: s.accent }}
                >
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US — ATMC clean alternating section ───────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-2"
                style={{ color: "var(--color-warm-gold)" }}
              >
                Why Choose Us
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold font-display mb-6"
                style={{ color: "var(--color-deep-navy)" }}
              >
                Experienced agents who put your success first
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Navigating Australian immigration is complex. Our MARA-registered
                agents bring years of hands-on experience across every visa
                subclass — ensuring your application is thorough, accurate, and
                submitted with confidence.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                style={{
                  backgroundColor: "var(--color-deep-navy)",
                  color: "white",
                }}
              >
                Meet Our Team →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {whyUs.map((w) => (
                <div
                  key={w.title}
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: "var(--color-off-white)" }}
                >
                  <div className="text-3xl mb-3">{w.icon}</div>
                  <h4
                    className="font-bold text-sm mb-1"
                    style={{ color: "var(--color-deep-navy)" }}
                  >
                    {w.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY CTA BAND — Aussizz conversion strip ──────────────── */}
      <section
        className="py-16"
        style={{ backgroundColor: "var(--color-deep-navy)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ backgroundColor: "rgba(212,168,67,0.15)", color: "var(--color-warm-gold)" }}
          >
            Free — takes 5 minutes
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
            Not sure which visa is right for you?
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8 text-base">
            Answer a few quick questions and we&apos;ll show you which Australian
            visas you may be eligible for — no obligation.
          </p>
          <Link
            href="/eligibility-check"
            className="inline-flex items-center px-8 py-4 rounded-lg text-base font-bold transition-all hover:opacity-90"
            style={{
              backgroundColor: "var(--color-warm-gold)",
              color: "var(--color-deep-navy)",
            }}
          >
            Check My Eligibility →
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS — Aussizz social proof ──────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "var(--color-off-white)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--color-sky-blue)" }}
            >
              Client Stories
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold font-display"
              style={{ color: "var(--color-deep-navy)" }}
            >
              Real results for real people
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 shadow-sm flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="#D4A843" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ backgroundColor: "var(--color-deep-navy)" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-deep-navy)" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {t.origin} · {t.visa}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/success-stories"
              className="text-sm font-semibold"
              style={{ color: "var(--color-sky-blue)" }}
            >
              Read all success stories →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
