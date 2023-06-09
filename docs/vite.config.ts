import { fileURLToPath, URL } from 'url'
import Inspect from 'vite-plugin-inspect'
import type { PluginOption, AliasOptions } from 'vite'
import { defineConfig } from 'vite'

const pathResolve = (dir: string): string => fileURLToPath(new URL(dir, import.meta.url))

const isEnvProduction = process.env.NODE_ENV === 'production'

const alias: AliasOptions = isEnvProduction
  ? {}
  : {
      'plus-pro-components': pathResolve('../dist/plus-pro-components')
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
