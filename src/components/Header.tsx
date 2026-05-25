"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const navKeys = [
  { href: "/about",    key: "about" },
  { href: "/catering", key: "catering" },
  { href: "/join-us",  key: "joinUs" },
  { href: "/contact",  key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-[200] w-full"
      style={{ backgroundColor: "var(--color-ink)", isolation: "isolate" }}
    >
      {/* ── Single horizontal bar ── */}
      <div
        className="mx-auto flex items-center justify-between px-[var(--page-gutter)]"
        style={{ maxWidth: "var(--content-max)", height: 60 }}
      >
        {/* Logo — left */}
        <Link
          href="/"
          className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          aria-label={t("home")}
        >
          <Image
            src="/images/logo.png"
            alt={t("logoAlt")}
            width={140}
            height={46}
            className="h-7 w-auto object-contain brightness-0 invert"
            priority
          />
        </Link>

        {/* Desktop: nav links + lang — right */}
        <nav
          className="hidden md:flex items-center"
          style={{ gap: "var(--space-xl)" }}
          aria-label="Primary navigation"
        >
          {navKeys.map(({ href, key }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--color-accent)" : "oklch(99% 0 0 / 0.5)",
                  transition: "color 180ms var(--ease-out)",
                  paddingBottom: 3,
                  borderBottom: isActive
                    ? "2px solid var(--color-accent)"
                    : "2px solid transparent",
                }}
                onMouseEnter={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = "oklch(99% 0 0)";
                }}
                onMouseLeave={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = "oklch(99% 0 0 / 0.5)";
                }}
              >
                {t(key)}
              </Link>
            );
          })}

          <LanguageSwitcher />
        </nav>

        {/* Mobile: lang + hamburger — right */}
        <div className="flex md:hidden items-center gap-3">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t("toggleMenu")}
            style={{ color: "oklch(99% 0 0 / 0.65)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "oklch(99% 0 0)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "oklch(99% 0 0 / 0.65)")}
          >
            <span className="sr-only">{t("toggleMenu")}</span>
            <svg
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Crimson accent bar ── */}
      <div aria-hidden="true" style={{ height: 3, backgroundColor: "var(--color-accent)" }} />

      {/* ── Mobile menu ── */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          style={{ backgroundColor: "var(--color-ink)" }}
        >
          {navKeys.map(({ href, key }, i) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--color-accent)" : "oklch(99% 0 0 / 0.55)",
                  padding: `var(--space-md) var(--page-gutter)`,
                  borderTop: i === 0 ? "1px solid oklch(99% 0 0 / 0.08)" : "1px solid oklch(99% 0 0 / 0.08)",
                  display: "flex",
                  transition: "color 150ms var(--ease-out)",
                }}
              >
                <span>{t(key)}</span>
                {isActive && (
                  <span
                    aria-hidden
                    style={{
                      display: "inline-block",
                      width: 5,
                      height: 5,
                      backgroundColor: "var(--color-accent)",
                      flexShrink: 0,
                    }}
                  />
                )}
              </Link>
            );
          })}
          {/* Bottom spacing */}
          <div style={{ height: "var(--space-sm)" }} />
        </nav>
      )}
    </header>
  );
}
