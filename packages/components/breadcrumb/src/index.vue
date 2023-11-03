<template>
  <el-breadcrumb v-bind="$attrs" class="plus-breadcrumb">
    <el-breadcrumb-item
      v-for="item in breadcrumbList"
      :key="item.path"
      class="plus-breadcrumb-item"
      :to="item.redirect as string || item.path"
      :replace="replace"
    >
      <component :is="titleRender" v-if="titleRender && isFunction(titleRender)" v-bind="item" />

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
import { ref, watch } from 'vue'
import type { RouteLocationMatched } from 'vue-router'
import { useRoute } from 'vue-router'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { isFunction } from '@plus-pro-components/components/utils'

export interface PlusBreadcrumbProps {
  replace?: boolean
  // eslint-disable-next-line vue/require-default-prop
  titleRender?: () => VNode
}

defineOptions({
  name: 'PlusBreadcrumb'
})

withDefaults(defineProps<PlusBreadcrumbProps>(), {
  replace: false
})

const route = useRoute()
const breadcrumbList = ref<RouteLocationMatched[]>([])

const getBreadcrumb = () => {
  breadcrumbList.value = route.matched.filter(item => item.meta.hiddenBreadcrumb !== true)
}

watch(
  () => route.path,
  () => {
    getBreadcrumb()
  },
  {
    immediate: true
  }
)
</script>
