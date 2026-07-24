import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

const NeutralAura = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{zinc.50}',
      100: '{zinc.100}',
      200: '{zinc.200}',
      300: '{zinc.300}',
      400: '{zinc.400}',
      500: '{zinc.500}',
      600: '{zinc.600}',
      700: '{zinc.700}',
      800: '{zinc.800}',
      900: '{zinc.900}',
      950: '{zinc.950}',
    },
  },
});

export default defineNuxtConfig({
  compatibilityDate: '2026-07-24',

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/ui',
    '@primevue/nuxt-module',
    'nuxt-studio',
  ],

  css: [
    'maplibre-gl/dist/maplibre-gl.css',
    '~/assets/css/main.css',
    'primeicons/primeicons.css',
  ],

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

  primevue: {
    components: {
      include: [
        'Avatar',
        'Button',
        'Card',
        'InputText',
        'Menubar',
        'Tag',
        'Timeline',
      ],
    },
    options: {
      theme: {
        preset: NeutralAura,
      },
    },
  },

  nitro: {
    preset: 'github-pages',
  },

  $production: {
    studio: false,
  },
});
