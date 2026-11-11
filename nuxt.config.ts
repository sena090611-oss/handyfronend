// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-09-14',

  devtools: { enabled: true },

  modules: ['vuetify-nuxt-module'],

  css: [
    'bootstrap-icons/font/bootstrap-icons.css',
    '~/assets/css/tema.css',
    '~/assets/css/formulario.css',
  ],

  app: {
    head: {
      title: 'Handy | Mano de obra doméstica verificada en Montería',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      meta: [
        {
          name: 'description',
          content:
            'Plataforma que conecta a clientes con trabajadores domésticos verificados en Montería: limpieza, cocina, cuidado de personas, albañilería, jardinería y más.',
        },
      ],
    },
  },

  vuetify: {
    moduleOptions: {
      // Estilos de Vuetify inyectados por el propio módulo (con tree-shaking)
      styles: true,
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'handy',
        themes: {
          handy: {
            dark: false,
            colors: {
              primary: '#12355b',
              secondary: '#f4b942',
              background: '#f4f6f8',
              surface: '#ffffff',
              success: '#22c55e',
              error: '#ef4444',
            },
          },
        },
      },
      defaults: {
        VBtn: { rounded: 'lg' },
        VCard: { rounded: 'xl' },
      },
    },
  },
})
