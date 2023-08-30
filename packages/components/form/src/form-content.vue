<template>
  <el-row v-bind="rowProps">
    <el-col
      v-for="(item, index) in columns"
      :key="item.prop + index"
      v-bind="item.colProps || colProps"
    >
      <PlusFormItem
        v-model="state.values[item.prop]"
        v-bind="item"
        @change="() => handleChange(item)"
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
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import type { FormProps, RowProps, ColProps } from 'element-plus'
import { PlusFormItem } from '@plus-pro-components/components/form-item'
import type { PlusColumn, FieldValues, Mutable } from '@plus-pro-components/types'
import { getLabelSlotName, getFieldSlotName } from '@plus-pro-components/components/utils'

export interface PlusFormContentProps extends /* @vue-ignore */ Partial<Mutable<FormProps>> {
  modelValue?: FieldValues
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
  rowProps: () => ({}),
  colProps: () => ({}),
  columns: () => []
})
const emit = defineEmits<PlusFormContentEmits>()

const state = reactive<PlusFormContentState>({ values: {} })

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

const handleChange = (column: PlusColumn) => {
  emit('change', state.values, column)
  emit('update:modelValue', state.values)
}
</script>