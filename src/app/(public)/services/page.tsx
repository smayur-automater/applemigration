import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services — Australian Visa & Education Consulting",
  description: "Comprehensive Australian visa and education consulting services. Student visas, skilled migration, partner visas, employer sponsored, and education consulting.",
};

const services = [
  { icon: "🎓", title: "Student Visas", tag: "Subclass 500", desc: "Expert guidance for international students enrolling in Australian educational institutions.", href: "/services/student-visas" },
  { icon: "💼", title: "Skilled Migration", tag: "189 · 190 · 491", desc: "Points-tested visas for skilled workers. Maximise your score and select the right pathway.", href: "/services/skilled-migration" },
  { icon: "❤️", title: "Partner & Family Visas", tag: "820 · 801 · 309", desc: "Reunite with your loved ones in Australia through the family stream.", href: "/services/partner-family-visas" },
  { icon: "🏢", title: "Employer Sponsored", tag: "482 · 186", desc: "Work visa solutions for businesses and employees through sponsorship pathways.", href: "/services/employer-sponsored" },
  { icon: "📚", title: "Education Consulting", tag: "Course Selection", desc: "Find the right course, institution, and pathway to match your career goals.", href: "/services/education-consulting" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="py-20" style={{ backgroundColor: "var(--color-navy)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm" style={{ color: "rgba(247,245,240,0.6)" }}>
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">Services</li>
            </ol>
          </nav>
          <h1 className="font-display font-bold text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Our Services
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "rgba(247,245,240,0.8)" }}>
            Comprehensive Australian visa and education consulting — from assessment to grant.
          </p>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: "var(--color-off-white)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                role="article"
                aria-labelledby={`svc-${i}`}
                className="block p-8 bg-white rounded-xl border-b-4 border-transparent transition-all duration-250"
                style={{ boxShadow: "var(--shadow-sm)" }}
              >
                <div className="text-4xl mb-4" aria-hidden="true">{s.icon}</div>
                <h2 id={`svc-${i}`} className="text-xl font-semibold mb-2" style={{ color: "var(--color-navy)" }}>{s.title}</h2>
                <span className="inline-block text-xs font-semibold px-2 py-1 rounded-sm mb-3 uppercase tracking-wide" style={{ backgroundColor: "var(--color-surface)", color: "var(--color-navy)" }}>
                  {s.tag}
                </span>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-charcoal)" }}>{s.desc}</p>
                <p className="text-sm font-semibold" style={{ color: "var(--color-gold)" }}>Learn more →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "var(--color-gold)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-navy)" }}>
            Not Sure Which Visa You Need?
          </h2>
          <p className="text-lg mb-8" style={{ color: "var(--color-navy)", opacity: 0.85 }}>
            Take our free 3-minute eligibility quiz to find out.
          </p>
          <Link href="/eligibility-check" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold text-white transition-all duration-250" style={{ backgroundColor: "var(--color-navy)" }}>
            Check Your Eligibility
          </Link>
        </div>
      </section>
    </>
  );
}
