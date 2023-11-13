<template>
  <el-menu
    ref="plusSidebarInstance"
    :style="{
      '--plus-sidebar-width': w
    }"
    mode="vertical"
    :collapse="subCollapse"
    :default-active="subDefaultActive"
    :collapse-transition="true"
    class="plus-sidebar"
    :class="[$attrs.mode === 'horizontal' ? 'is-horizontal' : 'is-vertical']"
    :ellipsis="false"
    unique-opened
    v-bind="$attrs"
  >
    <component :is="renderMenuExtra" v-if="renderMenuExtra && isFunction(renderMenuExtra)" />

    <!-- 菜单头插槽 -->
    <slot v-else-if="$slots['sidebar-extra']" name="sidebar-extra" />

    <el-scrollbar class="plus-sidebar__scrollbar" v-bind="scrollbarProps">
      <!-- 添加递归组件，用来生成多级菜单 -->
      <PlusSidebarItem
        v-for="item in subRoutes"
        :key="item.path"
        :item="item"
        :collapse="subCollapse"
        :render-menu-item="renderMenuItem"
        :render-sub-menu-item="renderSubMenuItem"
        :render-title="renderTitle"
      >
        <!-- sidebar-item 插槽 -->
        <template v-if="$slots['sidebar-item']" #sidebar-item="data">
          <slot name="sidebar-item" v-bind="data" />
        </template>

        <!-- sidebar-sub 插槽 -->
        <template v-if="$slots['sidebar-sub']" #sidebar-sub="data">
          <slot name="sidebar-sub" v-bind="data" />
        </template>

        <!-- sidebar-item-title  插槽-->
        <template v-if="$slots['sidebar-item-title']" #sidebar-item-title="data">
          <slot name="sidebar-item-title" v-bind="data" />
        </template>
      </PlusSidebarItem>
    </el-scrollbar>

    <el-menu-item
      v-if="$attrs.mode !== 'horizontal'"
      class="plus-sidebar__collapse"
      :class="subCollapse ? 'is-collapse' : ''"
      @click="toggleCollapse"
    >
      <el-icon v-if="collapse"><Expand /></el-icon>
      <el-icon v-else><Fold /></el-icon>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import type { VNode, Ref, ComputedRef } from 'vue'
import { ref, computed, watchEffect, getCurrentInstance, unref } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { ScrollbarProps } from 'element-plus'
import { ElMenu, ElMenuItem, ElIcon, ElScrollbar } from 'element-plus'
import { Expand, Fold } from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash-es'
import type { PlusRouteRecordRaw, Mutable } from '@plus-pro-components/types'
import { isFunction, isString } from '@plus-pro-components/components/utils'
import PlusSidebarItem from './sidebar-item.vue'

export interface PlusSidebarProps {
  routes?: PlusRouteRecordRaw[]
  collapse?: boolean
  defaultActive?: string | ComputedRef<string> | Ref<string>
  /**
   * 自定义 菜单的  menuItem
   * @param route
   */
  renderMenuItem?: (route: PlusRouteRecordRaw) => VNode | string
  /**
   * 自定义 菜单的 subMenu
   * @param route
   */
  renderSubMenuItem?: (route: PlusRouteRecordRaw) => VNode | string
  /**
   * 自定义 菜单的标题显示
   * @param route
   */
  renderTitle?: (route: PlusRouteRecordRaw) => VNode | string
  /**
   * 可以为菜单增加一个额外内容，在菜单头和菜单之间
   * @param route
   */
  renderMenuExtra?: (route: PlusRouteRecordRaw) => VNode | string
  scrollbarProps?: Partial<Mutable<ScrollbarProps>>
  width?: number | string
}

export interface PlusSidebarEmits {
  (e: 'update:collapse', collapse: boolean): void
  (e: 'toggleCollapse', collapse: boolean): void
}

defineOptions({
  name: 'PlusSidebar'
})

const props = withDefaults(defineProps<PlusSidebarProps>(), {
  routes: () => [],
  scrollbarProps: () => ({}),
  collapse: false,
  renderMenuItem: undefined,
  renderSubMenuItem: undefined,
  renderTitle: undefined,
  renderMenuExtra: undefined,
  width: 200,
  defaultActive: undefined
})

const emit = defineEmits<PlusSidebarEmits>()

const w = computed(() => (isString(props.width) ? props.width : props.width + 'px'))

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const instance = getCurrentInstance()!
const route = computed(
  () => instance.appContext.config.globalProperties.$route as RouteLocationNormalizedLoaded
)

const plusSidebarInstance = ref<InstanceType<typeof ElMenu> | null>(null)

const subCollapse = ref(false)
const subRoutes = computed(() =>
  cloneDeep(props.routes).sort((a, b) => (a.meta?.sort || 0) - (b.meta?.sort || 0))
)

// 激活的菜单
const computedDefaultActive = computed(
  () => (route.value?.redirectedFrom && route.value?.redirectedFrom?.path) || route.value?.path
)

const subDefaultActive = computed(
  () => unref(props.defaultActive) || computedDefaultActive.value
) as ComputedRef<string>

// 切换菜单
const toggleCollapse = () => {
  subCollapse.value = !subCollapse.value
  emit('update:collapse', subCollapse.value)
  emit('toggleCollapse', subCollapse.value)
}

watchEffect(() => {
  subCollapse.value = props.collapse
})

defineExpose({
  collapse: subCollapse,
  toggleCollapse,
  plusSidebarInstance
})
</script>
