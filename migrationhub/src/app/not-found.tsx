import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="font-display text-4xl font-bold text-navy">Not found</h1>
      <p className="mt-2 text-charcoal/60">
        That record doesn&apos;t exist or may have been removed.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-light"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
