---
name: dgfe
description: Working in the DGFE (DataGlass Frontend) monorepo — Nuxt 4 + pnpm-workspace layers (app/, dg-base, dg-auth, dg-marketing, dg-app/layers/*). Use when adding features, wiring API endpoints, deciding where code goes, debugging auto-imports, regenerating the Orval client, or troubleshooting IDE/TypeScript issues across layers.
---

# DGFE — working in this repo

A Nuxt 4 layered monorepo. Always read **`ARCHITECTURE.md`** at the repo root before touching unfamiliar layers — it is the source of truth for layer layout, the API client three-layer split, and where-to-put-code.

This skill is the operational complement: rules that come up while editing, plus the scripts catalog.

## Layer composition (memorize this)

```
app/                  entry — extends dg-base, dg-auth, dg-marketing, dg-app
  ↓
dg-base/              foundation: Orval client, Dg* primitives, plugins, ui store
dg-auth/              login/signup, auth + session stores, middleware
dg-marketing/         public marketing site (@nuxt/content)
dg-app/               meta-layer that itself extends each feature under dg-app/layers/*
  └─ layers/workspace, products, advertising, analytics, ai, actions, billing,
            experiments, onboarding, platforms
```

Nuxt's `layers/*` auto-discovery only scans the entry's project root. `dg-app/nuxt.config.ts` therefore lists every child layer in `extends:` and re-declares `imports.dirs` for composables/stores/utils. **Adding a new feature layer under `dg-app/layers/` requires editing both.**

## API client — the three-layer split (do not skip a layer)

```
1. Orval-generated hooks   dg-base/api/generated/**       (DO NOT EDIT BY HAND)
            ↓ wrapped by
2. Domain composable       layers/<feature>/app/composables  (the only consumer of #1)
            ↓ consumed by
3. Component / page        .vue files                     (NEVER call #1 directly)
```

- All HTTP goes through `dg-base/api/client.ts` (`customFetch`). It owns the base URL, `Authorization` header, and the **single 401 → refresh → retry → /login** pipeline. Never reimplement auth retry.
- After backend changes: `pnpm api:refresh` (pull schema + regenerate). `pnpm api:generate` regenerates from the committed `openapi.json` only.

## Auto-imports

These resolve without `import`:

| Folder | Auto-imported as |
|---|---|
| `app/components/**` | Vue components by file name (`WorkspaceHeader.vue` → `<WorkspaceHeader />`) |
| `app/composables/**` | Every exported `useFoo` |
| `app/stores/**` | Pinia stores (`useAuthStore`, `useUiStore`, …) |
| `app/utils/**` | Every export |
| `app/middleware` | Named route middleware |

Vue (`ref`, `computed`, `watch`, `defineProps`) and Nuxt (`useRoute`, `navigateTo`, `useState`) APIs are also auto-imported.

If something doesn't resolve, the fix is almost always one of:
1. Add the dir to `imports.dirs` in the owning layer's `nuxt.config.ts`.
2. Re-run `pnpm prepare`.
3. Restart the TS server.

## Naming

- Components: domain prefix — `Dg*` (base), `Auth*`, `Workspace*`, `Product*`, etc. Keep this discipline; auto-import surface depends on it.
- Composables: `useFooBar.ts` exporting `useFooBar()`.
- Stores: `foo.store.ts` exporting `useFooStore`.
- Types: co-locate where owned; cross-feature types → `app/types/`.

## State decision table

| Need | Use |
|---|---|
| Server data (lists, details, mutations) | domain composable backed by Vue Query |
| Cross-page client state (auth, ui prefs) | Pinia store |
| Shared client state inside one feature | composable using `useState(key, () => …)` |
| Local component state | plain `ref` / `reactive` |

## Where to add new code

| Adding… | Goes in |
|---|---|
| New authenticated page in an existing domain | `dg-app/layers/<domain>/app/pages/(authorized)/…` |
| New unauthenticated page | `dg-auth/app/pages/(unauthorized)/…` |
| New product-domain feature layer | new folder under `dg-app/layers/`, then add to `dg-app/nuxt.config.ts > extends` AND ensure `imports.dirs` covers it |
| Cross-feature primitive (no UI/store deps) | `dg-base/app/composables` or `dg-base/app/utils` |
| Endpoint wrapper | a domain composable that wraps the generated Vue Query hook |
| Anything that talks HTTP directly | don't — it goes through `dg-base/api/client.ts` |

## Scripts cheat sheet (run from root)

| Want to… | Run |
|---|---|
| Boot the full app | `pnpm dev` |
| Run one layer in isolation | `pnpm dev:app` / `dev:base` / `dev:auth` / `dev:marketing` |
| Regenerate `.nuxt` types everywhere | `pnpm prepare` |
| Type-check every package | `pnpm typecheck` |
| Lint everything | `pnpm lint` (or `pnpm lint:fix`) |
| Mirror CI locally | `pnpm build:check` |
| Refresh API client from backend | `pnpm api:refresh` |
| Regenerate from committed schema | `pnpm api:generate` |
| Nuke caches | `pnpm clean` |
| Full reset (broken types, weird state) | `pnpm reset` |
| Outdated deps | `pnpm deps:outdated` |
| Interactive deps update | `pnpm deps:update` |

## IDE / TypeScript gotchas

- The closest `tsconfig.json` to a file determines its TS-server context. Editing `dg-app/layers/workspace/app/components/Foo.vue` uses **`dg-app/tsconfig.json` → `dg-app/.playground/.nuxt/tsconfig.json`**, not `app/tsconfig.json`.
- `pnpm dev` (which runs `app/`) only refreshes `app/.nuxt`. Layer playgrounds go stale until you re-run `pnpm prepare`.
- `dg-app/.playground` extends `dg-base` and `dg-auth` only — it does **not** see `dg-marketing`. From a `dg-app` file, you can't go-to-def into marketing code (by design; runtime composition still works via `app/`).
- After dependency changes the deeply-nested pnpm paths inside generated tsconfigs shift. Symptom: imports from a specific package suddenly have no types. Fix: `pnpm prepare`.
- "Everything is broken": `pnpm reset` → restart TS Server + Vue Server in VS Code.

## Stack reminders

- **SSR is off in `dg-app`** (`ssr: false`). Don't write code that assumes server context inside the authed product.
- **`<script setup lang="ts">` everywhere.** Composition API only.
- `ref` values: `.value` in `<script>`, bare in `<template>`.
- Destructuring a Pinia store loses reactivity → use `storeToRefs(store)`.
- Brand colors: primary orange, secondary blue, neutral zinc (configured in NuxtUI theme).
