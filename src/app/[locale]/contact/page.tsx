import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";

const UBER_EATS_URL =
  "https://www.ubereats.com/ca/store/taco-loco/vX78IiGsUzW3WnND5jpRTg";

const GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.4!2d-79.4025!3d43.6545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b35f19a4606a7%3A0x67f721f5c51f4888!2sTaco%20Loco!5e0!3m2!1sen!2sca!4v1";

export default async function ContactPage() {
  const t = await getTranslations("pages.contact");

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-primary/80">
          {t("intro")}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h2 className="font-semibold text-primary">{t("addressLabel")}</h2>
                  <p className="mt-1 text-primary/80">{t("address")}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h2 className="font-semibold text-primary">{t("hoursLabel")}</h2>
                  <p className="mt-1 text-primary/80">{t("hours")}</p>
                </div>
              </div>
            </div>

          </div>

          <div className="rounded-2xl border border-primary/10 bg-primary/5 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-primary sm:text-2xl">{t("formTitle")}</h2>
            <p className="mt-2 text-sm text-primary/60">{t("formSubtitle")}</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-primary/10 shadow-lg">
          <Image
            src="/images/contact-storefront.png"
            alt="TacoLoco storefront at 160 Baldwin Street, Kensington Market"
            width={1200}
            height={800}
            className="h-auto w-full object-cover"
            priority={false}
          />
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-primary/10 shadow-lg">
          <iframe
            src={GOOGLE_MAPS_EMBED}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="TacoLoco location on Google Maps"
            className="w-full"
          />
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <Image
            src="/images/logo.png"
            alt="TacoLoco"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
          />
          <p className="text-sm text-primary/60">
            160 Baldwin Street, Kensington Market, Toronto
          </p>
        </div>
      </div>
    </div>
  );
}
