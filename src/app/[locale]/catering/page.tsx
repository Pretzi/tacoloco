"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { PageFold } from "@/components/PageFold";
import { CateringForm } from "@/components/CateringForm";

const E = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: E } },
};
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function CateringPage() {
  const t = useTranslations("pages.catering");

  return (
    <div style={{ backgroundColor: "var(--color-paper)" }}>

      <PageFold
        eyebrow="Street Food · Events & Occasions"
        title={t("title")}
        subtitle={t("intro")}
        cta={
          <a
            href="#catering-form"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              backgroundColor: "var(--color-accent)",
              color: "var(--color-accent-ink)",
              padding: "0.875rem 1.5rem",
              transition: "background-color 180ms var(--ease-out)",
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--color-accent-h)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--color-accent)")}
          >
            {t("contactUs")}
          </a>
        }
      />

      {/* Pitch text */}
      <motion.section
        style={{ backgroundColor: "var(--color-paper)", paddingTop: "var(--space-xl)" }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={container}
      >
        <div className="mx-auto max-w-content px-[var(--page-gutter)]">

          <motion.div className="flex items-center gap-4" style={{ marginBottom: "var(--space-2xl)" }} variants={fadeUp}>
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              flexShrink: 0,
            }}>
              Catering · Events
            </span>
            <div style={{ flex: 1, height: 1, backgroundColor: "oklch(8% 0.015 255 / 0.1)" }} />
          </motion.div>

          <div className="grid md:grid-cols-[1fr_2fr] gap-x-16 gap-y-10">
            <motion.div variants={fadeUp} className="flex md:items-start">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3.5rem, 7vw, 6rem)",
                  fontWeight: 400,
                  lineHeight: 0.85,
                  letterSpacing: "-0.03em",
                  color: "var(--color-accent)",
                  textTransform: "uppercase",
                  userSelect: "none",
                }}
                aria-hidden="true"
              >
                Events
              </span>
            </motion.div>

            <div className="flex flex-col" style={{ gap: "var(--space-xl)" }}>
              <motion.p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  lineHeight: 1.72,
                  color: "var(--color-ink)",
                  paddingLeft: "var(--space-lg)",
                  borderLeft: "3px solid var(--color-accent)",
                }}
                variants={fadeUp}
              >
                {t("p1")}
              </motion.p>

              <motion.div style={{ height: 1, backgroundColor: "oklch(8% 0.015 255 / 0.08)" }} variants={fadeUp} />

              <motion.p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  lineHeight: 1.75,
                  color: "oklch(8% 0.015 255 / 0.6)",
                }}
                variants={fadeUp}
              >
                {t("p2")}
              </motion.p>
            </div>
          </div>
        </div>

        <div style={{ height: 3, backgroundColor: "oklch(8% 0.015 255 / 0.08)", marginTop: "var(--space-3xl)" }} />
      </motion.section>

      {/* Request form */}
      <motion.section
        id="catering-form"
        className="scroll-mt-20"
        style={{ backgroundColor: "var(--color-paper)", paddingTop: "var(--space-3xl)", paddingBottom: "var(--space-3xl)" }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
      >
        <div className="mx-auto max-w-content px-[var(--page-gutter)]">
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-x-16 gap-y-10 md:items-start">

            <motion.div variants={fadeUp}>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                marginBottom: "var(--space-md)",
              }}>
                Request a quote
              </p>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw + 0.5rem, 4rem)",
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                color: "var(--color-ink)",
                marginBottom: "var(--space-lg)",
              }}>
                {t("formTitle")}
              </h2>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-base)",
                lineHeight: 1.7,
                color: "oklch(8% 0.015 255 / 0.55)",
              }}>
                {t("p3")}
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              style={{ borderTop: "3px solid var(--color-accent)", paddingTop: "var(--space-xl)" }}
            >
              <CateringForm />
            </motion.div>

          </div>
        </div>
      </motion.section>

    </div>
  );
}
