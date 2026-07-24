---
name: dg-mixpanel-events
description: How Mixpanel product analytics is wired in DGFE and the canonical registry of tracked events. Use when adding/renaming/auditing a trackEvent call, instrumenting a new feature flow, answering "is X tracked?", or debugging why an event isn't appearing in Mixpanel. The event registry lives in events.csv next to this file and MUST be updated in the same PR as any trackEvent change.
---

# DataGlass Mixpanel events

## Architecture

| Piece | File | Role |
|---|---|---|
| Wrapper | `dg-base/app/utils/mixpanel.ts` | `initMixpanel()`, `trackEvent()`, `identifyUser()`, `resetMixpanel()`. Auto-imported in every layer (dg-base is the root layer). Safe everywhere: no-ops on server and when the token is missing. |
| Init plugin | `dg-base/app/plugins/mixpanel.client.ts` | Calls `initMixpanel()` on client boot. |
| Token | `dg-base/nuxt.config.ts` → `runtimeConfig.public.mixpanelToken` | From `NUXT_PUBLIC_MIXPANEL_TOKEN`. No token → console warning, all calls no-op. |
| Identity | `dg-auth/app/stores/session.store.ts` `setUser()` | Single identify choke point — every auth path funnels through it. Fires `mixpanel.identify(userId)` + people props, then `Signed In` / `Signed Up`. `$reset()` calls `resetMixpanel()` on logout. |
| Super property | `dg-app/layers/workspace/app/plugins/mixpanel-platform.client.ts` | Stamps `active_platform` (shopee/lazada/tiktok, parsed from the `:platformShopId` route param prefix) on **every** event including pageviews/autocapture. Cleared off shop-scoped routes. Use this for platform breakdowns instead of adding a `platform` prop to view-type events. |
| Impersonation state | `setImpersonationState()` in `mixpanel.ts`, called from `session.store.ts` `setUser()` + `dg-auth/app/plugins/mixpanel-impersonation.client.ts` | When the session was minted by the backoffice support tools (`backoffice_*` sign-in method → token-login / signin-as): stamps `is_impersonation: true` on **every** event, **suppresses session recording** (no capturing a merchant's data under a support login), and **skips the `Signed In` event** (an operator entering isn't a real auth). The flag rides a cross-subdomain `sessionImpersonation` cookie so it survives the backoffice→product host redirect (where `setUser` doesn't re-run). **Filter `is_impersonation` out of every product report/cohort** so support activity doesn't pollute analytics. |

Production-only behaviors (`!import.meta.dev`): `track_pageview`, `autocapture`, session recording. **In local dev you only see explicit `trackEvent` calls**, in debug mode (events log to the browser console instead of silently batching).

DAU/WAU/MAU come from pageview/autocapture events filtered by `$user_id is set` — NOT from `Signed In` (sessions persist 7 days; most actives never re-auth).

## Conventions

- **Event names**: Title Case, past tense, `Noun Verbed` — `Decision Deployed`, `Orders Exported`. Funnel starts use `… Started`.
- **Properties**: `snake_case` keys, primitive values. Reuse the same key across events (`platform`, `kind`, `method`, `plan`, `row_count`).
- **Hook at the choke point**, not the button: instrument the composable/store function all UI paths funnel through (`useDeployFlow`, `setUser`, `useBilling.checkout`) so future entry points are covered for free.
- **Success-only for outcome events**: fire after the API confirms (mutation `onSuccess`, post-response), never optimistically. Funnel-start events fire at intent.
- **Sign-up vs sign-in**: auth methods tagged with an `_signup` suffix (e.g. `password_signup`) make `setUser` emit `Signed Up` instead of `Signed In`; the suffix is stripped from the `method` property.
- **No PII in event properties** (email/phone live only in `identifyUser` people props). TikTok IDs are 19-digit — if you ever include one, pass it as a **string** (see `dgfe-tiktok-id-precision`).
- **`trackEvent` never throws and needs no import** — call it inline, don't wrap in try/catch.

## Adding a new event

1. Find the choke-point composable/store for the flow (not the component button).
2. `trackEvent("Thing Happened", { platform, ... })` at the success (or intent) point.
3. **Add a row to `events.csv` in this directory** — it is the source of truth the team and Mixpanel lexicon sync against. PRs that add/change `trackEvent` calls without touching `events.csv` are incomplete.
4. Verify in dev: open the console (debug mode logs every track call) and exercise the flow.

## Event registry

Full registry: [events.csv](events.csv) — columns: `event`, `properties` (name:values), `trigger` (when it fires), `hook` (file + function), `page` (route where it originates).

Quick funnel map:

- **Acquisition**: `Sign Up Started` → `Signed Up` → `Onboarding Step Completed`×n → `Shop OAuth Started` → `Shop Connected` → `Onboarding Completed`
- **Core value**: `Decision Deploy Started` → `Decision Deployed` (gap = gate drop-off) / `Decision Dismissed`
- **Tools**: `COGS Upload Completed`, `Margin Preview Requested` → `Margin Applied`, `Price Changes Applied`, `Commission Adjust Deployed`, `Orders Exported`
- **Revenue**: `Checkout Started` → `Checkout Completed` (client-side proxy; authoritative signal is the Stripe webhook on dgbe)

## Debugging "event not showing up"

1. Dev? `track_pageview`/`autocapture` are prod-only; explicit events log to console in debug mode.
2. Token set? Missing `NUXT_PUBLIC_MIXPANEL_TOKEN` → warning at boot, all calls no-op.
3. Server-side call? `trackEvent` no-ops on SSR — must run in a client context (handler, `onMounted`, mutation callback).
4. Ad blocker / localStorage blocked? `initMixpanel` catches and warns; `canUseLocalStorage()` failure disables persistence.
5. Wrong identity? Check `$user_id` on the event — identify happens in `setUser`; events before sign-in are device-only.
