<template>
  <el-menu
    ref="plusSidebarInstance"
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
    <el-scrollbar ref="scrollbarInstance" class="plus-sidebar__scrollbar">
      <component :is="menuExtraRender" v-if="menuExtraRender && isFunction(menuExtraRender)" />

      <!-- 菜单头插槽 -->
      <slot v-else-if="$slots['sidebar-extra']" name="sidebar-extra" />

      <!-- 添加递归组件，用来生成多级菜单 -->
      <PlusSidebarItem
        v-for="item in subRoutes"
        :key="item.path"
        :item="item"
        :collapse="subCollapse"
        :menu-item-render="menuItemRender"
        :sub-menu-item-render="subMenuItemRender"
        :title-render="titleRender"
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
import type { VNode } from 'vue'
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import type { ScrollbarProps } from 'element-plus'
import { ElMenu, ElIcon, ElScrollbar } from 'element-plus'
import { Expand, Fold } from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash-es'
import type { PlusRouteRecordRaw, Mutable } from '@plus-pro-components/types'
import { isFunction } from '@plus-pro-components/components/utils'
import PlusSidebarItem from './sidebar-item.vue'

export interface PlusSidebarProps {
  routes: PlusRouteRecordRaw[]
  collapse?: boolean
  scrollbarProps?: Partial<Mutable<ScrollbarProps>>
  /**
   * 自定义 菜单的  menuItem
   * @param route
   */
  menuItemRender?: (route: PlusRouteRecordRaw) => VNode
  /**
   * 自定义 菜单的 subMenu
   * @param route
   */
  subMenuItemRender?: (route: PlusRouteRecordRaw) => VNode
  /**
   * 自定义 菜单的标题显示
   * @param route
   */
  titleRender?: (route: PlusRouteRecordRaw) => VNode
  /**
   * 可以为菜单增加一个额外内容，在菜单头和菜单之间
   * @param route
   */
  menuExtraRender?: (route: PlusRouteRecordRaw) => VNode
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
  collapse: false,
  menuItemRender: undefined,
  subMenuItemRender: undefined,
  titleRender: undefined,
  menuExtraRender: undefined
})

const emit = defineEmits<PlusSidebarEmits>()

const route = useRoute()
const plusSidebarInstance = ref<InstanceType<typeof ElMenu> | null>(null)
const scrollbarInstance = ref<InstanceType<typeof ElScrollbar> | null>(null)
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

defineExpose({
  collapse: subCollapse,
  toggleSideBar,
  plusSidebarInstance,
  scrollbarInstance
})
</script>
