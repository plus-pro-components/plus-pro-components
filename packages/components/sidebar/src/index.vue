<template>
  <el-menu
    ref="plusSidebarInstance"
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
        :parent="subRoutes"
        :collapse="subCollapse"
        :render-menu-item="renderMenuItem"
        :render-sub-menu-item="renderSubMenuItem"
        :render-title="renderTitle"
        @click-menu-item="onClickMenuItem"
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
      index="collapse"
      class="plus-sidebar__collapse"
      :class="subCollapse ? 'is-collapse' : ''"
      @click="toggleCollapse"
    >
      <el-icon v-if="subCollapse"><Expand /></el-icon>
      <el-icon v-else><Fold /></el-icon>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { ref, computed, watchEffect, getCurrentInstance, unref, useAttrs } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { ElMenu, ElMenuItem, ElIcon, ElScrollbar } from 'element-plus'
import { Expand, Fold } from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash-es'
import type { PlusRouteRecordRaw } from '@plus-pro-components/types'
import { isFunction } from '@plus-pro-components/components/utils'
import PlusSidebarItem from './sidebar-item.vue'
import type { PlusSidebarSelfProps as PlusSidebarProps, PlusSidebarEmits } from './type'

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
  /**
   * 菜单的宽度
   * @deprecated 0.1.20
   */
  width: 200,
  defaultActive: undefined
})

const emit = defineEmits<PlusSidebarEmits>()

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

const onClickMenuItem = useAttrs().onClickMenuItem as (
  item: PlusRouteRecordRaw,
  parent: PlusRouteRecordRaw | PlusRouteRecordRaw[]
) => void
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
