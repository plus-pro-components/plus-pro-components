import Inspect from 'vite-plugin-inspect'
import type { PluginOption } from 'vite'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    server: {
      host: true,
      port: 3001
    },
    resolve: {},
    plugins: [Inspect() as PluginOption]
  }
})
