<template>
  <div class="sidebar">
    <!-- font-awesome -->
    <link rel="stylesheet" href="https://unpkg.com/font-awesome@4.7.0/css/font-awesome.min.css" />

    <!-- iconfont -->
    <link rel="stylesheet" href="https://at.alicdn.com/t/font_1251940_pr7stx0uzw.css" />

    <PlusSidebar :routes="routes" />
  </div>
</template>

<script setup lang="ts">
import { Platform } from '@element-plus/icons-vue'
import type { PlusRouteRecordRaw } from 'plus-pro-components'
import { h } from 'vue'
import svg from '/home.svg?raw'
// symbol
import 'https://at.alicdn.com/t/font_1251940_pr7stx0uzw.js'

const routes: PlusRouteRecordRaw[] = [
  {
    path: '/breadcrumb',
    name: 'breadcrumb',
    meta: {
      icon: h('img', { src: 'https://plus-pro-components.com/logo.png', style: { width: '20px' } }),
      title: '图片icon'
    }
  },
  {
    path: '/date-picker',
    name: 'date-picker',
    meta: {
      icon: Platform,
      title: 'el-icon'
    },
    children: [
      {
        path: '/date-picker-1',
        name: 'date-picker-1'
      },
      {
        path: '/date-picker-2',
        name: 'date-picker-2'
      }
    ]
  },
  {
    path: '/description',
    name: 'description',
    meta: {
      icon: h('i', { innerHTML: svg }),
      title: 'svg icon'
    }
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      icon: h('i', { class: 'fa fa-search' }),
      title: 'font-awesome icon'
    }
  },
  {
    path: '/table',
    name: 'table',
    meta: {
      icon: (item: PlusRouteRecordRaw) => {
        return h('i', { class: 'iconfont  iconyunying', title: item.name })
      },
      title: 'iconfont icon'
    }
  },
  {
    path: '/radio',
    name: 'radio',
    meta: {
      icon: h(
        'svg',
        {
          class: 'svg-icon',
          'aria-hidden': true
        },
        h('use', {
          'xlink:href': '#iconblog'
        })
      ),
      title: 'symbol icon'
    }
  }
]
</script>
