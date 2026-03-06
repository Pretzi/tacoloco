"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-white text-primary">
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(14,23,42,0.06) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/logo.png"
            alt={t("logoAlt")}
            width={280}
            height={100}
            className="h-16 w-auto object-contain sm:h-20 md:h-24"
            priority
          />
          <p className="mt-4 text-lg font-medium uppercase tracking-widest text-primary/70 sm:text-xl">
            {t("tagline")}
          </p>
          <h1 className="mt-6 max-w-2xl text-2xl font-bold leading-tight text-primary sm:text-3xl md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-xl text-base text-primary/80 sm:text-lg">
            {t("address")}
          </p>
          <p className="mt-3 max-w-xl text-sm text-primary/70 md:hidden">
            {t("extraMobile")}
          </p>
          <div className="mt-8 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://www.ubereats.com/ca/store/taco-loco/vX78IiGsUzW3WnND5jpRTg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-secondary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {t("orderUber")}
            </a>
            <Link
              href="/catering"
              className="inline-flex items-center justify-center rounded-lg border-2 border-primary bg-white px-6 py-3 text-base font-semibold text-primary transition hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {t("catering")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
