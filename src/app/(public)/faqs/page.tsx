import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { CTABanner } from "@/components/layout/CTABanner";
import { Accordion } from "@/components/ui/Accordion";
import { generalFaqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about working with a MARA-registered migration agent — fees, timeframes, refusals, and what to expect.",
  alternates: { canonical: "/faqs" },
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Straight answers about fees, timeframes, and how we work. Can't find yours? Just ask."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
      />
      <Section size="lg" bg="default">
        <Container size="prose">
          <Accordion items={generalFaqs} allowMultiple />
        </Container>
      </Section>
      <CTABanner
        variant="red"
        heading="Still Have Questions?"
        subtext="Book a free consultation or send us a message — we respond within 1 business day."
      />
    </>
  );
}
