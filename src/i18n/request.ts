import { getRequestConfig } from "next-intl/server";
import { routing } from "@/i18n/routing";

const messageImports = {
  en: () => import("../../messages/en.json"),
  fr: () => import("../../messages/fr.json"),
  es: () => import("../../messages/es.json"),
} as const;

type Locale = (typeof routing.locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }
  const messages = (await messageImports[locale as Locale]()).default;
  return {
    locale,
    messages,
  };
});
