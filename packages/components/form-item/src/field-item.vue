<template>
  <component
    :is="() => renderFormItem && renderFormItem(props, handleChange, formItemInstance)"
    v-if="renderFormItem && isFunction(renderFormItem)"
    v-bind="customFieldProps"
  />

  <el-autocomplete
    v-else-if="valueType === 'autocomplete'"
    v-model="state"
    :placeholder="'请输入' + label"
    class="plus-form-item-field"
    v-bind="customFieldProps"
    @change="handleChange"
  />

  <el-cascader
    v-else-if="valueType === 'cascader'"
    v-model="state"
    :placeholder="'请选择' + label"
    class="plus-form-item-field"
    :options="options"
    v-bind="customFieldProps"
    @change="handleChange"
  />

  <el-checkbox-group
    v-else-if="valueType === 'checkbox'"
    v-model="state"
    :placeholder="'请选择' + label"
    class="plus-form-item-field"
    clearable
    v-bind="customFieldProps"
    @change="handleChange"
  >
    <el-checkbox
      v-for="item in options"
      :key="item.label"
      :label="item.value"
      v-bind="item.fieldItemProps"
    >
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>

  <el-color-picker
    v-else-if="valueType === 'color-picker'"
    v-model="state"
    :placeholder="'请选择' + label"
    class="plus-form-item-field"
    v-bind="customFieldProps"
    @change="handleChange"
  />

  <el-date-picker
    v-else-if="valueType === 'date-picker'"
    v-model="state"
    :placeholder="'请选择' + label"
    start-placeholder="请选择开始日期"
    end-placeholder="请结束开始日期"
    class="plus-form-item-field"
    format="YYYY-MM-DD HH:mm:ss"
    type="datetime"
    value-format="YYYY-MM-DD HH:mm:ss"
    v-bind="customFieldProps"
    @change="handleChange"
  />

  <el-input-number
    v-else-if="valueType === 'input-number'"
    v-model="state"
    class="plus-form-item-field"
    :placeholder="'请输入' + label"
    autocomplete="off"
    clearable
    v-bind="customFieldProps"
    @change="handleChange"
  />

  <el-radio-group
    v-else-if="valueType === 'radio'"
    v-model="state"
    :placeholder="'请选择' + label"
    class="plus-form-item-field"
    clearable
    v-bind="customFieldProps"
    @change="handleChange"
  >
    <el-radio
      v-for="item in options"
      :key="item.label"
      :label="item.label"
      :value="item.value"
      v-bind="item.fieldItemProps"
    >
      {{ item.label }}
    </el-radio>
  </el-radio-group>

  <el-rate
    v-else-if="valueType === 'rate'"
    v-model="state"
    class="plus-form-item-field"
    v-bind="customFieldProps"
    @change="handleChange"
  />

  <el-select
    v-else-if="valueType === 'select'"
    v-model="state"
    :placeholder="'请选择' + label"
    class="plus-form-item-field"
    clearable
    v-bind="customFieldProps"
    @change="handleChange"
  >
    <el-option
      v-for="item in options"
      :key="item.label"
      :label="item.label"
      :value="item.value"
      v-bind="item.fieldItemProps"
    />
  </el-select>

  <el-slider
    v-else-if="valueType === 'slider'"
    v-model="state"
    class="plus-form-item-field"
    v-bind="customFieldProps"
    @change="handleChange"
  />

  <el-switch
    v-else-if="valueType === 'switch'"
    v-model="state"
    class="plus-form-item-field"
    v-bind="customFieldProps"
    @change="handleChange"
  />

  <el-time-select
    v-else-if="valueType === 'time-select'"
    v-model="state"
    class="plus-form-item-field"
    v-bind="customFieldProps"
    @change="handleChange"
  />

  <el-input
    v-else-if="valueType === 'textarea'"
    v-model="state"
    type="textarea"
    class="plus-form-item-field"
    :placeholder="'请输入' + label"
    autocomplete="off"
    clearable
    v-bind="customFieldProps"
    @change="handleChange"
  />

  <el-input
    v-else
    v-model="state"
    :placeholder="'请输入' + label"
    autocomplete="off"
    clearable
    v-bind="customFieldProps"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { isFunction } from '@plus-pro-components/utils'
import type { PlusColumn } from '@plus-pro-components/types'
import { useGetOptions, useGetCustomProps } from '@plus-pro-components/hooks'
import type { ValueType } from './type'

export interface PlusFormItemProps {
  modelValue?: ValueType
  label?: PlusColumn['label']
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
  name: 'PlusFormFieldItem',
  inheritAttrs: false
})

const formItemInstance = ref()

const props = withDefaults(defineProps<PlusFormItemProps>(), {
  modelValue: '',
  label: '',
  prop: '',
  hideInForm: false,
  formItemProps: () => ({}),
  fieldProps: () => ({}),
  options: () => []
})

const emit = defineEmits<PlusFormItemEmits>()

const state = ref<ValueType>()

const options = useGetOptions(props)
const customFieldProps = useGetCustomProps(props.fieldProps, state, props)

const range = ['datetimerange', 'daterange', 'monthrange']

const isArrayValue = () => {
  if (props.valueType === 'checkbox') {
    return true
  }
  if (props.valueType === 'select' && customFieldProps.value?.multiple) {
    return true
  }
  if (props.valueType === 'date-picker' && range.includes(customFieldProps.value?.type)) {
    return true
  }
  if (props.valueType === 'cascader' && customFieldProps.value?.multiple) {
    return true
  }

  return false
}

const isNumberValue = () => {
  const list = ['rate', 'input-number']
  if (list.includes(props.valueType as string)) {
    return true
  }
  return false
}

const setValue = (val: any) => {
  if (isArrayValue()) {
    state.value = Array.isArray(val) ? val : []
  } else if (isNumberValue()) {
    state.value = Number(val)
  } else if (props.valueType === 'switch') {
    state.value = Boolean(val)
  } else {
    state.value = val
  }
}

watch(
  () => props.modelValue,
  val => {
    setValue(val)
  },
  {
    immediate: true
  }
)

const handleChange = (val: ValueType) => {
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style lang="scss">
.plus-form-item-field {
  width: 100%;
}
</style>
