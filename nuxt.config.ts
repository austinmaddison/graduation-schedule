export default defineNuxtConfig({
  compatibilityDate: '2026-07-24',

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt',
    'nuxt-studio',
  ],

  css: [
    'maplibre-gl/dist/maplibre-gl.css',
    '~/assets/css/main.css',
  ],

  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },

  ogImage: {
    zeroRuntime: true,
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: 'Graduation Schedule',
      meta: [
        {
          name: 'description',
          content:
            'A bilingual Graduation Schedule comparison for rehearsal and ceremony plans.',
        },
      ],
    },
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    locales: [
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' },
      { code: 'th', name: 'ไทย', language: 'th-TH', file: 'th.json' },
    ],
  },

  nitro: {
    preset: 'github-pages',
  },

  $production: {
    studio: false,
  },
});
