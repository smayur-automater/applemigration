import type { Metadata } from "next";
import { EligibilityQuiz } from "@/components/quiz/EligibilityQuiz";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Check Your Australian Visa Eligibility — Free 3-Minute Quiz",
  description:
    "Answer a few quick questions and discover which Australian visa pathways match your situation. Free, no account needed.",
  robots: { index: true, follow: false },
  alternates: { canonical: "/eligibility-check" },
};

export default function EligibilityCheckPage() {
  return (
    <div className="flex min-h-[calc(100svh-var(--header-h))] flex-col bg-off-white">
      <div className="flex flex-1 items-start justify-center px-4 py-10 sm:py-16">
        <div className="w-full">
          <h1 className="sr-only">Australian visa eligibility check</h1>
          <EligibilityQuiz />
        </div>
      </div>
      <div className="bg-surface py-4 text-center text-sm text-charcoal/80">
        Need help?{" "}
        <a href={site.phoneHref} className="font-semibold text-navy underline underline-offset-2 hover:text-gold-dark">
          Call us on {site.phone}
        </a>
      </div>
    </div>
  );
}
