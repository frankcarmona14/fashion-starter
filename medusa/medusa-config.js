const { loadEnv, defineConfig } = require('@medusajs/framework/utils');

loadEnv(process.env.NODE_ENV, process.cwd());

module.exports = defineConfig({
  admin: {
    backendUrl:
      process.env.BACKEND_URL ?? 'https://sofa-society-starter.medusajs.app',
    storefrontUrl: process.env.STOREFRONT_URL,
  },
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS,
      jwtSecret: process.env.JWT_SECRET || 'supersecret',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
    },
  },
  modules: [
    {
      resolve: '@medusajs/medusa/payment',
      options: {
        providers: [
          // {
          //   id: 'stripe',
          //   resolve: '@medusajs/medusa/payment-stripe',
          //   options: {
          //     apiKey: process.env.STRIPE_API_KEY,
          //     webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
          //   },
          // },
        ],
      },
    },
    {
      resolve: './src/modules/fashion',
    },
    {
      resolve: '@medusajs/medusa/file',
      options: {
        providers: [
          {
            resolve: '@medusajs/medusa/file-s3',
            id: 's3',
            options: {
              file_url: "https://prueba-servy.lon1.cdn.digitaloceanspaces.com",
              access_key_id: "DO00UB3TZ98CGGQF3JNE",
              secret_access_key: "PpdlkQ699TJnNkPiCEpyEObkh2iTR9CjROB1QhIL40Q",
              region: "lon1",
              bucket: "prueba-servy",
              endpoint: "https://lon1.digitaloceanspaces.com"
            }
          }
        ],
      },
    },
  ],
});
