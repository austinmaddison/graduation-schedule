---
name: dgfe-marketing-layers
description: Architecture rules for the DataGlass marketing site (`dg-marketing/`), which is split into seven nested Nuxt layers (base, product, pricing, company, solutions, integrations, resources). Use when adding pages, components, data files, or fixing import resolution errors after files move between layers. Covers the cross-layer alias system (`#layers/<name>/...`), auto-registered components vs explicit imports, and the locale-aware page pattern that lets one component file serve both `/` and `/th`.
---

# DataGlass marketing layers

`dg-marketing/` is a **Nuxt meta-layer** that extends seven feature sub-layers. The structure was chosen so each marketing surface (pricing, company, solutions, integrations, resources, the product landing) owns its pages, data, and any feature-specific components — while shared brand primitives (header, footer, page chrome, fonts, brand colors, the marketing layout, the localisation composable) live in one `base` layer.

This skill is the field manual: how the layers fit together, where to put new files, and which import path to use when reaching across layers. It exists because Nuxt's layer system has unintuitive auto-import boundaries that bite hard during refactors.

## Layer map

```
dg-marketing/
├── nuxt.config.ts            ← meta-layer; lists all sub-layers in `extends:`
├── layers/
│   ├── base/                 ← brand chrome (CSS, AppHeader, MarketingFooter,
│   │                            font loader, marketing layout, locale
│   │                            composables, MarketingRule, MarketingReveal,
│   │                            MarketingBadge, MarketingPricing component,
│   │                            MarketingFaq, MarketingFooter, MarketingSolutions,
│   │                            MarketingIntegrations, PlatformLogo*, app.config.ts)
│   ├── product/              ← `pages/index.vue` (the landing) + Section* components
│   │                            + `data/marketing-home.ts` (hero, FAQ, footer copy)
│   ├── pricing/              ← `pages/pricing.vue`
│   ├── company/              ← `pages/company.vue` + founder photos in public/
│   ├── solutions/            ← `pages/solutions/index.vue` + `[slug].vue`
│   │                            + `data/solutions.ts`
│   ├── integrations/         ← `pages/integrations/index.vue` + `[platform].vue`
│   │                            + `data/integrations.ts`
│   └── resources/            ← `pages/blog/`, `pages/glossary/`, `pages/how-it-works.vue`
│                                + `data/blog.ts`, `data/glossary.ts`, `data/how-it-works.ts`
```

Every sub-layer has its own `nuxt.config.ts` that just sets `$meta.name` so Nuxt names it correctly. The parent `dg-marketing/nuxt.config.ts` enumerates them all in `extends:` because **Nuxt's auto-`layers/` discovery does not recurse into extended layers**. When the consumer app (`app/`) extends `dg-marketing`, the child feature layers under `dg-marketing/layers/*` are invisible unless the parent meta-layer lists them explicitly.

## The `#layers/<name>` alias

Nuxt only auto-creates `#layers/<name>` aliases for top-level extended layers, not for ones nested under `/layers/`. So the parent meta-layer registers them by hand in its `alias:` block:

```ts
// dg-marketing/nuxt.config.ts
alias: {
  '#layers/base':         `${layerRoot}layers/base/app`,
  '#layers/product':      `${layerRoot}layers/product/app`,
  '#layers/pricing':      `${layerRoot}layers/pricing/app`,
  '#layers/company':      `${layerRoot}layers/company/app`,
  '#layers/solutions':    `${layerRoot}layers/solutions/app`,
  '#layers/integrations': `${layerRoot}layers/integrations/app`,
  '#layers/resources':    `${layerRoot}layers/resources/app`,
}
```

Use these aliases for every cross-layer import. Adding a new feature layer means:

1. Create `dg-marketing/layers/<name>/{nuxt.config.ts,app/}` (with `$meta.name`).
2. Add the path to the parent's `extends:` array.
3. Add the `#layers/<name>` entry to the parent's `alias:` block.
4. Restart `pnpm dev` (Nuxt only re-reads the layer graph at startup).

## Import rules — which path do I use?

The decision tree:

| What | From → To | What to write |
|------|-----------|---------------|
| Vue component used **only as a template tag** | any → any | nothing — Nuxt auto-registers all `.vue` files under each layer's `app/components/` |
| Vue component referenced **in JS** (e.g. `componentMap[key]`) | same layer | relative path, e.g. `'../components/Foo.vue'` |
| Vue component referenced **in JS** | cross-layer | `'#layers/<owner-layer>/components/<path>.vue'` |
| `.ts` data file | same layer | relative path, e.g. `'../data/foo'` |
| `.ts` data file | cross-layer | `'#layers/<owner-layer>/data/<file>'` |
| Composable (defined in `app/composables/`) | any → any | nothing — Nuxt auto-imports composables across all extended layers |
| Built-in Nuxt helper (`useHead`, `useSeoMeta`, `useRoute`, `definePageMeta`, etc.) | any → any | nothing — built-in auto-import |

The "auto-registration" rule is the biggest source of confusion:

- **Auto-registered** = `<MarketingRule />`, `<MarketingReveal />`, `<MarketingBadge />`, `<UButton>`, `<UIcon>` etc. all work in any template across any layer without an `import` statement. Nuxt scans every extended layer's `app/components/` tree at startup.
- **NOT auto-registered for JS use**: if you need to reference a component as a runtime value (a `Map`, a `<component :is="...">` lookup, etc.), you have to `import` it explicitly. Auto-registration only sets up the template tag, not the JS binding.

Example: `solutions/[slug].vue` builds a `platformLogoMap` so it can pick a logo by slug. That's JS use → needs an explicit import via the alias:

```ts
import PlatformLogoShopee from '#layers/base/components/platformLogo/PlatformLogoShopee.vue'
```

Whereas `MarketingRule` is only ever a template tag → no import needed.

## Page-level locale pattern

The site is bilingual: every marketing page is reachable on both `/<path>` (English) and `/th/<path>` (Thai). One component file serves both routes via `definePageMeta({ alias: ['/th/<path>'] })`. Every locale-varying meta value is a `computed()` that reads `useMarketingLocale()`.

Skeleton:

```ts
import { useLocalised, useMarketingPageSeo } from '#layers/base/composables/marketing'
import { someContent, someContentTh } from '#layers/<owner>/data/<file>'

definePageMeta({
  layout: 'marketing',
  colorMode: 'light',
  alias: ['/th/<path>'],
})

const { locale, canonicalUrl, links } = useMarketingPageSeo('/<path>')
const content = useLocalised(someContent, someContentTh)

useSeoMeta({
  title: () => content.value.metaTitle,
  description: () => content.value.metaDescription,
  ogUrl: () => canonicalUrl.value,
  ogLocale: () => (locale.value === 'th' ? 'th_TH' : 'en_US'),
  ogLocaleAlternate: () => (locale.value === 'th' ? ['en_US'] : ['th_TH']),
  twitterCard: 'summary_large_image',
  robots: 'index, follow',
})

useHead({
  htmlAttrs: { lang: () => (locale.value === 'th' ? 'th' : 'en') },
  link: links,            // canonical + hreflang alternates, all wired
})
```

Reference implementations: `layers/pricing/app/pages/pricing.vue`, `layers/integrations/app/pages/integrations/[platform].vue`, `layers/glossary/.../glossary/[term].vue`. The landing (`layers/product/app/pages/index.vue`) follows the same pattern with the addition of locale-specific JSON-LD graphs.

## Where to put a new file

| Adding | Location |
|--------|----------|
| A new shared brand primitive (rule, badge, reveal animation) | `layers/base/app/components/marketing/<Name>.vue` |
| A new platform logo | `layers/base/app/components/platformLogo/<Name>.vue` |
| A new page in an existing feature | the feature layer's `app/pages/<...>.vue` |
| A new content-driven page that doesn't fit existing features | `layers/resources/app/pages/...` (catch-all) |
| Locale-aware copy for an existing feature | the feature layer's `app/data/<file>.ts`, with both `xxx` and `xxxTh` exports |
| A new feature layer (e.g. `customers/`) | new folder under `layers/`, plus `extends:` and `alias:` in the parent meta-layer |
| A landing-page hero / model-explainer / key-features section | `layers/product/app/components/section/<...>` |

## Common errors and what they mean

**`Failed to resolve import "../components/marketing/MarketingRule.vue" from "<file in another layer>"`**

You used a relative path that doesn't exist in the consuming layer. Either:
- The component is template-only — drop the import, use it as a tag.
- You need the JS binding — replace with `'#layers/base/components/marketing/MarketingRule.vue'`.

**`Failed to resolve import "../../data/solutions" from "<file in base or resources>"`**

Cross-layer data import. Use `'#layers/solutions/data/solutions'`.

**`useMarketingPageSeo is not defined`**

Composable auto-import didn't fire. Usually means the dev server was started before a new layer was added; restart `pnpm dev`.

**Page renders but shows English content on `/th`**

The page isn't using `useLocalised(en, th)` for content, or it's using the EN-only constant directly. Wrap with `useLocalised`. Also confirm `useMarketingLocale()` is being used (it reads the route path; `definePageMeta({ alias: ['/th/...'] })` is what makes the alternate route resolve).

**404 on `/th/<path>` after merging an alias change**

Restart `pnpm dev`. Vue Router's alias map is built once at startup.

**404 on a page after files moved into a sublayer (Vite serves stale paths)**

Stop the dev server, delete `app/.nuxt` and `app/node_modules/.cache/vite`, restart. The Vite optimize-deps cache pins the old layer graph.

## Sanity checks before shipping

1. `grep -rn "from\s*['\"]\.\./" dg-marketing/layers/<your-layer> --include="*.vue"` — every relative import should resolve to a file in the same layer. Anything else needs the alias.
2. Every `.vue` page that should be reachable on `/th` has `alias: ['/th/<path>']` in `definePageMeta`.
3. Every locale-varying string is wrapped in `useLocalised(en, th)` or read from a `computed()` that branches on `locale.value`.
4. The sitemap at `app/server/routes/sitemap.xml.get.ts` lists the new path with `thaiPath` if it has a `/th` mirror.
5. Auto-imported composables (`useMarketingPageSeo`, `useMarketingLocale`, `useLocalised`) are spelled exactly as defined in `layers/base/app/composables/marketing.ts` — Nuxt won't auto-import a typo.
