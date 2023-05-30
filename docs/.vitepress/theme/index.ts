import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'

import './styles/index.scss'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {}
}
