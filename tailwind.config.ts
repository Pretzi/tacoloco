import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Legacy (form components) ── */
        primary: "oklch(8% 0.015 255)",
        secondary: "oklch(55% 0.27 27)",
        "secondary-light": "oklch(60% 0.26 27)",
        "secondary-dark": "oklch(48% 0.27 27)",
        /* ── Token-based ── */
        paper: "oklch(99% 0.004 75)",
        "paper-2": "oklch(95% 0.006 75)",
        "paper-3": "oklch(90% 0.008 75)",
        ink: "oklch(8% 0.015 255)",
        "ink-2": "oklch(28% 0.03 255)",
        muted: "oklch(52% 0.015 255)",
        rule: "oklch(83% 0.008 255)",
        accent: "oklch(55% 0.27 27)",
        "accent-h": "oklch(60% 0.26 27)",
        "accent-d": "oklch(48% 0.27 27)",
        "accent-ink": "oklch(99% 0 0)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
        sans:    ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-l": "var(--text-display-l)",
        "display":   "var(--text-display)",
        "display-s": "var(--text-display-s)",
      },
      maxWidth: {
        content: "var(--content-max)",
        prose:   "var(--prose-max)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
