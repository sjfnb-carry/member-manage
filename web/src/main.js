import { createApp } from 'vue'
import { createPinia } from 'pinia'
// pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

import Particles from 'particles.vue3'
import '@/util/axios.config'

const app = createApp(App)
app.use(Particles)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.use(ElementPlus)
app.mount('#app')
