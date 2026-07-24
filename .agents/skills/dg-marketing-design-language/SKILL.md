---
name: dg-marketing-design-language
description: Use when creating, reviewing, or aligning DataGlass marketing pages in dg-marketing. Applies the homepage landing-page design language to pricing, company, solutions, integrations, resources, and other marketing routes, especially section headers, eyebrows, rails, hairlines, spacing, cards, and bilingual Nuxt/Vue page layout consistency.
---

# DataGlass Marketing Design Language

Use this skill before editing marketing UI in `dg-marketing/layers/**/app/pages` or marketing section components. The source of truth is the first run of the landing page:

- `dg-marketing/layers/product/app/components/section/hero/SectionHero.vue`
- `dg-marketing/layers/product/app/components/section/socialProof/SectionSocialProof.vue`
- `dg-marketing/layers/product/app/components/section/modelExplainer/SectionModelExplainer.vue`
- `dg-marketing/layers/product/app/components/section/keyFeatures/SectionKeyFeatures.vue`
- `dg-marketing/layers/base/app/components/marketing/MarketingFoundations.vue`

## Workflow

1. Inspect the target page and the matching homepage sections before editing.
2. Keep the page's product message, SEO, locale handling, and data contracts intact.
3. Align the visible section structure first: rails, spacing, eyebrow, title, lede, divider, content.
4. Reuse existing shared marketing components before adding new markup.
5. Verify desktop and mobile layout after edits.

## Core Pattern

Most marketing sections should look like one of these homepage patterns:

- Hero: `section.relative` with `dg-inset`, centered or editorial content, restrained CTAs, and product UI proof nearby.
- Section header: `dg-inset pt-20 sm:pt-32 pb-10`, `MarketingReveal`, `MarketingBadge`, then a responsive title/description grid.
- Content break: `MarketingRule` between major header/content bands.
- Card panels: outer accent panel or `DgChrome`, inner white cards, `gap-1`, 1px borders, small radius consistency.
- Trust strip: centered hairline eyebrow row, restrained logo/KPI bands, no oversized marketing-card composition.

## Eyebrows

Eyebrow drift is the most common issue.

- Prefer `MarketingBadge` for normal section eyebrows.
- Use an icon slot with a Lucide `UIcon` that describes the section.
- Align the badge with the section header: `self-start` for editorial left-aligned headers, centered only for centered sections.
- Do not replace a badge eyebrow with a loose `<p>` unless matching a deliberate homepage pattern such as the social proof hairline row.
- Keep eyebrow text short and locale-aware.

Good section header shape:

```vue
<div class="dg-inset pt-20 sm:pt-32 pb-10">
  <MarketingReveal>
    <div class="flex flex-col gap-6 sm:gap-8">
      <MarketingBadge :label="copy.eyebrow" class="self-start">
        <template #icon>
          <UIcon name="i-lucide-sparkles" class="size-4" />
        </template>
      </MarketingBadge>

      <div class="grid items-center gap-6 lg:grid-cols-[1fr_500px]">
        <h2 class="dg-display text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.025em] text-[var(--dg-fg)]">
          {{ copy.title }}
        </h2>
        <div class="lg:border-l lg:border-[var(--dg-border)] lg:pl-4">
          <p class="text-[1.125rem] leading-[1.4] font-medium text-[var(--dg-ink-muted)] sm:text-[1.25rem] sm:leading-[1.35]">
            {{ copy.description }}
          </p>
        </div>
      </div>
    </div>
  </MarketingReveal>
</div>
```

## Layout Rules

- Use `dg-inset` as the page width/rail container. Do not invent page-specific max-width wrappers unless the section content requires one inside `dg-inset`.
- Use `MarketingRule` for full-width section dividers. Avoid ad hoc border lines between major sections.
- Use `MarketingReveal` around visible section content, not around empty spacing.
- Keep section padding close to homepage rhythm: `pt-20 sm:pt-32 pb-10` for headers, `py-12 sm:py-16` for content bands, larger hero padding only at the top of a route.
- Reuse CSS variables already used by homepage sections: `--dg-border`, `--dg-fg`, `--dg-ink`, `--dg-ink-muted`, `--general-border`, `--general-foreground`, `--general-muted-foreground`, `--general-accent`, `--ui-primary`.
- Avoid decorative gradients, floating cards inside cards, and one-off palettes.

## Typography

- Use `dg-display` for major headings.
- Keep marketing section headings in the homepage range: `clamp(1.75rem,3.6vw,2.5rem)` for section H2s and a larger clamp only for route H1s.
- Do not use negative letter spacing beyond established homepage classes.
- Keep body/lede text readable and bounded with `max-w` or a right-column description.

## Page Alignment Audit

When asked to align a page, check:

- Does each major section sit in `dg-inset` and respect the same rail/hairline rhythm?
- Are all normal section eyebrows implemented with `MarketingBadge` and aligned consistently?
- Do header grids match the homepage left title / right lede pattern where appropriate?
- Are dividers implemented with `MarketingRule`?
- Are cards using existing chrome/panel patterns instead of custom nested cards?
- Does the page still work in English and Thai?
- Does mobile stacking avoid text overlap and clipped controls?

## Verification

Run the repo's relevant checks when available. For visual work, start the dev server and inspect at least one desktop and one mobile viewport. If Playwright or screenshot tooling exists, use it to catch spacing, overflow, and text alignment regressions.
