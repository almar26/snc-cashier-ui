import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: `%s %separator %siteName`,
      templateParams: {
        siteName: "SNC Cashier System",
        separator: "|",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  ssr: false,
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxt/icon",
    "@pinia/nuxt"
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  typescript: {
    strict: false,
  },

  runtimeConfig: {
    public: {
      // @ts-ignore
      baseURL: process.env.BASE_URL,
    }
  }
});
