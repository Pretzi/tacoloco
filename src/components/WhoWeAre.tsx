"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const exploreLinks = [
  { href: "/about", key: "about" },
  { href: "/catering", key: "catering" },
  { href: "/join-us", key: "joinUs" },
  { href: "/contact", key: "contact" },
] as const;

export function WhoWeAre() {
  const t = useTranslations("home.whoWeAre");

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-primary/85">{t("intro")}</p>
        <p className="mt-4 text-primary/85">{t("p1")}</p>
        <p className="mt-4 text-primary/85">{t("p2")}</p>
      </div>
    </section>
  );
}

export function ExploreMore() {
  const t = useTranslations("home.exploreMore");
  const tNav = useTranslations("nav");

  return (
    <section className="border-t-2 border-primary/10 bg-primary/5 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-2 text-primary/80">{t("intro")}</p>
        <ul className="mt-6 flex flex-wrap gap-3 sm:gap-4">
          {exploreLinks.map(({ href, key }) => (
            <li key={href}>
              <Link
                href={href}
                className="inline-flex rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/10 transition hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              >
                {tNav(key)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
