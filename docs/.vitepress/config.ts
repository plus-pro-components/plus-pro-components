import { defineConfig } from 'vitepress'
import { mdPlugin } from './plugins/mdPlugin'
import pkg from '../../package.json'

const content = [
  'PlusProComponents',
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
  description: content,
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
    ['script', { src: '/hmt.js' }],
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  themeConfig: {
    search: {
      provider: 'local'
    },
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
        link: '/components/'
      },
      {
        text: `v${pkg.version}`,
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
      },
      {
        text: '国内镜像',
        link: 'https://plus-pro-components.com/'
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
        },
        {
          text: '进阶',
          items: [
            {
              text: '更新日志',
              link: '/guide/changelog'
            }
          ]
        },
        {
          text: '开发',
          items: [
            {
              text: '开发指南',
              link: '/guide/dev'
            }
          ]
        }
      ],
      '/components/': [
        {
          text: '简介',
          items: [
            {
              text: '简介',
              link: '/components/index'
            }
          ]
        },
        {
          text: '基础Ts类型',
          items: [
            {
              text: '基础Ts类型',
              link: '/components/type'
            }
          ]
        },
        {
          text: '基础组件',
          items: [
            {
              text: '弹窗',
              link: '/components/dialog'
            },
            {
              text: '分页',
              link: '/components/pagination'
            },
            {
              text: '单选',
              link: '/components/radio'
            },
            {
              text: '日期时间',
              link: '/components/date-picker'
            }
          ]
        },
        {
          text: '高级组件',
          items: [
            {
              text: '通用配置',
              link: '/components/config'
            },
            {
              text: '表格',
              link: '/components/table'
            },

            {
              text: '表单',
              link: '/components/form'
            },
            {
              text: '搜索',
              link: '/components/search'
            },
            {
              text: '页面',
              link: '/components/page'
            },
            {
              text: '弹窗表单',
              link: '/components/dialog-form'
            },
            {
              text: '抽屉表单',
              link: '/components/drawer-form'
            },

            {
              text: '描述列表',
              link: '/components/description'
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
    lineNumbers: true,
    config: md => mdPlugin(md)
  }
})
