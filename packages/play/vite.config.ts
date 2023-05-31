import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DefineOptions from 'unplugin-vue-define-options/vite'
import { gFiles } from './gFiles'

const resolve = (dir: string) => fileURLToPath(new URL(dir, import.meta.url))

// https://vitejs.dev/config/
export default async () => {
  await gFiles()
  return defineConfig({
    plugins: [
      vue(),
      // defineOptions 宏
      DefineOptions(),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        dts: false
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: false,
        directoryAsNamespace: true
      })
    ],
    resolve: {
      alias: {
        '@': resolve('./src')
      }
    },
    server: {
      port: 3000
    }
  })
}
