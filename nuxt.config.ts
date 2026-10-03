// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    'nanime',
    '@nuxt/ui',
    '@pinia/nuxt',
    'nuxt-studio',
    'nuxt-og-image',
    'nuxt-site-config',
  ],

  devtools: { enabled: true },

  app: {
    // Leave is instant and enter fades in (main.css), so the scroll never jumps mid-transition
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'CeklisGuru',
      htmlAttrs: { lang: 'id' },
      meta: [
        { name: 'description', content: 'Ceklis mengajar dari dasar sampai lanjut, disusun dari Standar Proses dan standar kompetensi guru terbaru.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Alan+Sans:wght@400;500;600;700;800&display=swap' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://ceklisguru.permadi.dev',
    name: 'CeklisGuru',
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
  },

  routeRules: {
    '/': { prerender: true },
    '/ceklis/**': { prerender: true },
  },
  compatibilityDate: '2024-04-03',

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      concurrency: 2,
    },
  },

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
        commaDangle: 'always-multiline',
      },
    },
  },

  icon: {
    // Multi-colored illustrations, rendered with mode="svg" so their colors and theme variables survive
    customCollections: [
      { prefix: 'ceklis', dir: './app/assets/icons' },
    ],
    // Bundle the collection in dev too: otherwise each icon is fetched from the dev server and
    // shows blank when that request passes the 1.5 s timeout. scan adds the Lucide icons the code uses
    clientBundle: {
      includeCustomCollections: true,
      scan: true,
    },
  },

  ogImage: {
    zeroRuntime: true,
  },

  studio: {
    repository: {
      provider: 'github',
      owner: 'narr07',
      repo: 'ceklisguru',
      branch: 'master',
    },
  },
})
