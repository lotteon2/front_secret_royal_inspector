import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   https: true,
  //   hmr: {
  //     host: 'jeontongju-dev.shop/auction-service',
  //     protocol: 'ws'
  //   }
  // },
  define: {
    global: 'window',
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
