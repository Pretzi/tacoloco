"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

const rowVariant = {
  hidden: { opacity: 0, x: -12 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] as [number,number,number,number] } },
};
const listVariant = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.06 } },
};

const exploreLinks = [
  { href: "/about",    key: "about" },
  { href: "/catering", key: "catering" },
  { href: "/join-us",  key: "joinUs" },
  { href: "/contact",  key: "contact" },
] as const;

export function WhoWeAre() {
  const t = useTranslations("home.whoWeAre");

  return (
    <section
      className="bg-paper"
      style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}
    >
      <div className="mx-auto max-w-content px-[var(--page-gutter)]" style={{ maxWidth: "var(--prose-max)" }}>
        <h2
          className="text-ink"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-xl)",
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          {t("title")}
        </h2>
        <p
          className="text-ink/80"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-md)",
            marginTop: "var(--space-md)",
            lineHeight: 1.65,
          }}
        >
          {t("intro")}
        </p>
        <p
          className="text-ink/70"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            marginTop: "var(--space-md)",
            lineHeight: 1.65,
          }}
        >
          {t("p1")}
        </p>
        <p
          className="text-ink/70"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            marginTop: "var(--space-md)",
            lineHeight: 1.65,
          }}
        >
          {t("p2")}
        </p>
      </div>
    </section>
  );
}

export function ExploreMore() {
  const t = useTranslations("home.exploreMore");
  const tNav = useTranslations("nav");

  return (
    <section
      className="bg-paper-2"
      style={{
        paddingTop: "var(--space-2xl)",
        paddingBottom: "var(--space-2xl)",
        borderTop: "var(--rule-hair) solid var(--color-rule)",
      }}
    >
      <div className="mx-auto max-w-content px-[var(--page-gutter)]">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4"
          style={{ marginBottom: "var(--space-lg)" }}
        >
          <h2
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
            {t("title")}
          </h2>
          <p
            className="text-ink/60"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              maxWidth: "36ch",
              lineHeight: 1.55,
            }}
          >
            {t("intro")}
          </p>
        </div>

        {/* Hairline-separated nav links — stagger on scroll */}
        <motion.ul
          variants={listVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {exploreLinks.map(({ href, key }, i) => (
            <motion.li key={href} variants={rowVariant}>
              <Link
                href={href}
                className="flex items-center justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                style={{
                  paddingTop: "var(--space-md)",
                  paddingBottom: "var(--space-md)",
                  borderTop: i === 0 ? "var(--rule-hair) solid var(--color-rule)" : "none",
                  borderBottom: "var(--rule-hair) solid var(--color-rule)",
                }}
              >
                <span
                  className="text-ink group-hover:text-accent"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-md)",
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                    transition: `color var(--dur-short) var(--ease-out)`,
                  }}
                >
                  {tNav(key)}
                </span>
                <span
                  className="text-ink/30 group-hover:text-accent"
                  style={{
                    fontSize: "1.125rem",
                    transition: `color var(--dur-short) var(--ease-out), transform var(--dur-short) var(--ease-out)`,
                  }}
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
