---
name: dgfe-reuse-components
description: Reuse existing DGFE Nuxt components and Storybook stories instead of inventing new components or new designs. Use BEFORE building any new UI in dgfe-nuxt — a table/grid, card, list, panel, modal, form, badge/pill, empty/loading state, or any "make a view that shows X" task. Tells you where to look first (Dg* primitives, feature-layer components, @nuxt/ui, Storybook) and which table is the canonical grid (the UTable DataGrid) vs the divergent ones (CanonicalOrdersTable / CanonicalProductsTable). Triggers: "build a table", "add a grid", "make a page that lists…", "create a component for…", "show this data".
---

# DGFE — reuse components, don't reinvent

The fastest way to make a view that looks wrong is to invent a component when one already exists. **Before writing any new component or design, find the existing one.** This repo has hundreds of components, a real design system (@nuxt/ui v4), `Dg*` primitives, and a Storybook. Match what's there.

This skill pairs with [[dgfe]] (where code goes), [[nuxt-ui]] (component APIs), and [[dg-theme-audit]] (semantic tokens — never hardcode colors).

## The rule

1. **Search before you build.** A new component is the last resort, not the first move.
2. **Reuse the closest existing component.** Adapt props/columns, don't re-author the chrome.
3. **Match the existing design.** Same padding, font weights, hover behavior, tokens. If two surfaces show similar data, they should feel like the same surface.
4. **Use Storybook as the catalog.** It's the fastest way to see what already exists and how it looks, in isolation, without the full app.

## Where to look (in order)

1. **`@nuxt/ui` v4** — `UTable`, `UButton`, `UCard`, `UBadge`, `UModal`, `UPopover`, `UInput`, etc. Use these directly; don't wrap or rebuild them. See [[nuxt-ui]].
2. **`Dg*` primitives** — `dg-base/app/components/`: `DgSpinner`, `DgEmpty`, `DgPanel`, `DgLoadingOverlay`, `DgMaterialIcon`, `DgPlatformIcon`, `DgResizablePanel`. Auto-imported everywhere.
3. **Feature-layer components** — `dg-app/layers/<area>/app/components/`. Areas: `orders`, `products`, `advertising`, `metrics`, `decisions`, `analytics`, `workspace`. Grep the relevant layer before creating anything:
   ```bash
   ls dg-app/layers/<area>/app/components/
   grep -rl "Table\|DataGrid\|Card\|Pill" dg-app/layers/*/app/components/
   ```
4. **Storybook** — run it and browse:
   ```bash
   pnpm --filter dg-app storybook   # http://localhost:6006
   ```
   Stories colocate as `<Component>.stories.ts`. If a component you build is reusable, add a story following `dg-app/.storybook/README.md` (stable `title`, `tags: ["autodocs"]`, fixed fixtures, no live API).

## Tables & grids — this is where things drift

There are **two different table patterns** in this repo, and they are **not interchangeable**. Most new tables should use the canonical DataGrid pattern.

### ✅ Canonical grid (use this for paginated/filterable lists)

`UTable` (@nuxt/ui, backed by `@tanstack/vue-table`) with `TableColumn<T>` columns, a quick-filter, pagination, and a row-hover Open CTA.

- **Reference implementation:** `dg-app/layers/products/app/components/ShopProductsDataGrid.vue` (explicitly the template others copy)
- Also: `ShopOrdersDataGrid.vue`, `LazadaProductsDataGrid.vue` (orders/products layers), `advertising/app/components/AdsPerformanceDataGrid.vue`

When you need a new list view, **copy the columns + chrome from `ShopProductsDataGrid`** and swap the row shape. `ShopOrdersDataGrid` is itself a verbatim port of it — that's the intended pattern.

### ⚠️ Divergent tables (do NOT copy their design for new work)

`CanonicalOrdersTable.vue` and `CanonicalProductsTable.vue` are hand-rolled raw `<table>` markup with bespoke styling, custom header filter popovers, and **hardcoded platform colors** (`#EE4D2D`, etc.). They predate / sidestep the UTable grid and **do not match the other grid views**.

- Don't reach for these as a starting template.
- Don't propagate their pattern (raw `<table>`, hardcoded hex) into new components — that violates [[dg-theme-audit]].
- If asked to work *on* them, prefer reconciling them toward the `UTable` DataGrid pattern (and semantic tokens) over extending the divergence. Flag the mismatch rather than silently matching it.

### Other table flavors

- **Ranked list / metric card table:** `metrics/app/components/MetricTable.vue` (has a Storybook story — `MetricTable.stories.ts`).
- AG Grid (`ag-grid-vue3`) exists in deps but the team direction in comments is **UTable, not AG Grid** for these surfaces. Don't introduce AG Grid for a standard list.

## When you genuinely need something new

If nothing fits:
1. Build it from `@nuxt/ui` + `Dg*` primitives + semantic tokens ([[dg-theme-audit]]) — not raw HTML and not hardcoded colors.
2. Put it in the right layer ([[dgfe]] / `ARCHITECTURE.md`).
3. Add a Storybook story so the next person finds it instead of reinventing it again.
4. Call out in your summary that you created a new component and why the existing ones didn't fit.
