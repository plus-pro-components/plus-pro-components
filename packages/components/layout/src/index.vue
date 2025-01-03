<template>
  <el-container
    class="plus-layout"
    :style="!hasHeader ? '--plus-header-height: 0px' : void 0"
    :class="{ collapse }"
  >
    <!-- 头部 -->
    <PlusHeader v-if="hasHeader" v-bind="headerProps">
      <!-- 左侧插槽 -->
      <template v-if="$slots['header-left']" #header-left="data">
        <slot name="header-left" v-bind="data" />
      </template>

      <!-- 右侧插槽 -->
      <template v-if="$slots['header-right']" #header-right="data">
        <slot name="header-right" v-bind="data" />
      </template>
    </PlusHeader>

    <el-container class="plus-layout-main-wrapper">
      <!-- 侧边栏 -->
      <PlusSidebar
        v-if="hasSidebar"
        v-bind="sidebarProps"
        ref="plusSidebarInstance"
        v-model:collapse="collapse"
      >
        <!-- 菜单头插槽 -->
        <template v-if="$slots['sidebar-extra']" #sidebar-extra="data">
          <slot name="sidebar-extra" v-bind="data" />
        </template>

        <!-- menu-item 插槽 -->
        <template v-if="$slots['sidebar-item']" #sidebar-item="data">
          <slot name="sidebar-item" v-bind="data" />
        </template>

        <!-- sub-menu 插槽 -->
        <template v-if="$slots['sidebar-sub']" #sidebar-sub="data">
          <slot name="sidebar-sub" v-bind="data" />
        </template>

        <!-- sub-menu title,menu-item title 插槽 -->
        <template v-if="$slots['sidebar-item-title']" #sidebar-item-title="data">
          <slot name="sidebar-item-title" v-bind="data" />
        </template>
      </PlusSidebar>

      <!-- 主内容 -->
      <main class="plus-layout-main">
        <!-- 面包屑上方 -->
        <div v-if="$slots['layout-extra']" class="plus-layout-extra">
          <slot name="layout-extra" />
        </div>

        <!-- 面包屑 -->
        <PlusBreadcrumb v-if="hasBreadcrumb" v-bind="breadcrumbProps" ref="plusBreadcrumbInstance">
          <!-- 面包屑title 插槽 -->
          <template v-if="$slots['breadcrumb-item-title']" #breadcrumb-item-title="data">
            <slot name="breadcrumb-item-title" v-bind="data" />
          </template>
        </PlusBreadcrumb>

        <el-main class="plus-layout-content" :style="{ height }">
          <el-scrollbar class="plus-layout-main__scrollbar" v-bind="scrollbarProps">
            <el-main>
              <slot />
            </el-main>

            <el-backtop
              v-if="backtop"
              v-bind="backtopProps"
              target=".plus-layout .plus-layout-main__scrollbar"
            />
          </el-scrollbar>
        </el-main>
      </main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import type { PlusBreadcrumbProps } from '@plus-pro-components/components/breadcrumb'
import { PlusBreadcrumb as PlusBreadcrumbComponent } from '@plus-pro-components/components/breadcrumb'
import type { PlusSidebarProps, PlusSidebarInstance } from '@plus-pro-components/components/sidebar'
import { PlusSidebar as PlusSidebarComponent } from '@plus-pro-components/components/sidebar'
import type { PlusHeaderProps } from '@plus-pro-components/components/header'
import { PlusHeader as PlusHeaderComponent } from '@plus-pro-components/components/header'
import { isPlainObject } from '@plus-pro-components/components/utils'
import type { ScrollbarProps, BacktopProps } from 'element-plus'
import { ElContainer, ElMain, ElScrollbar, ElBacktop } from 'element-plus'
import type { Mutable, RecordType } from '@plus-pro-components/types'
import type { Component } from 'vue'
import { ref, computed, onMounted } from 'vue'

export interface PlusLayoutProps {
  /**
   * @version v0.1.15
   */
  hasSidebar?: boolean
  /**
   * @version v0.1.15
   */
  hasHeader?: boolean
  /**
   * @version v0.1.15
   */
  hasBreadcrumb?: boolean
  sidebarProps?: PlusSidebarProps
  headerProps?: PlusHeaderProps
  breadcrumbProps?: PlusBreadcrumbProps
  scrollbarProps?: Partial<Mutable<ScrollbarProps>>
  backtop?: boolean | Partial<Mutable<BacktopProps>>
}

defineOptions({
  name: 'PlusLayout'
})

const props = withDefaults(defineProps<PlusLayoutProps>(), {
  hasSidebar: true,
  hasHeader: true,
  hasBreadcrumb: true,
  sidebarProps: undefined,
  headerProps: undefined,
  breadcrumbProps: undefined,
  backtop: true,
  scrollbarProps: () => ({
    always: true
  })
})

/**
 * FIXME: The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.
 */
const PlusBreadcrumb: Component = PlusBreadcrumbComponent
const PlusSidebar: Component = PlusSidebarComponent
const PlusHeader: Component = PlusHeaderComponent

const height = ref('100%')
const collapse = ref(false)
const plusSidebarInstance = ref<PlusSidebarInstance | null>()
const plusBreadcrumbInstance = ref()

const backtopProps = computed(
  () => (isPlainObject(props.backtop) ? props.backtop : {}) as RecordType
)

const setHeight = () => {
  if (props.hasBreadcrumb && plusBreadcrumbInstance.value?.$el) {
    requestAnimationFrame(() => {
      const bottom = plusBreadcrumbInstance.value?.$el?.getBoundingClientRect().bottom
      height.value = `calc(100% - ${bottom}px + var(--plus-header-height))`
    })
  }
}

onMounted(() => {
  setHeight()
})

defineExpose({
  plusSidebarInstance
})
</script>
