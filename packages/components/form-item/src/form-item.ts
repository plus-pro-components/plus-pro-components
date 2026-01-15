import {
  ElAutocomplete,
  ElCascader,
  ElCheckbox,
  ElCheckboxGroup,
  ElColorPicker,
  ElDatePicker,
  ElInputNumber,
  ElRadioGroup,
  ElRadio,
  ElRadioButton,
  ElRate,
  ElSelect,
  ElOption,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElInput,
  ElTransfer,
  ElTreeSelect,
  ElSelectV2
} from 'element-plus'
import { PlusRadio } from '@plus-pro-components/components/radio'
import { PlusDatePicker } from '@plus-pro-components/components/date-picker'
import { PlusInputTag } from '@plus-pro-components/components/input-tag'
import type { FormItemValueType } from '@plus-pro-components/types'
import type { Component } from 'vue'

export type FieldComponentType = {
  /**
   * parent Component
   */
  component: Component
  /**
   *  parent Props
   */
  props?: {
    [key: string]: string | boolean | undefined
    type?: 'textarea'
    /**
     * @default  'plus.field.pleaseSelect'
     */
    placeholder?: 'plus.field.pleaseEnter'
  }
  /**
   *  children  Component
   */
  children?: Component

  /**
   * has options
   * @default false
   */
  hasOptions?: boolean
  /**
   * has SelectEvent
   * @default false
   */
  hasSelectEvent?: boolean
  /**
   * has version compatibility
   * @default false
   */
  hasVersionCompatibility?: boolean
}

export type FieldComponentMapType = Record<
  Exclude<FormItemValueType, undefined | 'text'>,
  FieldComponentType
>

export const FieldComponentMap: FieldComponentMapType = {
  // plus
  'plus-radio': {
    component: PlusRadio,
    hasOptions: true
  },
  'plus-date-picker': {
    component: PlusDatePicker
  },
  'plus-input-tag': {
    component: PlusInputTag
  },
  // el
  autocomplete: {
    component: ElAutocomplete,
    props: { placeholder: 'plus.field.pleaseEnter' },
    hasSelectEvent: true
  },
  cascader: {
    component: ElCascader,
    hasOptions: true
  },
  checkbox: {
    component: ElCheckboxGroup,
    children: ElCheckbox,
    hasVersionCompatibility: true
  },
  'color-picker': {
    component: ElColorPicker
  },
  'date-picker': {
    component: ElDatePicker,
    props: {
      startPlaceholder: 'plus.datepicker.startPlaceholder',
      endPlaceholder: 'plus.datepicker.endPlaceholder'
    }
  },
  'input-number': {
    component: ElInputNumber,
    props: { placeholder: 'plus.field.pleaseEnter' }
  },
  radio: {
    component: ElRadioGroup,
    children: ElRadio,
    hasVersionCompatibility: true
  },
  'radio-button': {
    component: ElRadioGroup,
    children: ElRadioButton
  },
  rate: {
    component: ElRate
  },
  select: {
    component: ElSelect,
    children: ElOption
  },
  slider: {
    component: ElSlider
  },
  switch: {
    component: ElSwitch
  },
  'time-picker': {
    component: ElTimePicker
  },
  'time-select': {
    component: ElTimeSelect
  },
  transfer: {
    component: ElTransfer
  },
  input: {
    component: ElInput,
    props: { placeholder: 'plus.field.pleaseEnter' }
  },
  textarea: {
    component: ElInput,
    props: { type: 'textarea', placeholder: 'plus.field.pleaseEnter' }
  },
  'tree-select': {
    component: ElTreeSelect
  },
  'select-v2': {
    component: ElSelectV2,
    hasOptions: true
  }
}

/**
 * has component
 * @param valueType
 * @returns
 */
export const hasFieldComponent = (valueType?: string) =>
  Object.keys(FieldComponentMap).includes(
    valueType as Exclude<FormItemValueType, undefined | 'text'>
  )
/**
 * get component
 * @param valueType
 * @returns
 */
export const getFieldComponent = (valueType?: string): FieldComponentType =>
  Reflect.get(FieldComponentMap, valueType as string) || {}
