import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Employer Sponsored Visas Australia (482 TSS, 186 ENS)",
  description: "Employer sponsored visa assistance for workers and employers. TSS 482 and ENS 186 subclasses. MARA-registered agents.",
};

export default function Page() {
  return (
    <>
      <section className="py-20" style={{ backgroundColor: "var(--color-navy)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm" style={{ color: "rgba(247,245,240,0.6)" }}>
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">Employer Sponsored Visas</li>
            </ol>
          </nav>
          <h1 className="font-display font-bold text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Employer Sponsored Visas
          </h1>
          <p className="text-lg mb-8 max-w-2xl" style={{ color: "rgba(247,245,240,0.8)" }}>TSS 482 and ENS 186 visas. We work with both employers and employees to navigate sponsorship requirements.</p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="/book" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold transition-all duration-250" style={{ backgroundColor: "var(--color-gold)", color: "var(--color-navy)" }}>
              Book a Free Consultation
            </Link>
            <Link href="/eligibility-check" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold border-2 text-white transition-colors duration-150" style={{ borderColor: "rgba(255,255,255,0.4)" }}>
              Check Your Eligibility
            </Link>
          </div>
          <div className="border-l-4 pl-4 py-2 text-xs" style={{ borderColor: "var(--color-gold)", color: "rgba(247,245,240,0.65)" }}>
            Apple Education & Immigration is a registered migration agency. MARN 2318293. Migration advice on this page is general in nature.
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-charcoal)" }}>
            Our MARA-registered agents provide expert guidance across all aspects of Employer Sponsored Visas applications. 
            Contact us to discuss your individual circumstances and receive tailored advice.
          </p>
          <Link href="/contact" className="inline-flex items-center px-6 py-3 rounded-full text-base font-semibold border-2 transition-colors duration-150" style={{ borderColor: "var(--color-gold)", color: "var(--color-navy)" }}>
            Get in Touch →
          </Link>
        </div>
      </section>

      <div className="py-6 border-t" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs" style={{ color: "var(--color-charcoal)", opacity: 0.6 }}>
            Apple Education & Immigration | MARN 2318293 | Registered Migration Agent. Migration advice is general in nature and does not constitute personal migration advice.
          </p>
        </div>
      </div>

      <section className="py-20" style={{ backgroundColor: "var(--color-gold)" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "var(--color-navy)" }}>
            Ready to Take the Next Step?
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
