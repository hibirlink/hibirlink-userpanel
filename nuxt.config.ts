import am from "./locals/am.json";
import en from "./locals/en.json";
import graphql from "@rollup/plugin-graphql";

export default defineNuxtConfig({
  
  runtimeConfig: {
    // The private keys which are only available within server-side
    FIREBASE_API_KEY: "AIzaSyD5i395x7PyZQDBPSpdrzpzDPQDAAyc4MU",
    FIREBASE_AUTH_DOMAIN: "hibirbitshibirlink.firebaseapp.com",
    FIREBASE_PROJECT_ID: "hibirbitshibirlink",
    FIREBASE_STORAGE_PACKET: "hibirbitshibirlink.appspot.com",
    FIREBASE_MESSAGE_SENDER_ID: 1077830998369,
    FIREBASE_APP_ID: "1:1077830998369:web:369007817624495d9d8d20",
    GRAPHQL_URL: "https://hibirlink.hasura.app/v1/graphql",
    ACTION_SECRET_KEY:
      "KWefYVKHEkwgnD2XqRUNGRfaKN4v9NS9bzhr5PWVu8cs2WSMjTKhJz3NVpe2t7Fn",
    // Keys within public, will be also exposed to the client-side
    WEB_HOOK_BASE_URL: "https://hibirlink-production.up.railway.app",
    public: {
      FIREBASE_API_KEY: "AIzaSyD5i395x7PyZQDBPSpdrzpzDPQDAAyc4MU",
      FIREBASE_AUTH_DOMAIN: "hibirbitshibirlink.firebaseapp.com",
      FIREBASE_PROJECT_ID: "hibirbitshibirlink",
      FIREBASE_STORAGE_PACKET: "hibirbitshibirlink.appspot.com",
      FIREBASE_MESSAGE_SENDER_ID: 1077830998369,
      FIREBASE_APP_ID: "1:1077830998369:web:369007817624495d9d8d20",
      GRAPHQL_URL: "https://hibirlink.hasura.app/v1/graphql",
      ACTION_SECRET_KEY:
        "KWefYVKHEkwgnD2XqRUNGRfaKN4v9NS9bzhr5PWVu8cs2WSMjTKhJz3NVpe2t7Fn",
      WEB_HOOK_BASE_URL: "https://hibirlink-production.up.railway.app",
    },
  },

  app: {
    head: {
      charset: "utf-16",
      viewport: "width=500, initial-scale=1",
      meta: [
        // <meta name="description" content="My amazing site">
        {
          name: "description",
          content:
            "Create a wider and strong network among the community through revolutionizing the way peoples think, live, communicate, share, sell, buy, get services, provide services and democratizing the quality of living. Provide a wider strong network which helps to link everything, connect fair services with customers, provide quality products with fair price.",
        },
      ],
      link: [{ rel: "icon", href: "/logo.svg" }],
    },
  },

  ssr: false,
  vite: {
    plugins: [graphql()],
  },
  css: [
    "~/assets/css/tailwind.css",
    "@vueup/vue-quill/dist/vue-quill.snow.css",
  ],

  build: {
    transpile: ["graphql", "@heroicons/vue", "@apollo/client",
    "ts-invariant/process",
    "@vue/apollo-composable"],
  },

  modules: [
    "nuxt-icons",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxt/image-edge",
    [
      "@nuxtjs/i18n",
      {
        locales: ["am", "en"],
        defaultLocale: "en",
        vueI18n: {
          fallbackLocale: "en",
          messages: {
            am: am,
            en: en,
          },
        },
      },
    ],
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // image: {
  //   // Options
  // }
});
