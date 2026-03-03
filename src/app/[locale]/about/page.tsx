import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const aboutImages = [
  { src: "/images/about/kitchen.png", alt: "TacoLoco kitchen" },
  { src: "/images/about/market.png", alt: "Kensington Market" },
  { src: "/images/about/community.png", alt: "TacoLoco community" },
];

export default async function AboutPage() {
  const t = await getTranslations("pages.about");

  return (
    <div className="bg-white">
      <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-96">
        <Image
          src="/images/about/hero.png"
          alt="TacoLoco street food"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
              {t("title")}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <p className="text-xl font-medium leading-relaxed text-primary sm:text-2xl">
          {t("intro")}
        </p>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">From scratch, every day</h2>
            <p className="mt-4 leading-relaxed text-primary/85">{t("p1")}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={aboutImages[0].src}
              alt={aboutImages[0].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-16 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg lg:order-first">
            <Image
              src={aboutImages[1].src}
              alt={aboutImages[1].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">Real ingredients, real flavour</h2>
            <p className="mt-4 leading-relaxed text-primary/85">{t("p2")}</p>
          </div>
        </div>

        <div className="mt-16 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">More than food</h2>
            <p className="mt-4 leading-relaxed text-primary/85">{t("p3")}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={aboutImages[2].src}
              alt={aboutImages[2].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-secondary/5 p-8 sm:p-10 lg:p-12">
          <p className="text-lg leading-relaxed text-primary/90 sm:text-xl">
            {t("p4")}
          </p>
          <p className="mt-6">
            <Link
              href="/contact"
              className="inline-flex rounded-xl bg-secondary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-secondary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              {t("cta")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
