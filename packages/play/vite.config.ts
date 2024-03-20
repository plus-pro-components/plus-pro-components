import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { gFiles } from './gFiles'

const resolve = (dir: string) => fileURLToPath(new URL(dir, import.meta.url))

/**
 *  `src/__nav.vue`和`src/router/__routes.ts` 文件为自动生成文件，无需修改。
 */

// https://vitejs.dev/config/
export default async () => {
  await gFiles()
  return defineConfig({
    css: {
      preprocessorOptions: {
        scss: {}
      }
    },
    plugins: [vue(), vueJsx()],
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
