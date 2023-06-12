import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import PlusProComponents from 'plus-pro-components'
import CodeDemo from './components/code-demo.vue'
import directive from './directives'

import './styles/index.scss'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.use(ElementPlus, {
      locale: zhCn
    })
    app.use(PlusProComponents as unknown as any)
    app.component('code-demo', CodeDemo)
    directive(app)
  }
}
