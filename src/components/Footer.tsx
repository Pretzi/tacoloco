"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const footerNavKeys = [
  { href: "/about", key: "about" },
  { href: "/catering", key: "catering" },
  { href: "/join-us", key: "joinUs" },
  { href: "/contact", key: "contact" },
] as const;

const connectLinks = [
  { href: "https://www.instagram.com/tacoloco.to/", key: "instagram" },
  {
    href: "https://www.ubereats.com/ca/store/taco-loco/vX78IiGsUzW3WnND5jpRTg",
    key: "ubereats",
  },
] as const;

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer id="contact" className="bg-secondary text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
            >
              <Image
                src="/images/logo.png"
                alt={t("logoAlt")}
                width={160}
                height={56}
                className="h-12 w-auto object-contain brightness-0 invert opacity-95"
              />
            </Link>
            <p className="mt-4 text-sm text-white">{t("tagline")}</p>
            <Link
              href="/catering"
              className="mt-4 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-semibold text-secondary shadow transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {t("orderCatering")}
            </Link>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              {t("visit")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white">
              <li>{t("address1")}</li>
              <li>{t("address2")}</li>
              <li>{t("address3")}</li>
              <li className="pt-2">{t("hours")}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              {t("connect")}
            </h3>
            <ul className="mt-4 space-y-2">
              {connectLinks.map(({ href, key }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:underline transition focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
                  >
                    {t(key)}
                    <span className="ml-1 inline-block" aria-hidden>
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-6 text-sm">
              {footerNavKeys.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/95 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-sm text-white/90">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
