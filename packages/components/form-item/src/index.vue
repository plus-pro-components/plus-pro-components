<template>
  <el-form-item
    v-if="hideInForm !== true"
    v-bind="customFormItemProps"
    ref="formItemInstance"
    :label="label"
    :prop="prop"
    class="plus-form-item"
  >
    <PlusFieldItem
      v-model="state"
      :label="props.label"
      :prop="props.prop"
      :field-props="props.fieldProps"
      :value-type="props.valueType"
      :options="props.options"
      :hide-in-form="props.hideInForm"
      :form-item-props="props.formItemProps"
      :render-form-item="props.renderFormItem"
      @change="handleChange"
    />
  </el-form-item>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn } from '@plus-pro-components/types'
import { useGetCustomProps } from '@plus-pro-components/hooks'
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
</script>

<style lang="scss">
.plus-form-item {
  width: 100%;
  .plus-form-item-field {
    width: 100%;
  }
}
</style>
