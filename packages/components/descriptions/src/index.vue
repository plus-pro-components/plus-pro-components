<template>
  <template v-for="rowItem in data" :key="rowItem">
    <el-descriptions
      :title="rowItem.title || ''"
      :extra="extra"
      :column="column"
      :border="border"
      :size="size"
      :direction="direction"
      class="plus-description"
    >
      <el-descriptions-item
        v-for="(items, index) in columns"
        :key="index"
        :label="items.label"
        :width="items?.width || 150"
        :min-width="items?.minWidth"
        :align="align"
        :label-align="labelAlign"
        :class-name="className || 'plus-description__name'"
        :label-class-name="labelClassName || 'plus-description__label'"
      >
        <PlusFieldItem :config-item="items" :row="rowItem" />
      </el-descriptions-item>
    </el-descriptions>
  </template>
</template>

<script lang="ts" setup>
import PlusFieldItem from '@plus-pro-components/components/field-item'
import type { TableConfigRow } from '@plus-pro-components/components/table'

export interface PlusDescriptionsProps {
  data: any
  columns?: TableConfigRow[]
  column?: number
  direction?: string
  size?: string
  border?: boolean
  align?: string
  labelAlign?: string
  className?: string
  labelClassName?: string
  extra?: string
}
export interface PlusTableTableColumnStatus {
  text: string
  color: string
}

defineOptions({
  name: 'PlusDescriptions'
})

withDefaults(defineProps<PlusDescriptionsProps>(), {
  // 数据
  descriptionsData: () => [],
  // 描述列表label
  columns: () => [],
  // 一行 Descriptions Item 的数量
  column: 3,
  // 排列的方向
  direction: 'horizontal',
  //   列表的尺寸
  size: 'default',
  // 操作区文本，显示在右上方
  extra: '',
  // 是否显示边框
  border: false,
  // 列的内容对齐方式（如无 border，对标签和内容均生效）
  align: 'left',
  // 列的标签对齐方式，若不设置该项，则使用内容的对齐方式（如无 border，请使用 align 参数）
  labelAlign: 'left',
  // 列的内容自定义类名
  className: '',
  // column label custom class name
  labelClassName: ''
})
</script>

<style lang="scss">
.plus-description {
  .plus-description__name {
    max-width: 200px;
    /**  
      内容超出宽度自动显示换行
    */
    word-wrap: break-word;
  }
  .plus-description__label {
    min-width: 80px;
  }
}
</style>
