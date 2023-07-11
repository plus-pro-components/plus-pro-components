<template>
  <el-form-item
    v-if="hideInForm !== true"
    v-bind="customFormItemProps"
    ref="formItemInstance"
    :label="label"
    :prop="prop"
    class="plus-form-item"
  >
    <component
      :is="() => renderFormItem && renderFormItem(props, formItemInstance)"
      v-if="renderFormItem && isFunction(renderFormItem)"
      v-model="state"
      v-bind="customFieldProps"
      @change="handleChange"
    />

    <el-autocomplete
      v-else-if="valueType === 'autocomplete'"
      v-model="state"
      class="plus-form-item-field"
      v-bind="customFieldProps"
      @change="handleChange"
    />

    <el-cascader
      v-else-if="valueType === 'cascader'"
      v-model="state"
      class="plus-form-item-field"
      v-bind="customFieldProps"
      @change="handleChange"
    />

    <el-checkbox-group
      v-if="valueType === 'checkbox'"
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
      class="plus-form-item-field"
      v-bind="customFieldProps"
      @change="handleChange"
    />

    <el-date-picker
      v-else-if="valueType === 'date-picker'"
      v-model="state"
      class="plus-form-item-field"
      format="YYYY-MM-DD HH:mm:ss"
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
      :value-on-clear="null"
      :precision="2"
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
        {{ item.value }}
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
  </el-form-item>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { isFunction } from '@plus-pro-components/utils'
import type { PlusColumn } from '@plus-pro-components/types'
import { useGetOptions, useGetCustomProps } from '@plus-pro-components/hooks'

type ValueType = string | number | string[]

export interface PlusFormItemProps {
  modelValue: ValueType
  label: PlusColumn['label']
  prop: PlusColumn['prop']
  fieldProps: PlusColumn['fieldProps']
  valueType: PlusColumn['valueType']
  options: PlusColumn['options']
  hideInForm: PlusColumn['hideInForm']
  formItemProps: PlusColumn['formItemProps']
  renderFormItem: PlusColumn['renderFormItem']
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

const state = ref<ValueType>()

const options = useGetOptions(props)
const customFieldProps = useGetCustomProps(props.fieldProps, state, props)
const customFormItemProps = useGetCustomProps(props.formItemProps, state, props)

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

watch(
  () => props.modelValue,
  val => {
    if (isArrayValue()) {
      state.value = Array.isArray(val) ? val : []
    } else {
      state.value = val
    }
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
.plus-form-item {
  width: 100%;
  .plus-form-item-field {
    width: 100%;
  }
}
</style>
