"use client";

import Image from "next/image";

const promos = [
  "4f.png",
  "BTL.png",
  "C1TL.png",
  "CFV.png",
  "CTWO.png",
  "EMPANADAS.png",
  "GPF.png",
  "KOKO.png",
  "SDF.png",
  "empanada.png",
  "mexican-flavor.png",
];

export function PromoMarquee() {
  const images = [...promos, ...promos];

  return (
    <section
      className="overflow-hidden bg-paper-2"
      style={{
        paddingTop: "var(--space-xl)",
        paddingBottom: "var(--space-xl)",
        borderTop: "var(--rule-hair) solid var(--color-rule)",
        borderBottom: "var(--rule-hair) solid var(--color-rule)",
      }}
      aria-hidden="true"
    >
      <div className="relative">
        <div className="flex w-max animate-marquee" style={{ gap: "var(--space-sm)" }}>
          {images.map((file, i) => (
            <div
              key={`${file}-${i}`}
              className="relative shrink-0 overflow-hidden"
              style={{
                width: "clamp(10rem, 18vw, 14rem)",
                height: "clamp(13rem, 22vw, 18rem)",
                borderRadius: 0,
              }}
            >
              <Image
                src={`/images/promos/${file}`}
                alt=""
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 224px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
