import { defineConfig } from 'vitepress'
import { mdPlugin } from './plugins/mdPlugin'
import pkg from '../../package.json'

const content = [
  'vue 版本的 procomponents',
  'vue procomponents',
  'procomponents vue',
  'PlusProComponents',
  'plus-pro-components',
  'element-plus',
  'Page level components',
  'component library',
  'ui framework',
  'ui',
  'vue'
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
    ['script', { src: '/style.js' }],
    ['script', { src: '/iconfont-symbol.js' }],
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
      { text: '指南', link: '/guide/' },
      {
        text: '组件',
        link: '/components/type'
      },
      {
        text: '生态系统',
        items: [
          {
            text: 'Utils',
            link: '/api/utils/'
          },
          {
            text: 'Hooks',
            link: '/ecosystem/hooks'
          },
          {
            text: 'Resolver',
            link: '/ecosystem/resolver'
          },
          {
            text: 'Eslint Config',
            link: '/ecosystem/eslint-config'
          }
        ]
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
            link: 'https://github.com/plus-pro-components/plus-pro-components/blob/dev/CHANGELOG.md'
          }
        ]
      },
      {
        text: '演练场',
        link: 'https://playground.plus-pro-components.com/'
      },
      {
        text: '国内镜像',
        link: 'https://plus-pro-components.com/'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '简介',
          items: [
            {
              text: '简介',
              link: '/guide/index'
            }
          ]
        },
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
              text: '国际化',
              link: '/guide/i18n'
            },
            {
              text: '版本升级',
              items: [
                {
                  text: '从 v0.0.2 迁移',
                  link: '/guide/upgrade/upgrade-to-0.0.3'
                }
              ]
            },
            {
              text: '命名空间',
              link: '/guide/namespace'
            },
            {
              text: '暗黑模式',
              link: '/guide/dark-mode'
            },
            {
              text: '更新日志',
              link: '/guide/changelog'
            },
            {
              text: '组件架构设计',
              link: '/guide/design'
            }
          ]
        },
        {
          text: '开发',
          items: [
            {
              text: '开发指南',
              link: '/guide/dev'
            },
            {
              text: '贡献指南',
              link: '/guide/contribution'
            }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础',
          items: [
            {
              text: '基础Ts类型',
              link: '/components/type'
            },
            {
              text: '高级组件通用配置',
              link: '/components/config'
            }
          ]
        },
        {
          text: '高级组件',
          items: [
            {
              text: '布局',
              link: '/components/layout'
            },
            {
              text: '多选卡片组',
              link: '/components/check-card-group'
            },
            {
              text: '表格',
              link: '/components/table'
            },
            {
              text: '表单',
              items: [
                {
                  text: '基础表单',
                  link: '/components/form'
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
                  text: '分步表单',
                  link: '/components/steps-form'
                }
              ]
            },
            {
              text: '搜索',
              link: '/components/search'
            },
            {
              text: '描述列表',
              link: '/components/descriptions'
            },
            {
              text: '页面',
              link: '/components/page'
            }
          ]
        },
        {
          text: '内置组件',
          items: [
            {
              text: '弹窗',
              link: '/components/dialog'
            },
            {
              text: '弹出框',
              link: '/components/popover'
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
            },
            {
              text: '输入标签',
              link: '/components/input-tag'
            },
            {
              text: '显示单项组件',
              link: '/components/display-item'
            },
            {
              text: '表单单项组件',
              link: '/components/form-item'
            },
            {
              text: '面包屑',
              link: '/components/breadcrumb'
            },
            {
              text: '页头',
              link: '/components/header'
            },
            {
              text: '侧边栏',
              link: '/components/sidebar'
            },
            {
              text: '可选择卡片',
              link: '/components/check-card'
            }
          ]
        }
      ],
      '/api/': [
        {
          text: '工具utils',
          link: '/api/utils/',
          items: [
            {
              text: '时间',
              link: '/api/utils/day'
            },
            {
              text: '数字',
              link: '/api/utils/number'
            },
            {
              text: 'AES加密',
              link: '/api/utils/encrypt'
            },
            {
              text: '存储',
              link: '/api/utils/storage'
            },
            {
              text: 'cookie',
              link: '/api/utils/cookie'
            },
            {
              text: '文件',
              link: '/api/utils/file'
            },
            {
              text: '判断',
              link: '/api/utils/is'
            },
            {
              text: '校验',
              link: '/api/utils/validate'
            },
            {
              text: '其他',
              link: '/api/utils/other'
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
      copyright:
        'Copyright © 2023-present xiaofei <a class="miit-link" style="color: var(--vp-c-brand);" href="https://beian.miit.gov.cn" class="fake-link black-70 ph1">陕ICP备2021003270号-2</a>'
    },
    editLink: {
      text: '在 GitHub 上编辑此页',
      pattern: 'https://github.com/plus-pro-components/plus-pro-components/edit/dev/docs/:path'
    }
  },
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    config: md => mdPlugin(md)
  }
})
