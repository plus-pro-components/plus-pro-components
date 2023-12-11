import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import plusZhCn from 'plus-pro-components/locale/zh-cn.mjs'

import PlusProComponents from 'plus-pro-components'
// 导入plus-pro-components样式，alias 处理过，正常导入是plus-pro-components/index.min.css
import 'plus-pro-components-css'
import 'element-plus/theme-chalk/dark/css-vars.css'


import DocsCodeDemo from './components/docs-code-demo.vue'
import DocsChangelog from './components/docs-changelog.vue'
import DocsMarkdown from './components/docs-markdown.vue'
import DocsTip from './components/docs-tip.vue'
import directive from './directives'

import './styles/index.scss'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.use(ElementPlus, {
      locale: { ...zhCn, ...plusZhCn }
    })
    app.use(PlusProComponents as unknown as any)
    app.component('DocsCodeDemo', DocsCodeDemo)
    app.component('DocsChangelog', DocsChangelog)
    app.component('DocsMarkdown', DocsMarkdown)
    app.component('DocsTip', DocsTip)
    directive(app)
  }
}
