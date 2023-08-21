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

    <component
      :is="render"
      v-if="renderField && isFunction(renderField)"
      v-model="state"
      class="plus-form-item-field"
      v-bind="customFieldProps"
    />

    <el-autocomplete
      v-else-if="valueType === 'autocomplete'"
      v-model="state"
      :placeholder="t('plus.field.pleaseEnter') + label"
      class="plus-form-item-field"
      v-bind="customFieldProps"
      @change="handleChange"
      @select="handleSelect"
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
      class="plus-form-item-field"
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
        :label="item.value"
        v-bind="item.fieldItemProps"
      >
        {{ item.label }}
      </el-radio>
    </el-radio-group>

    <PlusRadio
      v-else-if="valueType === 'plus-radio'"
      v-model="state"
      class="plus-form-item-field"
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

    <el-time-picker
      v-else-if="valueType === 'time-picker'"
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
      class="plus-form-item-field"
      :placeholder="t('plus.field.pleaseEnter') + label"
      autocomplete="off"
      clearable
      v-bind="customFieldProps"
      @change="handleChange"
    />
  </el-form-item>
</template>

<script lang="ts" setup>
import { ref, watch, isVNode, h, computed } from 'vue'
import type { VNode, Component } from 'vue'
import type { PlusColumn, FieldValueType } from '@plus-pro-components/types'
import { isString, isFunction, isDate, isArray, isComponent } from '@plus-pro-components/utils'
import { getTooltip, getCustomProps, handleSlots } from '@plus-pro-components/components/utils'
import { QuestionFilled } from '@element-plus/icons-vue'
import { useGetOptions, useLocale } from '@plus-pro-components/hooks'
import { PlusRadio, PlusDatePicker } from '@plus-pro-components/components'

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
  renderField?: PlusColumn['renderField']
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

const { t } = useLocale()
const options = useGetOptions(props)
const formItemInstance = ref()
const customFormItemProps = ref<any>({})
const customFieldProps = ref<any>({})
const state = ref<FieldValueType>()
const range = ['datetimerange', 'daterange', 'monthrange']

/**
 * 默认值是数组的情况
 */
const isArrayValue = computed(() => {
  if (props.valueType === 'checkbox') {
    return true
  }
  if (props.valueType === 'plus-date-picker') {
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
})

/**
 * 默认值是数字的情况
 */
const isNumberValue = computed(() => {
  const list = ['rate', 'input-number', 'slider']
  if (list.includes(props.valueType as string)) {
    return true
  }
  return false
})

/**
 * 设置表单值（默认值）
 * @param val
 */
const setValue = (val: any) => {
  if (isArrayValue.value) {
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
  } else if (isNumberValue.value) {
    state.value = Number(val)
  } else if (props.valueType === 'switch') {
    state.value = Boolean(val)
  } else if (isDate(val)) {
    state.value = String(val)
  } else {
    state.value = val
  }
}

/**
 * 监听formItemProps
 */
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

/**
 * 监听fieldPropss
 */
watch(
  () => props.fieldProps,
  val => {
    getCustomProps(val, state.value, props, props.index, 'fieldProps')
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

watch(
  () => props.modelValue,
  val => {
    setValue(val)
  },
  {
    flush: 'post',
    immediate: true
  }
)

const handleChange = (val: FieldValueType) => {
  emit('update:modelValue', val)
  emit('change', val)
}

/**
 * el-autocomplete 特殊处理
 * @param param0
 */
const handleSelect = ({ value }: any) => {
  handleChange(value)
}

/**
 * 渲染自定义表单
 */
const render = () => {
  if (!props.renderField) return
  const value = state.value
  const params = { ...props }
  const dynamicComponent = props.renderField(value, handleChange, params)
  const slots = handleSlots(props.slots, value, params)
  /** string */
  if (isString(dynamicComponent)) {
    return h(dynamicComponent as string, { ...customFieldProps.value }, slots)
  }
  /** Component */
  if (isComponent(dynamicComponent)) {
    return h(
      dynamicComponent as Component,
      { ...customFieldProps.value, modelValue: state.value, onChange: handleChange },
      slots
    )
  }
  /** VNode */
  if (isVNode(dynamicComponent)) {
    return {
      ...dynamicComponent,
      props: {
        ...customFieldProps.value,
        ...dynamicComponent.props,
        modelValue: state.value
      }
    } as VNode
  }
}

defineExpose({
  formItemInstance
})
</script>
