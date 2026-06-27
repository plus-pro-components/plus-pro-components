import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [Vue(), VueJsx()],
  optimizeDeps: {
    noDiscovery: true
  },
  test: {
    clearMocks: true,
    environment: 'jsdom',
    coverage: {
      include: ['packages/components/**/*'],
      exclude: [
        'packages/components/*/style/*',
        'packages/components/index.ts',
        'packages/components/*/index.ts'
      ]
    }
  }
})
