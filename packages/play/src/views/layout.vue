<template>
  <div class="layout">
    <PlusLayout
      :sidebar-props="{ routes, renderTitle }"
      :breadcrumb-props="{
        renderTitle
      }"
    >
      <RouterView />
    </PlusLayout>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import type { PlusRouteRecordRaw } from '@plus-pro-components/types'
import { RouterView } from 'vue-router'
import { routes } from '../router/index'

const renderTitle = (data: PlusRouteRecordRaw) => {
  return h('div', { data }, data.name as string)
}
</script>

<style>
.layout {
  /* border: 1px solid red; */
  height: 100vh;
}
</style>
