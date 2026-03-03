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
    <section className="overflow-hidden bg-white py-6 sm:py-8">
      <div className="relative">
        <div className="flex w-max animate-marquee gap-4 sm:gap-6">
          {images.map((file, i) => (
            <div
              key={`${file}-${i}`}
              className="relative h-64 w-44 shrink-0 overflow-hidden rounded-2xl sm:h-80 sm:w-56 lg:h-96 lg:w-64"
            >
              <Image
                src={`/images/promos/${file}`}
                alt=""
                fill
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 256px, 288px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
