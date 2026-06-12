import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Apple Education & Immigration collects, uses, stores, and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  {
    heading: "What We Collect",
    body: "We collect personal information you provide through our contact and booking forms, the eligibility quiz, email, phone, and consultations — including your name, contact details, citizenship, visa history, and details relevant to your migration or education matter. Sensitive information (such as health or character information) is collected only where required for your application and with your consent.",
  },
  {
    heading: "How We Use Your Information",
    body: "We use your information to respond to enquiries, provide migration and education services, prepare and lodge applications on your behalf, and comply with our legal obligations — including record-keeping duties under the Migration Agents Code of Conduct. With your consent, we may also send you relevant updates about your matter or changes in migration law.",
  },
  {
    heading: "Disclosure",
    body: "We disclose your information to the Department of Home Affairs and related agencies as required for your applications, to education providers where you ask us to arrange enrolment, and to service providers (such as secure document storage) bound by confidentiality obligations. We do not sell your information or share it for third-party marketing.",
  },
  {
    heading: "Storage and Security",
    body: "Your information is stored on secure, access-controlled systems. We retain client records for the period required by the Code of Conduct and applicable law, after which they are securely destroyed.",
  },
  {
    heading: "Access and Correction",
    body: "You may request access to the personal information we hold about you, and ask us to correct it, by contacting our office. We respond to access requests within a reasonable time and in accordance with the Australian Privacy Principles.",
  },
  {
    heading: "Cookies and Analytics",
    body: "Our website uses only the cookies necessary for it to function, plus privacy-respecting analytics that do not identify you personally. We do not use advertising trackers.",
  },
  {
    heading: "Complaints and Contact",
    body: `Questions or concerns about privacy can be directed to ${site.email} or ${site.phone}. If you are not satisfied with our response, you may complain to the Office of the Australian Information Commissioner (oaic.gov.au).`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16">
      <Container size="prose">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
        <h1 className="mt-8 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-slate-900">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-400">Last updated: 9 June 2026</p>
        <p className="mt-6 text-slate-700/90">
          {site.name} is committed to protecting your personal information in accordance with
          the Privacy Act 1988 (Cth), the Australian Privacy Principles, and the
          confidentiality obligations of the Migration Agents Code of Conduct.
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
