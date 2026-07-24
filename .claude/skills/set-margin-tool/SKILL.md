---
name: set-margin-tool
description: Handoff + working reference for the Shopee "Set Margin" tool (formerly "Margin Optimizer") in dgfe-nuxt — the bulk margin tool under Products › Set Margin and the per-variant target-margin panel on product detail. Use when continuing work on this tool: the grouped selection grid, the results diff, floor semantics, per-variant margin/images enrichment, or the pending BE margin-alignment investigation.
---

# Set Margin tool — working reference & handoff

Shopee-only bulk tool: pick products/variants with COGS, set a target margin, preview the discount/voucher changes to hit it, apply. Renamed **Margin Optimizer → Set Margin** (EN "Set Margin", TH `ตั้งมาร์จิน`). There is also a per-variant "target margin" panel on the product detail page (`ProductDetailTargetMarginPanel` / `TargetMarginMode`).

## Key files
- `dg-app/layers/products/app/components/MarginOptimizerPanel.vue` — bulk drawer (target-margin form + select/results dispatch).
- `dg-app/layers/products/app/components/MarginOptimizerProductTable.vue` — grouped **selection grid** (DataViewTable).
- `dg-app/layers/products/app/components/MarginOptimizerResults.vue` — **results** (adjusted diff + already-meets + needs-price-raise).
- `dg-app/layers/products/app/components/MarginResultDiff.vue` — before→after diff chip (reused for discount + voucher).
- `dg-app/layers/products/app/composables/useMarginOptimizer.ts` — data + preview/apply + enrichment + floor guard.
- `dg-app/layers/products/app/components/TargetMarginMode.vue` + `ProductDetailTargetMarginPanel.vue` — variant-level panel.
- `dg-app/layers/products/app/components/WorkspaceProductsToolPanel.vue` — drawer title (uses `t("workspace.marginOptimizer.title")`).
- i18n: `dg-app/i18n/locales/{en,th}.json` under `workspace.marginOptimizer.*` and `workspace.financialBreakdown.targetMargin.*`.
- Canonical grid reused: `dg-app/layers/workspace/app/components/dataview/DataViewTable.vue` + `DataViewProductCell.vue` (ref impl `PriceTiersTable.vue`).

## Backend facts (dgbe)
- **Set-margin apply is discount-only.** `ShopeeSetMarginDtoMode = PROFIT | MARGIN` (no price-raise apply path). Apply writes a seller discount (+ voucher). Endpoints: `shopeeFinancialBreakdownPreviewSetMargin` / `…ApplyMargin` / `…Product`.
- **Selection data** = `apiCanonicalProductControllerCanonicalFetchProducts` → `CanonicalProductWithShopeeBindingView[]`. Params type `CanonicalProductWithShopeeBindingSearchParams` (has `shopeeShopId`, `region`). MUST pass `shopeeShopId` or it returns products across ALL shops/platforms (the original wrong-shop leak bug).
- **`imageUrl` is never populated** by the binding SP (`fetch_canonical_product_with_shopee_binding_v1`). Images come from the unified endpoint `apiCanonicalProductControllerCanonicalFetchProductsWithPlatforms` → `CanonicalProductWithPlatforms.primaryImageUrl` + per-binding `CanonicalBindingRef.imageUrl`. FE merges them in `loadProducts`.
- **Per-variant current margin** = batch endpoint `shopeeFinancialBreakdownModelBreakdownsBatchByModelIds` (one call, all modelIds) → `ShopeeModelBreakdownFlatEntry[]`, each `metadata.margin` (fraction, realized over `lookbackDays`, currently 30). This is what the grid Margin column shows.

## Floor semantics (IMPORTANT design decision)
Target margin is a **minimum/floor**, not exact.
- **Selection grid:** each variant's current margin is green (dotted-underline + "already meets target" tooltip) once `margin ≥ targetMargin/100`, normal ink below.
- **Results floor guard** (`useMarginOptimizer.ts`): `adjustedItemRaisesMargin(item, current)` = computed total reduction (discount+voucher) ≤ current total reduction. If the tool's move would *increase* discount, the item is already above target → **skipped** (never dump margin to hit exactly target). `adjustedApplyItems` / `adjustedAboveItems` computeds split the preview; `apply()` writes only the apply set; results show a merged "Already at/above target" section (also folds the `unadjustableItems` where `requiredMin ≤ currentPrice`).
- **Unadjustable split:** `requiredMin > currentPrice` → "Needs a price raise" (real, read-only guidance — BE can't apply a price raise); `requiredMin ≤ currentPrice` → folded into "already meets".
- Price-raise is **read-only guidance only** (BE has no price-raise apply; would need a new mode / whitelist gating — see dgbe commission-adjust price_raise).

## Results rendering
Results render **flat + always-expanded** (DataViewTable has no default-expand prop, and collapsing hid the recommendations). Multi-variant product → clean header row (depth 0, blank diff cells, profit = sum of children) + variant rows (depth 1). Single-variant → one leaf row.

## PENDING — next session: BE margin alignment
**The confusion:** the grid's "current margin" (realized, 30d, from `metadata.margin`, includes ads/returns/hidden costs) does NOT match the set-margin **forward** target basis (which marks ads/returns/manufacturing as HIDDEN and excludes them). So forward margins read higher than realized — on this test catalog every item was already ≥20% forward, so exact-target would discount them all down (the floor guard now prevents applying that, but the displayed numbers still look inconsistent).

**Investigate in dgbe:**
- `service/src/main/kotlin/com/bd/service/shopee/ShopeeFinancialBreakdownService.kt` — the set-margin forward computation + what costs it includes/HIDES.
- `service/src/main/kotlin/com/bd/service/shopee/ShopeeBreakdownProvider.kt` — how `metadata.margin` (realized) is built (line ~104 `commissionRate = live.metadata.commissionRate`, `buildShopMarginInferenceRecord` ~134).
- Goal: decide if the forward set-margin margin can use the same cost basis as the realized margin so the grid number and the target number are comparable — OR at minimum document the difference in the FE (a tooltip/footnote was the cheaper option the user deferred in favor of BE investigation).
- The floor guard is basis-independent (uses discount direction), so it stays correct regardless.

## Not done / deferred
- BE margin-alignment investigation (above).
- Results "Needs a price raise" / "Already meets" partition tables are still hand-rolled styled `<table>` (v4-tokened, no images) — not migrated to DataViewTable.
- Long-term: populate `imageUrl` (+ maybe margin) in the binding SP (v2 migration) to drop the extra FE fetches.
- Full price-raise apply path (BE work).
- Related: [[project_margin_optimizer_refresh]] memory has the running log.
