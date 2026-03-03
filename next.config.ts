import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  // Run next-intl (and its runtime) in Node instead of bundling (avoids __dirname in ESM bundle on Vercel)
  serverExternalPackages: ["next-intl", "use-intl"],
};

export default withNextIntl(nextConfig);
