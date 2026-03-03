"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useRef, useState, useEffect } from "react";
import { locales, localeNames, type Locale } from "@/i18n/config";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
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
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
        id="lang-switcher-label"
      >
        <span aria-hidden>{locale.toUpperCase()}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-labelledby="lang-switcher-label"
          className="absolute right-0 top-full z-50 mt-1 min-w-[8rem] rounded-lg border border-white/20 bg-secondary py-1 shadow-lg"
        >
          {locales.map((loc) => (
            <li key={loc} role="option" aria-selected={locale === loc}>
              <button
                type="button"
                onClick={() => switchLocale(loc)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-white/10 ${
                  locale === loc ? "bg-white/15 font-semibold text-white" : "text-white/90"
                }`}
              >
                <span className="font-medium">{loc.toUpperCase()}</span>
                <span className="text-white/70">·</span>
                <span className="text-white/80">{localeNames[loc]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
