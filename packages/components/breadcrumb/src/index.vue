<template>
  <el-breadcrumb v-bind="$attrs" class="plus-breadcrumb">
    <el-breadcrumb-item
      v-for="item in breadcrumbList"
      :key="item.path"
      class="plus-breadcrumb-item"
      :to="item.redirect as string || item.path"
      :replace="replace"
    >
      <component :is="renderTitle" v-if="renderTitle && isFunction(renderTitle)" v-bind="item" />

      <!-- 面包屑title 插槽 -->
      <slot
        v-else-if="$slots['breadcrumb-item-title']"
        name="breadcrumb-item-title"
        v-bind="item"
      />

      <template v-else>
        {{ item.meta?.title || item.name || item.path }}
      </template>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import type { VNode } from 'vue'
import { ref, getCurrentInstance, watchEffect, computed } from 'vue'
import type { RouteLocationMatched, RouteLocationNormalizedLoaded } from 'vue-router'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { isFunction } from '@plus-pro-components/components/utils'
import type { PlusRouteRecordRaw } from '@plus-pro-components/types'

export interface PlusBreadcrumbProps {
  routes?: PlusRouteRecordRaw[]
  replace?: boolean
  // eslint-disable-next-line vue/require-default-prop
  renderTitle?: (route: PlusRouteRecordRaw) => VNode | string
}

defineOptions({
  name: 'PlusBreadcrumb'
})

const props = withDefaults(defineProps<PlusBreadcrumbProps>(), {
  replace: false,
  routes: () => []
})

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const instance = getCurrentInstance()!
const route = computed(
  () => instance.appContext.config.globalProperties.$route as RouteLocationNormalizedLoaded
)
const breadcrumbList = ref<RouteLocationMatched[]>([])

watchEffect(() => {
  const breadcrumb = props.routes?.length
    ? (props.routes as unknown as RouteLocationMatched[])
    : route.value
    ? route.value.matched
    : []
  breadcrumbList.value = breadcrumb.filter(item => item.meta?.hideInBreadcrumb !== true)
})
</script>
