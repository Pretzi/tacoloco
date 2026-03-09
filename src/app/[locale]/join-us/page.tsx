import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function JoinUsPage() {
  const t = await getTranslations("pages.joinUs");

  return (
    <div className="bg-white">
      <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-96">
        <Image
          src="/images/join-us/hero.png"
          alt={t("heroAlt")}
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
            <h2 className="text-xl font-bold text-primary sm:text-2xl">{t("section1Title")}</h2>
            <p className="mt-4 leading-relaxed text-primary/85">{t("p1")}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/join-us/team.png"
              alt={t("imageAltTeam")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-16 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg lg:order-first">
            <Image
              src="/images/join-us/vibe.png"
              alt={t("imageAltVibe")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">{t("section2Title")}</h2>
            <p className="mt-4 leading-relaxed text-primary/85">{t("p2")}</p>
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-secondary/5 p-8 sm:p-10 lg:p-12 text-center">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary/70">{t("ctaText")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex rounded-xl bg-secondary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-secondary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              {t("getInTouch")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
