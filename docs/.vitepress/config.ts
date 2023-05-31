import { defineConfig } from 'vitepress'

const content = [
  'plus-pro-components',
  'element-plus',
  'Page level components',
  'component library',
  'ui framework',
  'ui',
  'vue',
  'echarts'
].toString()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  title: 'PlusProComponents',
  description: 'plus-pro-components',
  head: [
    ['meta', { name: 'author', content: 'xiaofei' }],

    [
      'meta',
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
      }
    ],
    [
      'meta',
      {
        name: 'description',
        content
      }
    ],
    ['meta', { name: 'keywords', content }],
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
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
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/installation' },
      {
        text: '组件',
        link: '/components/dialog'
      },
      // {
      //   text: '工具',
      //   link: '/utils/'
      // },
      {
        text: 'v0.0.1-alpha.3',
        items: [
          {
            text: '历史版本',
            link: 'https://github.com/plus-pro-components/plus-pro-components/releases'
          },
          {
            text: '更新日志',
            link: 'https://github.com/plus-pro-components/plus-pro-components/blob/main/CHANGELOG.md'
          }
        ]
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '基础',
          items: [
            {
              text: '安装',
              link: '/guide/installation'
            },
            {
              text: '快速开始',
              link: '/guide/quickstart'
            }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础',
          items: [
            {
              text: '弹窗',
              link: '/components/dialog'
            },
            {
              text: '分页',
              link: '/components/pagination'
            }
          ]
        }
      ]
    },
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
