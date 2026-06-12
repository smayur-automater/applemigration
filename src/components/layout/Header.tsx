"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { mainNav } from "@/lib/navigation";
import { site } from "@/lib/site";

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${site.name} — home`}>
      <div className="flex size-7 items-center justify-center rounded bg-accent" aria-hidden="true">
        <span className="text-xs font-bold text-white">AE</span>
      </div>
      <span className="text-sm font-semibold text-slate-900">
        Apple <span className="hidden sm:inline text-slate-500 font-normal">Education &amp; Immigration</span>
      </span>
    </Link>
  );
}

function DesktopDropdown({
  label, href, items, active,
}: {
  label: string;
  href: string;
  items: { label: string; href: string }[];
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const openMenu = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), 150);
  }, []);
  const close = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [close]);

  return (
    <div ref={ref} className="relative" onMouseEnter={openMenu} onMouseLeave={close}
      onBlur={(e) => { if (!ref.current?.contains(e.relatedTarget as Node)) close(); }}>
      <Link
        href={href}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-current={active ? "page" : undefined}
        onFocus={() => setOpen(true)}
        className={`flex items-center gap-1 py-1 text-sm transition-colors duration-(--duration-fast) ${
          active ? "text-slate-900 font-medium" : "text-slate-500 hover:text-slate-900"
        }`}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          size={14}
          strokeWidth={2}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </Link>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-(--z-dropdown) mt-1 min-w-52 rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              role="menuitem"
              href={item.href}
              onClick={close}
              className="block px-3 py-2 text-sm text-slate-600 transition-colors duration-(--duration-fast) hover:bg-slate-50 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    const focusables = drawer.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    focusables[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      const list = drawer.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-(--z-modal) lg:hidden">
      <button aria-label="Close menu" onClick={onClose} className="absolute inset-0 bg-slate-900/40" tabIndex={-1} />
      <div
        ref={drawerRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="absolute right-0 top-0 flex h-full w-72 flex-col overflow-y-auto bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <Logo />
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="flex-1 px-2 py-3">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <>
                    <button
                      aria-expanded={expanded === item.label}
                      onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        strokeWidth={2}
                        className={`transition-transform duration-200 ${expanded === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {expanded === item.label && (
                      <ul className="mt-0.5 ml-2 border-l border-slate-100 pl-3 pb-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="block rounded py-1.5 text-sm text-slate-500 hover:text-slate-900"
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
                    href={item.href}
                    onClick={onClose}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-slate-100 p-4 flex flex-col gap-2">
          <Link
            href="/eligibility-check"
            onClick={onClose}
            className="flex h-9 items-center justify-center rounded-md border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Check Eligibility
          </Link>
          <Link
            href="/book"
            onClick={onClose}
            className="flex h-9 items-center justify-center rounded-md bg-accent text-sm font-medium text-white hover:bg-accent-hover"
          >
            Book Free Consult
          </Link>
          <Link
            href="/staff/login"
            onClick={onClose}
            className="text-center text-xs text-slate-400 hover:text-slate-600 py-1"
          >
            Staff Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:0;height:1px;width:1px;pointer-events:none;";
    document.body.prepend(sentinel);
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => { observer.disconnect(); sentinel.remove(); };
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-(--z-toast) focus:rounded focus:bg-accent focus:px-3 focus:py-1.5 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>
      <header
        className={`sticky top-0 z-(--z-sticky) h-[var(--header-h-mobile)] bg-white transition-shadow duration-200 lg:h-[var(--header-h)] ${
          scrolled ? "shadow-sm border-b border-slate-200" : "border-b border-slate-100"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[var(--max-w-content)] items-center justify-between gap-6 px-[clamp(1rem,4vw,2rem)]">
          <Logo />

          <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex">
            {mainNav.map((item) =>
              item.children ? (
                <DesktopDropdown
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  items={item.children}
                  active={isActive(item.href)}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`py-1 text-sm transition-colors duration-(--duration-fast) ${
                    isActive(item.href)
                      ? "text-slate-900 font-medium"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/eligibility-check"
              className="h-8 rounded-md border border-slate-200 px-3 text-sm font-medium text-slate-600 transition-colors duration-(--duration-fast) hover:bg-slate-50 hover:text-slate-900 inline-flex items-center"
            >
              Check Eligibility
            </Link>
            <Link
              href="/book"
              className="h-8 rounded-md bg-accent px-3 text-sm font-medium text-white transition-colors duration-(--duration-fast) hover:bg-accent-hover inline-flex items-center"
            >
              Book Free Consult
            </Link>
            <div className="mx-1 h-4 w-px bg-slate-200" aria-hidden="true" />
            <Link
              href="/staff/login"
              className="text-xs text-slate-400 transition-colors hover:text-slate-600"
            >
              Staff Login
            </Link>
          </div>

          <button
            ref={hamburgerRef}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
            className="flex size-8 items-center justify-center rounded text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          >
            <Menu size={20} strokeWidth={2} />
          </button>
        </div>
      </header>
      {menuOpen && <MobileMenu onClose={closeMenu} />}
    </>
  );
}
