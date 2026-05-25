"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { locales, localeNames, type Locale } from "@/i18n/config";

export function LanguageSwitcher() {
  const router = useRouter();
  const fullPathname = usePathname();
  const nextIntlLocale = useLocale() as Locale;
  const segment = fullPathname.split("/").filter(Boolean)[0];
  const locale = (segment && locales.includes(segment as Locale) ? segment : nextIntlLocale) as Locale;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: Locale) {
    const segments = fullPathname.split("/").filter(Boolean);
    const pathWithoutLocale =
      segments.length > 0 && locales.includes(segments[0] as Locale)
        ? "/" + segments.slice(1).join("/")
        : fullPathname;
    const isHome =
      !pathWithoutLocale ||
      pathWithoutLocale === "/" ||
      (pathWithoutLocale.length <= 4 && locales.includes(pathWithoutLocale.slice(1) as Locale));
    const path = isHome ? "" : pathWithoutLocale;
    router.replace(`/${newLocale}${path}`);
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
        id="lang-switcher-label"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: open ? "var(--color-accent)" : "oklch(99% 0 0 / 0.5)",
          transition: "color 180ms var(--ease-out)",
          padding: "4px 0",
        }}
        onMouseEnter={e => {
          if (!open) (e.currentTarget as HTMLElement).style.color = "oklch(99% 0 0)";
        }}
        onMouseLeave={e => {
          if (!open) (e.currentTarget as HTMLElement).style.color = "oklch(99% 0 0 / 0.5)";
        }}
      >
        <span aria-hidden>{locale.toUpperCase()}</span>
        <svg
          style={{
            width: 9,
            height: 9,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 180ms var(--ease-out)",
            opacity: 0.45,
            flexShrink: 0,
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-labelledby="lang-switcher-label"
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 10px)",
            zIndex: 300,
            backgroundColor: "var(--color-ink)",
            border: "1px solid oklch(99% 0 0 / 0.10)",
            minWidth: "10rem",
            padding: "4px 0",
          }}
        >
          {locales.map((loc) => (
            <li key={loc} role="option" aria-selected={locale === loc}>
              <button
                type="button"
                onClick={() => switchLocale(loc)}
                className="flex w-full items-center gap-3 focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-accent"
                style={{
                  fontFamily: "var(--font-body)",
                  padding: "9px 14px",
                  textAlign: "left",
                  transition: "background 120ms",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "oklch(99% 0 0 / 0.05)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
              >
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: locale === loc ? "var(--color-accent)" : "oklch(99% 0 0 / 0.65)",
                    minWidth: 22,
                  }}
                >
                  {loc.toUpperCase()}
                </span>
                <span style={{ color: "oklch(99% 0 0 / 0.2)", fontSize: "0.5rem" }}>·</span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                    color: locale === loc ? "oklch(99% 0 0 / 0.65)" : "oklch(99% 0 0 / 0.3)",
                  }}
                >
                  {localeNames[loc]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
