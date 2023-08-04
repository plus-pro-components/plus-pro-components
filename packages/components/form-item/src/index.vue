<template>
  <el-form-item
    ref="formItemInstance"
    :label="label"
    :prop="prop"
    class="plus-form-item"
    v-bind="customFormItemProps"
  >
    <template #label="{ label: currentLabel }">
      <span class="plus-form-item__label">
        {{ currentLabel }}
        <el-tooltip v-if="tooltip" placement="top" v-bind="getTooltip(tooltip)">
          <el-icon class="plus-table-column__label__icon" :size="16"><QuestionFilled /></el-icon>
        </el-tooltip>
      </span>
    </template>

    <PlusFormFieldItem :key="prop" v-bind="props" @change="handleChange" />
  </el-form-item>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { PlusColumn, FieldValueType } from '@plus-pro-components/types'
import { isString, isPlainObject } from '@plus-pro-components/utils'
import { getCustomProps } from '@plus-pro-components/components/utils'
import { QuestionFilled } from '@element-plus/icons-vue'
import PlusFormFieldItem from './field-item.vue'

export interface PlusFormItemProps {
  modelValue?: FieldValueType
  label: PlusColumn['label']
  prop: PlusColumn['prop']
  fieldProps?: PlusColumn['fieldProps']
  // eslint-disable-next-line vue/require-default-prop
  valueType?: PlusColumn['valueType']
  options?: PlusColumn['options']
  hideInForm?: PlusColumn['hideInForm']
  formItemProps?: PlusColumn['formItemProps']
  // eslint-disable-next-line vue/require-default-prop
  renderFormFieldItem?: PlusColumn['renderFormFieldItem']
  tooltip?: PlusColumn['tooltip']
  slots?: PlusColumn['slots']
  index?: number
}

export interface PlusFormItemEmits {
  (e: 'update:modelValue', data: FieldValueType): void
  (e: 'change', data: FieldValueType): void
}

defineOptions({
  name: 'PlusFormItem'
})

const props = withDefaults(defineProps<PlusFormItemProps>(), {
  modelValue: '',
  tooltip: '',
  hideInForm: false,
  formItemProps: () => ({}),
  fieldProps: () => ({}),
  options: () => [],
  index: 0,
  slots: () => ({})
})
const emit = defineEmits<PlusFormItemEmits>()

const formItemInstance = ref()
const state = ref<FieldValueType>(props.modelValue)
const customFormItemProps = ref<any>({})

watch(
  () => props.formItemProps,
  val => {
    getCustomProps(val, state.value, props, props.index, 'formItemProps')
      .then(data => {
        customFormItemProps.value = data
      })
      .catch(err => {
        throw err
      })
  },
  {
    immediate: true,
    deep: true
  }
)

const handleChange = (val: FieldValueType) => {
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

defineExpose({
  formItemInstance
})
</script>
