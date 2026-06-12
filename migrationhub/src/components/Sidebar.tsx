"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Dashboard", icon: "◫" },
  { href: "/clients", label: "Clients", icon: "👤" },
  { href: "/applications", label: "Applications", icon: "📄" },
  { href: "/universities", label: "Universities", icon: "🎓" },
  { href: "/agents", label: "Agents", icon: "🤝" },
  { href: "/commissions", label: "Commissions", icon: "💰" },
  { href: "/visas", label: "Visas", icon: "🛂" },
  { href: "/classes", label: "Classes", icon: "🗓" },
  { href: "/settings", label: "Settings", icon: "⚙" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 hidden h-svh w-60 shrink-0 flex-col bg-navy text-off-white md:flex"
    >
      <Link href="/" className="px-6 pt-6 pb-8">
        <span className="font-display text-2xl font-bold text-white">
          Migration<span className="text-gold">Hub</span>
        </span>
        <span className="mt-1 block text-xs tracking-wide text-off-white/60">
          Education &amp; Migration CRM
        </span>
      </Link>
      <ul className="flex-1 space-y-1 px-3">
        {NAV.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-navy-light text-gold"
                    : "text-off-white/80 hover:bg-navy-light hover:text-white"
                }`}
              >
                <span aria-hidden="true" className="w-5 text-center">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="border-t border-white/10 px-6 py-4 text-xs text-off-white/50">
        Demo tenant: Apple Education &amp; Immigration
      </div>
    </nav>
  );
}
