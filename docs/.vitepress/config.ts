import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/plus-pro-components/',
  title: 'plus-pro-components',
  description: 'plus-pro-components',
  themeConfig: {
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    outlineTitle: '本页导航',
    lastUpdatedText: '上次更新时间',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: '首页', link: '/' }],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/plus-pro-components/plus-pro-components' }
    ],
    footer: {
      message: 'MIT Licensed.',
      copyright: 'Copyright © 2023-present xiaofei'
    }
  },
  markdown: {
    lineNumbers: true
  }
})
