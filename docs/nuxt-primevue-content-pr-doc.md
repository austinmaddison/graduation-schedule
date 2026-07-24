# PR Doc: Migrate Graduation Schedule to Nuxt, PrimeVue, Nuxt Content, i18n, and Studio

## Goal

Replace the current React/Vite implementation with a Vue/Nuxt implementation that:

- Uses Nuxt as the app framework.
- Uses PrimeVue for UI components.
- Uses `@nuxt/content` for schedule data so the page is content-driven.
- Uses `@nuxtjs/i18n` for English/Thai localization.
- Uses self-hosted font assets for Inter and Thai looped glyphs.
- Remains easy to deploy for free.
- Is ready for Nuxt Studio, with the hosting tradeoff called out clearly.

## Current Repo State

The repo currently contains a Vite + React version that was iterated through shadcn-style components:

- `src/main.jsx`
- `src/styles.css`
- `src/components/ui/*`
- `vite.config.js`
- `components.json`
- `jsconfig.json`
- `.github/workflows/deploy.yml`
- Source content in `eng.md` and `th.md`

The project is not a git repository in this working directory at the time this doc was written.

There was an interrupted Nuxt package install. The stale npm process was stopped, and `package.json` was not updated to Nuxt. The next session should start by checking `package.json`, `package-lock.json`, and `node_modules` before installing. A clean `rm -rf node_modules package-lock.json && npm install` may be simplest if package state looks inconsistent.

## Important Decision

Nuxt Studio production editing and GitHub Pages do not fully align.

GitHub Pages only hosts static files. Nuxt Studio production editing needs server-side routes for authentication and publishing. That means:

- Static GitHub Pages can host the public schedule site for free.
- Nuxt Content files can still be edited locally or through Git workflows.
- Full in-production Nuxt Studio editing should use an SSR-capable host such as NuxtHub, Vercel, Netlify SSR, or another Node/serverless provider.

Recommended path:

1. Build the public site as static Nuxt for GitHub Pages.
2. Structure content and config so Nuxt Studio can be enabled.
3. If in-browser production editing becomes required, deploy the same Nuxt app to an SSR-capable host instead of GitHub Pages.

## Proposed Stack

- `nuxt`
- `vue`
- `primevue`
- `@primevue/nuxt-module`
- `@primeuix/themes`
- `primeicons`
- `@nuxt/content`
- `@nuxtjs/i18n`
- `nuxt-studio`
- `@fontsource-variable/inter`
- `@fontsource-variable/noto-sans-thai-looped`

## Proposed File Tree

```text
app.vue
nuxt.config.ts
content.config.ts
assets/css/main.css
content/
  en/
    index.yml
  th/
    index.yml
i18n/
  locales/
    en.json
    th.json
.github/
  workflows/
    deploy.yml
```

Remove the old React/Vite/shadcn files after the Nuxt version is working:

```text
index.html
vite.config.js
components.json
jsconfig.json
src/
```

Keep the original `eng.md` and `th.md` until the migration is verified. They are useful source references.

## Content Model

Use YAML for the schedule data because the page is structured and Studio can expose schema-driven editing.

Example shape:

```yaml
title: Graduation Schedule
eyebrow: Mahidol University
intro: A simple comparison of the rehearsal day and graduation ceremony plans for family photos and dinner.
summaryLabel: Quick comparison
locationSummary: Salaya
options:
  - id: rehearsal
    letter: A
    title: Rehearsal Day
    date: Saturday, 3 October 2026
    tone: success
    badge: Easier logistics
    pros:
      - Less traffic
      - Roads are not closed
      - Less tiring
    cons:
      - The degree will not yet be in hand
    rows:
      - time: TBD (morning/afternoon)
        activity: Graduation rehearsal
        location: Prince Mahidol Hall, Mahidol University
        notes: Expected between morning and early afternoon
```

The Thai file should mirror the same structure under `content/th/index.yml`.

## Nuxt Config Direction

Use Nuxt modules directly:

```ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@primevue/nuxt-module',
    'nuxt-studio',
  ],

  css: ['~/assets/css/main.css', 'primeicons/primeicons.css'],

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', name: 'English', language: 'en-US' },
      { code: 'th', name: 'ไทย', language: 'th-TH' },
    ],
  },

  primevue: {
    options: {
      theme: {
        preset: 'Aura',
      },
    },
  },

  nitro: {
    preset: 'github-pages',
  },
});
```

For a project page URL like `https://owner.github.io/graduation-schedule/`, configure:

```ts
app: {
  baseURL: process.env.NUXT_APP_BASE_URL || '/',
}
```

Then set `NUXT_APP_BASE_URL: /graduation-schedule/` in the GitHub Actions build step.

## Nuxt Content + i18n Direction

Use separate content collections per locale:

```ts
export default defineContentConfig({
  collections: {
    schedule_en: defineCollection({
      type: 'data',
      source: 'en/index.yml',
      schema: scheduleSchema,
    }),
    schedule_th: defineCollection({
      type: 'data',
      source: 'th/index.yml',
      schema: scheduleSchema,
    }),
  },
});
```

In `app.vue`, derive the collection from the current locale:

```ts
const { locale, setLocale } = useI18n();
const collection = computed(() => `schedule_${locale.value}`);
const { data: schedule } = await useAsyncData(
  () => `schedule-${locale.value}`,
  () => queryCollection(collection.value).first(),
  { watch: [locale] },
);
```

If `queryCollection` typing gets strict, import/use the generated `Collections` type from `@nuxt/content` and cast the computed collection key.

## UI Direction

Use PrimeVue components for the page surface:

- `Button` for language switching.
- `Card` for summary and schedule option panels.
- `Tag` for date, dinner, and option badges.
- `Divider` between timeline items.
- `Timeline` can be used if it behaves well on mobile; otherwise use a simple PrimeVue/Card layout with numbered markers.

Keep the visual language quiet:

- Neutral background.
- White cards.
- Thin borders.
- Minimal color accents.
- No decorative gradients or oversized marketing hero treatment.
- Mobile-first spacing and readable Thai line-height.

## Fonts

Keep fonts self-hosted through Fontsource:

```js
import '@fontsource-variable/inter';
import '@fontsource-variable/noto-sans-thai-looped';
```

In global CSS:

```css
body {
  font-family:
    'Inter Variable',
    'Noto Sans Thai Looped Variable',
    ui-sans-serif,
    system-ui,
    sans-serif;
}
```

This ensures GitHub Pages serves the font files from the generated static assets.

## GitHub Pages Workflow Direction

The workflow should build Nuxt static output and upload `.output/public`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run generate
        env:
          NUXT_APP_BASE_URL: /graduation-schedule/

      - uses: actions/upload-pages-artifact@v3
        with:
          path: .output/public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

If the repository is deployed at a custom domain or user/organization root page, change `NUXT_APP_BASE_URL` to `/`.

## Suggested Implementation Steps

1. Stop any running dev/preview servers.
2. Check package state after the interrupted install.
3. Replace `package.json` scripts with:

```json
{
  "dev": "nuxt dev",
  "build": "nuxt build",
  "generate": "nuxt generate",
  "preview": "nuxt preview --host 0.0.0.0"
}
```

4. Install the Nuxt stack listed above.
5. Add `nuxt.config.ts`, `content.config.ts`, `assets/css/main.css`, and content/i18n files.
6. Port the current schedule from `eng.md` and `th.md` into `content/en/index.yml` and `content/th/index.yml`.
7. Build `app.vue` with PrimeVue components.
8. Replace the GitHub Pages workflow to upload `.output/public`.
9. Run:

```bash
npm run generate
npm run preview
```

10. Verify English and Thai routes on desktop and mobile.

## Acceptance Criteria

- `npm run generate` succeeds.
- `.output/public` contains the static generated site and bundled font assets.
- English default route renders correctly.
- Thai route renders correctly.
- Language switch changes locale and route.
- Schedule data comes from Nuxt Content, not hard-coded component arrays.
- PrimeVue components are used for the main UI controls and panels.
- The design is minimal, clean, readable, and mobile-friendly.
- README explains GitHub Pages static hosting and the Studio production editing limitation.

## References

- Nuxt GitHub Pages deployment: https://nuxt.com/deploy/github-pages
- PrimeVue Nuxt module: https://nuxt.com/modules/primevue
- Nuxt Content: https://content.nuxt.com/
- Nuxt Content i18n integration: https://content.nuxt.com/docs/integrations/i18n
- Nuxt Studio module: https://nuxt.com/modules/studio
- Nuxt Studio site: https://nuxt.studio/
