"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const navKeys = [
  { href: "/about", key: "about" },
  { href: "/catering", key: "catering" },
  { href: "/join-us", key: "joinUs" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary-dark bg-secondary backdrop-blur supports-[backdrop-filter]:bg-secondary/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          aria-label={t("home")}
        >
          <Image
            src="/images/logo.png"
            alt={t("logoAlt")}
            width={140}
            height={48}
            className="h-10 w-auto object-contain brightness-0 invert sm:h-12"
            priority
          />
        </Link>

        <div className="hidden md:flex md:items-center md:gap-6">
          <nav
            className="flex items-center gap-8"
            aria-label="Main navigation"
          >
            {navKeys.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-white/90 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded px-1"
              >
                {t(key)}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t("toggleMenu")}
          >
            <span className="sr-only">{t("toggleMenu")}</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden ${open ? "block" : "hidden"}`}
        role="dialog"
        aria-label="Mobile menu"
      >
        <nav className="border-t border-secondary-dark bg-secondary px-4 py-4 space-y-1">
          {navKeys.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium text-white/90 hover:bg-white/10 hover:text-white"
            >
              {t(key)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
