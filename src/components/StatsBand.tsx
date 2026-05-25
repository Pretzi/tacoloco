"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function StatsBand() {
  const t = useTranslations("stats");

  const stats = [
    { value: t("googleValue"), label: t("google") },
    { value: t("yelpValue"),   label: t("yelp") },
    { value: t("tgtgValue"),   label: t("tgtg") },
    { value: t("openValue"),   label: t("openLabel") },
  ];

  return (
    <div
      style={{
        backgroundColor: "var(--color-accent)",
        overflow: "hidden",
      }}
    >
      <div className="mx-auto max-w-content px-[var(--page-gutter)]">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.07 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center justify-center text-center"
              style={{
                padding: "var(--space-lg) var(--space-md)",
                borderRight: i < stats.length - 1 ? "1px solid oklch(99% 0 0 / 0.2)" : undefined,
                borderBottom: i < 2 ? "1px solid oklch(99% 0 0 / 0.2) " : undefined,
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: E, delay: i * 0.06 }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                  color: "var(--color-accent-ink)",
                  textTransform: "uppercase",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-accent-ink)",
                  opacity: 0.7,
                  marginTop: "0.25rem",
                }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
