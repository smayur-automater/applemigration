import Link from "next/link";

const footerLinks = {
  Services: [
    { label: "Student Visas", href: "/services/student-visas" },
    { label: "Skilled Migration", href: "/services/skilled-migration" },
    { label: "Partner & Family Visas", href: "/services/partner-family-visas" },
    { label: "Employer Sponsored", href: "/services/employer-sponsored" },
    { label: "Education Consulting", href: "/services/education-consulting" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Blog & Resources", href: "/blog" },
    { label: "FAQs", href: "/faqs" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "MARA Disclosure", href: "/mara-disclosure" },
  ],
};

const socialLinks = [
  { label: "Facebook", href: "#", icon: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  )},
  { label: "LinkedIn", href: "#", icon: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  )},
  { label: "Instagram", href: "#", icon: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )},
];

export function Footer() {
  return (
    <footer
      style={{ backgroundColor: "var(--color-deep-navy)" }}
      className="text-white/80"
    >
      {/* Pre-footer CTA band — ATMC-style */}
      <div
        className="py-10"
        style={{ backgroundColor: "var(--color-sky-blue)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-xl font-bold font-display mb-1">
              Ready to start your Australian journey?
            </h3>
            <p className="text-white/80 text-sm">
              Speak with a registered migration agent — first consultation is free.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/eligibility-check"
              className="px-5 py-2.5 rounded-md text-sm font-semibold border-2 border-white text-white hover:bg-white transition-colors"
              style={{ color: "white" }}
            >
              Check Eligibility
            </Link>
            <Link
              href="/book"
              className="px-5 py-2.5 rounded-md text-sm font-semibold transition-colors"
              style={{ backgroundColor: "var(--color-warm-gold)", color: "var(--color-deep-navy)" }}
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Brand column — spans 2 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-xl"
                style={{ backgroundColor: "var(--color-warm-gold)", color: "var(--color-deep-navy)" }}
              >
                A
              </div>
              <div>
                <p
                  className="text-base font-bold font-display leading-tight"
                  style={{ color: "var(--color-warm-gold)" }}
                >
                  Apple Education
                </p>
                <p className="text-xs text-white/50 leading-tight tracking-wide uppercase">
                  &amp; Immigration
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/70 mb-5 max-w-xs">
              Trusted, registered migration and education consultants helping
              students, families, and skilled workers build their future in
              Australia.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3
                className="font-semibold mb-4 text-xs uppercase tracking-wider"
                style={{ color: "var(--color-warm-gold)" }}
              >
                {group}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* MARA compliance bar */}
        <div
          className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p className="text-xs text-white/50">
            <strong className="text-white/70">MARA Registered:</strong>{" "}
            MARN: [TO BE INSERTED] — Migration advice regulated by{" "}
            <a
              href="https://www.omara.gov.au"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/80 transition-colors"
            >
              omara.gov.au
            </a>
          </p>
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Apple Education &amp; Immigration.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
