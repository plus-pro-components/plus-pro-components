<template>
  <div class="sidebar">
    <PlusSidebar :routes="routes" :render-title="renderTitle" />
  </div>
</template>

<script setup lang="tsx">
import type { PlusRouteRecordRaw } from 'plus-pro-components'

const routes = [
  {
    path: '/breadcrumb',
    name: 'breadcrumb'
  },
  {
    path: '/date-picker',
    name: 'date-picker',
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
    name: 'description'
  }
]
const renderTitle = (item: PlusRouteRecordRaw) => {
  return <div>{item.name}自定义</div>
}
</script>
