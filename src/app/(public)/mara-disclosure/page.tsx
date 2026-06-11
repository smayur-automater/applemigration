import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTABanner } from "@/components/layout/CTABanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "MARA Disclosure Statement",
  description:
    "Registration details, Code of Conduct obligations, complaints procedure, and client rights for Apple Education & Immigration, MARN 0000000.",
  alternates: { canonical: "/mara-disclosure" },
};

export default function MaraDisclosurePage() {
  return (
    <>
      <div className="py-16">
        <Container size="prose">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "MARA Disclosure" }]}
          />
          <h1 className="mt-8 font-display text-[clamp(2rem,4vw,3rem)] font-bold text-navy">
            MARA Disclosure Statement
          </h1>
          <p className="mt-2 text-sm text-charcoal/60">Last updated: 9 June 2026</p>
          <hr className="my-8 border-t-2 border-gold" />

          <div className="space-y-10 text-charcoal/90">
            <section>
              <h2 className="font-display text-2xl font-bold text-navy">Our Registration</h2>
              <p className="mt-3">
                {site.name} Pty Ltd provides immigration assistance through registered migration
                agents. Our principal agent is registered with the Office of the Migration Agents
                Registration Authority (OMARA) under Migration Agent Registration Number (MARN){" "}
                {site.marn}. You can verify our registration on the{" "}
                <a
                  href="https://www.mara.gov.au/search-the-register-of-migration-agents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-navy underline underline-offset-2 hover:text-gold-dark"
                >
                  MARA public register
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">Code of Conduct</h2>
              <p className="mt-3">
                All registered migration agents must comply with the Migration Agents Code of
                Conduct, prescribed under the Migration Act 1958 and the Migration Agents
                Regulations. The Code requires us to act lawfully, honestly, competently, and in
                your legitimate interests; to deal with you fairly; and to maintain
                confidentiality of your information. A copy of the Code is available from OMARA,
                and we provide a Consumer Guide to every client before commencing work.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">Complaints Procedure</h2>
              <p className="mt-3">
                If you are not satisfied with our service, please raise the issue with your agent
                or our principal first — most concerns can be resolved directly. If you remain
                dissatisfied, you may lodge a complaint with the Office of the Migration Agents
                Registration Authority at{" "}
                <a
                  href="https://www.mara.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-navy underline underline-offset-2 hover:text-gold-dark"
                >
                  mara.gov.au
                </a>
                . OMARA can investigate complaints about registered agents and impose
                disciplinary sanctions.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">Fees and Charges</h2>
              <p className="mt-3">
                Before you engage us, we provide a written Agreement for Services and Fees
                setting out the services we will perform, our professional fees, and any
                disbursements (such as government application charges). Fees vary with the visa
                type and complexity of your matter; estimates given before a consultation are
                indicative only. You will never be charged professional fees that were not
                disclosed and agreed in writing.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">Cooling-Off Period</h2>
              <p className="mt-3">
                Consistent with the Code of Conduct and applicable consumer law, you may withdraw
                from an Agreement for Services and Fees within the cooling-off period specified
                in your agreement. Where you withdraw, you are liable only for fees and
                disbursements reasonably incurred for work already performed.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Limitations of This Website
              </h2>
              <p className="mt-3">
                Information on this website is general in nature and does not constitute personal
                migration advice. Australian migration law and policy change frequently, and the
                right pathway depends on your individual circumstances. Do not act on general
                information alone — obtain advice from a registered migration agent about your
                specific situation.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">Contact</h2>
              <p className="mt-3">
                {site.name}
                <br />
                {site.address}
                <br />
                Phone:{" "}
                <a href={site.phoneHref} className="font-semibold text-navy underline underline-offset-2 hover:text-gold-dark">
                  {site.phone}
                </a>
                <br />
                Email:{" "}
                <a href={site.emailHref} className="font-semibold text-navy underline underline-offset-2 hover:text-gold-dark">
                  {site.email}
                </a>
              </p>
            </section>
          </div>
        </Container>
      </div>
      <CTABanner variant="light" />
    </>
  );
}
