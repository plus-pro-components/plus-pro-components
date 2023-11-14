<template>
  <el-container class="plus-layout">
    <!-- 头部 -->
    <PlusHeader v-bind="headerProps">
      <!-- 左侧插槽 -->
      <template v-if="$slots['header-left']" #header-left="data">
        <slot name="header-left" v-bind="data" />
      </template>

      <!-- 右侧插槽 -->
      <template v-if="$slots['header-right']" #header-right="data">
        <slot name="header-right" v-bind="data" />
      </template>
    </PlusHeader>

    <el-container>
      <!-- 侧边栏 -->
      <PlusSidebar v-bind="sidebarProps" ref="plusSidebarInstance">
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
      <el-main>
        <el-scrollbar class="plus-layout-main__scrollbar" v-bind="scrollbarProps">
          <!-- 面包屑上方 -->
          <template v-if="$slots['layout-extra']">
            <slot name="layout-extra" />
          </template>

          <!-- 面包屑 -->
          <PlusBreadcrumb v-bind="breadcrumbProps">
            <!-- 面包屑title 插槽 -->
            <template v-if="$slots['breadcrumb-item-title']" #breadcrumb-item-title="data">
              <slot name="breadcrumb-item-title" v-bind="data" />
            </template>
          </PlusBreadcrumb>

          <slot />

          <el-backtop
            v-if="backtop"
            v-bind="backtopProps"
            target=".plus-layout .plus-layout-main__scrollbar"
          />
        </el-scrollbar>
      </el-main>
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
import { ref, computed } from 'vue'

export interface PlusLayoutProps {
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

const plusSidebarInstance = ref<PlusSidebarInstance | null>()

const backtopProps = computed(
  () => (isPlainObject(props.backtop) ? props.backtop : {}) as RecordType
)

defineExpose({
  plusSidebarInstance
})
</script>
