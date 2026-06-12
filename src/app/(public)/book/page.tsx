import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { MaraDisclaimer } from "@/components/layout/MaraDisclaimer";
import { BookingForm } from "@/components/forms/BookingForm";
import { CheckIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description:
    "Book a free consultation with a MARA-registered migration agent. Phone, video, or in-person — no commitment, no jargon.",
  alternates: { canonical: "/book" },
};

const expectations = [
  "A registered migration agent reviews your goals and circumstances",
  "Honest assessment of which visa pathways are realistic for you",
  "Clear outline of timeframes, costs, and risks before you commit",
  "No obligation to proceed — the consultation is genuinely free",
];

export default function BookPage() {
  return (
    <>
      <PageHero
        title="Book a Free Consultation"
        subtitle="45 minutes with a registered migration agent — phone, video, or in person at our Sydney office."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Book a Consultation" }]}
      />
      <Section size="lg" bg="default">
        <Container className="grid gap-12 lg:grid-cols-[60%_1fr]">
          <div>
            <h2 className="mb-6 text-2xl font-semibold text-slate-900">Choose Your Time</h2>
            <BookingForm />
          </div>
          <aside>
            <div className="rounded-lg bg-white p-8 shadow-sm lg:sticky lg:top-[calc(var(--header-h)+16px)]">
              <h3 className="text-xl font-semibold text-slate-900">What to Expect</h3>
              <ul className="mt-4 space-y-3">
                {expectations.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-slate-600">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                      <CheckIcon className="size-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <hr className="my-6 border-slate-200" />
              <p className="text-sm text-slate-500">
                Prefer to talk now? Call{" "}
                <a href={site.phoneHref} className="font-semibold text-slate-900 hover:text-accent-hover">
                  {site.phone}
                </a>{" "}
                during business hours.
              </p>
              <MaraDisclaimer variant="inline" className="mt-6" />
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
