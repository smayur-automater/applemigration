import Link from "next/link";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import { footerNav } from "@/lib/navigation";
import { maraDisclaimerText, maraRegistrationLine, site } from "@/lib/site";

const socials = [
  { label: "LinkedIn", href: site.social.linkedIn,  Icon: Linkedin  },
  { label: "Facebook", href: site.social.facebook,  Icon: Facebook  },
  { label: "Instagram",href: site.social.instagram, Icon: Instagram },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-[var(--max-w-content)] px-[clamp(1rem,4vw,2rem)]">

        <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded bg-accent">
                <span className="text-xs font-bold text-white">AE</span>
              </div>
              <span className="text-sm font-semibold text-white">Apple E&amp;I</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Helping students, professionals, and families build their Australian future with honest, expert migration advice.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-8 items-center justify-center rounded border border-slate-700 text-slate-500 transition-colors duration-(--duration-fast) hover:border-slate-500 hover:text-slate-300"
                >
                  <Icon size={14} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer — services">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Services</p>
            <ul className="space-y-2">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors duration-(--duration-fast) hover:text-slate-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — company">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Company</p>
            <ul className="space-y-2">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors duration-(--duration-fast) hover:text-slate-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Contact</p>
            <address className="space-y-2 text-sm not-italic text-slate-400">
              <p>{site.address}</p>
              <p>
                <a href={site.phoneHref} className="transition-colors duration-(--duration-fast) hover:text-slate-200">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={site.emailHref} className="transition-colors duration-(--duration-fast) hover:text-slate-200">
                  {site.email}
                </a>
              </p>
              <p>Mon–Fri 9:00am–5:30pm AEST</p>
            </address>
          </div>
        </div>

        <div className="border-t border-slate-800 py-5 text-xs text-slate-500">
          <p className="font-medium text-slate-400">{maraRegistrationLine}</p>
          <p className="mt-1">{maraDisclaimerText}</p>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-800 py-4 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p className="flex flex-wrap gap-x-3">
            {footerNav.legal.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-slate-400">
                {link.label}
              </Link>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
