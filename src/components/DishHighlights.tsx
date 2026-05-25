"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─────────────────────────────────────────── */

function DishCard({
  number,
  nameKey,
  descKey,
  price,
  image,
  index,
}: {
  number: string;
  nameKey: string;
  descKey: string;
  price: string;
  image: string;
  index: number;
}) {
  const t = useTranslations("menu.items");

  return (
    <motion.div
      className="relative overflow-hidden group"
      style={{ minHeight: "clamp(18rem, 32vw, 28rem)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: E, delay: index * 0.08 }}
    >
      {/* Background image — scales on hover */}
      <div
        className="absolute inset-0 transition-transform duration-700"
        style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
      >
        <Image
          src={image}
          alt={t(nameKey)}
          fill
          className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
          style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Gradient overlay — bottom-up */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, oklch(8% 0.015 255 / 0.95) 0%, oklch(8% 0.015 255 / 0.55) 40%, transparent 72%)",
          pointerEvents: "none",
        }}
      />

      {/* Text content — pinned to bottom */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{ padding: "var(--space-xl) var(--space-lg)" }}
      >
        <div
          className="flex items-baseline gap-3"
          style={{ marginBottom: "var(--space-xs)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.6rem",
              fontWeight: 400,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
            }}
          >
            {number}
          </span>
          <span
            style={{
              display: "inline-block",
              width: 20,
              height: 1.5,
              backgroundColor: "var(--color-accent)",
              opacity: 0.5,
              flexShrink: 0,
            }}
            aria-hidden
          />
        </div>

        <h3
          className="text-accent-ink"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 3.5vw, 3.25rem)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            lineHeight: 0.92,
            marginBottom: "var(--space-sm)",
          }}
        >
          {t(nameKey)}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            color: "oklch(99% 0 0 / 0.55)",
            lineHeight: 1.6,
            maxWidth: "28ch",
            marginBottom: "var(--space-md)",
          }}
        >
          {t(descKey)}
        </p>

        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            fontWeight: 700,
            color: "var(--color-accent)",
            letterSpacing: "0.04em",
          }}
        >
          {price}
        </span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────── */

const dishes = [
  {
    number: "01",
    nameKey: "birria",
    descKey: "birriaDesc",
    price: "$6.00",
    image: "/images/menu/birria.png",
  },
  {
    number: "02",
    nameKey: "alPastor",
    descKey: "alPastorDesc",
    price: "$5.00",
    image: "/images/menu/al-pastor.png",
  },
  {
    number: "03",
    nameKey: "tortaLoca",
    descKey: "tortaLocaDesc",
    price: "$13.00",
    image: "/images/menu/torta-loca.png",
  },
] as const;

export function DishHighlights() {
  const t = useTranslations("home.dishes");

  return (
    <section
      aria-label={t("title")}
      style={{ backgroundColor: "var(--color-ink)" }}
    >
      {/* Section heading */}
      <div
        className="mx-auto max-w-content px-[var(--page-gutter)]"
        style={{
          paddingTop: "var(--space-3xl)",
          paddingBottom: "var(--space-xl)",
          borderBottom: "1px solid oklch(99% 0 0 / 0.08)",
        }}
      >
        <div className="flex items-baseline justify-between flex-wrap gap-4">
          <h2
            className="text-accent-ink"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-display-s)",
              fontWeight: 400,
              letterSpacing: "0.01em",
              textTransform: "uppercase",
              lineHeight: 0.95,
            }}
          >
            {t("title")}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "oklch(99% 0 0 / 0.3)",
            }}
          >
            Kensington Market · Toronto
          </p>
        </div>
      </div>

      {/* Dish grid: Birria spans 2 rows left; Al Pastor + Torta stacked right */}
      <div
        className="mx-auto max-w-content"
        style={{ paddingBottom: "var(--space-3xl)" }}
      >
        {/*
          Mobile: 3 stacked cards
          Desktop: asymmetric — col 1 (3fr) spans both rows, col 2 (2fr) stacks
        */}
        <div className="grid md:grid-cols-[3fr_2fr]">

          {/* Birria — spans 2 rows on desktop */}
          <div className="md:row-span-2">
            <DishCard {...dishes[0]} index={0} />
          </div>

          {/* Al Pastor */}
          <DishCard {...dishes[1]} index={1} />

          {/* Torta Loca */}
          <DishCard {...dishes[2]} index={2} />

        </div>
      </div>
    </section>
  );
}
