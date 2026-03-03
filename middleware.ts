import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "fr", "es"] as const;
const DEFAULT_LOCALE = "en";

function getPreferredLocale(acceptLanguage: string | null): (typeof LOCALES)[number] {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const preferred = acceptLanguage
    .split(",")
    .map((s) => {
      const [locale] = s.trim().split(";");
      return locale?.toLowerCase().split("-")[0] ?? "";
    })
    .find((lang) => LOCALES.some((l) => l === lang));
  return (preferred as (typeof LOCALES)[number]) ?? DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Redirect root to default or preferred locale
  if (pathname === "/") {
    const locale = getPreferredLocale(request.headers.get("accept-language"));
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // If path has no locale prefix, redirect to default locale
  const segment = pathname.split("/")[1];
  if (segment && !LOCALES.includes(segment as (typeof LOCALES)[number])) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
