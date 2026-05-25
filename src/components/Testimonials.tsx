"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as [number, number, number, number];

const GOOGLE_MAPS_SEARCH =
  "https://www.google.com/maps/search/?api=1&query=TacoLoco+160+Baldwin+Street+Toronto+ON";

const reviewers = [
  { avatar: "/images/avatars/sarah.png", rating: 5 },
  { avatar: "/images/avatars/james.png", rating: 5 },
  { avatar: "/images/avatars/maria.png", rating: 5 },
  { avatar: "/images/avatars/alex.png", rating: 5 },
  { avatar: "/images/avatars/chris.png", rating: 4 },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            color: i <= count ? "var(--color-accent)" : "oklch(99% 0 0 / 0.18)",
            fontSize: "0.75rem",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const tGoogle = useTranslations("googleReview");

  return (
    <section
      id="reviews"
      className="scroll-mt-20"
      style={{
        backgroundColor: "var(--color-ink)",
        paddingTop: "var(--space-3xl)",
        paddingBottom: "var(--space-2xl)",
      }}
    >
      <div className="mx-auto max-w-content px-[var(--page-gutter)]">

        {/* Heading row */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between"
          style={{ marginBottom: "var(--space-2xl)", gap: "var(--space-lg)" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: E }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw + 0.5rem, 5rem)",
              fontWeight: 400,
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              color: "oklch(99% 0 0)",
            }}
          >
            {t("title")}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              color: "oklch(99% 0 0 / 0.45)",
              lineHeight: 1.6,
              maxWidth: "28ch",
              flexShrink: 0,
            }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Hairline */}
        <div style={{ height: 1, backgroundColor: "oklch(99% 0 0 / 0.10)", marginBottom: "var(--space-2xl)" }} />

        {/* Featured quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: E }}
          style={{ marginBottom: "var(--space-2xl)" }}
        >
          <Stars count={reviewers[0].rating} />
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 2.5vw + 0.5rem, 2.75rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "oklch(99% 0 0)",
              marginTop: "var(--space-md)",
              maxWidth: "36ch",
            }}
          >
            &ldquo;{t("quotes.0.quote")}&rdquo;
          </p>
          <footer className="flex items-center gap-3" style={{ marginTop: "var(--space-lg)" }}>
            <div className="relative shrink-0 overflow-hidden" style={{ width: 36, height: 36 }}>
              <Image
                src={reviewers[0].avatar}
                alt={t("quotes.0.author")}
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div>
              <cite
                className="not-italic block"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 700,
                  color: "oklch(99% 0 0)",
                  letterSpacing: "0.04em",
                }}
              >
                {t("quotes.0.author")}
              </cite>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  color: "oklch(99% 0 0 / 0.4)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {t("quotes.0.source")}
              </span>
            </div>
          </footer>
        </motion.blockquote>

        {/* Hairline */}
        <div style={{ height: 1, backgroundColor: "oklch(99% 0 0 / 0.10)", marginBottom: "var(--space-2xl)" }} />

        {/* Remaining quotes — 2-col grid */}
        <div className="grid sm:grid-cols-2" style={{ gap: "var(--space-md)" }}>
          {reviewers.slice(1).map((reviewer, i) => {
            const idx = i + 1;
            return (
              <motion.blockquote
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: E, delay: (i % 2) * 0.08 }}
                style={{
                  padding: "var(--space-lg)",
                  backgroundColor: "oklch(99% 0 0 / 0.06)",
                  borderLeft: "3px solid var(--color-accent)",
                }}
              >
                <Stars count={reviewer.rating} />
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-sm)",
                    lineHeight: 1.65,
                    color: "oklch(99% 0 0 / 0.88)",
                    marginTop: "var(--space-sm)",
                  }}
                >
                  &ldquo;{t(`quotes.${idx}.quote`)}&rdquo;
                </p>
                <footer className="flex items-center gap-3" style={{ marginTop: "var(--space-md)" }}>
                  <div className="relative shrink-0 overflow-hidden" style={{ width: 28, height: 28 }}>
                    <Image
                      src={reviewer.avatar}
                      alt={t(`quotes.${idx}.author`)}
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <cite
                      className="not-italic block"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-xs)",
                        fontWeight: 700,
                        color: "oklch(99% 0 0)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {t(`quotes.${idx}.author`)}
                    </cite>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.6rem",
                        color: "oklch(99% 0 0 / 0.5)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {t(`quotes.${idx}.source`)}
                    </span>
                  </div>
                </footer>
              </motion.blockquote>
            );
          })}
        </div>

        {/* Google CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: E }}
          style={{
            marginTop: "var(--space-2xl)",
            paddingTop: "var(--space-xl)",
            borderTop: "1px solid oklch(99% 0 0 / 0.10)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo.png"
                alt="TacoLoco"
                width={100}
                height={34}
                className="h-7 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <span style={{ color: "oklch(99% 0 0 / 0.2)", fontSize: "1.25rem", fontWeight: 300 }} aria-hidden>×</span>
              <Image
                src="/images/google-logo.png"
                alt="Google"
                width={512}
                height={174}
                className="h-4 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1) opacity(0.5)" }}
              />
            </div>

            <a
              href={GOOGLE_MAPS_SEARCH}
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
                padding: "calc(0.75rem - 1.5px) calc(1.25rem - 1.5px)",
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
              {tGoogle("viewAndWrite")}
            </a>
          </div>
        </motion.div>

      </div>

      {/* Bottom rule */}
      <div
        aria-hidden="true"
        style={{ height: 3, backgroundColor: "oklch(99% 0 0 / 0.15)", marginTop: "var(--space-2xl)" }}
      />
    </section>
  );
}
