import type { Metadata } from "next";
import { EligibilityQuiz } from "./EligibilityQuiz";

export const metadata: Metadata = {
  title: "Check Your Australian Visa Eligibility — Free 3-Minute Quiz",
  description: "Answer 6 quick questions to find out which Australian visa you may be eligible for. Free, no account needed, takes 3 minutes.",
  robots: { index: true, follow: false },
};

export default function EligibilityCheckPage() {
  return (
    <div className="min-h-[calc(100svh-var(--header-h))]" style={{ backgroundColor: "var(--color-off-white)" }}>
      <div className="max-w-xl mx-auto px-4 py-12">
        <EligibilityQuiz />
      </div>
      {/* Help bar instead of footer */}
      <div className="border-t py-4 text-center text-sm" style={{ borderColor: "var(--color-border)", color: "var(--color-charcoal)" }}>
        Need help? <a href="tel:+61480047407" className="font-semibold underline" style={{ color: "var(--color-navy)" }}>Call us: +61 480 047 407</a>
      </div>
    </div>
  );
}
