<template>
  <div class="sidebar">
    <PlusSidebar :routes="routes" />
  </div>
</template>

<script setup lang="ts">
import { Document as DocumentIcon } from '@element-plus/icons-vue'
import type { PlusRouteRecordRaw } from 'plus-pro-components'

const routes: PlusRouteRecordRaw[] = [
  {
    path: '/breadcrumb',
    name: 'breadcrumb',
    meta: {
      icon: DocumentIcon,
      hideInMenu: true
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
</script>
