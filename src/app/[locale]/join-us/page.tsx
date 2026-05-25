"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { PageFold } from "@/components/PageFold";
import { CinematicSection } from "@/components/CinematicSections";

const E = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: E } },
};
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function JoinUsPage() {
  const t = useTranslations("pages.joinUs");

  return (
    <div style={{ backgroundColor: "var(--color-paper)" }}>
      <PageFold
        eyebrow="Now Hiring · Kensington Market"
        title={t("title")}
        subtitle={t("intro")}
      />

      {/* Editorial text section */}
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
              Join the team
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
                Join
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

      {/* Cinematic sections */}
      <CinematicSection
        image="/images/join-us/team.png"
        eyebrow="The team"
        title={t("section1Title")}
        cta={t("getInTouch")}
        href="/contact"
        align="left"
      />
      <CinematicSection
        image="/images/join-us/vibe.png"
        eyebrow="The perks"
        title={t("section2Title")}
        cta={t("getInTouch")}
        href="/contact"
        align="right"
      />

      {/* Closing CTA */}
      <motion.section
        style={{
          backgroundColor: "var(--color-paper)",
          paddingTop: "var(--space-3xl)",
          paddingBottom: "var(--space-3xl)",
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <div className="mx-auto max-w-content px-[var(--page-gutter)]">
          <div style={{ maxWidth: "54ch" }}>
            <motion.p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                marginBottom: "var(--space-md)",
              }}
              variants={fadeUp}
            >
              Ready to join?
            </motion.p>
            <motion.h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw + 0.5rem, 4rem)",
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                color: "var(--color-ink)",
                marginBottom: "var(--space-lg)",
              }}
              variants={fadeUp}
            >
              {t("ctaTitle")}
            </motion.h2>
            <motion.p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-base)",
                lineHeight: 1.75,
                color: "oklch(8% 0.015 255 / 0.6)",
              }}
              variants={fadeUp}
            >
              {t("ctaText")}
            </motion.p>
            <motion.div style={{ marginTop: "var(--space-xl)" }} variants={fadeUp}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                style={{
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
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-accent-h)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-accent)")}
              >
                {t("getInTouch")}
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
