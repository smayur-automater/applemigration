import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MARA Disclosure Statement",
  description: "Apple Education & Immigration MARA disclosure statement — registration details, code of conduct, complaints procedure, fees, and disclaimers.",
};

export default function MARADisclosurePage() {
  return (
    <div className="py-16" style={{ backgroundColor: "var(--color-off-white)" }}>
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm" style={{ color: "var(--color-charcoal)", opacity: 0.6 }}>
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">MARA Disclosure</li>
          </ol>
        </nav>

        <h1 className="font-display font-bold mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--color-navy)" }}>
          MARA Disclosure Statement
        </h1>
        <p className="text-sm mb-4" style={{ color: "var(--color-charcoal)", opacity: 0.6 }}>
          Last updated: 9 June 2026
        </p>

        <hr className="mb-8 border-t-2" style={{ borderColor: "var(--color-gold)" }} />

        <div className="prose-content space-y-10">
          <section>
            <h2 className="font-display font-bold text-2xl mb-4" style={{ color: "var(--color-navy)" }}>Our Registration</h2>
            <p className="text-base leading-relaxed mb-3" style={{ color: "var(--color-charcoal)" }}>
              <strong>Agency name:</strong> Apple Education & Immigration Pty Ltd<br />
              <strong>Migration Agent Registration Number (MARN):</strong> 0000000<br />
              <strong>Registered by:</strong> Office of the Migration Agents Registration Authority (OMARA)
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
              Our registration can be verified on the{" "}
              <a href="https://www.omara.gov.au/find-a-registered-migration-agent/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--color-gold)" }}>
                OMARA public register
              </a>. Only registered migration agents, legal practitioners, and exempt persons may provide migration advice for a fee.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl mb-4" style={{ color: "var(--color-navy)" }}>Code of Conduct</h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
              All migration agents registered with OMARA are bound by the{" "}
              <a href="https://www.omara.gov.au/for-agents/code-of-conduct/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--color-gold)" }}>
                Migration Agents Code of Conduct
              </a>{" "}
              prescribed in the Migration Agents Regulations 1998. This Code requires agents to act in the lawful interests of their clients, maintain client confidentiality, and provide competent and professional service.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl mb-4" style={{ color: "var(--color-navy)" }}>Complaints Procedure</h2>
            <p className="text-base leading-relaxed mb-3" style={{ color: "var(--color-charcoal)" }}>
              If you have a complaint about the migration advice or service you have received, please contact us directly at{" "}
              <a href="mailto:complaints@applemigration.com.au" className="underline" style={{ color: "var(--color-gold)" }}>
                complaints@applemigration.com.au
              </a>.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
              If we are unable to resolve your complaint to your satisfaction, you may escalate it to OMARA at{" "}
              <a href="https://www.omara.gov.au/make-a-complaint/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--color-gold)" }}>
                omara.gov.au/make-a-complaint
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl mb-4" style={{ color: "var(--color-navy)" }}>Fees and Charges</h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
              A detailed schedule of fees and charges will be provided to you prior to engagement in the form of a written Client Agreement. We do not commence paid work until a signed Client Agreement and payment of the agreed deposit has been received. The initial consultation is provided free of charge.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl mb-4" style={{ color: "var(--color-navy)" }}>Cooling-Off Period</h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
              Clients have the right to a cooling-off period as provided under the Migration Act 1958 and the Migration Agents Regulations 1998. Where applicable, you have five (5) business days from the date of signing a Client Agreement to cancel the agreement without penalty. Please contact us in writing within this period if you wish to exercise this right.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl mb-4" style={{ color: "var(--color-navy)" }}>Limitations of This Website</h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
              The information on this website is general in nature and does not constitute personal migration advice. Immigration law is complex and changes frequently. The content on this website reflects the law as at the date of publication and may not reflect subsequent changes. Nothing on this website should be relied upon as a substitute for professional advice specific to your individual circumstances.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl mb-4" style={{ color: "var(--color-navy)" }}>Contact</h2>
            <address className="not-italic text-base leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
              <strong>Apple Education & Immigration Pty Ltd</strong><br />
              Suite 100, 123 Collins Street, Melbourne VIC 3000<br />
              <a href="tel:+61480047407" className="underline" style={{ color: "var(--color-gold)" }}>+61 480 047 407</a><br />
              <a href="mailto:info@applemigration.com.au" className="underline" style={{ color: "var(--color-gold)" }}>info@applemigration.com.au</a>
            </address>
          </section>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 p-10 rounded-2xl text-center" style={{ backgroundColor: "var(--color-navy)" }}>
          <h2 className="font-display font-bold text-white text-2xl mb-3">Book a Free Consultation</h2>
          <p className="text-base mb-6" style={{ color: "rgba(247,245,240,0.8)" }}>
            Speak with a MARA-registered agent — no commitment, no jargon.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold transition-all duration-250"
            style={{ backgroundColor: "var(--color-gold)", color: "var(--color-navy)" }}
          >
            Book Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
