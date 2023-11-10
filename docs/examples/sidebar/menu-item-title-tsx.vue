<template>
  <div class="sidebar">
    <PlusSidebar :routes="routes" :render-title="renderTitle" />
  </div>
</template>

<script setup lang="tsx">
import type { PlusRouteRecordRaw } from 'plus-pro-components'
import { Document as DocumentIcon } from '@element-plus/icons-vue'

const routes: PlusRouteRecordRaw[] = [
  {
    path: '/breadcrumb',
    name: 'breadcrumb',
    meta: {
      icon: DocumentIcon
    }
  },
  {
    path: '/date-picker',
    name: 'date-picker',
    meta: {
      icon: DocumentIcon
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
      icon: DocumentIcon
    }
  }
]
const renderTitle = (item: PlusRouteRecordRaw) => {
  return <div>{item.name}自定义</div>
}
</script>
