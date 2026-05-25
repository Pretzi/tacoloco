import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { PageFold } from "@/components/PageFold";

const UBER_EATS_URL =
  "https://www.ubereats.com/ca/store/taco-loco/vX78IiGsUzW3WnND5jpRTg";

const GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.4!2d-79.4025!3d43.6545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b35f19a4606a7%3A0x67f721f5c51f4888!2sTaco%20Loco!5e0!3m2!1sen!2sca!4v1";

export default async function ContactPage() {
  const t = await getTranslations("pages.contact");

  return (
    <div className="bg-paper">
      <PageFold
        eyebrow="160 Baldwin Street · Open Daily"
        title={t("title")}
        subtitle={t("intro")}
      />

      <div
        className="mx-auto max-w-content px-[var(--page-gutter)]"
        style={{ paddingTop: "var(--space-3xl)", paddingBottom: "var(--space-3xl)" }}
      >
        <div className="grid gap-16 lg:grid-cols-[2fr_3fr] lg:gap-12 lg:items-start">

          {/* ── Left: contact info ── */}
          <div className="lg:sticky lg:top-24">
            <div style={{ paddingBottom: "var(--space-lg)", borderBottom: "var(--rule-hair) solid var(--color-rule)" }}>
              <p className="text-ink/50" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, marginBottom: "var(--space-sm)" }}>
                {t("addressLabel")}
              </p>
              <p className="text-ink" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-md)", fontWeight: 500, lineHeight: 1.5 }}>
                {t("address")}
              </p>
            </div>
            <div style={{ paddingTop: "var(--space-lg)", paddingBottom: "var(--space-lg)", borderBottom: "var(--rule-hair) solid var(--color-rule)" }}>
              <p className="text-ink/50" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, marginBottom: "var(--space-sm)" }}>
                {t("hoursLabel")}
              </p>
              <p className="text-ink" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-md)", fontWeight: 500, lineHeight: 1.5 }}>
                {t("hours")}
              </p>
            </div>
            <div style={{ paddingTop: "var(--space-lg)" }}>
              <p className="text-ink/50" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, marginBottom: "var(--space-md)" }}>
                {t("connectLabel")}
              </p>
              <div className="flex flex-col gap-3">
                <a href="https://www.instagram.com/tacoloco.to/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 600, textDecoration: "underline", textDecorationThickness: "1px", textUnderlineOffset: "3px" }}>
                  Instagram ↗
                </a>
                <a href={UBER_EATS_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 600, textDecoration: "underline", textDecorationThickness: "1px", textUnderlineOffset: "3px" }}>
                  {t("orderOnline")} ↗
                </a>
              </div>
            </div>
            <div className="relative overflow-hidden" style={{ marginTop: "var(--space-2xl)", aspectRatio: "4/3", borderRadius: 0 }}>
              <Image src="/images/contact-storefront.png" alt={t("storefrontAlt")} fill
                sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            </div>
          </div>

          {/* ── Right: form + map ── */}
          <div>
            <div style={{ borderTop: "3px solid var(--color-accent)", paddingTop: "var(--space-xl)" }}>
              <h2 className="text-ink" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: 400, lineHeight: 1, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                {t("formTitle")}
              </h2>
              <p className="text-ink/60" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", marginTop: "var(--space-sm)", lineHeight: 1.55 }}>
                {t("formSubtitle")}
              </p>
              <div style={{ marginTop: "var(--space-lg)" }}>
                <ContactForm />
              </div>
            </div>
            <div className="overflow-hidden" style={{ marginTop: "var(--space-2xl)", borderRadius: 0 }}>
              <iframe
                src={GOOGLE_MAPS_EMBED}
                width="100%"
                height="360"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("mapTitle")}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
