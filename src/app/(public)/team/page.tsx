import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { CTABanner } from "@/components/layout/CTABanner";
import { TeamMemberCard } from "@/components/cards/TeamMemberCard";
import { teamMembers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the MARA-registered migration agents and education consultants behind Apple Education & Immigration.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="Our Team"
        subtitle="Registered migration agents and education specialists who treat your application like their own."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Our Team" },
        ]}
      />
      <Section size="lg" bg="default">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </Container>
      </Section>
      <CTABanner
        variant="red"
        heading="Want to Work With Us?"
        subtext="Book a free consultation and meet the agent who'll handle your case personally."
      />
    </>
  );
}
