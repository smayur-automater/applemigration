import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Apple Education & Immigration — MARA Registered Migration Agents",
  description: "Learn about Apple Education & Immigration. 15+ years of Australian immigration expertise. MARA registered agents committed to your visa success.",
};

const team = [
  {
    name: "Sarah Thompson",
    role: "Principal Migration Agent",
    credentials: "MARN 0123456",
    bio: "Sarah has 15+ years experience in Australian immigration law with expertise in skilled migration and employer sponsorship.",
  },
  {
    name: "Michael Chen",
    role: "Senior Migration Agent",
    credentials: "MARN 0234567",
    bio: "Michael specialises in student visas and education pathways, having helped over 500 students achieve their study dreams.",
  },
  {
    name: "Aisha Patel",
    role: "Education Consultant",
    credentials: "Cert. Education Agent",
    bio: "Aisha guides students through institution selection and enrolment, with relationships across 200+ CRICOS providers.",
  },
];

const values = [
  { icon: "⚖️", title: "Integrity", body: "We provide honest advice and never overpromise outcomes." },
  { icon: "🎯", title: "Excellence", body: "Every application receives meticulous attention to detail." },
  { icon: "🤝", title: "Partnership", body: "Your goals become our goals. We're in this together." },
  { icon: "💡", title: "Clarity", body: "Plain-English advice so you always understand your options." },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="py-20" style={{ backgroundColor: "var(--color-navy)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm" style={{ color: "rgba(247,245,240,0.6)" }}>
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">About Us</li>
            </ol>
          </nav>
          <h1 className="font-display font-bold text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            About Apple Education & Immigration
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "rgba(247,245,240,0.8)" }}>
            For over 15 years, we&apos;ve helped thousands of individuals and families navigate Australia&apos;s immigration system with confidence and clarity.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-3" style={{ color: "var(--color-gold)" }}>Our Story</p>
              <h2 className="font-display font-bold mb-6" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-navy)" }}>
                Built on Trust, Driven by Results
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
                <p>
                  Apple Education & Immigration was founded with a simple mission: make the Australian immigration process accessible, transparent, and stress-free for everyone.
                </p>
                <p>
                  What started as a small consultancy in Melbourne has grown into a trusted agency serving clients from over 50 countries. Our team of MARA-registered agents brings together decades of combined experience across every major visa category.
                </p>
                <p>
                  We believe that expert immigration advice should never feel intimidating. That&apos;s why plain-English communication is at the heart of everything we do.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "1,200+", label: "Visas Granted" },
                { value: "15+", label: "Years Experience" },
                { value: "50+", label: "Countries Served" },
                { value: "98%", label: "Satisfaction Rate" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-xl text-center" style={{ backgroundColor: "var(--color-surface)" }}>
                  <p className="font-display font-bold text-3xl mb-1" style={{ color: "var(--color-gold)" }}>{stat.value}</p>
                  <p className="text-sm font-medium" style={{ color: "var(--color-navy)" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{ backgroundColor: "var(--color-off-white)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-3" style={{ color: "var(--color-gold)" }}>What We Stand For</p>
            <h2 className="font-display font-bold" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-navy)" }}>
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-6 bg-white rounded-xl text-center" style={{ boxShadow: "var(--shadow-sm)" }}>
                <div className="text-4xl mb-4" aria-hidden="true">{v.icon}</div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--color-navy)" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-charcoal)" }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white" aria-labelledby="team-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-3" style={{ color: "var(--color-gold)" }}>Our People</p>
            <h2 id="team-heading" className="font-display font-bold" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-navy)" }}>
              Meet the Team
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div
                  className="w-32 h-32 rounded-xl mx-auto mb-4 flex items-center justify-center text-4xl"
                  style={{ backgroundColor: "var(--color-surface)" }}
                  aria-hidden="true"
                >
                  👤
                </div>
                <h3 className="font-semibold text-lg" style={{ color: "var(--color-navy)" }}>{member.name}</h3>
                <p className="text-sm font-medium mb-2" style={{ color: "var(--color-gold)" }}>{member.role}</p>
                <span className="inline-block text-xs px-3 py-1 rounded-full mb-3" style={{ backgroundColor: "var(--color-surface)", color: "var(--color-navy)" }}>
                  {member.credentials}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-charcoal)" }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20" style={{ backgroundColor: "var(--color-gold)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-navy)" }}>
            Ready to Take the Next Step?
          </h2>
          <p className="text-lg mb-8" style={{ color: "var(--color-navy)", opacity: 0.85 }}>
            Speak with a MARA-registered agent today — no commitment, no jargon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold text-white transition-all duration-250" style={{ backgroundColor: "var(--color-navy)" }}>
              Book a Free Consultation
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold border-2 transition-colors duration-150" style={{ borderColor: "var(--color-navy)", color: "var(--color-navy)" }}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
