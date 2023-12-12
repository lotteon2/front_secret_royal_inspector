import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
    https: true,
    hmr: {
      host: 'jeontongju-dev.shop/auction-service',
      port: 8000,
      protocol: 'ws'
    }
  },
  define: {
    global: typeof globalThis,
    'process.<wbr>env': {}
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return tag.startsWith('v-')
          }
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/scss";'
      }
    }
  }
})
