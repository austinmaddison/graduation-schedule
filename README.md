# Graduation Schedule

A single bilingual (EN/TH) graduation invite landing page built on the [Nuxt UI Portfolio template](https://github.com/nuxt-ui-templates/portfolio). The homepage runs Hero → Plans → Hotels → Restaurants → Family → FAQ, with a separate `/friends` guest list. Includes MapLibre maps and self-hosted Fontsource fonts.

## Content

Schedule data lives in:

- `content/en/index.yml`
- `content/th/index.yml`

English is served at `/`. Thai is served at `/th/`; `/th` redirects there as well.

## Local Development

```bash
pnpm install
pnpm dev
```

## Static Build

```bash
pnpm generate
```

The generated site is written to `.output/public`. The production build includes the Inter and Noto Sans Thai font assets, so GitHub Pages can serve the site without external font requests.

## GitHub Pages

1. Push this folder to a GitHub repository with the default branch named `main`.
2. In GitHub, open **Settings > Pages**.
3. Set **Build and deployment > Source** to **GitHub Actions**.
4. Push to `main`. The included workflow runs `pnpm generate` and deploys `.output/public` to GitHub Pages.

For a project page such as `https://owner.github.io/graduation-schedule/`, the workflow sets:

```bash
NUXT_APP_BASE_URL=/graduation-schedule/
```

For a custom domain or user/organization root page, change that value to `/`.

## Nuxt Studio

The project is structured for Nuxt Studio editing through Nuxt Content collections, but the GitHub Pages deployment is static. Full in-production Studio editing needs server-side routes for authentication and publishing, so deploy the same Nuxt app to an SSR-capable host such as NuxtHub, Vercel, Netlify SSR, or another Node/serverless provider if browser-based production editing becomes required.
