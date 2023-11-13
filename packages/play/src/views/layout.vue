<template>
  <div class="layout">
    <PlusLayout :sidebar-props="{ routes }">
      <template #header-right>
        <slot />
      </template>

      <RouterView />
    </PlusLayout>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { routes } from '../router/index'
</script>

<style>
.layout {
  /* border: 1px solid red; */
  height: 100vh;
}
</style>
