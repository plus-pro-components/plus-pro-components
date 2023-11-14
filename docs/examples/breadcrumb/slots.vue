<template>
  <PlusBreadcrumb :routes="routes">
    <template #breadcrumb-item-title="route">
      <h3 style="color: green; margin: 0">{{ route.name }}</h3>
    </template>
  </PlusBreadcrumb>
</template>

<script lang="ts" setup>
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
</script>
