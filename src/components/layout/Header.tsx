"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";

const services = [
  { label: "Student Visas", href: "/services/student-visas" },
  { label: "Skilled Migration", href: "/services/skilled-migration" },
  { label: "Partner & Family Visas", href: "/services/partner-family-visas" },
  { label: "Employer Sponsored", href: "/services/employer-sponsored" },
  { label: "Education Consulting", href: "/services/education-consulting" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", children: services },
  { label: "Blog", href: "/blog" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const sentinel = document.getElementById("scroll-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  const openDropdown = () => {
    clearTimeout(dropdownTimeout.current);
    setServicesOpen(true);
  };

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--color-gold)] focus:text-[var(--color-navy)] focus:font-semibold"
      >
        Skip to main content
      </a>

      <header
        className="sticky top-0 z-[200] bg-white transition-shadow duration-200"
        style={{ boxShadow: scrolled ? "var(--shadow-md)" : "none", height: "var(--header-h)" }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Apple Education & Immigration — Home">
            <span className="text-2xl font-bold font-display" style={{ color: "var(--color-gold)" }}>🍎</span>
            <span className="text-lg font-bold font-display hidden sm:block" style={{ color: "var(--color-navy)" }}>
              Apple Education & Immigration
            </span>
            <span className="text-lg font-bold font-display sm:hidden" style={{ color: "var(--color-navy)" }}>
              Apple E&I
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.href}
                  ref={servicesRef}
                  className="relative"
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                  onFocus={openDropdown}
                  onBlur={closeDropdown}
                >
                  <button
                    aria-haspopup="true"
                    aria-expanded={servicesOpen}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                    style={{ color: isActive(link.href) ? "var(--color-gold)" : "var(--color-navy)" }}
                  >
                    {link.label}
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 transition-transform duration-200"
                      style={{ transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {servicesOpen && (
                    <div
                      role="menu"
                      className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg py-2"
                      style={{ boxShadow: "var(--shadow-lg)", zIndex: 100 }}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          className="block px-4 py-2 text-sm transition-colors duration-150 hover:bg-[var(--color-surface)]"
                          style={{ color: "var(--color-navy)" }}
                          onClick={() => setServicesOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                  style={{ color: isActive(link.href) ? "var(--color-gold)" : "var(--color-navy)" }}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-0.5"
                      style={{ backgroundColor: "var(--color-gold)" }}
                    />
                  )}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/eligibility-check"
              className="px-4 py-2 text-sm font-semibold rounded-full border-2 transition-colors duration-150"
              style={{ borderColor: "var(--color-gold)", color: "var(--color-navy)" }}
            >
              Check Eligibility
            </Link>
            <Link
              href="/book"
              className="px-4 py-2 text-sm font-semibold rounded-full text-white transition-colors duration-150"
              style={{ backgroundColor: "var(--color-navy)" }}
            >
              Book Free Consult
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="lg:hidden p-2 rounded-md"
            style={{ color: "var(--color-navy)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[400] lg:hidden"
          onClick={(e) => e.target === e.currentTarget && closeMobile()}
        >
          <div className="absolute inset-0 bg-navy/50" style={{ backgroundColor: "rgba(26,46,74,0.5)" }} />
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto"
            style={{ boxShadow: "var(--shadow-2xl)" }}
          >
            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "var(--color-border)" }}>
              <span className="font-bold font-display" style={{ color: "var(--color-navy)" }}>Menu</span>
              <button
                onClick={closeMobile}
                aria-label="Close navigation menu"
                className="p-2 rounded-md"
                style={{ color: "var(--color-navy)" }}
              >
                <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="p-4" aria-label="Mobile navigation">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    {link.children ? (
                      <>
                        <button
                          className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium"
                          style={{ color: "var(--color-navy)" }}
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          aria-expanded={mobileServicesOpen}
                        >
                          {link.label}
                          <svg aria-hidden="true" className="w-4 h-4 transition-transform duration-200" style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {mobileServicesOpen && (
                          <ul className="ml-4 mt-1 space-y-1">
                            {link.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="block px-3 py-2 rounded-md text-sm"
                                  style={{ color: "var(--color-navy)" }}
                                  onClick={closeMobile}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        className="block px-3 py-2 rounded-md text-sm font-medium"
                        style={{ color: isActive(link.href) ? "var(--color-gold)" : "var(--color-navy)" }}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        onClick={closeMobile}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t space-y-3" style={{ borderColor: "var(--color-border)" }}>
              <Link
                href="/eligibility-check"
                className="block w-full text-center px-4 py-3 text-sm font-semibold rounded-full border-2 transition-colors"
                style={{ borderColor: "var(--color-gold)", color: "var(--color-navy)" }}
                onClick={closeMobile}
              >
                Check Your Eligibility
              </Link>
              <Link
                href="/book"
                className="block w-full text-center px-4 py-3 text-sm font-semibold rounded-full text-white transition-colors"
                style={{ backgroundColor: "var(--color-navy)" }}
                onClick={closeMobile}
              >
                Book Free Consult
              </Link>
            </div>

            <div className="p-4 text-xs" style={{ color: "var(--color-charcoal)" }}>
              <p>📞 <a href="tel:+61480047407" className="hover:underline">+61 480 047 407</a></p>
              <p className="mt-1">✉ <a href="mailto:team@applemigration.com.au" className="hover:underline">team@applemigration.com.au</a></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
