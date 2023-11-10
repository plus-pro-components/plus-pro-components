<template>
  <div class="sidebar">
    <PlusSidebar
      v-model:collapse="collapse"
      :routes="routes"
      :render-menu-extra="!collapse ? renderMenuExtra : undefined"
    />
  </div>
</template>

<script setup lang="ts">
import { Document as DocumentIcon } from '@element-plus/icons-vue'
import { ElButton, ElInput, ElMessage } from 'element-plus'
import type { PlusRouteRecordRaw } from 'plus-pro-components'
import { ref, h } from 'vue'

const collapse = ref(false)

const routes: PlusRouteRecordRaw[] = [
  {
    path: '/breadcrumb',
    name: 'breadcrumb',
    meta: {
      icon: DocumentIcon
    }
  },
  {
    path: '/date-picker',
    name: 'date-picker',
    meta: {
      icon: DocumentIcon
    },
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
    name: 'description',
    meta: {
      icon: DocumentIcon
    }
  }
]

const renderMenuExtra = () => {
  return h(
    ElInput,
    {
      placeholder: '请输入关键字',
      style: {
        width: '150px',
        marginLeft: '20px'
      }
    },
    {
      append: () =>
        h(
          ElButton,
          {
            onClick() {
              ElMessage.success('搜索')
            }
          },
          () => '搜索'
        )
    }
  )
}
</script>
