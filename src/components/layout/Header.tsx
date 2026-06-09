import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header
      style={{ backgroundColor: "var(--color-deep-navy)" }}
      className="text-white sticky top-0 z-50 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / wordmark */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className="text-xl font-bold font-display tracking-tight"
              style={{ color: "var(--color-warm-gold)" }}
            >
              Apple
            </span>
            <span className="text-xl font-semibold hidden sm:inline">
              Education &amp; Immigration
            </span>
          </Link>

          {/* Primary navigation */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/book"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold transition-colors"
            style={{
              backgroundColor: "var(--color-warm-gold)",
              color: "var(--color-deep-navy)",
            }}
          >
            Book Consultation
          </Link>

          {/* TODO: add mobile hamburger menu */}
        </div>
      </div>
    </header>
  );
}
