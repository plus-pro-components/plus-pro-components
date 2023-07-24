export const DateFormFieldType = ['date-picker']

/**
 * 支持的表单类型
 */
export const FormFieldType = [
  'autocomplete',
  'cascader',
  'checkbox',
  'color-picker',
  ...DateFormFieldType,
  'input-number',
  'radio',
  'rate',
  'select',
  'slider',
  'switch',
  'time-select',
  'textarea',
  'text'
]

export const TableFormRefInjectionKey = Symbol('tableFormRefInjectionKey')
