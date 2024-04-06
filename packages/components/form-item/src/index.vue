<template>
  <el-form-item
    ref="formItemInstance"
    :label="hasLabel ? label : ''"
    :prop="prop"
    class="plus-form-item"
    v-bind="customFormItemProps"
  >
    <template v-if="hasLabel" #label="{ label: currentLabel }">
      <span class="plus-form-item__label">
        <template v-if="renderLabel && isFunction(renderLabel)">
          <PlusRender
            v-if="valueIsReady"
            :render="renderLabel"
            :params="props"
            :callback-value="currentLabel"
            :custom-field-props="customFieldProps"
          />
        </template>

        <slot
          v-else
          :name="getLabelSlotName(prop)"
          :prop="prop"
          :label="label"
          :field-props="customFieldProps"
          :value-type="valueType"
          :column="props"
        >
          {{ currentLabel }}
        </slot>

        <el-tooltip v-if="tooltip" placement="top" v-bind="getTooltip(tooltip)">
          <slot name="tooltip-icon">
            <el-icon class="plus-table-column__label__icon" :size="16"><QuestionFilled /></el-icon>
          </slot>
        </el-tooltip>
      </span>
    </template>

    <template v-if="renderField && isFunction(renderField)">
      <PlusRender
        v-if="valueIsReady"
        :render="renderField"
        :params="props"
        :callback-value="state"
        :custom-field-props="customFieldProps"
        render-type="form"
        :handle-change="handleChange"
      />
    </template>

    <slot
      v-else-if="$slots[getFieldSlotName(prop)]"
      :name="getFieldSlotName(prop)"
      :prop="prop"
      :label="label"
      :field-props="customFieldProps"
      :value-type="valueType"
      :column="props"
    />

    <el-autocomplete
      v-else-if="valueType === 'autocomplete'"
      ref="fieldInstance"
      v-model="state"
      :placeholder="t('plus.field.pleaseEnter') + label"
      class="plus-form-item-field"
      clearable
      v-bind="customFieldProps"
      @change="handleChange"
      @select="handleSelect"
    >
      <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
        <component :is="fieldSlot" v-bind="data" />
      </template>
    </el-autocomplete>

    <el-cascader
      v-else-if="valueType === 'cascader'"
      ref="fieldInstance"
      v-model="state"
      :placeholder="t('plus.field.pleaseSelect') + label"
      class="plus-form-item-field"
      :options="customOptions"
      clearable
      v-bind="customFieldProps"
      @change="handleChange"
    >
      <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
        <component :is="fieldSlot" v-bind="data" />
      </template>
    </el-cascader>

    <el-checkbox-group
      v-else-if="valueType === 'checkbox'"
      ref="fieldInstance"
      v-model="state"
      :placeholder="t('plus.field.pleaseSelect') + label"
      class="plus-form-item-field"
      v-bind="customFieldProps"
      @change="handleChange"
    >
      <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
        <component :is="fieldSlot" v-bind="data" />
      </template>

      <!-- element-plus 版本号小于2.6.0 -->
      <template v-if="versionIsLessThan260">
        <el-checkbox
          v-for="item in customOptions"
          :key="item.label"
          :label="item.value"
          v-bind="item.fieldItemProps"
        >
          <template #default>
            <component :is="item.fieldSlot" v-if="isFunction(item.fieldSlot)" v-bind="item" />
            <component
              :is="fieldChildrenSlot"
              v-else-if="isFunction(fieldChildrenSlot)"
              v-bind="item"
            />
            <template v-else> {{ item.label }} </template>
          </template>
        </el-checkbox>
      </template>

      <!-- element-plus 版本号大于等于2.6.0 -->
      <template v-else>
        <el-checkbox
          v-for="item in customOptions"
          :key="item.label"
          :value="item.value"
          v-bind="item.fieldItemProps"
        >
          <template #default>
            <component :is="item.fieldSlot" v-if="isFunction(item.fieldSlot)" v-bind="item" />
            <component
              :is="fieldChildrenSlot"
              v-else-if="isFunction(fieldChildrenSlot)"
              v-bind="item"
            />
            <template v-else> {{ item.label }} </template>
          </template>
        </el-checkbox>
      </template>
    </el-checkbox-group>

    <el-color-picker
      v-else-if="valueType === 'color-picker'"
      ref="fieldInstance"
      v-model="state"
      :placeholder="t('plus.field.pleaseSelect') + label"
      class="plus-form-item-field"
      v-bind="customFieldProps"
      @change="handleChange"
    />

    <el-date-picker
      v-else-if="valueType === 'date-picker'"
      ref="fieldInstance"
      v-model="state"
      :placeholder="t('plus.field.pleaseSelect') + label"
      :start-placeholder="t('plus.datepicker.startPlaceholder')"
      :end-placeholder="t('plus.datepicker.endPlaceholder')"
      class="plus-form-item-field"
      type="datetime"
      clearable
      v-bind="customFieldProps"
      @change="handleChange"
    >
      <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
        <component :is="fieldSlot" v-bind="data" />
      </template>
    </el-date-picker>

    <PlusDatePicker
      v-else-if="valueType === 'plus-date-picker'"
      ref="fieldInstance"
      v-model="state"
      class="plus-form-item-field"
      v-bind="customFieldProps"
      @change="handleChange"
    />

    <el-input-number
      v-else-if="valueType === 'input-number'"
      ref="fieldInstance"
      v-model="state"
      class="plus-form-item-field"
      :placeholder="t('plus.field.pleaseEnter') + label"
      autocomplete="off"
      v-bind="customFieldProps"
      @change="handleChange"
    />

    <PlusInputTag
      v-else-if="valueType === 'plus-input-tag'"
      ref="fieldInstance"
      v-model="state"
      class="plus-form-item-field"
      v-bind="customFieldProps"
      @change="handleChange"
    />

    <el-radio-group
      v-else-if="valueType === 'radio'"
      ref="fieldInstance"
      v-model="state"
      :placeholder="t('plus.field.pleaseSelect') + label"
      class="plus-form-item-field"
      clearable
      v-bind="customFieldProps"
      @change="handleChange"
    >
      <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
        <component :is="fieldSlot" v-bind="data" />
      </template>

      <!-- element-plus 版本号小于2.6.0 -->
      <template v-if="versionIsLessThan260">
        <el-radio
          v-for="item in customOptions"
          :key="item.label"
          :label="item.value"
          v-bind="item.fieldItemProps"
        >
          <template #default>
            <component :is="item.fieldSlot" v-if="isFunction(item.fieldSlot)" v-bind="item" />
            <component
              :is="fieldChildrenSlot"
              v-else-if="isFunction(fieldChildrenSlot)"
              v-bind="item"
            />
            <template v-else> {{ item.label }} </template>
          </template>
        </el-radio>
      </template>
      <!-- element-plus 版本号大于等于2.6.0 -->
      <template v-else>
        <el-radio
          v-for="item in customOptions"
          :key="item.label"
          :value="item.value"
          v-bind="item.fieldItemProps"
        >
          <template #default>
            <component :is="item.fieldSlot" v-if="isFunction(item.fieldSlot)" v-bind="item" />
            <component
              :is="fieldChildrenSlot"
              v-else-if="isFunction(fieldChildrenSlot)"
              v-bind="item"
            />
            <template v-else> {{ item.label }} </template>
          </template>
        </el-radio>
      </template>
    </el-radio-group>

    <PlusRadio
      v-else-if="valueType === 'plus-radio'"
      ref="fieldInstance"
      v-model="state"
      class="plus-form-item-field"
      :options="customOptions"
      :field-children-slot="fieldChildrenSlot"
      is-cancel
      v-bind="customFieldProps"
      @change="handleChange"
    />

    <el-rate
      v-else-if="valueType === 'rate'"
      ref="fieldInstance"
      v-model="state"
      class="plus-form-item-field"
      v-bind="customFieldProps"
      @change="handleChange"
    />

    <el-select
      v-else-if="valueType === 'select' && customFieldProps.multiple === true"
      ref="fieldInstance"
      v-model="state"
      :placeholder="t('plus.field.pleaseSelect') + label"
      class="plus-form-item-field"
      clearable
      v-bind="customFieldProps"
      @change="handleChange"
    >
      <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
        <component :is="fieldSlot" v-bind="data" />
      </template>

      <el-option
        v-for="item in customOptions"
        :key="item.label"
        :label="item.label"
        :value="item.value"
        v-bind="item.fieldItemProps"
      >
        <template #default>
          <component :is="item.fieldSlot" v-if="isFunction(item.fieldSlot)" v-bind="item" />
          <component
            :is="fieldChildrenSlot"
            v-else-if="isFunction(fieldChildrenSlot)"
            v-bind="item"
          />
          <template v-else> {{ item.label }} </template>
        </template>
      </el-option>
    </el-select>

    <el-select
      v-else-if="valueType === 'select'"
      ref="fieldInstance"
      v-model="state"
      :placeholder="t('plus.field.pleaseSelect') + label"
      class="plus-form-item-field"
      clearable
      v-bind="customFieldProps"
      @change="handleChange"
    >
      <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
        <component :is="fieldSlot" v-bind="data" />
      </template>

      <el-option
        v-for="item in customOptions"
        :key="item.label"
        :label="item.label"
        :value="item.value"
        v-bind="item.fieldItemProps"
      >
        <template #default>
          <component :is="item.fieldSlot" v-if="isFunction(item.fieldSlot)" v-bind="item" />
          <component
            :is="fieldChildrenSlot"
            v-else-if="isFunction(fieldChildrenSlot)"
            v-bind="item"
          />
          <template v-else> {{ item.label }} </template>
        </template>
      </el-option>
    </el-select>

    <el-slider
      v-else-if="valueType === 'slider'"
      ref="fieldInstance"
      v-model="state"
      class="plus-form-item-field"
      v-bind="customFieldProps"
      @change="handleChange"
    />

    <el-switch
      v-else-if="valueType === 'switch'"
      ref="fieldInstance"
      v-model="state"
      class="plus-form-item-field"
      v-bind="customFieldProps"
      @change="handleChange"
    >
      <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
        <component :is="fieldSlot" v-bind="data" />
      </template>
    </el-switch>

    <el-time-picker
      v-else-if="valueType === 'time-picker'"
      ref="fieldInstance"
      v-model="state"
      :placeholder="t('plus.field.pleaseSelect') + label"
      class="plus-form-item-field"
      clearable
      value-format="YYYY-MM-DD HH:mm:ss"
      v-bind="customFieldProps"
      @change="handleChange"
    />

    <el-time-select
      v-else-if="valueType === 'time-select'"
      ref="fieldInstance"
      v-model="state"
      class="plus-form-item-field"
      :placeholder="t('plus.field.pleaseSelect') + label"
      clearable
      v-bind="customFieldProps"
      @change="handleChange"
    />

    <el-input
      v-else-if="valueType === 'textarea'"
      ref="fieldInstance"
      v-model="state"
      type="textarea"
      class="plus-form-item-field"
      :placeholder="t('plus.field.pleaseEnter') + label"
      autocomplete="off"
      v-bind="customFieldProps"
      @change="handleChange"
    />

    <el-text
      v-else-if="valueType === 'text'"
      ref="fieldInstance"
      class="plus-form-item-field"
      v-bind="customFieldProps"
    >
      {{ state }}
    </el-text>

    <el-input
      v-else
      ref="fieldInstance"
      v-model="state"
      class="plus-form-item-field"
      :placeholder="t('plus.field.pleaseEnter') + label"
      autocomplete="off"
      clearable
      v-bind="customFieldProps"
      @change="handleChange"
    >
      <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
        <component :is="fieldSlot" v-bind="data" />
      </template>
    </el-input>
  </el-form-item>
</template>

<script lang="ts" setup>
import type { Component } from 'vue'
import { ref, watch, computed } from 'vue'
import type { PlusColumn, FieldValueType } from '@plus-pro-components/types'
import {
  isFunction,
  isDate,
  isArray,
  getTooltip,
  getCustomProps,
  getLabelSlotName,
  getFieldSlotName,
  versionIsLessThan260
} from '@plus-pro-components/components/utils'
import { QuestionFilled } from '@element-plus/icons-vue'
import { useGetOptions, useLocale } from '@plus-pro-components/hooks'
import { PlusRadio } from '@plus-pro-components/components/radio'
import { PlusDatePicker } from '@plus-pro-components/components/date-picker'
import { PlusInputTag } from '@plus-pro-components/components/input-tag'
import { PlusRender } from '@plus-pro-components/components/render'
import {
  ElFormItem as FormItemComponent,
  ElTooltip as TooltipComponent,
  ElIcon as IconComponent,
  ElAutocomplete as AutocompleteComponent,
  ElCascader as CascaderComponent,
  ElCheckbox as CheckboxComponent,
  ElCheckboxGroup as CheckboxGroupComponent,
  ElColorPicker as ColorPickerComponent,
  ElDatePicker as DatePickerComponent,
  ElInputNumber as InputNumberComponent,
  ElRadioGroup as RadioGroupComponent,
  ElRadio as RadioComponent,
  ElRate as RateComponent,
  ElSelect as SelectComponent,
  ElOption as OptionComponent,
  ElSlider as SliderComponent,
  ElSwitch as SwitchComponent,
  ElTimePicker as TimePickerComponent,
  ElTimeSelect as TimeSelectComponent,
  ElInput as InputComponent,
  ElText as TextComponent
} from 'element-plus'
import {
  DatePickerValueIsArrayList,
  ValueIsArrayList,
  ValueIsNumberList,
  ValueIsBooleanList
} from '@plus-pro-components/constants'

export interface PlusFormItemProps {
  modelValue?: FieldValueType
  hasLabel?: PlusColumn['hasLabel']
  label: PlusColumn['label']
  prop: PlusColumn['prop']
  fieldProps?: PlusColumn['fieldProps']
  valueType?: PlusColumn['valueType']
  options?: PlusColumn['options']
  formItemProps?: PlusColumn['formItemProps']
  renderField?: PlusColumn['renderField']
  renderLabel?: PlusColumn['renderLabel']
  tooltip?: PlusColumn['tooltip']
  fieldSlots?: PlusColumn['fieldSlots']
  fieldChildrenSlot?: PlusColumn['fieldChildrenSlot']
  index?: number
}
export interface PlusFormItemEmits {
  (e: 'update:modelValue', data: FieldValueType): void
  (e: 'change', data: FieldValueType): void
}

defineOptions({
  name: 'PlusFormItem'
})

/**
 * FIXME: The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.
 */
const ElFormItem: Component = FormItemComponent
const ElTooltip: Component = TooltipComponent
const ElIcon: Component = IconComponent
const ElAutocomplete: Component = AutocompleteComponent
const ElCascader: Component = CascaderComponent
const ElCheckbox: Component = CheckboxComponent
const ElCheckboxGroup: Component = CheckboxGroupComponent
const ElColorPicker: Component = ColorPickerComponent
const ElDatePicker: Component = DatePickerComponent
const ElInputNumber: Component = InputNumberComponent
const ElRadioGroup: Component = RadioGroupComponent
const ElRadio: Component = RadioComponent
const ElRate: Component = RateComponent
const ElSelect: Component = SelectComponent
const ElOption: Component = OptionComponent
const ElSlider: Component = SliderComponent
const ElSwitch: Component = SwitchComponent
const ElTimePicker: Component = TimePickerComponent
const ElTimeSelect: Component = TimeSelectComponent
const ElInput: Component = InputComponent
const ElText: Component = TextComponent

const props = withDefaults(defineProps<PlusFormItemProps>(), {
  modelValue: '',
  hasLabel: true,
  tooltip: '',
  formItemProps: () => ({}),
  fieldProps: () => ({}),
  options: () => [],
  fieldSlots: () => ({}),
  valueType: undefined,
  renderField: undefined,
  renderLabel: undefined,
  fieldChildrenSlot: undefined,
  index: 0
})
const emit = defineEmits<PlusFormItemEmits>()

const { t } = useLocale()
const { customOptions, customOptionsIsReady } = useGetOptions(props)
const formItemInstance = ref<InstanceType<typeof FormItemComponent> | null>()
const fieldInstance = ref()
const customFormItemProps = ref<any>({})
const customFieldProps = ref<any>({})
const state = ref<FieldValueType>()
const customFieldPropsIsReady = ref(false)
const valueIsReady = ref(false)

/**
 * 默认值是数组的情况
 */
const isArrayValue = computed(() => {
  if (props.valueType === 'cascader' && customFieldProps.value?.props?.emitPath === false) {
    return false
  }

  if (ValueIsArrayList.includes(props.valueType as string)) {
    return true
  }
  if (props.valueType === 'select' && customFieldProps.value?.multiple === true) {
    return true
  }
  if (
    props.valueType === 'date-picker' &&
    DatePickerValueIsArrayList.includes(customFieldProps.value?.type)
  ) {
    return true
  }
  if (props.valueType === 'time-picker' && customFieldProps.value?.isRange === true) {
    return true
  }
  return false
})

/**
 * 默认值是数字的情况
 */
const isNumberValue = computed(() => {
  if (ValueIsNumberList.includes(props.valueType as string)) {
    return true
  }
  return false
})

/**
 * 默认值是布尔的情况
 */
const isBooleanValue = computed(() => {
  if (ValueIsBooleanList.includes(props.valueType as string)) {
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
  } else if (isBooleanValue.value) {
    state.value = Boolean(val)
  } else if (isDate(val)) {
    state.value = String(val)
  } else {
    state.value = val
  }
  valueIsReady.value = true
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
 * 监听fieldProps
 */
watch(
  () => props.fieldProps,
  val => {
    getCustomProps(val, state.value, props, props.index, 'fieldProps')
      .then(data => {
        customFieldProps.value = data
        customFieldPropsIsReady.value = true
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
  computed(() => [props.modelValue, customFieldPropsIsReady.value, customOptionsIsReady.value]),
  ([val, fieldPropsIsReady, optionsIsReady]) => {
    if (fieldPropsIsReady && optionsIsReady) {
      setValue(val)
    }
  },
  {
    immediate: true,
    flush: 'post'
  }
)

const handleChange = (val: any) => {
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

defineExpose({
  formItemInstance,
  fieldInstance
})
</script>
