import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { loadFonts } from './plugins/webfontloader'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { createPinia } from 'pinia'

loadFonts()

createApp(App).use(router).use(Toast).use(createPinia()).mount('#app')
