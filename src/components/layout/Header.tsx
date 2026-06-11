"use client";

import Link from "next/link";
import { useState } from "react";

const serviceLinks = [
  { label: "Student Visas", href: "/services/student-visas", icon: "🎓" },
  { label: "Skilled Migration", href: "/services/skilled-migration", icon: "💼" },
  { label: "Partner & Family Visas", href: "/services/partner-family-visas", icon: "❤️" },
  { label: "Employer Sponsored", href: "/services/employer-sponsored", icon: "🏢" },
  { label: "Education Consulting", href: "/services/education-consulting", icon: "📚" },
];

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <>
      {/* Top utility bar — Aussizz-style trust strip */}
      <div
        className="hidden md:block text-xs py-2"
        style={{ backgroundColor: "var(--color-warm-gold)", color: "var(--color-deep-navy)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <span className="font-medium">
            📞 Free consultation — call us or book online today
          </span>
          <div className="flex items-center gap-4">
            <span>✅ MARA Registered Agents</span>
            <span>|</span>
            <a href="https://wa.me/" className="hover:underline font-semibold">
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        style={{ backgroundColor: "var(--color-deep-navy)" }}
        className="sticky top-0 z-50 shadow-lg text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-lg"
                style={{ backgroundColor: "var(--color-warm-gold)", color: "var(--color-deep-navy)" }}
              >
                A
              </div>
              <div className="hidden sm:block">
                <div
                  className="text-base font-bold font-display leading-tight"
                  style={{ color: "var(--color-warm-gold)" }}
                >
                  Apple
                </div>
                <div className="text-[11px] text-white/60 leading-tight tracking-wide uppercase">
                  Education &amp; Immigration
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
              {/* Services mega-dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-md hover:bg-white/10">
                  Services
                  <svg className="w-3.5 h-3.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {servicesOpen && (
                  <div
                    className="absolute top-full left-0 mt-1 w-64 rounded-xl shadow-2xl py-2 z-50"
                    style={{ backgroundColor: "var(--color-deep-navy)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {serviceLinks.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <span>{s.icon}</span>
                        {s.label}
                      </Link>
                    ))}
                    <div className="mx-4 mt-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                      <Link
                        href="/services"
                        className="text-xs font-semibold transition-colors"
                        style={{ color: "var(--color-warm-gold)" }}
                      >
                        View all services →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-md hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/eligibility-check"
                className="px-4 py-2 text-sm font-semibold rounded-md border transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}
              >
                Check Eligibility
              </Link>
              <Link
                href="/book"
                className="px-4 py-2 text-sm font-semibold rounded-md transition-colors"
                style={{ backgroundColor: "var(--color-warm-gold)", color: "var(--color-deep-navy)" }}
              >
                Book Free Consultation
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t"
            style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "var(--color-deep-navy)" }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40 px-3 pb-1">Services</p>
              {serviceLinks.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <span>{s.icon}</span>
                  {s.label}
                </Link>
              ))}
              <div className="pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }} />
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <Link
                  href="/eligibility-check"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center px-4 py-3 rounded-md text-sm font-semibold border transition-colors"
                  style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}
                >
                  Check Eligibility
                </Link>
                <Link
                  href="/book"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center px-4 py-3 rounded-md text-sm font-semibold transition-colors"
                  style={{ backgroundColor: "var(--color-warm-gold)", color: "var(--color-deep-navy)" }}
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Floating WhatsApp button — Aussizz signature element */}
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
        style={{ backgroundColor: "#25D366" }}
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
