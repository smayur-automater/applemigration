import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MARA Disclosure",
};

// TODO: Build out the MARA Disclosure page
export default function Page() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h1
        className="text-3xl sm:text-4xl font-bold font-display mb-4"
        style={{ color: "var(--color-deep-navy)" }}
      >
        MARA Disclosure
      </h1>
      <p className="text-gray-500 italic">
        Content coming soon — this is a route stub for <code>/mara-disclosure</code>.
      </p>
    </section>
  );
}
