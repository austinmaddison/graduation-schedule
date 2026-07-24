# Graduation Schedule

A minimal Nuxt site for comparing graduation rehearsal and ceremony plans in English and Thai.
It uses PrimeVue for the interface, Nuxt Content YAML files for schedule data, `@nuxtjs/i18n` for localized routes, and self-hosted Fontsource fonts.

## Content

Schedule data lives in:

- `content/en/index.yml`
- `content/th/index.yml`

English is served at `/`. Thai is served at `/th`.

## Local Development

```bash
npm install
npm run dev
```

## Static Build

```bash
npm run generate
```

The generated site is written to `.output/public`. The production build includes the Inter and Noto Sans Thai Looped font assets, so GitHub Pages can serve the site without external font requests.

## GitHub Pages

1. Push this folder to a GitHub repository with the default branch named `main`.
2. In GitHub, open **Settings > Pages**.
3. Set **Build and deployment > Source** to **GitHub Actions**.
4. Push to `main`. The included workflow runs `npm run generate` and deploys `.output/public` to GitHub Pages.

For a project page such as `https://owner.github.io/graduation-schedule/`, the workflow sets:

```bash
NUXT_APP_BASE_URL=/graduation-schedule/
```

For a custom domain or user/organization root page, change that value to `/`.

## Nuxt Studio

The project is structured for Nuxt Studio editing through Nuxt Content collections, but the GitHub Pages deployment is static. Full in-production Studio editing needs server-side routes for authentication and publishing, so deploy the same Nuxt app to an SSR-capable host such as NuxtHub, Vercel, Netlify SSR, or another Node/serverless provider if browser-based production editing becomes required.
