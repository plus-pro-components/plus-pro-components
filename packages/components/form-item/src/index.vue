<template>
  <el-form-item
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
import { ref, watch } from 'vue'
import type { PlusColumn } from '@plus-pro-components/types'
import { isString, isPlainObject, getCustomProps } from '@plus-pro-components/utils'
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
  index?: number
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
  options: () => [],
  index: 0
})

const emit = defineEmits<PlusFormItemEmits>()

const state = ref<ValueType>(props.modelValue)

const customFormItemProps = ref<any>({})

watch(
  () => props.formItemProps,
  val => {
    getCustomProps(val, state.value, props, props.index)
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

defineExpose({
  formItemInstance
})
</script>

<style lang="scss">
.plus-form-item {
  width: 100%;
  .plus-form-item__label {
    .plus-table-column__label__icon {
      vertical-align: sub;
    }
  }
}
.el-form-item.plus-form-item .plus-form-item-field {
  width: 100%;
}
</style>
