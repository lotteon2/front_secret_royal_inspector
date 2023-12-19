import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { loadFonts } from './plugins/webfontloader'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { createPinia } from 'pinia'
import piniaPluginpersistedState from 'pinia-plugin-persistedstate'

loadFonts()
const pinia = createPinia()

createApp(App).use(router).use(Toast).use(pinia.use(piniaPluginpersistedState)).mount('#app')
