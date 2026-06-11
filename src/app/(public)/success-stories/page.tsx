import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { CTABanner } from "@/components/layout/CTABanner";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { testimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Success Stories — Real Visa Outcomes",
  description:
    "Real clients, real Australian visa outcomes — student visas, skilled migration, partner visas, and more, handled by Apple Education & Immigration.",
  alternates: { canonical: "/success-stories" },
};

export default function SuccessStoriesPage() {
  return (
    <>
      <PageHero
        title="Success Stories"
        subtitle="Real people, real outcomes — across every visa pathway we handle."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Success Stories" }]}
      />
      <Section size="lg" bg="default" aria-label="Client testimonials">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-charcoal/60">
            Testimonials reflect individual experiences. Every case is different, and past
            outcomes don&rsquo;t guarantee future results.
          </p>
        </Container>
      </Section>
      <CTABanner variant="red" heading="Ready to Write Your Own Success Story?" />
    </>
  );
}
