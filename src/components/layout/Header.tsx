"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { mainNav } from "@/lib/navigation";
import { site } from "@/lib/site";

function Logo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center"
      aria-label={`${site.name} — home`}
    >
      <span className="text-[15px] font-semibold leading-none tracking-tight text-slate-900">
        Apple
        <span className="font-normal text-slate-400">
          <span className="hidden sm:inline"> Education &amp; Immigration</span>
          <span className="sm:hidden"> E&amp;I</span>
        </span>
      </span>
    </Link>
  );
}

function DesktopDropdown({
  label,
  href,
  items,
  active,
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
    timer.current = setTimeout(() => setOpen(true), 120);
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
    <div
      ref={ref}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={close}
      onBlur={(e) => { if (!ref.current?.contains(e.relatedTarget as Node)) close(); }}
    >
      <Link
        href={href}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-current={active ? "page" : undefined}
        onFocus={() => setOpen(true)}
        className={`flex items-center gap-1 py-1 text-[13px] transition-colors ${
          active ? "font-medium text-slate-900" : "text-slate-500 hover:text-slate-900"
        }`}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          size={12}
          strokeWidth={2}
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </Link>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-[var(--z-dropdown)] mt-1.5 min-w-52 rounded-md border border-slate-200 bg-white py-1 shadow-md"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              role="menuitem"
              href={item.href}
              onClick={close}
              className="block px-3.5 py-2 text-[13px] text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
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
    <div className="fixed inset-0 z-[var(--z-modal)] lg:hidden">
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50"
        tabIndex={-1}
      />
      <div
        ref={drawerRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="absolute right-0 top-0 flex h-full w-72 flex-col overflow-y-auto bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-4 h-14">
          <Logo />
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-2 py-3">
          <ul className="flex flex-col gap-0.5">
            {mainNav.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <>
                    <button
                      aria-expanded={expanded === item.label}
                      onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      className="flex w-full items-center justify-between rounded px-3 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
                    >
                      {item.label}
                      <ChevronDown
                        size={12}
                        strokeWidth={2}
                        className={`transition-transform duration-150 ${expanded === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {expanded === item.label && (
                      <ul className="ml-3 mt-0.5 border-l border-slate-100 pl-3 pb-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="block py-1.5 text-[13px] text-slate-500 hover:text-slate-900"
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
                    className="block rounded px-3 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-slate-100 p-4 space-y-2">
          <Link
            href="/book"
            onClick={onClose}
            className="flex h-9 w-full items-center justify-center rounded-md bg-accent text-[13px] font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Book Free Consultation
          </Link>
          <Link
            href="/eligibility-check"
            onClick={onClose}
            className="flex h-9 w-full items-center justify-center rounded-md border border-slate-200 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
          >
            Check Eligibility
          </Link>
          <Link
            href="/staff/login"
            onClick={onClose}
            className="block py-1 text-center text-xs text-slate-400 hover:text-slate-600"
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
    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting)
    );
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
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[var(--z-toast)] focus:rounded focus:bg-accent focus:px-3 focus:py-1.5 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-[var(--z-sticky)] h-[var(--header-h-mobile)] bg-white transition-shadow duration-200 lg:h-[var(--header-h)] ${
          scrolled ? "shadow-sm" : ""
        } border-b border-slate-200`}
      >
        <div className="mx-auto flex h-full max-w-[var(--max-w-content)] items-center justify-between gap-8 px-[clamp(1rem,4vw,2rem)]">
          <Logo />

          <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
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
                  className={`py-1 text-[13px] transition-colors ${
                    isActive(item.href)
                      ? "font-medium text-slate-900"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <Link
              href="/eligibility-check"
              className="inline-flex h-8 items-center rounded-md border border-slate-200 bg-white px-3.5 text-[13px] font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            >
              Check Eligibility
            </Link>
            <Link
              href="/book"
              className="inline-flex h-8 items-center rounded-md bg-accent px-3.5 text-[13px] font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Book Free Consultation
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
            <Menu size={18} strokeWidth={2} />
          </button>
        </div>
      </header>

      {menuOpen && <MobileMenu onClose={closeMenu} />}
    </>
  );
}
