import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apple Education & Immigration — Australian Visa & Education Experts",
  description:
    "MARA registered migration agents (MARN 2318293) with 12+ years experience. Expert guidance for student visas, skilled migration, education admissions and career pathways. 2,000+ satisfied clients.",
  openGraph: {
    title: "Apple Education & Immigration — Australian Visa & Education Experts",
    description: "MARA registered migration agents (MARN 2318293). 2,000+ satisfied clients. 12+ years experience. 200+ approved providers.",
  },
};

const stats = [
  { value: "2,000+", label: "Satisfied Clients" },
  { value: "12+", label: "Years Experience" },
  { value: "200+", label: "Approved Providers" },
];

const services = [
  {
    icon: "🎓",
    title: "Student Visas",
    description: "Expert guidance for Subclass 500 and school visas. We help students from application through to grant.",
    href: "/services/student-visas",
    tag: "Subclass 500",
  },
  {
    icon: "💼",
    title: "Skilled Migration",
    description: "Points-tested visas including 189, 190, and 491 subclasses. Maximise your points and navigate state nominations.",
    href: "/services/skilled-migration",
    tag: "189 · 190 · 491",
  },
  {
    icon: "❤️",
    title: "Partner & Family Visas",
    description: "Reunite with your loved ones in Australia. Partner, spouse, parent, and child visa applications.",
    href: "/services/partner-family-visas",
    tag: "820 · 801",
  },
  {
    icon: "🏢",
    title: "Employer Sponsored",
    description: "TSS 482 and ENS 186 visas. We work with employers and employees to navigate sponsorship requirements.",
    href: "/services/employer-sponsored",
    tag: "482 · 186",
  },
  {
    icon: "📚",
    title: "Education Consulting",
    description: "Find the right course and institution. CRICOS-registered provider matching and enrolment support.",
    href: "/services/education-consulting",
    tag: "Course Selection",
  },
];

const whyUs = [
  {
    title: "MARA Registered Agents",
    body: "Fully registered with the Office of the Migration Agents Registration Authority (MARN 2318293). Your application is in safe, compliant hands.",
  },
  {
    title: "Plain-English Advice",
    body: "We explain your options clearly — no jargon, no surprises. You always know where you stand throughout your visa journey.",
  },
  {
    title: "End-to-End Service",
    body: "From initial assessment to visa grant and pre-departure support, we're with you at every step — including health insurance and career pathways.",
  },
  {
    title: "12+ Years of Experience",
    body: "Established in 2016, we bring deep knowledge of Australian immigration and education law with 2,000+ satisfied clients.",
  },
];

const testimonials = [
  {
    quote: "I had an outstanding experience with Apple Migration and Education Company. The team guided me through the entire migration process to Australia with utmost professionalism and expertise.",
    name: "Prem Chand",
    visa: "Migration Visa",
    country: "🇮🇳 India",
    rating: 5,
  },
  {
    quote: "He possesses an in-depth knowledge of the various visa options and requirements, and he guided me through the complex paperwork with ease. His attention to detail ensured that all my documents were accurately prepared.",
    name: "Vinod Rohilla",
    visa: "Australian Visa",
    country: "🇮🇳 India",
    rating: 5,
  },
  {
    quote: "He guided me through the complex visa options and requirements with ease, ensuring that all my documents were accurately prepared and submitted on time. His meticulous attention to detail was invaluable.",
    name: "Yeshan",
    visa: "Skilled Visa",
    country: "🌏 Australia",
    rating: 5,
  },
];

const blogPosts = [
  {
    title: "2026 Skilled Migration Points Changes: What You Need to Know",
    excerpt: "The Department of Home Affairs has updated the points test thresholds. We break down what changed and who is affected.",
    date: "Jun 2, 2026",
    slug: "/blog/skilled-migration-points-2026",
    category: "Skilled Migration",
    readTime: "5 min read",
  },
  {
    title: "Student Visa GTE Requirement Explained",
    excerpt: "The Genuine Temporary Entrant criterion is the most common reason for student visa refusals. Here's how to demonstrate GTE successfully.",
    date: "May 28, 2026",
    slug: "/blog/gte-requirement-explained",
    category: "Student Visas",
    readTime: "7 min read",
  },
  {
    title: "Partner Visa Processing Times — Mid-2026 Update",
    excerpt: "Processing times for onshore and offshore partner visas have shifted significantly. See the latest Department estimates.",
    date: "May 20, 2026",
    slug: "/blog/partner-visa-processing-2026",
    category: "Partner Visas",
    readTime: "4 min read",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="min-h-[100svh] flex items-center"
        style={{ backgroundColor: "var(--color-navy)" }}
        aria-label="Hero section"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-4" style={{ color: "var(--color-gold)" }}>
                Registered Migration Agent · MARN 2318293
              </p>
              <h1
                className="font-display font-bold text-white mb-6"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
              >
                Your Australian Future Starts Here
              </h1>
              <p className="text-lg mb-8 max-w-[520px]" style={{ color: "rgba(247,245,240,0.85)", lineHeight: 1.625 }}>
                Whether you&apos;re studying, working, or reuniting with family — our MARA-registered agents cut through the complexity and get you to Australia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold transition-all duration-250"
                  style={{ backgroundColor: "var(--color-gold)", color: "var(--color-navy)" }}
                >
                  Book a Free Consultation
                </Link>
                <Link
                  href="/eligibility-check"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold border-2 text-white transition-all duration-250"
                  style={{ borderColor: "rgba(255,255,255,0.4)" }}
                >
                  Check Your Eligibility →
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} aria-label={`${stat.value} ${stat.label}`}>
                    <p className="font-display font-bold text-2xl sm:text-3xl" style={{ color: "var(--color-gold)" }}>
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm" style={{ color: "rgba(247,245,240,0.7)" }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div
                className="w-full max-w-md aspect-[4/5] flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--color-navy-light) 0%, #1a3a6b 100%)",
                  borderRadius: "2rem 0.5rem 2rem 0.5rem",
                  boxShadow: "var(--shadow-2xl)",
                  position: "relative",
                }}
              >
                <div className="text-center" style={{ color: "rgba(255,255,255,0.2)" }}>
                  <div className="text-8xl mb-4">🍎</div>
                  <p className="text-sm">Professional consultation photo</p>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "2rem",
                    bottom: "2rem",
                    width: 4,
                    borderRadius: 9999,
                    backgroundColor: "var(--color-gold)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section
        role="complementary"
        aria-label="Accreditations and memberships"
        className="bg-white py-6 border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {["MARA Registered", "PIER Certified", "DHA Partner", "IELTS Approved", "AQF Recognised"].map((name) => (
              <span
                key={name}
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-charcoal)", opacity: 0.45 }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24" style={{ backgroundColor: "var(--color-off-white)" }} aria-labelledby="services-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-3" style={{ color: "var(--color-gold)" }}>What We Do</p>
          <h2
            id="services-heading"
            className="font-display font-bold mb-4"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-navy)" }}
          >
            Expert Guidance Across All Australian Visa Pathways
          </h2>
          <p className="text-lg mb-12 max-w-2xl" style={{ color: "var(--color-charcoal)" }}>
            From student visas to skilled migration — we handle every visa category with precision and care.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Link
                key={service.href}
                href={service.href}
                role="article"
                aria-labelledby={`service-${i}-title`}
                className="group block p-8 bg-white rounded-xl border-b-4 border-transparent transition-all duration-250"
                style={{ boxShadow: "var(--shadow-sm)" }}
              >
                <div className="text-4xl mb-4" aria-hidden="true">{service.icon}</div>
                <h3 id={`service-${i}-title`} className="text-xl font-semibold mb-2" style={{ color: "var(--color-navy)" }}>
                  {service.title}
                </h3>
                <span
                  className="inline-block text-xs font-semibold px-2 py-1 rounded-sm mb-3 uppercase tracking-wide"
                  style={{ backgroundColor: "var(--color-surface)", color: "var(--color-navy)" }}
                >
                  {service.tag}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-charcoal)" }}>{service.description}</p>
                <p className="mt-4 text-sm font-semibold" style={{ color: "var(--color-gold)" }}>Learn more →</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center px-6 py-3 rounded-full border-2 text-base font-semibold transition-colors duration-150"
              style={{ borderColor: "var(--color-gold)", color: "var(--color-navy)" }}
            >
              Explore All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Apple */}
      <section className="py-24" style={{ backgroundColor: "var(--color-navy)" }} aria-labelledby="why-us-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-3" style={{ color: "var(--color-gold)" }}>Why Us</p>
              <h2
                id="why-us-heading"
                className="font-display font-bold text-white mb-8"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}
              >
                We Know the System — and We Work It for You
              </h2>
              <ul className="space-y-6">
                {whyUs.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="shrink-0 mt-0.5" aria-hidden="true" style={{ color: "var(--color-gold)", fontSize: "1.25rem" }}>✓</span>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(247,245,240,0.75)" }}>{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link
                  href="/book"
                  className="inline-flex items-center px-8 py-4 rounded-full text-base font-semibold transition-all duration-250"
                  style={{ backgroundColor: "var(--color-gold)", color: "var(--color-navy)" }}
                >
                  Book a Free Consultation
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div
                className="w-full max-w-sm aspect-square rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "var(--color-navy-light)", boxShadow: "var(--shadow-xl)" }}
              >
                <div className="text-center" style={{ color: "rgba(255,255,255,0.2)" }}>
                  <div className="text-8xl mb-4">👥</div>
                  <p className="text-sm">Team photo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Quiz Teaser */}
      <section className="py-20" style={{ backgroundColor: "var(--color-surface)" }} aria-labelledby="quiz-heading">
        <div className="max-w-xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-3" style={{ color: "var(--color-gold)" }}>Find Out in 3 Minutes</p>
          <h2
            id="quiz-heading"
            className="font-display font-bold mb-4"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-navy)" }}
          >
            Which Australian Visa Is Right for You?
          </h2>
          <p className="text-base mb-8" style={{ color: "var(--color-charcoal)" }}>
            Answer 6 quick questions and get a personalised list of visa pathways matched to your situation.
          </p>
          <Link
            href="/eligibility-check"
            className="inline-flex w-full sm:w-auto items-center justify-center px-10 py-4 rounded-full text-lg font-semibold transition-all duration-250 text-white"
            style={{ backgroundColor: "var(--color-navy)" }}
          >
            Check Your Eligibility →
          </Link>
          <p className="mt-4 text-sm" style={{ color: "var(--color-charcoal)", opacity: 0.6 }}>
            No account needed · Takes 3 minutes · Free
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white" aria-labelledby="testimonials-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-3" style={{ color: "var(--color-gold)" }}>Success Stories</p>
          <h2
            id="testimonials-heading"
            className="font-display font-bold mb-12"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-navy)" }}
          >
            Real People, Real Outcomes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                role="figure"
                aria-label={`Testimonial from ${t.name}`}
                className="p-8 rounded-xl border"
                style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
              >
                <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} aria-hidden="true" style={{ color: "var(--color-gold)" }}>★</span>
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-charcoal)" }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption>
                  <p className="font-semibold text-sm" style={{ color: "var(--color-navy)" }}>{t.name}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--color-charcoal)", opacity: 0.6 }}>{t.visa} · {t.country}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/success-stories" className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold border-2 transition-colors duration-150" style={{ borderColor: "var(--color-border)", color: "var(--color-navy)" }}>
              Read More Success Stories →
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-24" style={{ backgroundColor: "var(--color-off-white)" }} aria-labelledby="blog-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 id="blog-heading" className="font-display font-bold" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-navy)" }}>
              Latest Insights
            </h2>
            <Link href="/blog" className="hidden sm:inline text-sm font-semibold transition-colors duration-150" style={{ color: "var(--color-gold)" }}>
              View All Articles →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={post.slug}
                className="group block bg-white rounded-xl overflow-hidden border transition-all duration-250"
                style={{ borderColor: "var(--color-border)", boxShadow: "var(--shadow-sm)" }}
                aria-label={post.title}
              >
                <div className="h-40 flex items-center justify-center" style={{ backgroundColor: "var(--color-surface)" }}>
                  <span className="text-4xl">📰</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold px-2 py-1 rounded-sm uppercase tracking-wide" style={{ backgroundColor: "var(--color-surface)", color: "var(--color-navy)" }}>
                      {post.category}
                    </span>
                    <span className="text-xs" style={{ color: "var(--color-charcoal)", opacity: 0.5 }}>{post.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-base mb-2 leading-snug" style={{ color: "var(--color-navy)" }}>{post.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-charcoal)", opacity: 0.7 }}>{post.excerpt}</p>
                  <p className="text-xs" style={{ color: "var(--color-charcoal)", opacity: 0.5 }}>{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20" style={{ backgroundColor: "var(--color-gold)" }} aria-labelledby="cta-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-navy)" }}>
            Ready to Take the Next Step?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "var(--color-navy)", opacity: 0.85 }}>
            Speak with a MARA-registered agent today — no commitment, no jargon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold transition-all duration-250 text-white"
              style={{ backgroundColor: "var(--color-navy)" }}
            >
              Book a Free Consultation
            </Link>
            <a
              href="tel:+61480047407"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold border-2 transition-colors duration-150"
              style={{ borderColor: "var(--color-navy)", color: "var(--color-navy)" }}
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
