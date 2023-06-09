<template>
  <el-form-item
    v-if="hideInForm !== true"
    v-bind="customFormItemProps"
    ref="formItemInstance"
    :label="label"
    :prop="prop"
    class="plus-form-item"
  >
    <template #label="{ label: currentLabel }">
      <span class="plus-form-item__label">
        {{ currentLabel }}
        <el-tooltip v-if="tooltip" placement="top" v-bind="getTooltip(tooltip)">
          <el-icon class="plus-table-column__label__icon" :size="16"><QuestionFilled /></el-icon>
        </el-tooltip>
      </span>
    </template>

    <PlusFieldItem v-bind="props" @change="handleChange" />
  </el-form-item>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn } from '@plus-pro-components/types'
import { useGetCustomProps } from '@plus-pro-components/hooks'
import { isString, isPlainObject } from '@plus-pro-components/utils'
import { QuestionFilled } from '@element-plus/icons-vue'
import PlusFieldItem from './field-item.vue'
import type { ValueType } from './type'

export interface PlusFormItemProps {
  modelValue?: ValueType
  label: PlusColumn['label']
  prop: PlusColumn['prop']
  fieldProps?: PlusColumn['fieldProps']
  // eslint-disable-next-line vue/require-default-prop
  valueType?: PlusColumn['valueType']
  options?: PlusColumn['options']
  hideInForm?: PlusColumn['hideInForm']
  formItemProps?: PlusColumn['formItemProps']
  // eslint-disable-next-line vue/require-default-prop
  renderFormItem?: PlusColumn['renderFormItem']
  tooltip?: PlusColumn['tooltip']
}

export interface PlusFormItemEmits {
  (e: 'update:modelValue', data: ValueType): void
  (e: 'change', data: ValueType): void
}

defineOptions({
  name: 'PlusFormItem'
})

const formItemInstance = ref()

const props = withDefaults(defineProps<PlusFormItemProps>(), {
  modelValue: '',
  tooltip: '',
  hideInForm: false,
  formItemProps: () => ({}),
  fieldProps: () => ({}),
  options: () => []
})

const emit = defineEmits<PlusFormItemEmits>()

const state = ref<ValueType>(props.modelValue)

const customFormItemProps = useGetCustomProps(props.formItemProps, state, props)

const handleChange = (val: ValueType) => {
  emit('update:modelValue', val)
  emit('change', val)
}

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
</script>

<style lang="scss">
.plus-form-item {
  width: 100%;
}
.el-form-item.plus-form-item .plus-form-item-field {
  width: 100%;
}
</style>
