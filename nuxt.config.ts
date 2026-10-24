// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/ui',
    '@nuxthub/core',
    '@nuxtjs/turnstile'
  ],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  // Valeurs par défaut, surchargées en production par les variables NUXT_*
  runtimeConfig: {
    betterAuthSecret: '', // NUXT_BETTER_AUTH_SECRET
    resendApiKey: '', // NUXT_RESEND_API_KEY
    emailExpediteur: '', // NUXT_EMAIL_EXPEDITEUR
    r2: {
      accountId: '', // NUXT_R2_ACCOUNT_ID
      accessKeyId: '', // NUXT_R2_ACCESS_KEY_ID
      secretAccessKey: '', // NUXT_R2_SECRET_ACCESS_KEY
      bucketBrut: 'mecanix-brut' // NUXT_R2_BUCKET_BRUT
    },
    n8n: {
      webhookUrl: '', // NUXT_N8N_WEBHOOK_URL
      secret: '' // NUXT_N8N_SECRET (en-tête x-mecanix-secret, dans les deux sens)
    },
    turnstile: {
      secretKey: '' // NUXT_TURNSTILE_SECRET_KEY
    },
    public: {
      siteUrl: 'http://localhost:3000' // NUXT_PUBLIC_SITE_URL
    }
  },

  compatibilityDate: '2026-10-01', // garde ta date actuelle si elle diffère

  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    }
  },

  hub: {
    db: {
      dialect: 'sqlite',
      driver: 'd1',
      connection: {
        databaseId: '<ID_DE_TA_BASE_D1>'
      }
    }
  },

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

  turnstile: {
    siteKey: '' // NUXT_PUBLIC_TURNSTILE_SITE_KEY
  }
})
