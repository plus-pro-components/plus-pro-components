import type { Plugin } from 'vue'
import { createApp } from 'vue'
import PlusProComponents from 'plus-pro-components'
import router from '@/router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import 'plus-pro-components/index.css'
import App from './App.vue'
import './style.css'
import 'element-plus/dist/index.css'

const app = createApp(App)
app
  .use(router)
  .use(PlusProComponents as unknown as Plugin)
  .mount('#app')
