<template>
  <el-breadcrumb v-bind="$attrs" class="plus-breadcrumb">
    <el-breadcrumb-item
      v-for="item in breadcrumbList"
      :key="item.path"
      class="plus-breadcrumb-item"
      :to="item.redirect as string || item.path"
      :replace="replace"
    >
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { RouteLocationMatched } from 'vue-router'
import { useRoute } from 'vue-router'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'

export interface PlusBreadcrumbProps {
  replace?: boolean
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
  breadcrumbList.value = route.matched.filter(
    item => item.meta && item.meta.title && item.meta.hiddenBreadcrumb !== true
  )
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
