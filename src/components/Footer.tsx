"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

/* Ft1 · Mast-headed
 * Dark navy background, centred logo + tagline,
 * minimal link row + address + copyright beneath.
 */
export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-ink text-accent-ink">
      {/* Solid crimson rule (top) */}
      <div aria-hidden="true" style={{ height: 4, backgroundColor: "var(--color-accent)" }} />

      <div className="mx-auto max-w-content px-[var(--page-gutter)] py-12 text-center">
        {/* Wordmark */}
        <Link
          href="/"
          className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        >
          <Image
            src="/images/logo.png"
            alt={t("logoAlt")}
            width={200}
            height={68}
            className="h-10 w-auto object-contain brightness-0 invert opacity-90 sm:h-12"
          />
        </Link>

        {/* Tagline */}
        <p
          className="mt-4 mx-auto max-w-prose text-accent-ink/60"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            lineHeight: 1.65,
          }}
        >
          {t("tagline")}
        </p>

        {/* Hairline rule */}
        <div className="mt-8 border-t border-accent-ink/10" />

        {/* Links row */}
        <nav className="mt-6" aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { href: "/about",    key: "about" },
              { href: "/catering", key: "catering" },
              { href: "/join-us",  key: "joinUs" },
              { href: "/contact",  key: "contact" },
            ].map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-accent-ink/60 hover:text-accent-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-xs)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    transitionDuration: "var(--dur-short)",
                    transitionTimingFunction: "var(--ease-out)",
                  }}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://www.instagram.com/tacoloco.to/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-ink/60 hover:text-accent-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  transitionDuration: "var(--dur-short)",
                }}
              >
                {t("instagram")}
                <span className="ml-0.5 text-accent-ink/40" aria-hidden>↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.ubereats.com/ca/store/taco-loco/vX78IiGsUzW3WnND5jpRTg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-ink/60 hover:text-accent-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  transitionDuration: "var(--dur-short)",
                }}
              >
                {t("ubereats")}
                <span className="ml-0.5 text-accent-ink/40" aria-hidden>↗</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Address + copyright */}
        <p
          className="mt-4 text-accent-ink/40"
          style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)" }}
        >
          160 Baldwin Street, Toronto ON&ensp;·&ensp;Open daily 12 PM – 8:30 PM
        </p>
        <p
          className="mt-1 text-accent-ink/30"
          style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)" }}
        >
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
