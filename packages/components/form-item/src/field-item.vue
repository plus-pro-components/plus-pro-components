<template>
  <component
    :is="() => renderFormFieldItem && renderFormFieldItem(state, handleChange, props)"
    v-if="renderFormFieldItem && isFunction(renderFormFieldItem)"
    v-bind="customFieldProps"
  />

  <el-autocomplete
    v-else-if="valueType === 'autocomplete'"
    v-model="state"
    :placeholder="t('plus.field.pleaseEnter') + label"
    class="plus-form-item-field"
    v-bind="customFieldProps"
    @change="handleChange"
  />

  <el-cascader
    v-else-if="valueType === 'cascader'"
    v-model="state"
    :placeholder="t('plus.field.pleaseSelect') + label"
    class="plus-form-item-field"
    :options="options"
    v-bind="customFieldProps"
    @change="handleChange"
  />

  <el-checkbox-group
    v-else-if="valueType === 'checkbox'"
    v-model="state"
    :placeholder="t('plus.field.pleaseSelect') + label"
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
    :placeholder="t('plus.field.pleaseSelect') + label"
    class="plus-form-item-field"
    v-bind="customFieldProps"
    @change="handleChange"
  />

  <el-date-picker
    v-else-if="valueType === 'date-picker'"
    v-model="state"
    :placeholder="t('plus.field.pleaseSelect') + label"
    :start-placeholder="t('plus.datepicker.startPlaceholder')"
    :end-placeholder="t('plus.datepicker.endPlaceholder')"
    class="plus-form-item-field"
    format="YYYY-MM-DD HH:mm:ss"
    type="datetime"
    value-format="YYYY-MM-DD HH:mm:ss"
    v-bind="customFieldProps"
    @change="handleChange"
  />

  <PlusDatePicker
    v-else-if="valueType === 'plus-date-picker'"
    v-model="state"
    v-bind="customFieldProps"
    @change="handleChange"
  />

  <el-input-number
    v-else-if="valueType === 'input-number'"
    v-model="state"
    class="plus-form-item-field"
    :placeholder="t('plus.field.pleaseEnter') + label"
    autocomplete="off"
    clearable
    v-bind="customFieldProps"
    @change="handleChange"
  />

  <el-radio-group
    v-else-if="valueType === 'radio'"
    v-model="state"
    :placeholder="t('plus.field.pleaseSelect') + label"
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

  <PlusRadio
    v-else-if="valueType === 'plus-radio'"
    v-model="state"
    :data="options"
    is-cancel
    v-bind="customFieldProps"
    @change="handleChange"
  />

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
    :placeholder="t('plus.field.pleaseSelect') + label"
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
    :placeholder="t('plus.field.pleaseEnter') + label"
    autocomplete="off"
    clearable
    v-bind="customFieldProps"
    @change="handleChange"
  />

  <el-input
    v-else
    v-model="state"
    :placeholder="t('plus.field.pleaseEnter') + label"
    autocomplete="off"
    clearable
    v-bind="customFieldProps"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { isFunction, getCustomProps, isDate, isArray } from '@plus-pro-components/utils'
import type { PlusColumn, FieldValueType } from '@plus-pro-components/types'
import { useGetOptions, useLocale } from '@plus-pro-components/hooks'
import PlusDatePicker from '@plus-pro-components/components/date-picker'
import PlusRadio from '@plus-pro-components/components/radio'

export interface PlusFormFieldItemProps {
  modelValue?: FieldValueType
  label?: PlusColumn['label']
  prop: PlusColumn['prop']
  fieldProps?: PlusColumn['fieldProps']
  // eslint-disable-next-line vue/require-default-prop
  valueType?: PlusColumn['valueType']
  options?: PlusColumn['options']
  hideInForm?: PlusColumn['hideInForm']
  formItemProps?: PlusColumn['formItemProps']
  // eslint-disable-next-line vue/require-default-prop
  renderFormFieldItem?: PlusColumn['renderFormFieldItem']
  index?: number
}

export interface PlusFormFieldItemEmits {
  (e: 'update:modelValue', data: FieldValueType): void
  (e: 'change', data: FieldValueType): void
}

defineOptions({
  name: 'PlusFormFieldItem',
  inheritAttrs: false
})

const props = withDefaults(defineProps<PlusFormFieldItemProps>(), {
  modelValue: '',
  label: '',
  prop: '',
  hideInForm: false,
  formItemProps: () => ({}),
  fieldProps: () => ({}),
  options: () => [],
  index: 0
})

const emit = defineEmits<PlusFormFieldItemEmits>()
const { t } = useLocale()
const state = ref<FieldValueType>()

const options = useGetOptions(props)

const customFieldProps = ref<any>({})

watch(
  () => props.fieldProps,
  val => {
    getCustomProps(val, state.value, props, props.index)
      .then(data => {
        customFieldProps.value = data
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
    if (isArray(val)) {
      const [start, end] = val

      if (isDate(start) || isDate(end)) {
        state.value = [String(start), String(end)]
      } else {
        state.value = val
      }
    } else {
      state.value = []
    }
  } else if (isNumberValue()) {
    state.value = Number(val)
  } else if (props.valueType === 'switch') {
    state.value = Boolean(val)
  } else if (isDate(val)) {
    state.value = String(val)
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

const handleChange = (val: FieldValueType) => {
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style lang="scss">
.plus-form-item-field {
  width: 100%;
}
</style>
