<template>
  <el-form-item :label="label" :prop="prop" v-bind="formItemProps" class="plus-form-item">
    <el-autocomplete
      v-if="valueType === 'autocomplete'"
      v-model="state"
      class="plus-form-item-field"
      v-bind="fieldProps"
      @change="handleChange"
    />

    <el-cascader
      v-else-if="valueType === 'cascader'"
      v-model="state"
      class="plus-form-item-field"
      v-bind="fieldProps"
      @change="handleChange"
    />

    <el-checkbox-group
      v-if="valueType === 'checkbox'"
      v-model="state"
      :placeholder="'请选择' + label"
      class="plus-form-item-field"
      clearable
      v-bind="fieldProps"
      @change="handleChange"
    >
      <el-checkbox
        v-for="item in getOptions()"
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
      v-bind="fieldProps"
      @change="handleChange"
    />

    <el-date-picker
      v-else-if="valueType === 'date-picker'"
      v-model="state"
      class="plus-form-item-field"
      format="YYYY-MM-DD HH:mm:ss"
      value-format="YYYY-MM-DD HH:mm:ss"
      v-bind="fieldProps"
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
      v-bind="fieldProps"
      @change="handleChange"
    />

    <el-radio-group
      v-else-if="valueType === 'radio'"
      v-model="state"
      :placeholder="'请选择' + label"
      class="plus-form-item-field"
      clearable
      v-bind="fieldProps"
      @change="handleChange"
    >
      <el-radio
        v-for="item in getOptions()"
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
      v-bind="fieldProps"
      @change="handleChange"
    />

    <el-select
      v-else-if="valueType === 'select'"
      v-model="state"
      :placeholder="'请选择' + label"
      class="plus-form-item-field"
      clearable
      v-bind="fieldProps"
      @change="handleChange"
    >
      <el-option
        v-for="item in getOptions()"
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
      v-bind="fieldProps"
      @change="handleChange"
    />

    <el-switch
      v-else-if="valueType === 'switch'"
      v-model="state"
      class="plus-form-item-field"
      v-bind="fieldProps"
      @change="handleChange"
    />

    <el-time-select
      v-else-if="valueType === 'time-select'"
      v-model="state"
      class="plus-form-item-field"
      v-bind="fieldProps"
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
      v-bind="fieldProps"
      @change="handleChange"
    />

    <component
      :is="() => renderFormItem && renderFormItem(props)"
      v-else-if="valueType === 'custom'"
      v-model="state"
      v-bind="fieldProps"
      @change="handleChange"
    />

    <el-input
      v-else
      v-model="state"
      :placeholder="'请输入' + label"
      autocomplete="off"
      clearable
      v-bind="fieldProps"
      @change="handleChange"
    />
  </el-form-item>
</template>

<script lang="ts" setup>
import type { VNode } from 'vue'
import { ref, watch } from 'vue'
// eslint-disable-next-line vue/prefer-import-from-vue
import { isPromise, isFunction } from '@vue/shared'
import type { OptionsRow } from '@plus-pro-components/types'

type ValueType = string | number | string[]

export interface PlusFormItemProps {
  modelValue: ValueType
  label: string
  prop: string
  valueType: string
  formItemProps?: any
  fieldProps?: any
  options?:
    | OptionsRow[]
    | ((props?: PlusFormItemProps, item?: OptionsRow) => OptionsRow[])
    | ((props?: PlusFormItemProps, item?: OptionsRow) => Promise<OptionsRow[]>)
  // eslint-disable-next-line vue/require-default-prop
  renderFormItem?: (props?: PlusFormItemProps) => VNode
}

export interface PlusFormItemEmits {
  (e: 'update:modelValue', data: ValueType): void
  (e: 'change', data: ValueType): void
}

defineOptions({
  name: 'PlusFormItem'
})

const props = withDefaults(defineProps<PlusFormItemProps>(), {
  modelValue: '',
  formItemProps: () => ({}),
  fieldProps: () => ({}),
  options: () => []
})

const emit = defineEmits<PlusFormItemEmits>()

const state = ref<ValueType>()

const range = ['datetimerange', 'daterange', 'monthrange']

const isArrayValue = () => {
  if (props.valueType === 'checkbox') {
    return true
  }
  if (props.valueType === 'select' && props.fieldProps?.multiple) {
    return true
  }
  if (props.valueType === 'date-picker' && range.includes(props.fieldProps?.type)) {
    return true
  }
  if (props.valueType === 'cascader' && props.fieldProps?.props?.multiple) {
    return true
  }

  return false
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//  @ts-ignore
const getOptions = async (): OptionsRow[] => {
  if (isPromise(props.options)) {
    return await (props.options as any)(props)
  } else if (isFunction(props.options)) {
    return props.options(props)
  }
  return props.options
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
