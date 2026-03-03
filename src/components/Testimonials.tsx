"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const GOOGLE_MAPS_SEARCH =
  "https://www.google.com/maps/search/?api=1&query=TacoLoco+160+Baldwin+Street+Toronto+ON";

const reviewers = [
  { avatar: "/images/avatars/sarah.png", rating: 5 },
  { avatar: "/images/avatars/james.png", rating: 5 },
  { avatar: "/images/avatars/maria.png", rating: 5 },
  { avatar: "/images/avatars/alex.png", rating: 5 },
  { avatar: "/images/avatars/chris.png", rating: 4 },
];

const sourceLogo: Record<string, { src: string; width: number; height: number; alt: string; className: string }> = {
  Yelp: { src: "/images/yelp-logo.png", width: 512, height: 207, alt: "Yelp", className: "h-4 w-auto object-contain" },
  Google: { src: "/images/google-logo.png", width: 512, height: 174, alt: "Google", className: "h-4 w-auto object-contain" },
  "Uber Eats": { src: "/images/uber-eats-logo.svg", width: 146, height: 24, alt: "Uber Eats", className: "h-3.5 w-auto object-contain" },
};

function SourceLogo({ source }: { source: string }) {
  const logo = sourceLogo[source];
  if (!logo) return <span className="text-sm text-primary/60">{source}</span>;
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      className={logo.className}
    />
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-lg ${i <= count ? "text-amber-400" : "text-primary/15"}`}
          aria-hidden
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
    <section id="reviews" className="scroll-mt-20 bg-primary/5 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-lg text-primary/80">{t("subtitle")}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviewers.map((reviewer, i) => (
            <blockquote
              key={i}
              className="flex flex-col rounded-2xl border border-primary/10 bg-white p-6 shadow-sm sm:p-8"
            >
              <Stars count={reviewer.rating} />
              <p className="mt-4 flex-1 text-primary/90 leading-relaxed">
                &ldquo;{t(`quotes.${i}.quote`)}&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <Image
                  src={reviewer.avatar}
                  alt={t(`quotes.${i}.author`)}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/10"
                />
                <div className="min-w-0 flex-1">
                  <cite className="block not-italic font-semibold text-primary">
                    {t(`quotes.${i}.author`)}
                  </cite>
                  <SourceLogo source={t(`quotes.${i}.source`)} />
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <div
            className="rounded-2xl border border-primary/10 bg-white p-6 shadow-md sm:p-8"
            aria-labelledby="google-reviews-heading"
          >
            <h3 id="google-reviews-heading" className="sr-only">
              {tGoogle("title")}
            </h3>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo.png"
                  alt="TacoLoco"
                  width={140}
                  height={48}
                  className="h-12 w-auto object-contain"
                />
                <span className="text-primary/30 text-2xl font-light">×</span>
                <Image
                  src="/images/google-logo.png"
                  alt="Google"
                  width={512}
                  height={174}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center gap-1 sm:justify-start">
                  <span className="flex text-lg text-amber-400" aria-hidden>
                    {"★".repeat(5)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-primary/60">
                  {tGoogle("viewAndWrite")}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={GOOGLE_MAPS_SEARCH}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary/20 bg-white px-5 py-3 text-base font-semibold text-primary transition hover:border-primary/40 hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                {tGoogle("viewOnGoogle")}
              </a>
              <a
                href={GOOGLE_MAPS_SEARCH}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-3 text-base font-semibold text-white transition hover:bg-secondary-light focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                {tGoogle("writeReview")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
