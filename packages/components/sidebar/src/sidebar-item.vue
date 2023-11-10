<template>
  <template v-if="item.meta?.hideInMenu !== true">
    <!-- 没有子菜单的情况 -->
    <template v-if="resolveMenuItem(item)">
      <el-menu-item
        :key="getIndex(item)"
        class="plus-sidebar__item"
        :index="getIndex(item)"
        :disabled="item.meta?.disabled"
        @click="handleClickItem(item)"
      >
        <!-- 自定义显示 -->
        <component
          :is="renderMenuItem"
          v-if="renderMenuItem && isFunction(renderMenuItem)"
          v-bind="item"
        />

        <!-- menu-item 插槽 -->
        <slot v-else-if="$slots['sidebar-item']" name="sidebar-item" v-bind="item" />

        <el-icon v-else-if="item.meta && item.meta.icon" class="plus-sidebar__item-icon">
          <component :is="item.meta.icon" v-bind="item" />
        </el-icon>

        <template #title>
          <span class="plus-sidebar__item-title">
            <component
              :is="renderTitle"
              v-if="renderTitle && isFunction(renderTitle)"
              v-bind="item"
            />

            <!-- menu-item title 插槽 -->
            <slot
              v-else-if="$slots['sidebar-item-title']"
              name="sidebar-item-title"
              v-bind="item"
            />

            <template v-else>
              {{ item.meta?.title || item.name || item.path }}
            </template>
          </span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有子菜单的情况 -->
    <el-sub-menu
      v-else
      :key="getIndex(item)"
      :index="getIndex(item)"
      class="plus-sidebar__item-sub"
    >
      <template #title>
        <!-- 自定义显示 -->
        <component
          :is="renderSubMenuItem"
          v-if="renderSubMenuItem && isFunction(renderSubMenuItem)"
          v-bind="item"
        />

        <!-- sub-menu 插槽 -->
        <slot v-else-if="$slots['sidebar-sub']" name="sidebar-sub" v-bind="item" />

        <el-icon v-else-if="item.meta?.icon" class="plus-sidebar__item-icon">
          <component :is="item.meta?.icon" v-bind="item" />
        </el-icon>

        <span class="plus-sidebar__item-title">
          <component
            :is="renderTitle"
            v-if="renderTitle && isFunction(renderTitle)"
            v-bind="item"
          />

          <!-- sub-menu title 插槽 -->
          <slot v-else-if="$slots['sidebar-item-title']" name="sidebar-item-title" v-bind="item" />

          <template v-else>
            {{ item.meta?.title || item.name || item.path }}
          </template>
        </span>
      </template>
      <PlusSidebarItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :collapse="collapse"
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
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue'
import type { VNode } from 'vue'
import type { PlusRouteRecordRaw } from '@plus-pro-components/types'
import { ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'
import type { Router } from 'vue-router'
import { isUrl, isFunction } from '@plus-pro-components/components/utils'

export interface PlusSidebarItemProps {
  item: PlusRouteRecordRaw
  collapse?: boolean
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
}

defineOptions({
  name: 'PlusSidebarItem'
})

withDefaults(defineProps<PlusSidebarItemProps>(), {
  collapse: false,
  renderMenuItem: undefined,
  renderSubMenuItem: undefined,
  renderTitle: undefined
})

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const instance = getCurrentInstance()!
const router = instance.appContext.config.globalProperties.$router as Router

const resolveMenuItem = (item: PlusRouteRecordRaw) => {
  // 没有子路由的情况
  if (!item.children?.length) return true

  const children = item.children.filter(i => i.meta?.hideInMenu !== true)
  // 判断子路由都是隐藏状态
  if (!children.length) {
    return true
  }

  return false
}

const replacePath = (path: string) => path.replace('/http', 'http')

const getIndex = (item: PlusRouteRecordRaw) => {
  return (item.redirect as string) || (item.path as string)
}

const handleClickItem = (item: PlusRouteRecordRaw) => {
  if (isUrl(replacePath(item.path as string))) {
    const url = replacePath(item.path as string)
    window.open(url)
  } else {
    router && router.push(getIndex(item))
  }
}
</script>
