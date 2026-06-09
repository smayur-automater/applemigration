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
    { label: "Blog", href: "/blog" },
    { label: "FAQs", href: "/faqs" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "MARA Disclosure", href: "/mara-disclosure" },
  ],
};

export function Footer() {
  return (
    <footer
      style={{ backgroundColor: "var(--color-deep-navy)" }}
      className="text-white/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div>
            <p
              className="text-xl font-bold font-display mb-3"
              style={{ color: "var(--color-warm-gold)" }}
            >
              Apple Education &amp; Immigration
            </p>
            <p className="text-sm leading-relaxed">
              Trusted registered migration agents helping you navigate
              Australia&apos;s visa and education pathways.
            </p>
            <div className="mt-4">
              <Link
                href="/eligibility-check"
                className="inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold transition-colors"
                style={{
                  backgroundColor: "var(--color-warm-gold)",
                  color: "var(--color-deep-navy)",
                }}
              >
                Check My Eligibility
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                {group}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
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
          className="mt-10 pt-6 border-t text-xs text-white/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p>
            <strong className="text-white/70">MARA Disclosure:</strong>{" "}
            MARN: [TO BE INSERTED] |{" "}
            <a
              href="https://www.omara.gov.au"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/80 transition-colors"
            >
              omara.gov.au
            </a>
          </p>
          <p>
            &copy; {new Date().getFullYear()} Apple Education &amp; Immigration.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
