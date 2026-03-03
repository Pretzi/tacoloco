import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Exclude exact "/" so root is handled by Server Components (avoids __dirname in Edge)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).+)"],
};
