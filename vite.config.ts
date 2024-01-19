import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueLayouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'window',
    'process.<wbr>env': {}
  },
  optimizeDeps: {
    include: ['pinia-persist']
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
    }),
    VueLayouts()
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
