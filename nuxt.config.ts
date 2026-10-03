// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    'nuxt-studio',
    'nuxt-og-image',
    'nuxt-site-config',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      title: 'CeklisGuru - Praktik Terbaik Pembelajaran untuk Guru Indonesia',
      htmlAttrs: { lang: 'id' },
      meta: [
        { name: 'description', content: 'Platform checklist interaktif untuk guru Indonesia meningkatkan kualitas pembelajaran dengan praktik terbaik yang terstruktur.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
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
    '/kategori/**': { prerender: true },
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
