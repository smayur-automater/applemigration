import Link from "next/link";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-line bg-white px-6 lg:px-10">
      <form action="/clients" className="flex items-center gap-2">
        <input
          type="search"
          name="q"
          placeholder="Search clients…"
          aria-label="Search clients"
          className="h-9 w-56 rounded-full border border-line bg-off-white px-4 text-sm outline-none focus:border-gold lg:w-72"
        />
      </form>
      <div className="flex items-center gap-4">
        <Link
          href="/clients/new"
          className="rounded-full bg-navy px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
        >
          + New Client
        </Link>
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy"
          >
            PS
          </span>
          <div className="hidden text-sm leading-tight sm:block">
            <p className="font-semibold">Priya Sharma</p>
            <p className="text-xs text-charcoal/60">Owner · Sydney</p>
          </div>
        </div>
      </div>
    </header>
  );
}
