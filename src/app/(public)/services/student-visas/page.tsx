import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Student Visa Australia (Subclass 500)",
  description: "Expert student visa (Subclass 500) assistance from MARA-registered agents. We guide you from application through to grant. Book a free consultation today.",
  alternates: { canonical: "https://applemigration.com.au/services/student-visas" },
};

const faqs = [
  { q: "How long does student visa processing take?", a: "Processing times vary but are typically 4–6 weeks for most applicants. Applications with complete documentation are processed faster. Check the Department of Home Affairs website for current global processing times." },
  { q: "Can I work on a student visa?", a: "Yes. Student visa holders can work up to 48 hours per fortnight while their course is in session. During scheduled course breaks, there is no work restriction." },
  { q: "Can my family come with me?", a: "Yes. Your spouse/partner and dependent children can be included in your student visa application as secondary applicants. They will generally receive the same visa conditions." },
  { q: "What is the GTE requirement?", a: "The Genuine Temporary Entrant (GTE) criterion requires you to demonstrate that your intention is to study in Australia temporarily, not to use the student visa as a pathway to remain permanently." },
  { q: "Do I need health insurance?", a: "Yes. All student visa holders must maintain Overseas Student Health Cover (OSHC) for the duration of their visa. Many institutions arrange this as part of enrolment." },
  { q: "What English tests are accepted?", a: "IELTS, TOEFL iBT, PTE Academic, and Cambridge C1 Advanced are all accepted. Score requirements vary by institution and course level. We can advise on the minimum score you need." },
];

const steps = [
  { num: 1, title: "Initial Consultation", desc: "Free 30-minute session to assess your eligibility, study goals, and timeline." },
  { num: 2, title: "Eligibility Assessment", desc: "We review your qualifications, English proficiency, and financial capacity against visa requirements." },
  { num: 3, title: "Document Preparation", desc: "We provide a tailored checklist and review all documents before lodgement." },
  { num: 4, title: "Application Lodgement", desc: "We lodge your application via ImmiAccount and respond to any requests from the Department." },
  { num: 5, title: "Grant & Pre-Departure", desc: "Once granted, we brief you on visa conditions, arrival requirements, and next steps." },
];

const institutionTypes = [
  { icon: "🎓", title: "University", desc: "Bachelor's, Master's, and PhD programs at Australia's world-ranked universities." },
  { icon: "🔧", title: "TAFE / VET", desc: "Certificate, Diploma, and Advanced Diploma courses aligned to industry needs." },
  { icon: "🗣️", title: "English Language Schools", desc: "ELICOS courses to build English skills before entering higher education." },
  { icon: "🏫", title: "Schools", desc: "Primary and secondary schooling for younger students and accompanied minors." },
];

export default function StudentVisasPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="py-20" style={{ backgroundColor: "var(--color-navy)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm" style={{ color: "rgba(247,245,240,0.6)" }}>
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">Student Visas</li>
            </ol>
          </nav>
          <h1 className="font-display font-bold text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Australian Student Visa (Subclass 500)
          </h1>
          <p className="text-lg mb-8 max-w-2xl" style={{ color: "rgba(247,245,240,0.8)" }}>
            For international students enrolling in a registered Australian course. Processing typically takes 4–8 weeks with a complete application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="/book" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold transition-all duration-250" style={{ backgroundColor: "var(--color-gold)", color: "var(--color-navy)" }}>
              Book a Free Consultation
            </Link>
            <Link href="/eligibility-check" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold border-2 text-white transition-colors duration-150" style={{ borderColor: "rgba(255,255,255,0.4)" }}>
              Check Your Eligibility
            </Link>
          </div>
          {/* MARA disclaimer */}
          <div className="border-l-4 pl-4 py-2 text-xs" style={{ borderColor: "var(--color-gold)", color: "rgba(247,245,240,0.65)" }}>
            Apple Education & Immigration is a registered migration agency. MARN 2318293. Migration advice on this page is general in nature and does not constitute personal migration advice.
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
            {/* Left — body content */}
            <div className="max-w-[720px]">
              <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)", color: "var(--color-navy)" }}>
                What is the Student Visa (Subclass 500)?
              </h2>
              <div className="space-y-4 text-base leading-relaxed mb-10" style={{ color: "var(--color-charcoal)" }}>
                <p>
                  The Student visa (subclass 500) allows you to study full-time in Australia with a registered education provider. It replaces the previous student visa types and covers all levels of study — from primary school through to postgraduate research.
                </p>
                <p>
                  Visa holders can typically stay for the duration of their enrolled course, plus a buffer period. Most student visas also allow you to bring immediate family members as secondary applicants, and include work rights during your studies.
                </p>
              </div>

              <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)", color: "var(--color-navy)" }}>
                Key Requirements
              </h2>
              <ol className="space-y-3 mb-10">
                {[
                  "Confirmation of Enrolment (CoE) from a CRICOS-registered Australian education provider",
                  "Evidence of English language proficiency (IELTS, PTE, TOEFL, or equivalent)",
                  "Demonstrate the Genuine Temporary Entrant (GTE) criterion — intent to study temporarily",
                  "Health and character requirements (medical examination and police clearances)",
                  "Financial capacity to support yourself and any dependants during study",
                ].map((req, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: "var(--color-gold)" }}>{i + 1}</span>
                    <p className="text-base" style={{ color: "var(--color-charcoal)" }}>{req}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Right — sticky sidebar */}
            <div>
              <div
                className="sticky p-8 bg-white rounded-xl"
                style={{ top: "calc(var(--header-h) + 16px)", boxShadow: "var(--shadow-md)" }}
              >
                <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--color-navy)" }}>Get Expert Help</h3>
                <p className="text-sm mb-6" style={{ color: "var(--color-charcoal)" }}>
                  Our MARA-registered agents handle every aspect of your student visa application.
                </p>
                <Link href="/book" className="block w-full text-center px-6 py-3 rounded-full text-sm font-semibold mb-3 text-white transition-all duration-250" style={{ backgroundColor: "var(--color-navy)" }}>
                  Book a Free Consultation
                </Link>
                <Link href="/eligibility-check" className="block w-full text-center px-6 py-3 rounded-full text-sm font-semibold border-2 mb-6 transition-colors duration-150" style={{ borderColor: "var(--color-gold)", color: "var(--color-navy)" }}>
                  Check Your Eligibility
                </Link>
                <hr style={{ borderColor: "var(--color-border)" }} />
                <div className="mt-6 space-y-3 text-sm">
                  <a href="tel:+61480047407" className="flex items-center gap-2 transition-colors duration-150 hover:underline" style={{ color: "var(--color-navy)" }}>
                    📞 +61 480 047 407
                  </a>
                  <a href="mailto:info@applemigration.com.au" className="flex items-center gap-2 transition-colors duration-150 hover:underline" style={{ color: "var(--color-navy)" }}>
                    ✉ info@applemigration.com.au
                  </a>
                </div>
                <p className="mt-6 text-xs" style={{ color: "var(--color-charcoal)", opacity: 0.5 }}>MARN 2318293 | Registered Migration Agent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24" style={{ backgroundColor: "var(--color-off-white)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-center mb-16" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-navy)" }}>
            How We Help You Get Your Student Visa
          </h2>
          <div className="relative">
            {/* Desktop timeline line */}
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-0.5" style={{ backgroundColor: "var(--color-border)" }} />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {steps.map((step) => (
                <div key={step.num} className="text-center relative">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 relative z-10"
                    style={{ backgroundColor: "var(--color-gold)" }}
                  >
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-base mb-2" style={{ color: "var(--color-navy)" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-charcoal)" }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Institution Types */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-center mb-12" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-navy)" }}>
            Types of Institutions We Work With
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {institutionTypes.map((inst) => (
              <div key={inst.title} className="p-6 rounded-xl text-center" style={{ backgroundColor: "var(--color-surface)" }}>
                <div className="text-4xl mb-4" aria-hidden="true">{inst.icon}</div>
                <h3 className="font-semibold mb-2" style={{ color: "var(--color-navy)" }}>{inst.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-charcoal)" }}>{inst.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24" style={{ backgroundColor: "var(--color-off-white)" }}>
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold mb-10" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-navy)" }}>
            Student Visa FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-base list-none" style={{ color: "var(--color-navy)" }}>
                  {faq.q}
                  <span className="text-xl ml-4" aria-hidden="true">+</span>
                </summary>
                <div className="px-6 pb-6 text-sm leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold mb-10" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-navy)" }}>
            You Might Also Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "📚", title: "Education Consulting", desc: "Find the right course and institution for your goals.", href: "/services/education-consulting" },
              { icon: "❤️", title: "Partner & Family Visas", desc: "Bring your family with you as dependent visa holders.", href: "/services/partner-family-visas" },
              { icon: "🏢", title: "Employer Sponsored", desc: "Post-study work visa and employer sponsorship options.", href: "/services/employer-sponsored" },
            ].map((s) => (
              <Link key={s.href} href={s.href} className="block p-8 bg-white rounded-xl border transition-all duration-250" style={{ borderColor: "var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
                <div className="text-4xl mb-4" aria-hidden="true">{s.icon}</div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--color-navy)" }}>{s.title}</h3>
                <p className="text-sm" style={{ color: "var(--color-charcoal)" }}>{s.desc}</p>
                <p className="mt-4 text-sm font-semibold" style={{ color: "var(--color-gold)" }}>Learn more →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MARA disclaimer above footer */}
      <div className="py-6 border-t" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8" aria-label="MARA registration and legal disclaimer">
          <p className="text-xs" style={{ color: "var(--color-charcoal)", opacity: 0.6 }}>
            Apple Education & Immigration | MARN 2318293 | Registered Migration Agent. Migration advice on this page is general in nature and does not constitute personal migration advice. Seek professional advice for your individual circumstances.
          </p>
        </div>
      </div>

      {/* CTA Banner */}
      <section className="py-20" style={{ backgroundColor: "var(--color-gold)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-navy)" }}>
            Ready to Start Your Student Visa Journey?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold text-white transition-all duration-250" style={{ backgroundColor: "var(--color-navy)" }}>
              Book a Free Consultation
            </Link>
            <a href="tel:+61480047407" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold border-2 transition-colors duration-150" style={{ borderColor: "var(--color-navy)", color: "var(--color-navy)" }}>
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
