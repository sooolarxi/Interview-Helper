import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'

import '@/styles/index.scss'

import ElementPlus from 'element-plus'
// import zhTw from 'element-plus/es/locale/lang/zh-tw'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(pinia)
app.use(router)
import '@/router/permission'
// app.use(ElementPlus, {
//   locale: zhTw
// })
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
