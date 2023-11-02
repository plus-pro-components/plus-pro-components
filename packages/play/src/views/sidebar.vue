<template>
  <div class="sidebar">
    <PlusSidebar :routes="routes" />
  </div>
</template>

<script setup lang="ts">
import { routes } from '../router/index'
</script>

<style lang="scss">
.sidebar {
  .plus-sidebar {
    height: 100vh;
  }
}
</style>
