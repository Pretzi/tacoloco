import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "fr", "es"] as const;
const DEFAULT_LOCALE = "en";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // If path has no locale prefix, redirect to default locale
  const segment = pathname.split("/")[1];
  if (segment && !LOCALES.includes(segment as (typeof LOCALES)[number])) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Do NOT match "/" — root is handled by app/page.tsx redirect (avoids Edge __dirname on Vercel)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).+)"],
};
