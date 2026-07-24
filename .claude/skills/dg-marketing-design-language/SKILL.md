---
name: dg-marketing-design-language
description: Realign DataGlass marketing pages to Austin's homepage design language. Use when creating or editing files under `dg-marketing/layers/**/app/pages/**`, `dg-marketing/layers/**/app/components/section/**`, or `dg-marketing/layers/**/app/components/marketing/**`, or when the user asks to "align", "realign", "audit design", or "convert" a marketing page. Detects brutalist/editorial drift (numbered mono eyebrows, uppercase tracking, vertical rails, sharp corners, oversized H1s, `font-mono dl` blocks, decorative dots/crosses, `·` separators, bespoke markup) and converts it to the canonical pill-eyebrow / hairline / NuxtUI pattern from the first four homepage sections.
---

# DataGlass Marketing Design Realignment

The marketing site has two visual dialects in production:

- **Canon** — Austin's design language. Calm, hairline-driven, pill eyebrows with icons, NuxtUI primitives, soft radii. The first four homepage sections are the reference.
- **Drift** — brutalist / editorial. Numbered mono eyebrows, uppercase tracking, vertical-rail page chrome, oversized clamps, bespoke `font-mono dl` stat blocks, sharp corners, decorative dots/crosses, `·` middot separators, bespoke buttons/tabs where NuxtUI exists.

Your job in this skill is to **audit a target page, propose a conversion, get approval, apply, then verify visually**. Preserve information architecture, copy, SEO, JSON-LD, and data shapes. Only the presentation layer changes.

## Workflow

1. **Locate canon dynamically.** For each design area, find Austin's most recent authoritative file via git. Do not hardcode — the canon evolves.
2. **Audit the target.** Read the target page top-to-bottom, mark each drift hit with file:line. Produce a deviation report.
3. **Propose a conversion plan.** For each hit, name the canon source it should match and the specific change.
4. **Wait for approval.** Do not edit until the user OKs the plan.
5. **Apply, including dependent `<style>` cleanup.** Remove scoped CSS that only existed to prop up a drifted pattern.
6. **Verify visually.** Start the dev server, view desktop + mobile. Use Playwright if available. Do not declare done on type-check alone.

## Canon — first four homepage sections

These are the authoritative references. Read them before editing any target.

- `dg-marketing/layers/product/app/components/section/hero/SectionHero.vue`
- `dg-marketing/layers/product/app/components/section/socialProof/SectionSocialProof.vue`
- `dg-marketing/layers/product/app/components/section/modelExplainer/SectionModelExplainer.vue`
- `dg-marketing/layers/product/app/components/section/keyFeatures/SectionKeyFeatures.vue`

Shared chrome and primitives:

- `dg-marketing/layers/base/app/components/marketing/MarketingFoundations.vue`
- `MarketingBadge`, `MarketingReveal`, `MarketingRule` (auto-imported)

## Dynamic canon lookup

For each design area below, find Austin's latest authoritative file before citing a pattern. Run these from the repo root.

```bash
# Hero area
git log --author=Austin --pretty=format:'%h %ad %s :: %f' --date=short \
  -- 'dg-marketing/layers/**/section/hero/**' 'dg-marketing/layers/**/pages/**' | head -5

# Section header / eyebrow / lede
git log --author=Austin --pretty=format:'%h %ad %s :: %f' --date=short \
  -- 'dg-marketing/layers/**/section/**' 'dg-marketing/layers/base/**/MarketingBadge.vue' | head -5

# Page chrome (dg-inset, MarketingRule)
git log --author=Austin --pretty=format:'%h %ad %s :: %f' --date=short \
  -- 'dg-marketing/layers/base/**' | head -5

# Trust / KPI / panel composition
git log --author=Austin --pretty=format:'%h %ad %s :: %f' --date=short \
  -- 'dg-marketing/layers/product/app/components/section/socialProof/**' \
     'dg-marketing/layers/product/app/components/section/keyFeatures/**' | head -5
```

Read the top result for each area, then quote its pattern when proposing the conversion. If a file has both Austin and Bhum commits, prefer `git blame` to confirm Austin authored the specific block being cited.

## Authorship quick check

When deciding whether a *target* page needs realignment, check who actually wrote it:

```bash
git log --pretty=format:'%an' -- <target-file> | sort | uniq -c | sort -rn
```

Bhum-majority files (`bhumsoonjun`, `bhumrapeefanboy`) on pages Austin has not blessed are the primary realignment candidates.

## Deviation → conversion table

| Drift pattern | Canon equivalent |
| --- | --- |
| `font-mono text-[11px] tracking-[0.18em] uppercase` numbered eyebrow (`00 / Pricing`) | `MarketingBadge` with a Lucide `UIcon` slot. Sentence case. `self-start` left, centered for centered sections. |
| Loose `uppercase tracking-[0.18em]` text anywhere | Sentence case at default tracking. Uppercase only inside `MarketingBadge`'s tag pill, never on body or labels. |
| Loose `font-mono` text on labels, dl, kpis, captions | Default font. Numeric KPIs use `font-semibold tracking-[-0.02em]` like SectionSocialProof KPIs. |
| Brutalist `<dl>` stat blocks with mono + uppercase + dashed borders | Drop, or convert to the SectionSocialProof KPI band: 2-up grid, `text-[1.875rem] sm:text-[2rem] font-semibold` value over `text-[0.8125rem] text-[var(--dg-ink-muted)]` label, hairline `border-b` rows. |
| Numbered ordinals shown as content (`01`, `02`, `03` as giant display numerals) | Remove. The content carries its own order; the ordinal is decoration. |
| Vertical page rails (`dg-inset border-l border-r border-[var(--general-border)]`) | Plain `dg-inset`. Use `MarketingRule` for horizontal section dividers and `border-b border-[var(--dg-border)]` for hairline strips. No vertical rails. |
| 3/9 column editorial header grid (left mono ordinal, right title block) | Either centered section header (`MarketingBadge` + `dg-display` H2 + lede, all centered) or the homepage `lg:grid-cols-[1fr_500px]` title/lede grid from `MarketingFoundations` patterns. |
| Oversized H1: `clamp(2rem,7.5vw,4.5rem)` with `tracking-[-0.04em]` | Hero H1 clamp(28px, 6.4vw, 48px), tracking near the homepage hero (~`-1px`/`-0.025em`). Section H2 clamp(1.75rem, 3.6vw, 2.5rem). |
| Sharp corners (`rounded-[3px]`, no radius) | Buttons inherit NuxtUI defaults. Cards/panels `rounded-lg` or `rounded-[12px]`. Outer accent panels `rounded-[16px]`. |
| Decorative dots, crosses, asterisk glyphs, `·` middot separators | Remove. Use whitespace, real punctuation, or `MarketingRule`. (See [[feedback_no_middot_separator]].) |
| Brand-orange/blue panel wrapping inner cards with `rounded-[16px]` + manual `radial-gradient` washes + dotgrid backgrounds | Keep the outer-accent-panel + inner-white-cards pattern only when it matches the homepage `SectionKeyFeatures` composition. Drop manual radial/dotgrid SVG washes. |
| `--general-foreground`, `--general-muted-foreground`, `--general-border`, `--general-accent` | Prefer `--dg-fg`, `--dg-ink`, `--dg-ink-muted`, `--dg-ink-subtle`, `--dg-border`, `--dg-page-muted`, `--ui-primary`. Keep `--general-*` only where the canonical homepage sections use them. |
| Bespoke button/tab/accordion/table markup (custom `<button>` accordions, hand-rolled tab strips, `<table>` chrome) | NuxtUI: `UButton`, `UAccordion`, `UTabs`, `UPricingPlans`, `UTable`. Only fall back to bespoke when the component genuinely cannot express the design. |
| Scoped `<style>` rules that only style a drifted pattern (e.g., `.dg-faq-plus`, `.dg-compare-sticky`, `.dg-compare-scroll`) | Delete in the same edit. If the new markup is NuxtUI, the styles are no longer load-bearing. |
| `MarketingReveal` wrapping every paragraph, ordinal, dl row, or pure-spacing div | Wrap visible section bands and meaningful copy blocks. Do not wrap empty or ordinal-only elements. Match the homepage cadence (one `MarketingReveal` per meaningful reveal). |

## Audit report format

Produce one block per drift hit:

```
[file:line] <pattern name>
  Found:   <quoted markup or class>
  Canon:   <file:line in homepage canon>
  Change:  <one-line conversion>
```

End with a short summary: count of hits, list of `<style>` rules to delete, list of bespoke components to swap for NuxtUI.

## Layout invariants (preserved during conversion)

- One `<section>` per logical band. Each section sits inside `dg-inset`.
- `MarketingRule` separates major bands. No ad hoc horizontal `<hr>` or `<div class="border-b">` between sections.
- Section padding rhythm: hero `pt-12 pb-12 lg:pt-20 lg:pb-20`, section header band `pt-20 sm:pt-32 pb-10`, content band `py-12 sm:py-16`.
- Mobile-first: always test desktop + a narrow viewport. Brutalist patterns frequently break narrow text overlap and tap-target sizing.
- Bilingual: every change must work in EN and TH. Locale is via `useMarketingLocale()` / `useLocalised()`.

## What never changes

- Page-level `definePageMeta`, `useSeoMeta`, `useHead`, JSON-LD blocks.
- Data files under `app/data/**` and the data contracts they expose.
- Component prop signatures of shared marketing components.
- Copy itself — EN and TH strings stay the same unless the user asks for a copy change.

## Verification (required)

Visual verification is mandatory after any realignment edit. Type-checking does not catch design drift.

```bash
pnpm --filter dg-marketing dev
# or, from repo root:
pnpm dev
```

Then:

1. Open the changed route at desktop width (≥ 1024px) and confirm spacing, eyebrow placement, hairlines, and panel rhythm match the homepage equivalent.
2. Resize to narrow (≤ 420px). Confirm no overlap, no clipped controls, no sideways scroll except inside intentional scroll containers.
3. Toggle locale to TH and repeat. Thai often expands line lengths — catch overflow now.
4. If Playwright is available, screenshot the converted section and a homepage analog side-by-side; visually diff.

If any check fails, iterate before reporting the work as done. State explicitly when a check could not be performed (e.g., dev server unavailable) rather than claiming success.

## Edge cases

- **Pages with mixed authorship.** A page with Austin commits *and* Bhum commits may have an Austin-blessed shell with Bhum-drifted bands inside. Convert only the drifted bands; leave Austin's work alone unless the user asks otherwise. `git blame` resolves disputes.
- **Editorial sections that genuinely serve content.** Some research / methodology pages may legitimately need editorial typography for long-form prose. The realignment goal is consistency with the homepage rhythm, not erasure of every dense layout. If a band reads as long-form *content* (paragraphs, citations, math), preserve typography that aids reading; still strip numbered mono eyebrows and uppercase tracking from headings.
- **`MarketingPricing`, `MarketingIntegrations`, `MarketingWorkflow`, and similar shared marketing components.** These render across pages. Edit them at the component level only when the drift is in the component itself — otherwise it cascades to surfaces the user didn't ask to change.
- **Custom `<style scoped>` blocks.** Always check whether the rule props up a drifted pattern. If the post-conversion markup is NuxtUI-driven, the rule is dead weight — delete it.

## Related memory

- [[feedback_no_middot_separator]] — never use `·` separators.
- [[brand_colors]] — Primary orange, Secondary blue, Neutral zinc.
- [[architecture_doctrine]] — NuxtUI is the only component library; preserve the layered Nuxt structure when moving files.
