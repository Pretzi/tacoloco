"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as [number, number, number, number];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.065, delayChildren: 0.1 } },
};

const line = {
  hidden: { y: "105%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.5, ease: E } },
};

const fadeIn = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: E } },
};

export function Hero() {
  const t = useTranslations("hero");

  const words = t("title").split(" ");
  const lines: string[][] = [];
  for (let i = 0; i < words.length; i += 4) {
    lines.push(words.slice(i, i + 4));
  }

  return (
    <section
      className="relative overflow-hidden"
      style={{
        /* CSS background-image is used here instead of next/image fill because
           fill requires a parent with a computed height (not just min-height).
           For a decorative hero bg this is the most reliable approach. */
        backgroundImage: "url('/images/hero-v1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "var(--color-ink)",
        /* Tall enough to feel cinematic on every screen */
        minHeight: "clamp(30rem, 80svh, 52rem)",
      }}
      aria-label="Hero"
    >

      {/* ── Mobile overlay: bottom-heavy so food shows at top ── */}
      <div
        className="md:hidden"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: [
            "linear-gradient(to top,",
            "  oklch(8% 0.015 255 / 0.98) 0%,",
            "  oklch(8% 0.015 255 / 0.92) 35%,",
            "  oklch(8% 0.015 255 / 0.25) 62%,",
            "  transparent 100%",
            ")",
          ].join(" "),
        }}
      />

      {/* ── Desktop overlay: left-heavy so food shows on right ── */}
      <div
        className="hidden md:block"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: [
            "linear-gradient(to right,",
            "  oklch(8% 0.015 255 / 0.97) 0%,",
            "  oklch(8% 0.015 255 / 0.93) 38%,",
            "  oklch(8% 0.015 255 / 0.60) 60%,",
            "  oklch(8% 0.015 255 / 0.18) 100%",
            ")",
          ].join(" "),
        }}
      />

      {/* ── Content ──
           Mobile:  text at bottom (justify-end), like a movie poster
           Desktop: text centred vertically on left side
      ── */}
      <div
        className="relative mx-auto max-w-content px-[var(--page-gutter)]
                   flex flex-col justify-end md:justify-center"
        style={{
          minHeight: "clamp(30rem, 80svh, 52rem)",
          paddingBottom: "var(--space-2xl)", /* breathing room on mobile */
        }}
      >
        {/* Text constrained to left ~55% on desktop; full-width on mobile */}
        <div className="w-full md:max-w-[min(36rem,55%)]">

          {/* Eyebrow */}
          <motion.p
            className="text-accent"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.625rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "var(--space-lg)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {t("tagline")}
          </motion.p>

          {/* Title — line-by-line slide-up */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            aria-label={t("title")}
          >
            {lines.map((group, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.span
                  variants={line}
                  className="block text-accent-ink overflow-wrap-anywhere min-w-0"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.25rem, 4.25vw + 0.5rem, 4.5rem)",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    textTransform: "uppercase",
                    lineHeight: 0.93,
                    overflowWrap: "anywhere",
                  }}
                >
                  {group.join(" ")}
                </motion.span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row flex-wrap"
            style={{ gap: "var(--space-sm)", marginTop: "var(--space-xl)" }}
            variants={fadeIn}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.55 }}
          >
            <a
              href="https://www.ubereats.com/ca/store/taco-loco/vX78IiGsUzW3WnND5jpRTg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                         focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
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
              onMouseEnter={e =>
                (e.currentTarget.style.backgroundColor = "var(--color-accent-h)")
              }
              onMouseLeave={e =>
                (e.currentTarget.style.backgroundColor = "var(--color-accent)")
              }
            >
              {t("orderUber")}
            </a>

            <Link
              href="/catering"
              className="inline-flex items-center justify-center whitespace-nowrap
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                         focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: "oklch(99% 0 0 / 0.7)",
                border: "1.5px solid oklch(99% 0 0 / 0.22)",
                padding: "calc(0.875rem - 1.5px) calc(1.5rem - 1.5px)",
                transition:
                  "border-color 180ms var(--ease-out), color 180ms var(--ease-out)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(99% 0 0 / 0.65)";
                (e.currentTarget as HTMLElement).style.color = "oklch(99% 0 0)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(99% 0 0 / 0.22)";
                (e.currentTarget as HTMLElement).style.color =
                  "oklch(99% 0 0 / 0.7)";
              }}
            >
              {t("catering")}
            </Link>
          </motion.div>

          {/* Address */}
          <motion.p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.06em",
              color: "oklch(99% 0 0 / 0.28)",
              marginTop: "var(--space-lg)",
              lineHeight: 1.6,
            }}
            variants={fadeIn}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.72 }}
          >
            {t("address")}
          </motion.p>

        </div>
      </div>

      {/* ── Bottom rule ── */}
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          zIndex: 1,
          height: 3,
          backgroundColor: "oklch(99% 0 0 / 0.15)",
        }}
      />
    </section>
  );
}
