"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: E } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export interface SectionData {
  image: string;
  eyebrow: string;
  title: string;
  cta: string;
  href: string;
  external?: boolean;
  align?: "left" | "right";
  secondaryCta?: string;
  secondaryHref?: string;
  secondaryExternal?: boolean;
}

export function CinematicSection({
  image,
  eyebrow,
  title,
  cta,
  href,
  external,
  align = "left",
  secondaryCta,
  secondaryHref,
  secondaryExternal,
}: SectionData) {
  const isLeft = align === "left";

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: `url('${image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "var(--color-ink)",
        minHeight: "clamp(18rem, 45svh, 32rem)",
      }}
    >
      {/* Mobile overlay — bottom-heavy */}
      <div
        className="md:hidden"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: [
            "linear-gradient(to top,",
            "  oklch(8% 0.015 255 / 0.97) 0%,",
            "  oklch(8% 0.015 255 / 0.90) 40%,",
            "  oklch(8% 0.015 255 / 0.30) 65%,",
            "  transparent 100%",
            ")",
          ].join(" "),
        }}
      />

      {/* Desktop overlay — side-heavy */}
      <div
        className="hidden md:block"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: isLeft
            ? [
                "linear-gradient(to right,",
                "  oklch(8% 0.015 255 / 0.97) 0%,",
                "  oklch(8% 0.015 255 / 0.92) 35%,",
                "  oklch(8% 0.015 255 / 0.55) 58%,",
                "  oklch(8% 0.015 255 / 0.15) 100%",
                ")",
              ].join(" ")
            : [
                "linear-gradient(to left,",
                "  oklch(8% 0.015 255 / 0.97) 0%,",
                "  oklch(8% 0.015 255 / 0.92) 35%,",
                "  oklch(8% 0.015 255 / 0.55) 58%,",
                "  oklch(8% 0.015 255 / 0.15) 100%",
                ")",
              ].join(" "),
        }}
      />

      {/* Content */}
      <motion.div
        className="relative mx-auto max-w-content px-[var(--page-gutter)] flex flex-col justify-end md:justify-center"
        style={{
          minHeight: "clamp(18rem, 45svh, 32rem)",
          paddingBottom: "var(--space-xl)",
        }}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div
          className={`w-full md:max-w-[min(34rem,52%)] ${
            !isLeft ? "md:ml-auto" : ""
          }`}
        >
          {/* Eyebrow */}
          <motion.p
            className="text-accent"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.625rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "var(--space-md)",
            }}
            variants={fadeUp}
          >
            {eyebrow}
          </motion.p>

          {/* Title */}
          <motion.h2
            className="text-accent-ink overflow-wrap-anywhere min-w-0"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw + 0.5rem, 5.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              lineHeight: 0.9,
              overflowWrap: "anywhere",
            }}
            variants={fadeUp}
          >
            {title}
          </motion.h2>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap"
            style={{ gap: "var(--space-sm)", marginTop: "var(--space-xl)" }}
            variants={fadeUp}
          >
            {external ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
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
                {cta}
              </a>
            ) : (
              <Link
                href={href}
                className="inline-flex items-center justify-center whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
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
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--color-accent-h)")
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--color-accent)")
                }
              >
                {cta}
              </Link>
            )}

            {/* Secondary CTA */}
            {secondaryCta && secondaryHref && (
              secondaryExternal ? (
                <a
                  href={secondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 700,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: "oklch(99% 0 0 / 0.7)",
                    border: "1.5px solid oklch(99% 0 0 / 0.22)",
                    padding: "calc(0.875rem - 1.5px) calc(1.5rem - 1.5px)",
                    transition: "border-color 180ms var(--ease-out), color 180ms var(--ease-out)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "oklch(99% 0 0 / 0.65)";
                    e.currentTarget.style.color = "oklch(99% 0 0)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "oklch(99% 0 0 / 0.22)";
                    e.currentTarget.style.color = "oklch(99% 0 0 / 0.7)";
                  }}
                >
                  {secondaryCta}
                </a>
              ) : (
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center justify-center whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 700,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: "oklch(99% 0 0 / 0.7)",
                    border: "1.5px solid oklch(99% 0 0 / 0.22)",
                    padding: "calc(0.875rem - 1.5px) calc(1.5rem - 1.5px)",
                    transition: "border-color 180ms var(--ease-out), color 180ms var(--ease-out)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "oklch(99% 0 0 / 0.65)";
                    (e.currentTarget as HTMLElement).style.color = "oklch(99% 0 0)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "oklch(99% 0 0 / 0.22)";
                    (e.currentTarget as HTMLElement).style.color = "oklch(99% 0 0 / 0.7)";
                  }}
                >
                  {secondaryCta}
                </Link>
              )
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Crimson rule */}
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

export function CinematicSections() {
  const t = useTranslations("cinematic");

  const sections: SectionData[] = [
    {
      image: "/images/section-1.png",
      eyebrow: t("s1.eyebrow"),
      title: t("s1.title"),
      cta: t("s1.cta"),
      href: "https://www.ubereats.com/ca/store/taco-loco/vX78IiGsUzW3WnND5jpRTg",
      external: true,
      align: "left",
    },
    {
      image: "/images/section-2.png",
      eyebrow: t("s2.eyebrow"),
      title: t("s2.title"),
      cta: t("s2.cta"),
      href: "/catering",
      align: "right",
    },
    {
      image: "/images/section-3.png",
      eyebrow: t("s3.eyebrow"),
      title: t("s3.title"),
      cta: t("s3.cta"),
      href: "/about",
      align: "left",
      secondaryCta: t("s3.directions"),
      secondaryHref: "https://www.google.com/maps/search/?api=1&query=TacoLoco+160+Baldwin+Street+Toronto+ON",
      secondaryExternal: true,
    },
  ];

  return (
    <>
      {sections.map((s, i) => (
        <CinematicSection key={i} {...s} />
      ))}
    </>
  );
}
