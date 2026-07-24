---
name: dgfe-dev-credentials
description: Local DGFE dev sign-in credentials for the merchant test account. Use when driving the running FE at http://localhost:3000 via Playwright (or any browser automation) — e.g. visiting authenticated workspace pages, verifying Decisions / Products / Advertising flows, taking screenshots for design review. The account is a working merchant fixture with at least one connected shop.
---

# DGFE Dev Credentials

Sign-in account for the locally-running DGFE that has a real connected shop, recommendation data, and deployed experiments. Use this whenever you need to verify a UI change end-to-end in the browser instead of just reading code.

## Account

| Field | Value |
|---|---|
| URL | `http://localhost:3000/sign-in` |
| Email | `potaebeybey@gmail.com` |
| Password | `12345678` |

After sign-in the user is redirected to the workspace. Pick a connected shop from the shop selector to land on `/workspace/my-shop/<platformShopId>/...`.

### Previous fixtures (kept for reference)

`thaiofficeproengineering@gmail.com` / `12345678` and `testaccount@gmail.com` / `1` were earlier dev fixtures. Use the `potaebeybey@gmail.com` row above for new work.

## When to use

- Verifying a Vue/Nuxt change visually before reporting "done."
- Driving the deploy / dismiss / mode-switch flows in the Decisions tab.
- Capturing before/after screenshots for design review.
- Reproducing a UI bug a user reported.

**Don't** use for backend-isolation testing — for hitting `dgbe` directly without going through the FE proxy, use the `dgbe-dev-token` skill (literal `Bearer a`) instead.

## Pre-flight

```bash
curl -sS -o /dev/null -w '%{http_code}\n' http://localhost:3000/sign-in
```

Expect `200`. If `000` / refused, the FE isn't running — start it (`pnpm dev` in repo root, or `pnpm dev:app` for the dg-app layer in isolation) before driving the browser.

## Playwright sign-in recipe

The form uses `<UFormField name="email">` and `<UFormField name="password">` with `type="email"` / `type="password"` inputs. The submit button is the only primary button on the form.

```js
// 1. navigate
await mcp.playwright.browser_navigate({ url: "http://localhost:3000/sign-in" });

// 2. fill the form
await mcp.playwright.browser_fill_form({
  fields: [
    { name: "Email", type: "textbox", ref: "<from snapshot>", value: "potaebeybey@gmail.com" },
    { name: "Password", type: "textbox", ref: "<from snapshot>", value: "12345678" },
  ],
});

// 3. submit
await mcp.playwright.browser_click({ element: "Sign in submit button", ref: "<from snapshot>" });

// 4. wait for redirect
await mcp.playwright.browser_wait_for({ text: "Workspace" });
```

Always `browser_snapshot` first to get current refs — Playwright refs are not stable across navigations.

## Reaching the Decisions overview

After sign-in, the canonical path is:

```
/workspace/my-shop/<platformShopId>/decisions
```

The shop selector in the header lists connected shops. The first connected Shopee shop is the simplest target. If the URL needs a `platformShopId` and you don't have one, scrape it from the shop selector items in the page snapshot.

## Constraints

- **Dev only.** Do not commit this email/password into application code, environment files, or non-`.claude/` documentation.
- **Local FE only.** This account only exists in the dev backend. Don't try it against staging/prod.
- **The shop selector is sticky.** If a previous session left a different shop selected, the redirect after sign-in lands you there — switch shops explicitly via the selector if you need a specific one.
- **SSR is off in dg-app.** Don't expect the workspace HTML to render on first response — wait for client hydration (`browser_wait_for` text from the page).
