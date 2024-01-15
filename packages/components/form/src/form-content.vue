<template>
  <el-row v-bind="rowProps">
    <el-col v-for="item in columns" :key="item.prop" v-bind="item.colProps || colProps">
      <PlusFormItem
        v-model="state.values[item.prop]"
        v-bind="item"
        :has-label="getHasLabel(item.hasLabel)"
        :label-width="getHasLabel(item.hasLabel) ? item.labelWidth : '0px'"
        @change="(value: any) => handleChange(value, item)"
      >
        <!--表单项label插槽 -->
        <template v-if="$slots[getLabelSlotName(item.prop)]" #[getLabelSlotName(item.prop)]="data">
          <slot :name="getLabelSlotName(item.prop)" v-bind="data" />
        </template>

        <!--表单项插槽 -->
        <template v-if="$slots[getFieldSlotName(item.prop)]" #[getFieldSlotName(item.prop)]="data">
          <slot :name="getFieldSlotName(item.prop)" v-bind="data" />
        </template>
      </PlusFormItem>

      <!-- el-form-item 下一行额外的内容 -->
      <div
        v-if="item.renderExtra || $slots[getExtraSlotName(item.prop)]"
        class="plus-form-item-extra"
      >
        <component
          :is="item.renderExtra"
          v-if="item.renderExtra && isFunction(item.renderExtra)"
          v-bind="item"
        />

        <slot
          v-else-if="$slots[getExtraSlotName(item.prop)]"
          :name="getExtraSlotName(item.prop)"
          v-bind="item"
        />
      </div>
    </el-col>

    <!-- 搜索的footer插槽  -->
    <el-col v-if="$slots['search-footer']" v-bind="colProps">
      <slot name="search-footer" />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import type { Ref, ComputedRef } from 'vue'
import { reactive, watch, unref } from 'vue'
import type { FormProps, RowProps, ColProps } from 'element-plus'
import { ElRow, ElCol } from 'element-plus'
import { PlusFormItem } from '@plus-pro-components/components/form-item'
import type { PlusColumn, FieldValues, FieldValueType, Mutable } from '@plus-pro-components/types'
import {
  getLabelSlotName,
  getFieldSlotName,
  getExtraSlotName,
  isFunction
} from '@plus-pro-components/components/utils'

export interface PlusFormContentProps extends /* @vue-ignore */ Partial<Mutable<FormProps>> {
  modelValue?: FieldValues
  hasLabel?: boolean
  columns?: PlusColumn[]
  rowProps?: Partial<Mutable<RowProps>>
  colProps?: Partial<Mutable<ColProps>>
}
export interface PlusFormContentState {
  values: FieldValues
}
export interface PlusFormContentEmits {
  (e: 'update:modelValue', values: FieldValues): void
  (e: 'change', values: FieldValues, column: PlusColumn): void
}

defineOptions({
  name: 'PlusFormContent'
})

const props = withDefaults(defineProps<PlusFormContentProps>(), {
  modelValue: () => ({}),
  hasLabel: true,
  rowProps: () => ({}),
  colProps: () => ({}),
  columns: () => []
})
const emit = defineEmits<PlusFormContentEmits>()

const state = reactive<PlusFormContentState>({ values: {} })

const getHasLabel = (hasLabel?: boolean | Ref<boolean> | ComputedRef<boolean>) => {
  const has = unref(hasLabel) as boolean
  if (has !== undefined && has !== null) {
    return has
  }
  return props.hasLabel
}

watch(
  () => props.modelValue,
  val => {
    state.values = val
  },
  {
    deep: true,
    immediate: true
  }
)

const handleChange = (value: FieldValueType, column: PlusColumn) => {
  emit('change', state.values, column)
  emit('update:modelValue', state.values)
}
</script>
