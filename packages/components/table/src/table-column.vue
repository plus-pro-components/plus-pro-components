<template>
  <template v-for="item in columns" :key="getKey(item)">
    <el-table-column
      class-name="plus-table-column"
      v-bind="item.tableColumnProps"
      :prop="item.prop"
      :width="item.width"
      :min-width="item.minWidth"
    >
      <template #header>
        <span class="plus-table-column__header">
          <PlusRender
            v-if="item.renderHeader && isFunction(item.renderHeader)"
            :render="item.renderHeader"
            :params="item"
            :callback-value="item.label"
          />

          <!--表格单元格Header的插槽 -->
          <slot
            v-else
            :name="getTableHeaderSlotName(item.prop)"
            :prop="item.prop"
            :label="item.label"
            :field-props="item.fieldProps"
            :value-type="item.valueType"
            :column="item"
          >
            {{ item.label }}
          </slot>

          <el-tooltip v-if="item.tooltip" placement="top" v-bind="getTooltip(item.tooltip)">
            <slot name="tooltip-icon">
              <el-icon class="plus-table-column__header__icon" :size="16">
                <QuestionFilled />
              </el-icon>
            </slot>
          </el-tooltip>
        </span>
      </template>

      <template #default="{ row, column, $index }">
        <PlusDisplayItem
          ref="plusDisplayItemInstance"
          :column="item"
          :row="row"
          :index="$index"
          @change="data => handleChange(data, $index, column, item)"
        >
          <!--表单单项的插槽 -->
          <template
            v-if="$slots[getFieldSlotName(item.prop)]"
            #[getFieldSlotName(item.prop)]="data"
          >
            <slot :name="getFieldSlotName(item.prop)" v-bind="data" />
          </template>

          <!-- 表单el-form-item 下一行额外的内容 的插槽 -->
          <template
            v-if="$slots[getExtraSlotName(item.prop)]"
            #[getExtraSlotName(item.prop)]="data"
          >
            <slot :name="getExtraSlotName(item.prop)" v-bind="data" />
          </template>

          <!--表格单元格的插槽 -->
          <template
            v-if="$slots[getTableCellSlotName(item.prop)]"
            #[getTableCellSlotName(item.prop)]="data"
          >
            <slot :name="getTableCellSlotName(item.prop)" v-bind="data" />
          </template>
        </PlusDisplayItem>
      </template>
    </el-table-column>
  </template>
</template>

<script lang="ts" setup>
import { PlusDisplayItem } from '@plus-pro-components/components/display-item'
import type { PlusDisplayItemInstance } from '@plus-pro-components/components/display-item'
import type { PlusColumn } from '@plus-pro-components/types'
import {
  getTooltip,
  getTableKey,
  getTableCellSlotName,
  getTableHeaderSlotName,
  getFieldSlotName,
  getExtraSlotName,
  isFunction
} from '@plus-pro-components/components/utils'
import { TableFormRefInjectionKey } from '@plus-pro-components/constants'
import { QuestionFilled } from '@element-plus/icons-vue'
import type { Ref } from 'vue'
import { shallowRef, inject, watch } from 'vue'
import { PlusRender } from '@plus-pro-components/components/render'
import { ElTableColumn, ElTooltip, ElIcon } from 'element-plus'

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

/**
 *  表单ref处理
 */
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

/**
 * 获取key
 * @param item
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const getKey = (item: PlusColumn) => getTableKey(item, true)

/**
 * 表单发生变化
 * @param data
 * @param index
 * @param column
 * @param item
 */
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
