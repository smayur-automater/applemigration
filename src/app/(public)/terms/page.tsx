import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
};

// TODO: Build out the Terms of Use page
export default function Page() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h1
        className="text-3xl sm:text-4xl font-bold font-display mb-4"
        style={{ color: "var(--color-deep-navy)" }}
      >
        Terms of Use
      </h1>
      <p className="text-gray-500 italic">
        Content coming soon — this is a route stub for <code>/terms</code>.
      </p>
    </section>
  );
}
