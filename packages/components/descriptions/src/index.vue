<template>
  <el-descriptions :title="title" :column="column" class="plus-description" border v-bind="$attrs">
    <template v-for="item in columns" :key="item.label">
      <el-descriptions-item
        v-if="item.hideInDescriptions !== true"
        :label="item.label"
        :class-name="item.descriptionsItemProps?.className || 'plus-description__name'"
        :label-class-name="item.descriptionsItemProps?.labelClassName || 'plus-description__label'"
        v-bind="item.descriptionsItemProps"
      >
        <PlusDisplayItem :column="item" :row="data" />
      </el-descriptions-item>
    </template>
  </el-descriptions>
</template>

<script lang="ts" setup>
import type { ExtractPropTypes } from 'vue'
import type { descriptionProps } from 'element-plus'
import type { PlusColumn, RecordType } from '@plus-pro-components/types'
import PlusDisplayItem from '@plus-pro-components/components/display-item'

type DescriptionProps = ExtractPropTypes<typeof descriptionProps>

export interface PlusDescriptionsProps extends /* @vue-ignore */ Partial<DescriptionProps> {
  data: RecordType
  columns?: PlusColumn[]
  column?: number
  title?: string
}

export interface PlusTableTableColumnStatus {
  text: string
  color: string
}

defineOptions({
  name: 'PlusDescriptions'
})

withDefaults(defineProps<PlusDescriptionsProps>(), {
  data: () => ({}),
  columns: () => [],
  title: '',
  column: 3
})
</script>

<style lang="scss">
.plus-description {
  .plus-description__name {
    max-width: 200px;
    word-wrap: break-word;
  }
  .plus-description__label {
    min-width: 80px;
  }
}
</style>
