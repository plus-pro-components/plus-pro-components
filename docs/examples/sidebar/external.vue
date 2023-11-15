<template>
  <div class="sidebar">
    <PlusSidebar :routes="routes" />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { ElementPlus } from '@element-plus/icons-vue'
import type { PlusRouteRecordRaw } from 'plus-pro-components'

const routes: PlusRouteRecordRaw[] = [
  {
    path: '/https://plus-pro-components.com',
    name: 'plus-pro-components',
    meta: {
      icon: h('img', { src: 'https://plus-pro-components.com/logo.png', style: { width: '20px' } })
    }
  },
  {
    path: '/https://element-plus.org',
    name: 'element-plus',
    meta: {
      icon: ElementPlus
    }
  }
]
</script>
