<template>
  <template v-if="valueIsReady">
    <el-form-item
      ref="formItemInstance"
      :label="hasLabel ? labelValue : ''"
      :prop="prop"
      class="plus-form-item"
      v-bind="customFormItemProps"
      :label-width="hasLabel ? customFormItemProps?.labelWidth : '0px'"
    >
      <template v-if="isFunction(renderErrorMessage)" #error="{ error }">
        <div class="el-form-item__error">
          <component
            :is="renderErrorMessage"
            v-bind="props"
            :value="state"
            :error="error"
            :label="labelValue"
          />
        </div>
      </template>

      <template v-if="hasLabel" #label="{ label: currentLabel }">
        <span class="plus-form-item__label">
          <template v-if="renderLabel && isFunction(renderLabel)">
            <PlusRender
              v-if="valueIsReady"
              :render="renderLabel"
              :params="params"
              :callback-value="currentLabel"
              :custom-field-props="customFieldProps"
            />
          </template>

          <slot v-else :name="getLabelSlotName(prop)" v-bind="params">
            {{ currentLabel }}
          </slot>

          <el-tooltip v-if="tooltip" placement="top" v-bind="getTooltip(tooltip)">
            <slot name="tooltip-icon">
              <el-icon class="plus-table-column__label__icon" :size="16">
                <QuestionFilled />
              </el-icon>
            </slot>
          </el-tooltip>
        </span>
      </template>

      <template v-if="renderField && isFunction(renderField)">
        <PlusRender
          v-if="valueIsReady"
          :render="renderField"
          :params="params"
          :callback-value="state"
          :custom-field-props="customFieldProps"
          render-type="form"
          :handle-change="handleChange"
        />
      </template>

      <slot
        v-else-if="$slots[getFieldSlotName(prop)]"
        :name="getFieldSlotName(prop)"
        v-bind="params"
        :column="props"
      />

      <el-select
        v-else-if="valueType === 'select' && customFieldProps.multiple === true"
        ref="fieldInstance"
        v-model="state"
        :placeholder="t('plus.field.pleaseSelect') + labelValue"
        class="plus-form-item-field"
        :clearable="clearable"
        v-bind="customFieldProps"
        @update:modelValue="handleChange"
      >
        <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
          <component :is="fieldSlot" v-bind="data" />
        </template>

        <template v-for="item in customOptions" :key="item.value">
          <el-option-group v-if="item.options" :label="item.label" :disabled="item.disabled">
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
              v-bind="
                isFunction(option.fieldItemProps)
                  ? option.fieldItemProps(option)
                  : option.fieldItemProps
              "
            >
              <template #default>
                <component
                  :is="option.fieldSlot"
                  v-if="isFunction(option.fieldSlot)"
                  v-bind="option"
                />
                <component
                  :is="fieldChildrenSlot"
                  v-else-if="isFunction(fieldChildrenSlot)"
                  v-bind="option"
                />
                <template v-else>{{ option.label }}</template>
              </template>
            </el-option>
          </el-option-group>

          <el-option
            v-else
            :label="item.label"
            :value="item.value"
            v-bind="
              isFunction(item.fieldItemProps) ? item.fieldItemProps(item) : item.fieldItemProps
            "
          >
            <template #default>
              <component :is="item.fieldSlot" v-if="isFunction(item.fieldSlot)" v-bind="item" />
              <component
                :is="fieldChildrenSlot"
                v-else-if="isFunction(fieldChildrenSlot)"
                v-bind="item"
              />
              <template v-else>{{ item.label }}</template>
            </template>
          </el-option>
        </template>
      </el-select>

      <!-- 统一处理 -->
      <template v-else-if="hasFieldComponent(valueType)">
        <!-- has-children  -->
        <component
          :is="getFieldComponent(valueType).component"
          v-if="getFieldComponent(valueType).children"
          ref="fieldInstance"
          v-model="state"
          class="plus-form-item-field"
          :clearable="clearable"
          v-bind="commonProps"
          @update:modelValue="handleChange"
        >
          <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
            <component :is="fieldSlot" :value="state" :column="params" v-bind="data" />
          </template>

          <component
            :is="getFieldComponent(valueType).children"
            v-for="item in customOptions"
            :key="item.value"
            v-bind="getChildrenProps(item)"
          >
            <template #default>
              <component
                :is="item.fieldSlot"
                v-if="isFunction(item.fieldSlot)"
                :model-value="state"
                :column="params"
                v-bind="item"
              />
              <component
                :is="fieldChildrenSlot"
                v-else-if="isFunction(fieldChildrenSlot)"
                :model-value="state"
                :column="params"
                v-bind="item"
              />
              <template v-else> {{ item.label }} </template>
            </template>
          </component>
        </component>
        <!-- no-children  -->
        <component
          :is="getFieldComponent(valueType).component"
          v-else
          ref="fieldInstance"
          v-model="state"
          class="plus-form-item-field"
          :clearable="clearable"
          :field-children-slot="fieldChildrenSlot"
          v-bind="commonProps"
          @update:modelValue="handleChange"
        >
          <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
            <component :is="fieldSlot" :model-value="state" :column="params" v-bind="data" />
          </template>
        </component>
      </template>

      <el-text
        v-else-if="valueType === 'text'"
        ref="fieldInstance"
        class="plus-form-item-field"
        v-bind="customFieldProps"
      >
        {{ state }}
      </el-text>

      <el-divider
        v-else-if="valueType === 'divider'"
        ref="fieldInstance"
        class="plus-form-item-field"
        v-bind="customFieldProps"
      >
        {{ state }}
      </el-divider>

      <el-input
        v-else
        ref="fieldInstance"
        v-model="state"
        class="plus-form-item-field"
        :placeholder="t('plus.field.pleaseEnter') + labelValue"
        autocomplete="off"
        :clearable="clearable"
        v-bind="customFieldProps"
        @update:modelValue="handleChange"
      >
        <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
          <component :is="fieldSlot" :model-value="state" :column="params" v-bind="data" />
        </template>
      </el-input>
    </el-form-item>
  </template>
</template>

<script lang="ts" setup>
import type { Component, Ref } from 'vue'
import { ref, watch, computed, inject, unref } from 'vue'
import type {
  PlusColumn,
  FieldValueType,
  OptionsRow,
  RecordType,
  FormFieldRefsType
} from '@plus-pro-components/types'
import {
  isFunction,
  isDate,
  isArray,
  getTooltip,
  getCustomProps,
  getLabelSlotName,
  getFieldSlotName,
  versionIsLessThan260,
  getLabel
} from '@plus-pro-components/components/utils'
import { QuestionFilled } from '@element-plus/icons-vue'
import { useGetOptions, useLocale } from '@plus-pro-components/hooks'
import { PlusRender } from '@plus-pro-components/components/render'
import {
  ElFormItem as FormItemComponent,
  ElTooltip as TooltipComponent,
  ElIcon as IconComponent,
  ElInput as InputComponent,
  ElText,
  ElDivider,
  ElSelect as SelectComponent,
  ElOption as OptionComponent,
  ElOptionGroup as OptionGroupComponent
} from 'element-plus'
import {
  DatePickerValueIsArrayList,
  ValueIsArrayList,
  ValueIsNumberList,
  TableFormFieldRefInjectionKey,
  TableFormRowInfoInjectionKey
} from '@plus-pro-components/constants'
import { hasFieldComponent, getFieldComponent } from './form-item'

export interface PlusFormItemProps {
  modelValue?: FieldValueType
  hasLabel?: PlusColumn['hasLabel']
  label?: PlusColumn['label']
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
  renderErrorMessage?: PlusColumn['renderErrorMessage']
  /**
   * @desc 对options 进行映射
   * @version v0.1.15
   * @default{ label: 'label'; value: 'value' }
   */
  optionsMap?: PlusColumn['optionsMap']
  index?: number
  /**
   *  @version v0.1.18
   */
  clearable?: boolean
  defaultValue?: PlusColumn['defaultValue']
}
export interface PlusFormItemEmits {
  (e: 'update:modelValue', value: FieldValueType): void
  (e: 'change', value: FieldValueType): void
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
const ElInput: Component = InputComponent
const ElSelect: Component = SelectComponent
const ElOption: Component = OptionComponent
const ElOptionGroup: Component = OptionGroupComponent

const props = withDefaults(defineProps<PlusFormItemProps>(), {
  label: '',
  modelValue: null,
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
  renderErrorMessage: undefined,
  optionsMap: undefined,
  clearable: true,
  index: 0,
  defaultValue: undefined
})
const emit = defineEmits<PlusFormItemEmits>()

const { t } = useLocale()
const { customOptions, customOptionsIsReady } = useGetOptions(props)
const formItemInstance = ref<InstanceType<typeof FormItemComponent> | null>()
const fieldInstance = ref()
const customFormItemProps = ref<RecordType>({})
const customFieldProps = ref<RecordType>({})
const state = ref<FieldValueType>()
const customFieldPropsIsReady = ref(false)
const valueIsReady = ref(false)
const labelValue = computed(() => getLabel(props.label))
const formFieldRefs = inject(TableFormFieldRefInjectionKey, {}) as unknown as Ref<FormFieldRefsType>
const tableRowInfo = inject(TableFormRowInfoInjectionKey, {}) as unknown as Ref<FormFieldRefsType>
const params = computed(() => ({
  ...props,
  ...unref(tableRowInfo),
  label: labelValue.value,
  fieldProps: customFieldProps.value,
  formItemProps: customFormItemProps.value,
  options: customOptions.value
}))

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
  if (props.valueType === 'tree-select' && customFieldProps.value?.multiple === true) {
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
 * 设置表单值（默认值）
 * @param val
 */
const setValue = (val: FieldValueType) => {
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
    // input-number default value
    state.value =
      val === null || val === void 0 || val === ''
        ? null
        : typeof val === 'string'
        ? Number(val)
        : val
  } else if (isDate(val)) {
    state.value = String(val)
  } else {
    state.value = val
  }
  valueIsReady.value = true
}

const commonProps = computed(() => {
  const { hasOptions, hasSelectEvent, props: componentProps } = getFieldComponent(props.valueType)
  return {
    ...(hasOptions
      ? {
          options: customOptions.value
        }
      : null),
    ...(hasSelectEvent
      ? {
          onSelect: handleSelect
        }
      : null),
    ...componentProps,
    placeholder: componentProps?.placeholder
      ? t(componentProps?.placeholder) + labelValue.value
      : t('plus.field.pleaseSelect') + labelValue.value,
    ...(props.valueType === 'date-picker'
      ? {
          startPlaceholder: componentProps?.startPlaceholder
            ? t(componentProps?.startPlaceholder as string)
            : '',
          endPlaceholder: componentProps?.startPlaceholder
            ? t(componentProps?.endPlaceholder as string)
            : ''
        }
      : null),
    ...customFieldProps.value
  }
})

/**
 * 获取子组件 props，兼容 element-plus@2.6.0
 */
const getChildrenProps = (item: OptionsRow) => {
  return {
    ...(props.valueType === 'select'
      ? {
          label: item.label,
          value: item.value
        }
      : versionIsLessThan260
      ? {
          label: item.value
        }
      : {
          label: item.label,
          value: item.value
        }),
    ...(isFunction(item.fieldItemProps) ? item.fieldItemProps(item) : item.fieldItemProps)
  }
}

const index = computed(() => params.value.index ?? props.index)

/**
 * 监听formItemProps
 */
watch(
  () => [props.formItemProps, state.value],
  () => {
    getCustomProps(props.formItemProps, state.value, unref(params), unref(index), 'formItemProps')
      .then(data => {
        customFormItemProps.value = data
      })
      .catch(err => {
        throw err
      })
  },
  {
    immediate: true,
    deep: true,
    flush: 'post'
  }
)

/**
 * 监听fieldProps
 */
watch(
  () => [props.fieldProps, state.value],
  () => {
    getCustomProps(props.fieldProps, state.value, unref(params), unref(index), 'fieldProps')
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
    deep: true,
    flush: 'post'
  }
)

watch(
  computed(() => [props.modelValue, customFieldPropsIsReady.value, customOptionsIsReady.value]),
  ([val, fieldPropsIsReady, optionsIsReady]) => {
    if (fieldPropsIsReady && optionsIsReady) {
      // eslint-disable-next-line eqeqeq
      setValue(val === null && props.defaultValue != null ? props.defaultValue : val)
    }
  },
  {
    immediate: true,
    flush: 'post'
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
const handleSelect = ({ value }: { value: FieldValueType }) => {
  handleChange(value)
}

watch(fieldInstance, () => {
  formFieldRefs.value = {
    fieldInstance: fieldInstance.value,
    valueIsReady: valueIsReady
  }
})

defineExpose({
  formItemInstance,
  fieldInstance
})
</script>
