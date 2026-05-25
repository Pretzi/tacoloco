"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const itemVariant = {
  hidden: { opacity: 0, x: -16 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] as [number,number,number,number] } },
};
const listVariant = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.065 } },
};

const menuStructure = [
  {
    categoryKey: "tacos",
    items: [
      { nameKey: "alPastor",     descKey: "alPastorDesc",     price: "$5.00",    image: "/images/menu/al-pastor.png" },
      { nameKey: "chorizo",      descKey: "chorizoDesc",      price: "$5.00",    image: "/images/menu/chorizo.png" },
      { nameKey: "birria",       descKey: "birriaDesc",       price: "$6.00",    image: "/images/menu/birria.png" },
      { nameKey: "otherFillings", descKey: "otherFillingsDesc", priceKey: "priceFrom", image: "/images/menu/daily-specials.png" },
    ],
  },
  {
    categoryKey: "tortas",
    items: [
      { nameKey: "tortaLoca", descKey: "tortaLocaDesc", price: "$13.00",    image: "/images/menu/torta-loca.png" },
      { nameKey: "combo",     descKey: "comboDesc",     price: "$17 – $26", image: "/images/menu/combo.png" },
    ],
  },
];

export function Menu() {
  const t = useTranslations("menu");
  const ti = useTranslations("menu.items");

  return (
    <section
      id="menu"
      className="scroll-mt-20 bg-paper"
      style={{
        paddingTop: "var(--space-3xl)",
        paddingBottom: "var(--space-3xl)",
      }}
    >
      <div className="mx-auto max-w-content px-[var(--page-gutter)]">

        {/* Section title */}
        <motion.div
          style={{ marginBottom: "var(--space-2xl)" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
        >
          <h2
            className="text-ink"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-display-s)",
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "0.01em",
              textTransform: "uppercase",
            }}
          >
            {t("title")}
          </h2>
          <p
            className="text-ink/60"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              marginTop: "var(--space-sm)",
              maxWidth: "var(--prose-max)",
              lineHeight: 1.6,
            }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Asymmetric grid: tacos span wider, tortas narrower */}
        <div
          className="grid gap-16 lg:grid-cols-[1.4fr_1fr]"
        >
          {menuStructure.map((section) => (
            <div key={section.categoryKey}>
              {/* Category heading with crimson accent mark */}
              <div
                className="flex items-baseline gap-3"
                style={{ marginBottom: "var(--space-lg)", paddingBottom: "var(--space-sm)", borderBottom: "var(--rule-hair) solid var(--color-rule)" }}
              >
                <span
                  className="inline-block bg-accent"
                  style={{ width: 8, height: 8, borderRadius: 1, flexShrink: 0, marginBottom: 2 }}
                  aria-hidden="true"
                />
                <h3
                  className="text-ink"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-xl)",
                    fontWeight: 400,
                    lineHeight: 1,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                  }}
                >
                  {t(section.categoryKey)}
                </h3>
              </div>

              {/* Menu items — hairline-separated list, stagger on scroll */}
              <motion.ul
                className="space-y-0"
                variants={listVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.05 }}
              >
                {section.items.map((item, idx) => (
                  <motion.li
                    key={item.nameKey}
                    variants={itemVariant}
                    className="flex items-start gap-4"
                    style={{
                      paddingTop: idx === 0 ? 0 : "var(--space-lg)",
                      paddingBottom: "var(--space-lg)",
                      borderBottom: "var(--rule-hair) solid var(--color-rule)",
                    }}
                  >
                    {/* Thumbnail — sharp corners, editorial */}
                    <div
                      className="relative shrink-0 overflow-hidden"
                      style={{ width: 64, height: 64, borderRadius: 0 }}
                    >
                      <Image
                        src={item.image}
                        alt={ti(item.nameKey)}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    {/* Name / desc / price */}
                    <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                      <div className="min-w-0">
                        <span
                          className="text-ink font-semibold block"
                          style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-md)" }}
                        >
                          {ti(item.nameKey)}
                        </span>
                        <p
                          className="text-ink/60 mt-0.5"
                          style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.55 }}
                        >
                          {ti(item.descKey)}
                        </p>
                      </div>
                      <span
                        className="shrink-0 text-accent font-semibold tabular-nums"
                        style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-md)", fontVariantNumeric: "tabular-nums" }}
                      >
                        {"priceKey" in item ? t("priceFrom") : item.price}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>

        {/* Full menu CTA — typographic link, not a big block button */}
        <div style={{ marginTop: "var(--space-2xl)" }}>
          <a
            href="https://www.ubereats.com/ca/store/taco-loco/vX78IiGsUzW3WnND5jpRTg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-md)",
              fontWeight: 600,
              letterSpacing: "0.01em",
              textDecoration: "underline",
              textDecorationThickness: "1px",
              textUnderlineOffset: "3px",
              transition: `color var(--dur-short) var(--ease-out)`,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--color-accent-d)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--color-accent)")}
          >
            {t("fullMenu")} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
