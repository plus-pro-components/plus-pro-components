<template>
  <div class="layout">
    <PlusLayout
      :sidebar-props="{ routes, titleRender }"
      :breadcrumb-props="{
        titleRender
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import type { PlusRouteRecordRaw } from '@plus-pro-components/types'
import { routes } from '../router/index'

const titleRender = (data: PlusRouteRecordRaw) => {
  return h('div', { data }, data.name as string)
}
</script>

<style>
.layout {
  /* border: 1px solid red; */
  height: 100vh;
}
</style>
