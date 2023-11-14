<template>
  <PlusBreadcrumb :routes="routes" :title-render="renderTitle" />
</template>

<script lang="ts" setup>
import { h } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { PlusRouteRecordRaw } from 'plus-pro-components'

const routes = [
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
  return h(
    'p',
    {
      style: {
        color: 'red'
      }
    },
    () => route.name
  )
}
</script>
