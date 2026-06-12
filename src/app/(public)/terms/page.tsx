import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing your use of the Apple Education & Immigration website.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    heading: "General Information Only",
    body: "Content on this website is general information about Australian visas, migration, and education. It is not personal migration advice and must not be relied on as such. Migration law and policy change frequently; always obtain advice about your individual circumstances from a registered migration agent before acting.",
  },
  {
    heading: "No Agent–Client Relationship",
    body: "Using this website, submitting a form, or completing the eligibility quiz does not create an agent–client relationship. That relationship commences only when both parties sign a written Agreement for Services and Fees.",
  },
  {
    heading: "Eligibility Quiz",
    body: "Quiz results are indicative only, based solely on the answers you provide, and do not constitute migration advice or any guarantee of visa eligibility or grant.",
  },
  {
    heading: "Intellectual Property",
    body: "All content on this website, including text, design, and graphics, is owned by or licensed to us. You may view and print pages for personal use; any other reproduction requires our written permission.",
  },
  {
    heading: "Third-Party Links",
    body: "This website links to external sites (including government websites). We are not responsible for the content or availability of external sites, and links are not endorsements.",
  },
  {
    heading: "Limitation of Liability",
    body: "To the extent permitted by law, we exclude liability for any loss arising from reliance on general information published on this website. Nothing in these terms limits rights that cannot be excluded under the Australian Consumer Law.",
  },
  {
    heading: "Governing Law",
    body: "These terms are governed by the laws of New South Wales, Australia.",
  },
];

export default function TermsPage() {
  return (
    <div className="py-16">
      <Container size="prose">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]} />
        <h1 className="mt-8 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-slate-900">
          Terms of Use
        </h1>
        <p className="mt-2 text-sm text-slate-400">Last updated: 9 June 2026</p>
        <p className="mt-6 text-slate-700/90">
          These terms govern your use of the {site.name} website. By using the site you accept
          these terms.
        </p>
        <div className="mt-10 space-y-8 text-slate-700/90">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{s.heading}</h2>
              <p className="mt-3">{s.body}</p>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
