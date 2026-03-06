"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const menuStructure = [
  {
    categoryKey: "tacos",
    items: [
      { nameKey: "alPastor", descKey: "alPastorDesc", price: "$5.00", image: "/images/menu/al-pastor.png" },
      { nameKey: "chorizo", descKey: "chorizoDesc", price: "$5.00", image: "/images/menu/chorizo.png" },
      { nameKey: "birria", descKey: "birriaDesc", price: "$6.00", image: "/images/menu/birria.png" },
      { nameKey: "otherFillings", descKey: "otherFillingsDesc", priceKey: "priceFrom", image: "/images/menu/daily-specials.png" },
    ],
  },
  {
    categoryKey: "tortas",
    items: [
      { nameKey: "tortaLoca", descKey: "tortaLocaDesc", price: "$13.00", image: "/images/menu/torta-loca.png" },
      { nameKey: "combo", descKey: "comboDesc", price: "$17 – $26", image: "/images/menu/combo.png" },
    ],
  },
];

export function Menu() {
  const t = useTranslations("menu");
  const ti = useTranslations("menu.items");

  return (
    <section id="menu" className="scroll-mt-20 bg-white pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-lg text-primary/80">
            {t("subtitle")}
          </p>
        </div>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:gap-16">
          {menuStructure.map((section) => (
            <div
              key={section.categoryKey}
              className="rounded-2xl border border-primary/10 bg-primary/5 p-6 sm:p-8"
            >
              <h3 className="text-xl font-semibold text-primary border-b border-secondary/30 pb-2">
                {t(section.categoryKey)}
              </h3>
              <ul className="mt-4 space-y-5">
                {section.items.map((item) => (
                  <li
                    key={item.nameKey}
                    className="flex items-center gap-4"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-20">
                      <Image
                        src={item.image}
                        alt={ti(item.nameKey)}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-1">
                      <div className="min-w-0">
                        <span className="font-medium text-primary">
                          {ti(item.nameKey)}
                        </span>
                        <p className="mt-0.5 text-sm leading-snug text-primary/70">
                          {ti(item.descKey)}
                        </p>
                      </div>
                      <span className="shrink-0 font-semibold text-secondary">
                        {"priceKey" in item ? t("priceFrom") : item.price}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a
            href="https://www.ubereats.com/ca/store/taco-loco/vX78IiGsUzW3WnND5jpRTg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-secondary px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-secondary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-10 sm:py-5 sm:text-lg"
          >
            <span className="text-white">{t("fullMenu")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
