<template>
  <template v-if="item.meta?.hiddenMenu !== true">
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
          :is="menuItemRender"
          v-if="menuItemRender && isFunction(menuItemRender)"
          v-bind="item"
        />

        <!-- menu-item 插槽 -->
        <slot v-else-if="$slots['sidebar-item']" name="sidebar-item" v-bind="item" />

        <el-icon v-else-if="item.meta && item.meta.icon" class="plus-sidebar__item-icon">
          <component :is="item.meta.icon" />
        </el-icon>

        <template #title>
          <span class="plus-sidebar__item-title">
            <component
              :is="titleRender"
              v-if="titleRender && isFunction(titleRender)"
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
      popper-append-to-body
      class="plus-sidebar__item-sub"
    >
      <template #title>
        <!-- 自定义显示 -->
        <component
          :is="subMenuItemRender"
          v-if="subMenuItemRender && isFunction(subMenuItemRender)"
          v-bind="item"
        />

        <!-- sub-menu 插槽 -->
        <slot v-else-if="$slots['sidebar-sub']" name="sidebar-sub" v-bind="item" />

        <el-icon v-else-if="item.meta && item.meta.icon" class="plus-sidebar__item-icon">
          <component :is="item.meta.icon" v-bind="item" />
        </el-icon>

        <span class="plus-sidebar__item-title">
          <component
            :is="titleRender"
            v-if="titleRender && isFunction(titleRender)"
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
      />
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import type { VNode } from 'vue'
import type { PlusRouteRecordRaw } from '@plus-pro-components/types'
import { ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'
import { useRouter } from 'vue-router'
import { isUrl, isFunction } from '@plus-pro-components/components/utils'

export interface PlusSidebarItemProps {
  item: PlusRouteRecordRaw
  collapse?: boolean
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
}

defineOptions({
  name: 'PlusSidebarItem'
})

withDefaults(defineProps<PlusSidebarItemProps>(), {
  collapse: false,
  menuItemRender: undefined,
  subMenuItemRender: undefined,
  titleRender: undefined
})

const router = useRouter()

const resolveMenuItem = (item: PlusRouteRecordRaw) => {
  // 没有子路由的情况
  if (!item.children?.length) return true

  const children = item.children.filter(i => i.meta?.hiddenMenu === true)
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
    router.push(getIndex(item))
  }
}
</script>
