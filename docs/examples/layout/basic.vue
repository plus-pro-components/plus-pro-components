<template>
  <div class="sidebar">
    <PlusLayout
      :sidebar-props="{ routes, onToggleCollapse: handleToggleCollapse }"
      :breadcrumb-props="{ routes: breadcrumbRoutes }"
      :header-props="{
        onClickDropdownItem: handleClickDropdownItem
      }"
    >
      <template #layout-extra>
        <div class="tag">
          <el-tag closable> breadcrumb </el-tag>
          <el-tag closable> date-picker </el-tag>
        </div>
      </template>

      内容
    </PlusLayout>
  </div>
</template>

<script setup lang="ts">
import { Document as DocumentIcon } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

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

const routes = getRoutes(moduleFiles)

const breadcrumbRoutes = [
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
  }
]

const handleClickDropdownItem = (dropdownItem: { label: string; value: string }) => {
  ElMessage.success(dropdownItem.label)
}

const handleToggleCollapse = (collapse: boolean) => {
  console.log(collapse)
}
</script>
<style lang="scss" scoped>
.tag {
  margin-bottom: 20px;
  .el-tag + .el-tag {
    margin-left: 10px;
  }
}
</style>
