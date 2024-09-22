import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia, { useDeviceStore } from './stores'
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(pinia)
app.use(router)
import '@/router/permission'
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const { checkDevice } = useDeviceStore()
window.addEventListener('resize', checkDevice)

app.mount('#app')
app.unmount = () => {
  window.removeEventListener('resize', checkDevice)
  app.unmount()
}
