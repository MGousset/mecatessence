// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/hints','@nuxthub/core','@nuxtjs/turnstile'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  eslint: {
  config: {
    stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
})