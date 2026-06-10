"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { mainNav } from "@/lib/navigation";
import { site } from "@/lib/site";

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={`${site.name} — home`}>
      <svg aria-hidden="true" className="size-8" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="15" stroke="var(--color-gold)" strokeWidth="2" />
        <path
          d="M16 7c-3 3.5-4.5 7-4.5 10.5 0 3 1.8 6 4.5 7.5 2.7-1.5 4.5-4.5 4.5-7.5C20.5 14 19 10.5 16 7Z"
          fill="var(--color-gold)"
        />
      </svg>
      <span className="font-display text-lg font-bold leading-tight text-navy">
        Apple <span className="hidden sm:inline">Education &amp; Immigration</span>
        <span className="sm:hidden">E&amp;I</span>
      </span>
    </Link>
  );
}

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
        clipRule="evenodd"
      />
    </svg>
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

  const openWithDelay = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), 200);
  }, []);
  const close = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(false);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
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
      onMouseEnter={openWithDelay}
      onMouseLeave={close}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) close();
      }}
    >
      <Link
        href={href}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-current={active ? "page" : undefined}
        onFocus={() => setOpen(true)}
        className={`flex items-center gap-1 py-2 text-sm font-medium transition-colors duration-(--duration-fast) hover:text-navy ${
          active ? "border-b-2 border-gold text-navy" : "text-charcoal/80"
        }`}
      >
        {label}
        <Chevron open={open} />
      </Link>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-(--z-dropdown) min-w-56 rounded-lg bg-white py-2 shadow-lg"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              role="menuitem"
              href={item.href}
              onClick={close}
              className="block px-4 py-2.5 text-sm text-charcoal/90 transition-colors duration-(--duration-fast) hover:bg-surface hover:text-navy"
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

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const list = drawer!.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-(--z-modal) lg:hidden">
      <button
        aria-label="Close navigation menu"
        onClick={onClose}
        className="absolute inset-0 bg-navy/50"
        tabIndex={-1}
      />
      <div
        ref={drawerRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col overflow-y-auto bg-white p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <Logo />
          <button
            aria-label="Close navigation menu"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-md text-navy hover:bg-surface"
          >
            <svg aria-hidden="true" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.label} className="border-b border-border">
                {item.children ? (
                  <>
                    <button
                      aria-expanded={expanded === item.label}
                      onClick={() =>
                        setExpanded(expanded === item.label ? null : item.label)
                      }
                      className="flex w-full items-center justify-between py-3.5 font-medium text-navy"
                    >
                      {item.label}
                      <Chevron open={expanded === item.label} />
                    </button>
                    {expanded === item.label && (
                      <ul className="pb-2 pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="block py-2.5 text-sm text-charcoal/80 hover:text-navy"
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
                    className="block py-3.5 font-medium text-navy"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/eligibility-check"
            onClick={onClose}
            className="inline-flex h-11 items-center justify-center rounded-full border-2 border-gold px-6 font-semibold text-navy transition-colors hover:bg-gold hover:text-white"
          >
            Check Your Eligibility
          </Link>
          <Link
            href="/book"
            onClick={onClose}
            className="inline-flex h-11 items-center justify-center rounded-full bg-navy px-6 font-semibold text-white transition-colors hover:bg-navy-light"
          >
            Book Free Consult
          </Link>
          <Link
            href="/staff/login"
            onClick={onClose}
            className="text-center text-xs font-medium text-charcoal/50 transition-colors hover:text-navy"
          >
            Staff Login
          </Link>
        </div>
        <div className="mt-auto pt-8 text-sm text-charcoal/70">
          <a href={site.phoneHref} className="block py-1 hover:text-navy">
            {site.phone}
          </a>
          <a href={site.emailHref} className="block py-1 hover:text-navy">
            {site.email}
          </a>
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
    sentinel.style.cssText = "position:absolute;top:0;height:1px;width:1px;";
    document.body.prepend(sentinel);
    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting)
    );
    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  // Every link in the drawer calls onClose, so no pathname effect is needed.
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-(--z-toast) focus:rounded-md focus:bg-gold focus:p-2 focus:font-semibold focus:text-navy"
      >
        Skip to main content
      </a>
      <header
        className={`sticky top-0 z-(--z-sticky) h-[var(--header-h-mobile)] bg-white transition-shadow duration-200 lg:h-[var(--header-h)] ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="mx-auto flex h-full max-w-[var(--max-w-content)] items-center justify-between gap-4 px-[clamp(1rem,4vw,2rem)]">
          <Logo />

          <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex xl:gap-6">
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
                  className={`py-2 text-sm font-medium transition-colors duration-(--duration-fast) hover:text-navy ${
                    isActive(item.href)
                      ? "border-b-2 border-gold text-navy"
                      : "text-charcoal/80"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/eligibility-check"
              className="inline-flex h-9 items-center rounded-full border-2 border-gold px-4 text-sm font-semibold text-navy transition-colors duration-(--duration-base) hover:bg-gold hover:text-white"
            >
              Check Eligibility
            </Link>
            <Link
              href="/book"
              className="inline-flex h-9 items-center rounded-full bg-navy px-4 text-sm font-semibold text-white transition-colors duration-(--duration-base) hover:bg-navy-light"
            >
              Book Free Consult
            </Link>
            <span className="h-5 w-px bg-border" aria-hidden="true" />
            <Link
              href="/staff/login"
              className="text-xs font-medium text-charcoal/50 transition-colors hover:text-navy"
            >
              Staff Login
            </Link>
          </div>

          <button
            ref={hamburgerRef}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
            className="flex size-10 items-center justify-center rounded-md text-navy hover:bg-surface lg:hidden"
          >
            <svg aria-hidden="true" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      {menuOpen && <MobileMenu onClose={closeMenu} />}
    </>
  );
}
