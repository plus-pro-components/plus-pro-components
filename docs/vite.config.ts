import { fileURLToPath, URL } from 'url'
import Inspect from 'vite-plugin-inspect'
import type { PluginOption, AliasOptions } from 'vite'
import { defineConfig } from 'vite'

const pathResolve = (dir: string): string => fileURLToPath(new URL(dir, import.meta.url))

const isWrite = process.env.PLUS_WRITE === 'true'
const isDebug = process.env.PLUS_DEBUG === 'true'

const alias: AliasOptions = isWrite
  ? {
      'plus-pro-components': pathResolve('../dist/plus-pro-components'),
      'plus-pro-components-css': pathResolve('../dist/plus-pro-components/index.min.css')
    }
  : isDebug
  ? {
      'plus-pro-components': pathResolve('../packages/plus-pro-components/index'),
      // 导入空的css 则界面中使用的是最新的本地组件的样式
      'plus-pro-components-css': pathResolve('./.vitepress/theme/styles/empt.css')
    }
  : {
      'plus-pro-components-css': pathResolve('./node_modules/plus-pro-components/index.min.css')
    }

export default defineConfig(() => {
  return {
    server: {
      host: true,
      port: 3001
    },
    resolve: {
      alias: alias
    },
    plugins: [Inspect() as PluginOption]
  }
})
