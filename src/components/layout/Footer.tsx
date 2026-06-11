import Link from "next/link";
import { footerNav } from "@/lib/navigation";
import { maraDisclaimerText, maraRegistrationLine, site } from "@/lib/site";

const socials = [
  {
    label: "LinkedIn profile",
    href: site.social.linkedIn,
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z",
  },
  {
    label: "Facebook profile",
    href: site.social.facebook,
    path: "M13.5 21v-7h2.4l.36-2.8H13.5V9.4c0-.81.22-1.36 1.38-1.36h1.48V5.55c-.26-.03-1.14-.11-2.16-.11-2.14 0-3.6 1.3-3.6 3.7v2.06H8.2V14h2.4v7h2.9Z",
  },
  {
    label: "Instagram profile",
    href: site.social.instagram,
    path: "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.85-7.8a1.07 1.07 0 1 1-2.15 0 1.07 1.07 0 0 1 2.15 0ZM12 4.5c2.07 0 2.33 0 3.15.05.81.04 1.25.17 1.55.29.39.15.67.33.96.62.29.29.47.57.62.96.12.3.25.74.29 1.55.04.82.05 1.08.05 3.15s0 2.33-.05 3.15c-.04.81-.17 1.25-.29 1.55-.15.39-.33.67-.62.96-.29.29-.57.47-.96.62-.3.12-.74.25-1.55.29-.82.04-1.08.05-3.15.05s-2.33 0-3.15-.05c-.81-.04-1.25-.17-1.55-.29a2.6 2.6 0 0 1-.96-.62 2.6 2.6 0 0 1-.62-.96c-.12-.3-.25-.74-.29-1.55C5.4 14.33 5.4 14.07 5.4 12s0-2.33.05-3.15c.04-.81.17-1.25.29-1.55.15-.39.33-.67.62-.96.29-.29.57-.47.96-.62.3-.12.74-.25 1.55-.29C9.67 4.5 9.93 4.5 12 4.5Zm0-1.6c-2.1 0-2.37.01-3.2.05-.83.04-1.4.17-1.89.36-.51.2-.95.47-1.38.9-.43.43-.7.87-.9 1.38-.19.5-.32 1.06-.36 1.89-.04.83-.05 1.1-.05 3.2s.01 2.37.05 3.2c.04.83.17 1.4.36 1.89.2.51.47.95.9 1.38.43.43.87.7 1.38.9.5.19 1.06.32 1.89.36.83.04 1.1.05 3.2.05s2.37-.01 3.2-.05c.83-.04 1.4-.17 1.89-.36.51-.2.95-.47 1.38-.9.43-.43.7-.87.9-1.38.19-.5.32-1.06.36-1.89.04-.83.05-1.1.05-3.2s-.01-2.37-.05-3.2c-.04-.83-.17-1.4-.36-1.89-.2-.51-.47-.95-.9-1.38a3.8 3.8 0 0 0-1.38-.9c-.5-.19-1.06-.32-1.89-.36-.83-.04-1.1-.05-3.2-.05Z",
  },
];

export function Footer() {
  return (
    <footer className="bg-red text-white">
      <div className="mx-auto max-w-[var(--max-w-content)] px-[clamp(1rem,4vw,2rem)]">
        {/* Top strip */}
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl font-bold text-white">
              Apple <span className="text-white">Education &amp; Immigration</span>
            </p>
            <p className="mt-3 text-sm text-white/75">
              Helping students, professionals, and families build their Australian future with
              honest, expert migration advice.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-(--duration-fast) hover:bg-white/20"
                >
                  <svg aria-hidden="true" className="size-5 fill-current" viewBox="0 0 24 24">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer — services">
            <h3 className="mb-4 font-semibold text-off-white">Our Services</h3>
            <ul className="space-y-2.5">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors duration-(--duration-fast) hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — company">
            <h3 className="mb-4 font-semibold text-off-white">Company</h3>
            <ul className="space-y-2.5">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors duration-(--duration-fast) hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 font-semibold text-off-white">Contact Us</h3>
            <address className="space-y-2.5 text-sm not-italic text-white/75">
              <p>{site.address}</p>
              <p>
                <a href={site.phoneHref} className="transition-colors duration-(--duration-fast) hover:text-white hover:underline">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={site.emailHref} className="transition-colors duration-(--duration-fast) hover:text-white hover:underline">
                  {site.email}
                </a>
              </p>
              <p>
                Mon–Fri 9:00am–5:30pm AEST
                <br />
                Sat–Sun Closed
              </p>
            </address>
          </div>
        </div>

        {/* MARA bar */}
        <div
          aria-label="MARA registration and legal disclaimer"
          className="flex flex-col gap-2 border-t border-white/15 py-6 text-xs text-off-white/70 lg:flex-row lg:items-center lg:justify-between"
        >
          <p className="font-semibold">{maraRegistrationLine}</p>
          <p className="lg:max-w-xl lg:text-right">{maraDisclaimerText}</p>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col gap-2 border-t border-white/15 py-4 text-xs text-off-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p className="flex flex-wrap gap-x-2">
            {footerNav.legal.map((link, i) => (
              <span key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors duration-(--duration-fast) hover:text-white hover:underline"
                >
                  {link.label}
                </Link>
                {i < footerNav.legal.length - 1 && <span aria-hidden="true"> ·</span>}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
