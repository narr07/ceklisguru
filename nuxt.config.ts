// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@pinia/nuxt',
    'nuxt-studio',
  ],

  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'CeklisGuru - Praktik Terbaik Pembelajaran untuk Guru Indonesia',
      htmlAttrs: { lang: 'id' },
      meta: [
        { name: 'description', content: 'Platform checklist interaktif untuk guru Indonesia meningkatkan kualitas pembelajaran dengan praktik terbaik yang terstruktur.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0d9488' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Alan+Sans:wght@400;500;600;700;800&display=swap' },
      ],
    },
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/categories/**': { prerender: true },
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
