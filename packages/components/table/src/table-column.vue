<template>
  <template v-for="(item, index) in columns" :key="item.prop">
    <el-table-column
      class-name="plus-table-column"
      :prop="item.prop"
      :width="item.width"
      :min-width="item.minWidth"
      v-bind="item.tableColumnProps"
    >
      <template #header>
        <span class="plus-table-column__header">
          {{ item.label }}
          <el-tooltip v-if="item.tooltip" placement="top" v-bind="getTooltip(item.tooltip)">
            <el-icon class="plus-table-column__header__icon" :size="16"><QuestionFilled /></el-icon>
          </el-tooltip>
        </span>
      </template>

      <template #default="{ row, column, $index }">
        <PlusDisplayItem
          ref="plusDisplayItemInstance"
          :column="columns[index]"
          :row="row"
          :index="$index"
          @change="data => handleChange(data, $index, column, item)"
        />
      </template>
    </el-table-column>
  </template>
</template>

<script lang="ts" setup>
import { PlusDisplayItem } from '@plus-pro-components/components/display-item'
import type { PlusDisplayItemInstance } from '@plus-pro-components/components/display-item'
import type { PlusColumn } from '@plus-pro-components/types'
import { isString, isPlainObject } from '@plus-pro-components/utils'
import { TableFormRefInjectionKey } from '@plus-pro-components/constants'
import { QuestionFilled } from '@element-plus/icons-vue'
import type { Ref } from 'vue'
import { shallowRef, inject, watch } from 'vue'

export interface PlusTableTableColumnProps {
  columns?: PlusColumn[]
}
export interface PlusTableTableColumnEmits {
  (e: 'formChange', data: { value: any; prop: string; row: any; index: number; column: any }): void
}

defineOptions({
  name: 'PlusTableTableColumn'
})

withDefaults(defineProps<PlusTableTableColumnProps>(), {
  columns: () => []
})
const emit = defineEmits<PlusTableTableColumnEmits>()

const plusDisplayItemInstance = shallowRef()
const formRef = inject(TableFormRefInjectionKey) as Ref<any>

watch(plusDisplayItemInstance, (event: PlusDisplayItemInstance[]) => {
  const data: any = {}
  const list: any[] = event?.map(item => ({ ...item, ...item?.getDisplayItemInstance() })) || []
  list.forEach(item => {
    if (!data[item.index]) {
      data[item.index] = []
    }
    data[item.index].push(item)
  })

  formRef.value = data
})

const getTooltip = (tooltip: PlusColumn['tooltip']) => {
  if (isString(tooltip)) {
    return {
      content: tooltip
    }
  }
  if (isPlainObject(tooltip)) {
    return tooltip
  }
}

// 表单发生变化
const handleChange = (
  data: { value: any; prop: string; row: any },
  index: number,
  column: any,
  item: any
) => {
  emit('formChange', { ...data, index, column: { ...column, ...item } })
}

defineExpose({
  plusDisplayItemInstance
})
</script>
