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
</script>
