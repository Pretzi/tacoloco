"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=TacoLoco+160+Baldwin+Street+Toronto+ON";

const E = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function ImageCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "clamp(26rem, 52vw, 42rem)" }}
      aria-label="Visit TacoLoco"
    >
      {/* Background image */}
      <Image
        src="/images/restaurant-exterior.png"
        alt="TacoLoco at 160 Baldwin Street, Kensington Market"
        fill
        className="object-cover object-top"
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "oklch(8% 0.015 255 / 0.7)",
        }}
      />

      {/* Left accent bar */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          backgroundColor: "var(--color-accent)",
        }}
      />

      {/* Content */}
      <div
        className="relative mx-auto max-w-content px-[var(--page-gutter)] flex flex-col justify-center"
        style={{ minHeight: "clamp(26rem, 52vw, 42rem)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: E }}
        >
          {/* Eyebrow */}
          <p
            className="text-accent"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.625rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "var(--space-md)",
            }}
          >
            Kensington Market · Toronto
          </p>

          {/* Heading */}
          <h2
            className="text-accent-ink overflow-wrap-anywhere min-w-0"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw + 0.5rem, 6rem)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              lineHeight: 0.92,
              maxWidth: "14ch",
              overflowWrap: "anywhere",
              marginBottom: "var(--space-2xl)",
            }}
          >
            Find us at 160 Baldwin
          </h2>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row flex-wrap"
            style={{ gap: "var(--space-sm)" }}
          >
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
              Get directions ↗
            </a>

            <a
              href="https://www.ubereats.com/ca/store/taco-loco/vX78IiGsUzW3WnND5jpRTg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: "oklch(99% 0 0 / 0.7)",
                border: "1.5px solid oklch(99% 0 0 / 0.25)",
                padding: "calc(0.875rem - 1.5px) calc(1.5rem - 1.5px)",
                transition: "border-color 180ms var(--ease-out), color 180ms var(--ease-out)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(99% 0 0 / 0.65)";
                (e.currentTarget as HTMLElement).style.color = "oklch(99% 0 0)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(99% 0 0 / 0.25)";
                (e.currentTarget as HTMLElement).style.color = "oklch(99% 0 0 / 0.7)";
              }}
            >
              Order on Uber Eats
            </a>

            <Link
              href="/catering"
              className="inline-flex items-center justify-center whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: "oklch(99% 0 0 / 0.7)",
                border: "1.5px solid oklch(99% 0 0 / 0.25)",
                padding: "calc(0.875rem - 1.5px) calc(1.5rem - 1.5px)",
                transition: "border-color 180ms var(--ease-out), color 180ms var(--ease-out)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(99% 0 0 / 0.65)";
                (e.currentTarget as HTMLElement).style.color = "oklch(99% 0 0)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(99% 0 0 / 0.25)";
                (e.currentTarget as HTMLElement).style.color = "oklch(99% 0 0 / 0.7)";
              }}
            >
              Catering
            </Link>
          </div>

          {/* Hours */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.06em",
              color: "oklch(99% 0 0 / 0.28)",
              marginTop: "var(--space-lg)",
            }}
          >
            Open daily 12 PM – 8:30 PM
          </p>
        </motion.div>
      </div>
    </section>
  );
}
