import type { Plugin } from 'vue'
import { createApp } from 'vue'
import router from '@/router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import PlusProComponents from '../../plus-pro-components/index'
import App from './App.vue'
import './style.css'

const app = createApp(App)
app
  .use(router)
  .use(PlusProComponents as unknown as Plugin)
  .mount('#app')
