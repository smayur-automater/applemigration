import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apple Education & Immigration | Registered Migration Agents",
  description:
    "Trusted registered migration agents helping you achieve your Australian visa and education goals.",
};

// TODO: Replace this stub with the full Home page design
export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1
        className="text-4xl sm:text-5xl font-bold font-display mb-4"
        style={{ color: "var(--color-deep-navy)" }}
      >
        Apple Education &amp; Immigration
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mb-8">
        Trusted registered migration agents helping you navigate Australia&apos;s
        visa and education pathways.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/eligibility-check"
          className="px-6 py-3 rounded-md font-semibold text-sm transition-colors"
          style={{
            backgroundColor: "var(--color-warm-gold)",
            color: "var(--color-deep-navy)",
          }}
        >
          Check My Eligibility
        </Link>
        <Link
          href="/services"
          className="px-6 py-3 rounded-md font-semibold text-sm border-2 transition-colors"
          style={{
            borderColor: "var(--color-deep-navy)",
            color: "var(--color-deep-navy)",
          }}
        >
          Our Services
        </Link>
      </div>
    </section>
  );
}
