---
name: dgfe-tiktok-id-precision
description: TikTok IDs (shopId, productId, campaignId, advertiserId) are 19-digit int64/`Long` values that overflow JS's `Number.MAX_SAFE_INTEGER` (2^53−1), so they MUST be carried as strings end-to-end. The Orval-generated client silently corrupts them — `JSON.stringify` on a typed `shopId: number` body, or `URLSearchParams` on a typed numeric query, truncates the low digits (`7494268175127381536` → `…382000`). Use when adding or editing any TikTok composable / endpoint wiring in `dg-app/layers/*`, when a TikTok request 404s or returns the wrong shop, or when you see an ID ending in suspicious round zeros. Covers the bypass — call `customFetch` directly with a raw JSON-string body (ID interpolated unquoted) or a hand-built query string, and keep `shopIdStr` / `tiktokCampaignId` / `tiktokProductId` string fields on row types.
---

# TikTok IDs are `Long`, not `int` — keep them strings

TikTok platform identifiers — `shopId`, `productId`, `campaignId`, `advertiserId`, `orderId`, `skuId` — are 19-digit values (e.g. `7494268175127381536`). The backend types them as `Long` (int64, up to 2^63 ≈ 9.2e18). JavaScript has no integer type: every `number` is an IEEE-754 double, exact only up to `Number.MAX_SAFE_INTEGER` (2^53 − 1 ≈ 9.0e15). A 19-digit TikTok ID is ~1000× past that ceiling.

The corruption is **silent** — no error, no NaN, just a wrong-but-plausible value:

```js
Number("7494268175127381536") // → 7494268175127382000   ← last 4 digits gone
```

A request built from that number hits the wrong shop (or 404s), and nothing throws. This is the single most common TikTok-wiring bug in this repo. Shopee and Lazada IDs are smaller and usually *do* fit in a safe integer (`useShopeeProductListing` / `useLazadaProductListing` happily do `Number(...)` after an `isSafeInteger` guard) — TikTok is the platform that breaks the rule, so the TikTok path needs the string treatment even where the Shopee path doesn't.

## The codegen fix now in place for `shopId` (read this first)

`shopId` is the **only** int64 field that is an actual TikTok platform identifier — TikTok `productId` / `orderId` / `campaignId` / `skuId` / `advertiserId` are already typed `string` in the spec, and `TikTokShopResponse.shopId` (the authoritative source of `ShopProfile.platformShopId`) is already a string. So an Orval input **transformer** (`dg-base/orval.config.ts` → `tiktokShopIdLongToString`) now rewrites `shopId` `int64 → string` for every TikTok-named component schema and every `/tiktok` route param / request-body, leaving Shopee/Lazada `shopId` as `number`. After `pnpm api:generate`, the generated TikTok hooks type `shopId` as `string`.

What this means for new code:

- **You can use the generated TikTok hooks directly with a string `shopId`** — no raw-body bypass needed *for `shopId`*. Passing a `number` is now a compile error, which is the point.
- The per-composable `customFetch` bypasses below are still valid and still in place; they're no longer *required* purely to keep `shopId` precise. Keep using a bypass when you need other raw-JSON control, but don't add one solely to dodge a numeric `shopId` param anymore.
- **Scope is `shopId` only.** Timestamps (`createTime`…), internal `rt*`/`fact*` surrogate ids, cursors, and counts stay `number` (they fit in a safe int). If a *new* int64 platform identifier appears in a TikTok schema, add its field name to `TIKTOK_STRING_ID_FIELDS` in the Orval config.
- **Response caveat is unchanged.** The transformer fixes the *request* side. A value the BE serializes as a JSON *number* is already truncated by `$fetch`/`JSON.parse` before the `string` type applies — so a string-typed response field is only accurate where the BE serializes it as a JSON string (as it does for `TikTokShopResponse.shopId`). For other response DTOs, treat a `shopId` you read back as lossy unless you echo the request-side string.

## Why the Orval client can't be used as-is (for fields not covered by the transformer)

The generated wrapper (`dg-base/api/generated/**`) is correct for everything *except* these IDs, because it converts before you can intervene:

- **POST bodies** — the wrapper does `body: JSON.stringify(payload)` against a typed DTO where the field is `shopId: number`. The value is already a corrupted `number` by the time `JSON.stringify` runs; stringify never sees the original 19 digits.
- **GET queries** — the wrapper builds the query via `URLSearchParams` after typing the field as a number, truncating it the same way.

So the fix is **not** "stringify more carefully" — it's to never let the value become a JS `number` at all. Bypass the generated wrapper and call `customFetch` (`@api/client`) directly, feeding it the string.

## The fix

### POST — raw JSON-string body, ID interpolated *unquoted*

Build the body as a string yourself and interpolate the digits-only ID **without quotes**. Jackson on the BE parses an unquoted integer literal ≤ 2^63 straight into `Long` with no precision loss. Quote every genuine string field (and escape it).

```ts
import { customFetch } from "@api/client";

// shared helper, currently duplicated per-composable
function escapeJsonString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const body =
  `{"searches":[{"shopId":${shopIdStr},` +              // unquoted → Long
  `"productId":"${escapeJsonString(productId)}"}],` +    // quoted string field
  `"pageSize":${pageSize}}`;

const response = await customFetch<unknown>(
  "/api/.../rt/products/full/fetch-paginated",
  { method: "POST", body, headers: { "Content-Type": "application/json" } },
);
```

### GET — hand-built query string with the raw string ID

```ts
const qs = new URLSearchParams();
qs.set("userId", String(uid));
qs.set("pageSize", String(pageSize));
// append the 19-digit id from its string form — do NOT route it through a typed number
const url = `/api/tiktok/business/ads/internal/gmv-max/sessions?${qs.toString()}&shopId=${shopIdStr}`;
const response = await customFetch<unknown>(url);
```

(`URLSearchParams.set` on a string is fine — the danger is only ever a JS `number` upstream.)

### Validate before interpolating

Unquoted interpolation into a JSON string is also an injection surface, so gate it. BE-issued IDs are always positive integers, so a digits-only test is both the validity check and the injection guard:

```ts
const shopIdStr = computed<string | null>(() => {
  const s = shop.value;
  if (!s || s.platform !== "tiktok") return null;
  const raw = String(s.platformShopId).trim();
  return /^\d+$/.test(raw) ? raw : null; // null → skip the fetch, don't build a malformed body
});
```

## Carry the string form everywhere downstream

Row/DTO types reuse the Shopee-shaped grids, which expect numeric `shop_id` / `campaign_id` / `itemId` slots. Those numeric slots are **lossy proxies, used only for grid sorting and display** — never for routing or a follow-up API call. Keep the precise value alongside them as an explicit string field:

| Lossy numeric proxy (sort/display only) | Precise string (routing + API calls) |
|---|---|
| `shopId: number`, `shop_id: number` | `shopIdStr: string`, `tiktokShopIdStr: string` |
| `campaign_id: number` | `tiktokCampaignId: string` |
| `itemId: number` (a small `rtProductId`) | `tiktokProductId: string` / `productId: string` |

Compose row `id`s from the string form too: `id: \`${shopIdStr}-${campaign.campaignId}\`` — never from the lossy number.

**Route params are already strings — keep them that way.** `route.params.campaignId` / `productId` / `platformShopId` arrive as strings; pass them through to the composable verbatim. Do not `Number(...)` them for lookup or navigation.

## Where this pattern already lives (copy from these)

All under `dg-app/layers/`:

- `products/app/composables/useTikTokProductListing.ts` — the canonical write-up of the precision problem (header comment) + POST raw-body bypass.
- `products/app/composables/useTikTokProductDetail.ts` — POST detail fetch, `escapeJsonString`.
- `products/app/composables/useTikTokFinancialBreakdown.ts` — load + simulate, both raw-body.
- `orders/app/composables/useTikTokOrderListing.ts` — same POST bypass for orders.
- `advertising/app/composables/useTikTokAdsPerformance.ts` — GET query bypass; documents the 19-digit `campaignId` and the lossy `numericId` proxy.
- `advertising/app/composables/useTikTokAdsCampaignSessions.ts` — GET query with hand-built `URLSearchParams`.
- `advertising/app/composables/useTikTokAdsCampaignReport.ts` — GET query bypass; `toNumber()` only touches metric strings, never the IDs.
- `advertising/app/composables/useTikTokCampaignFinancialSummary.ts` — `shopId` interpolated into the URL path as a string; `advertiserId` via `URLSearchParams`.
- `my-shop/app/composables/useMyShopOverviewMetrics.ts` — TikTok product (raw-body) + ads (`URLSearchParams`) fetches, both string-safe.

## When to use

- Adding or editing any TikTok composable, or wiring a new TikTok endpoint into the API-client three-layer split (see the **dgfe** skill).
- A TikTok request 404s, returns the wrong shop's data, or an ID in a payload/URL ends in suspicious trailing zeros.
- Reviewing a diff that does `Number(...)`, `parseInt(...)`, or feeds a TikTok ID through a generated Orval hook.
- Choosing a field type for a new TikTok row/DTO — default the ID to `string`.

## Gotchas

- **Deserialized responses are already lossy.** A `shopId: number` that comes *back* from the BE through `customFetch`'s JSON parse has already lost precision. Only fields the BE sends as JSON strings, or that you preserved as strings on the request, are trustworthy. When the API returns the ID as a JSON number, you cannot recover the original digits client-side — get the BE to serialize it as a string, or echo back the request-side string.
- **Don't "fix" it with `JSON.stringify`.** By the time a value is a JS `number` the digits are already gone; stringify only re-serializes the corruption.
- **`BigInt` is a non-starter here.** The wire format and the grid components both want primitives; threading `BigInt` through Orval types, `JSON.stringify`, and the Shopee-shaped grids is far more invasive than just keeping the string. The string-everywhere convention is deliberate.
- **Direct-to-BE testing:** when reproducing with curl (see **dgbe-dev-token**), write the ID unquoted in the JSON body exactly as the bypass does — quoting it tests a different code path than the app uses.
