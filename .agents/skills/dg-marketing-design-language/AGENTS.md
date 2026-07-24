# DataGlass Marketing Design Language

Use this reference when creating, reviewing, or aligning marketing pages in `dg-marketing`. The first sections of the landing page are the source of truth for visual rhythm:

- `dg-marketing/layers/product/app/components/section/hero/SectionHero.vue`
- `dg-marketing/layers/product/app/components/section/socialProof/SectionSocialProof.vue`
- `dg-marketing/layers/product/app/components/section/modelExplainer/SectionModelExplainer.vue`
- `dg-marketing/layers/product/app/components/section/keyFeatures/SectionKeyFeatures.vue`
- `dg-marketing/layers/base/app/components/marketing/MarketingFoundations.vue`

## Apply This For

- Pricing, company, solutions, integrations, resources, and legal marketing pages.
- Repeated alignment passes where eyebrows, rails, section spacing, dividers, or card treatments have drifted.
- New marketing sections that should feel native to DataGlass instead of page-specific.

## Required Workflow

1. Inspect the target page and the matching homepage sections before editing.
2. Preserve page content, SEO, locale behavior, and data contracts.
3. Align section structure first: rails, spacing, eyebrow, title, lede, divider, content.
4. Reuse shared components before adding markup: `MarketingBadge`, `MarketingRule`, `MarketingReveal`, `DgChrome`, and existing marketing components.
5. Verify desktop and mobile layouts.

## Section Pattern

Most sections should follow the homepage rhythm:

- Outer `section.relative`.
- `dg-inset` for rails and page width.
- Header band with `pt-20 sm:pt-32 pb-10`.
- `MarketingReveal` around visible content.
- `MarketingBadge` eyebrow.
- Responsive title/description grid.
- `MarketingRule` between major header and content bands.
- Existing chrome/card treatments for panels.

## Eyebrow Rules

Eyebrow drift is a recurring problem. Treat these as hard rules unless a homepage section gives a better direct match.

- Prefer `MarketingBadge` for normal section eyebrows.
- Add a Lucide `UIcon` in the icon slot.
- Use `self-start` for left-aligned editorial headers.
- Center the badge only in centered sections.
- Do not use a loose paragraph eyebrow for a normal section header.
- Keep eyebrow labels short and locale-aware.

Reference shape:

```vue
<MarketingBadge :label="copy.eyebrow" class="self-start">
  <template #icon>
    <UIcon name="i-lucide-sparkles" class="size-4" />
  </template>
</MarketingBadge>
```

## Header Shape

Use this shape for left-aligned editorial sections:

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

## Visual Rules

- Use `MarketingRule`; avoid ad hoc section dividers.
- Use `dg-inset`; avoid page-specific max-width wrappers as the main rail.
- Keep cards flat and deliberate: no cards inside cards unless matching existing `DgChrome` or accent-panel patterns.
- Use `gap-1` for tiled card mosaics and 1px borders for hairline separation.
- Keep radii close to existing values: small badges/buttons, `12px` inner cards, `16px` outer panels where already used.
- Use existing CSS variables: `--dg-border`, `--dg-fg`, `--dg-ink`, `--dg-ink-muted`, `--general-border`, `--general-foreground`, `--general-muted-foreground`, `--general-accent`, `--ui-primary`.
- Avoid decorative gradients, floating hero cards, oversized marketing blocks, and one-off palettes.

## Audit Checklist

- Major sections use `dg-inset` and share the homepage rail rhythm.
- Normal section eyebrows use `MarketingBadge` and align consistently.
- Header titles and ledes use the homepage title/description grid when appropriate.
- Major dividers use `MarketingRule`.
- Panels reuse existing chrome/card treatments.
- English and Thai content still render correctly.
- Mobile layout stacks cleanly without text overlap or clipped controls.

## Verification

Run available lint/type checks for changed Vue/Nuxt files. For visual alignment work, run the app locally and inspect at least desktop and mobile widths. Use screenshot tooling if available.
