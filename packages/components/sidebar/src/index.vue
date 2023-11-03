<template>
  <el-menu
    mode="vertical"
    :collapse="subCollapse"
    :default-active="defaultActive"
    :collapse-transition="true"
    class="plus-sidebar"
    :class="$attrs.mode === 'horizontal' ? 'is-horizontal' : 'is-vertical'"
    :ellipsis="false"
    unique-opened
    v-bind="$attrs"
  >
    <el-scrollbar class="plus-sidebar__scrollbar">
      <!-- 添加递归组件，用来生成多级菜单 -->
      <PlusSidebarItem
        v-for="item in subRoutes"
        :key="item.path"
        :item="item"
        :collapse="subCollapse"
      />
    </el-scrollbar>

    <div
      v-if="$attrs.mode !== 'horizontal'"
      class="plus-sidebar__collapse"
      @click.stop="toggleSideBar"
    >
      <el-icon v-if="collapse"><Expand /></el-icon>
      <el-icon v-else><Fold /></el-icon>
    </div>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { ElMenu, ElIcon, ElScrollbar } from 'element-plus'
import { Expand, Fold } from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash-es'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { PlusRouteRecordRaw, RecordType } from '@plus-pro-components/types'
import PlusSidebarItem from './sidebar-item.vue'

export interface PlusSidebarProps {
  routes: PlusRouteRecordRaw[]
  collapse?: boolean
  scrollbarProps?: RecordType
}

export interface PlusSidebarEmits {
  (e: 'update:collapse', collapse: boolean): void
}

defineOptions({
  name: 'PlusSidebar'
})

const props = withDefaults(defineProps<PlusSidebarProps>(), {
  routes: () => [],
  scrollbarProps: () => ({}),
  collapse: false
})

const emit = defineEmits<PlusSidebarEmits>()

const route = useRoute()

const subCollapse = ref(false)
const subRoutes = computed(() =>
  cloneDeep(props.routes).sort((a, b) => (a.meta?.sort || 0) - (b.meta?.sort || 0))
)

// 激活的菜单
const defaultActive = computed(
  () => (route.redirectedFrom && route.redirectedFrom.path) || route.path
)

// 切换菜单
const toggleSideBar = () => {
  subCollapse.value = !subCollapse.value
  emit('update:collapse', subCollapse.value)
}

watchEffect(() => {
  subCollapse.value = props.collapse
})
</script>
