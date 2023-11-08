<template>
  <div class="sidebar">
    <PlusSidebar :routes="routes">
      <template #sidebar-item-title="item">
        {{ item.name + '自定义' }}
      </template>
    </PlusSidebar>
  </div>
</template>

<script setup lang="ts">
import { Document as DocumentIcon } from '@element-plus/icons-vue'

const routes = [
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
</script>
