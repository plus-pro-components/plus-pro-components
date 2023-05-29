import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DefineOptions from 'unplugin-vue-define-options/vite'

export default defineConfig({
  plugins: [Vue(), VueJsx(), DefineOptions()],
  optimizeDeps: {
    disabled: true
  },
  test: {
    clearMocks: true,
    environment: 'jsdom',
    transformMode: {
      web: [/\.[jt]sx$/]
    }
  }
})
