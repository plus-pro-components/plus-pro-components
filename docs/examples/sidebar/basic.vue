<template>
  <div class="sidebar">
    <PlusSidebar :routes="routes" />
  </div>
</template>

<script setup lang="ts">
import { Document as DocumentIcon } from '@element-plus/icons-vue'
import type { PlusRouteRecordRaw } from 'plus-pro-components'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const moduleFiles = import.meta.glob('../**/basic.vue', {
  eager: true
})

const getRoutes = (moduleFiles: Record<string, any>) => {
  const data = Object.keys(moduleFiles)
    .map(item => item.replace('../', '').replace('/basic.vue', ''))
    .map(item => ({ path: item, name: item }))

  const getComponent = (path: string) => {
    const key = Object.keys(moduleFiles).find(i => i.includes(path)) as string
    return moduleFiles[key]?.default
  }

  const routes = data.map(item => ({
    path: item.path,
    name: item.name,
    component: getComponent(item.path),
    meta: {
      icon: DocumentIcon
    }
  }))

  return routes.map(item => ({
    ...item,
    path: '/' + item.path,
    children: item.path === 'breadcrumb' ? routes : []
  }))
}

const routes: PlusRouteRecordRaw[] = getRoutes(moduleFiles)
</script>

<style scoped>
.sidebar {
  height: 100vh;
}
</style>
