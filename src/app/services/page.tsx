import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { CTABanner } from "@/components/layout/CTABanner";
import { MaraDisclaimer } from "@/components/layout/MaraDisclaimer";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { serviceIcons } from "@/components/services/ServicePage";
import { serviceSummaries } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Our Services — Australian Visa & Education Services",
  description:
    "Student visas, skilled migration, partner and family visas, employer sponsorship, and education consulting — all handled by MARA-registered agents.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Every major Australian visa pathway, plus education consulting — managed end to end by registered migration agents."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <Section size="lg" bg="default">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceSummaries.map((s) => (
              <ServiceCard
                key={s.slug}
                icon={serviceIcons[s.slug]}
                title={s.title}
                description={s.description}
                href={`/services/${s.slug}`}
              />
            ))}
          </div>
          <div className="mt-12">
            <MaraDisclaimer variant="inline" />
          </div>
        </Container>
      </Section>
      <CTABanner variant="navy" heading="Not Sure Which Service You Need?" subtext="Take the free 3-minute eligibility check, or book a consultation and we'll point you in the right direction." />
    </>
  );
}
