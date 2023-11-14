<template>
  <PlusBreadcrumb :routes="routes" :title-render="renderTitle" />
</template>

<script lang="tsx" setup>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { PlusRouteRecordRaw } from 'plus-pro-components'

const routes: PlusRouteRecordRaw[] = [
  {
    path: '/breadcrumb/1',
    name: 'Breadcrumb1',
    meta: {
      title: '面包屑1'
    },
    children: []
  },
  {
    path: '/breadcrumb/2',
    name: 'Breadcrumb2',
    meta: {
      title: '面包屑2'
    },
    children: []
  }
]

const renderTitle = (route: PlusRouteRecordRaw) => {
  return <div style={{ color: '#000' }}>{route.name} </div>
}
</script>
