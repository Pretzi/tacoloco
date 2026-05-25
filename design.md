# TacoLoco Design System

<!-- Hallmark · genre: editorial · theme: Riso-adapted · macrostructure: multi-page
     paper-band: light (oklch 97%) · display-style: italic-serif (Fraunces) · accent-hue: warm (crimson ~27°)
     audience: catering clients / event planners · use: book catering · tone: street + loud -->

## Overview

TacoLoco is an **editorial** design system. The voice is bold, direct, and typographic-first — big Fraunces italic headlines, cream paper, brand navy, brand crimson. No softening, no gradients, no rounded-everything. Street food energy through type and composition, not decoration.

---

## Tokens

All tokens live in `src/app/globals.css` (`:root` block) and are mirrored in `src/app/tokens.css`.

### Colour

| Token | Value | Use |
|-------|-------|-----|
| `--color-paper` | `oklch(97% 0.012 75)` | Page background (warm cream) |
| `--color-paper-2` | `oklch(94% 0.014 75)` | Subtle section contrast |
| `--color-paper-3` | `oklch(91% 0.016 75)` | Hover states on cream |
| `--color-ink` | `oklch(14% 0.04 255)` | Primary text (brand navy) |
| `--color-ink-2` | `oklch(25% 0.04 255)` | Secondary dark |
| `--color-muted` | `oklch(50% 0.02 255)` | Muted text |
| `--color-rule` | `oklch(80% 0.01 255)` | Hairline dividers |
| `--color-accent` | `oklch(49% 0.24 27)` | Brand crimson — CTAs, accents |
| `--color-accent-h` | `oklch(44% 0.24 27)` | Accent hover (darker) |
| `--color-accent-d` | `oklch(39% 0.24 27)` | Accent pressed |
| `--color-accent-ink` | `oklch(98% 0.005 75)` | Text on accent (near-white) |

### Typography

| Token | Value |
|-------|-------|
| `--font-display` | `"Fraunces", Georgia, "Times New Roman", serif` |
| `--font-body` | `"IBM Plex Sans", system-ui, -apple-system, sans-serif` |

**Display** — Fraunces, weight 900, italic. Headlines, category labels, section titles.
**Body** — IBM Plex Sans, weights 400/500/600. All copy, nav, prices, metadata.

**Scale:**

| Token | Value |
|-------|-------|
| `--text-xs` | `0.75rem` |
| `--text-sm` | `0.875rem` |
| `--text-md` | `1rem` |
| `--text-lg` | `1.125rem` |
| `--text-xl` | `1.375rem` |
| `--text-2xl` | `1.75rem` |
| `--text-display-s` | `clamp(2.25rem, 4vw + 0.75rem, 4rem)` |
| `--text-display` | `clamp(3rem, 6vw + 1rem, 5.5rem)` |
| `--text-display-l` | `clamp(3.5rem, 7vw + 1.5rem, 7rem)` |

### Spacing (4pt scale)

`--space-xs` (4px) · `--space-sm` (8px) · `--space-md` (16px) · `--space-lg` (24px) · `--space-xl` (32px) · `--space-2xl` (48px) · `--space-3xl` (64px) · `--space-4xl` (96px)

### Layout

| Token | Value |
|-------|-------|
| `--max-content` | `80rem` |
| `--prose-max` | `65ch` |
| `--page-gutter` | `clamp(1rem, 4vw, 2.5rem)` |

### Motion (motion-cut project — no Framer Motion)

| Token | Value |
|-------|-------|
| `--dur-short` | `120ms` |
| `--dur-base` | `200ms` |
| `--dur-long` | `350ms` |
| `--ease-out` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |

---

## Architecture

### Dark frame pattern

Every page uses a **dark navy entry zone**:

1. **Header** (sticky) — `bg-ink`, centered logo, nav row, double crimson rule at bottom
2. **Page fold** — `bg-ink`, H1 in Fraunces Black 900 italic + subtitle on cream-muted text
3. **Double crimson rule** — `height: 5px`, two `h-px bg-accent` absolutely-positioned divs
4. **Body** — `bg-paper` (cream)
5. **Footer** — `bg-ink`, centered logo + tagline, minimal links

### Nav — N6 Newspaper Masthead

Dark navy, full-width. Issue line (small caps) → centered logo → desktop nav links → mobile hamburger. Double crimson rule at bottom.

### Footer — Ft1 Mast-headed

Dark navy, centered layout. Logo → tagline → hairline → link row (uppercase tracked) → address + copyright.

---

## Macrostructures

| Page | Macrostructure | Notes |
|------|---------------|-------|
| `/` | Marquee Hero | Dark fold (no CTA) + below-fold CTA band + PromoMarquee + Menu + Testimonials + ExploreMore |
| `/about` | Long Document | Page fold + alternating image/text sections + typographic CTA |
| `/join-us` | Long Document | Page fold + alternating image/text sections + accent-button CTA |
| `/catering` | Split Studio | Page fold with direct CTA → pitch left (3fr) / sticky form right (2fr) |
| `/contact` | Split Studio | Page fold → info left (2fr) / form + map right (3fr) |

---

## Component voice

### Headlines
```tsx
<h2
  className="text-ink"
  style={{
    fontFamily: "var(--font-display)",
    fontSize: "var(--text-xl)",        // section heading
    fontWeight: 900,                   // display: 900; section: 700
    fontStyle: "italic",
    lineHeight: 1.05,
    letterSpacing: "-0.02em",         // display: -0.02em; section: -0.01em
  }}
/>
```

### Body copy
```tsx
<p
  className="text-ink/75"
  style={{
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-sm)",
    lineHeight: 1.65,
  }}
/>
```

### Primary CTA (crimson filled)
```tsx
<a
  style={{
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-md)",
    fontWeight: 600,
    backgroundColor: "var(--color-accent)",
    color: "var(--color-accent-ink)",
    padding: "0.875rem 1.75rem",
    borderRadius: "var(--radius-md)",
  }}
  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--color-accent-h)")}
  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--color-accent)")}
/>
```

### Secondary CTA (ink outline)
```tsx
<a
  style={{
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-md)",
    fontWeight: 600,
    color: "var(--color-ink)",
    border: "2px solid var(--color-ink)",
    padding: "calc(0.875rem - 2px) calc(1.75rem - 2px)",
    borderRadius: "var(--radius-md)",
  }}
  onMouseEnter={e => {
    e.currentTarget.style.borderColor = "var(--color-accent)";
    e.currentTarget.style.color = "var(--color-accent)";
  }}
  onMouseLeave={e => {
    e.currentTarget.style.borderColor = "var(--color-ink)";
    e.currentTarget.style.color = "var(--color-ink)";
  }}
/>
```

### Hairline rule separator
```tsx
style={{ borderBottom: "var(--rule-hair) solid var(--color-rule)" }}
```
Where `--rule-hair` = `1px`.

### Section accent mark (crimson square)
```tsx
<span
  className="inline-block bg-accent"
  style={{ width: 8, height: 8, borderRadius: 1, flexShrink: 0 }}
  aria-hidden="true"
/>
```

### Double crimson rule
```tsx
<div aria-hidden="true" className="bg-ink relative" style={{ height: 5 }}>
  <div className="absolute inset-x-0 top-0 h-px bg-accent" />
  <div className="absolute inset-x-0 bottom-0 h-px bg-accent" />
</div>
```

---

## Anti-patterns (do not reintroduce)

- `rounded-2xl` on images or cards — use `borderRadius: 0`
- `shadow-lg` / `shadow-sm` on cards — use hairline rules
- `bg-gradient-to-t from-black/60` on photo heroes — use typography-only folds
- `text-primary/X` / `bg-primary/X` — use OKLCH token references (`text-ink/60`, `bg-paper`, etc.)
- Three-equal-column feature/testimonial grids — use asymmetric layouts
- `rounded-xl` icon circles with SVGs — use flat text labels
- Inter as the only font — Fraunces (display) + IBM Plex Sans (body)
- Centered section headings — left-biased layout

---

## Exports

### tokens.css
See `src/app/tokens.css` for the full portable token file.

### Tailwind v4 @theme
```css
@theme {
  --color-paper: oklch(97% 0.012 75);
  --color-ink: oklch(14% 0.04 255);
  --color-accent: oklch(49% 0.24 27);
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "IBM Plex Sans", system-ui, sans-serif;
}
```
