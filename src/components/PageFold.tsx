"use client";

import { motion } from "framer-motion";

interface PageFoldProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  cta?: React.ReactNode;
}

export function PageFold({ eyebrow, title, subtitle, cta }: PageFoldProps) {
  return (
    <>
      <section className="bg-ink" aria-label={title}>
        <div
          className="mx-auto max-w-content px-[var(--page-gutter)]"
          style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}
        >
          {/* Eyebrow */}
          <motion.p
            className="text-accent"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "var(--space-lg)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            {eyebrow}
          </motion.p>

          {/* Title — overflow:hidden + slide-up */}
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              className="text-accent-ink overflow-wrap-anywhere min-w-0"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-display-l)",
                fontWeight: 400,
                letterSpacing: "0.01em",
                textTransform: "uppercase",
                lineHeight: 0.92,
                overflowWrap: "anywhere",
              }}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: 0.1 }}
            >
              {title}
            </motion.h1>
          </div>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-base)",
                marginTop: "var(--space-lg)",
                maxWidth: "52ch",
                lineHeight: 1.65,
                color: "oklch(99% 0 0 / 0.65)",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: 0.35 }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTA slot */}
          {cta && (
            <motion.div
              style={{ marginTop: "var(--space-xl)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: 0.45 }}
            >
              {cta}
            </motion.div>
          )}
        </div>
      </section>

      {/* Rule */}
      <div aria-hidden="true" style={{ height: 3, backgroundColor: "oklch(99% 0 0 / 0.15)" }} />
    </>
  );
}
