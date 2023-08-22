# FormItem 表单单项组件

[PlusForm](/components/form.html) 组件的每一项。

## 基础用法

:::demo

form-item/basic

:::

## FormItem API

## FormItem Attributes

| 名称                    | 说明                                                                                                                                       | 类型                                                                                                                             | 默认值 | 是否必须 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ------ | -------- |
| `model-value / v-model` | 表单绑定值                                                                                                                                 | `object`[FieldValues](/components/type.html#fieldvalues)                                                                         |        | 否       |
| `label`                 | 表格表头显示的标题 ；在 form 中是 el-form-item 的 label；在 descriptions 是 el-descriptions-item 的 label；                                | `string`                                                                                                                         |        | 是       |
| `prop`                  | 表格对应列内容的字段名 ；在 form 中是 el-input 等所有表单项的双向绑定的值；在 descriptions 是 el-descriptions-item 的值对应的字段；        | `string`                                                                                                                         |        | 是       |
| `valueType`             | 值的类型                                                                                                                                   | `string`[FormItemValueType](/components/type.html#formitemvaluetype)                                                             |        | 否       |
| `options`               | el-select，el-radio-group，el-checkbox-group 选项 ，支持数组，函数，和 Promise                                                             | `array/function/promise`[OptionsType](/components/type.html#optionstype)                                                         |        | 否       |
| `tooltip`               | 展示一个 icon，hover 时展示一些提示信息                                                                                                    | `string` / (`object`[ElTooltipProps](https://element-plus.org/zh-CN/component/tooltip.html#attributes) )                         |        | 否       |
| `renderField`           | 自定义渲染 el-form-item 下的 field-item 组件，自定义渲染同步表单的值的核心方法是调用 onChange 回调把值传给表单                             | `function` <docs-tip content='(value:any,onChange: (value: any) => void,props: any, ) => VNode / Component / string'></docs-tip> |        | 否       |
| `slots`                 | 插槽，当 `render` 或者 `renderField` 返回值是一个组件或者字符串时生效。 回调参数 `value`会返回表单或者表格的值，`params`会返回对应的配置。 | `object` <docs-tip content='{ [index: string]: (value: any, params: any) => any }'></docs-tip>                                   |        | 否       |
| `formItemProps`         | 传递给 el-form-item 的配置，支持所有 el-form-item 的 props。值支持对象 object，函数和 Promise。                                            | `object/function/promise`[PropsItemType](/components/type.html#propsitemtype)                                                    |        | 否       |
| `fieldProps`            | 传递给具体表单项和表格显示的配置，如 el-input，el-select 的 props。 值支持对象 object，函数和 Promise。                                    | `object/function/promise`[PropsItemType](/components/type.html#propsitemtype)                                                    |        | 否       |

## Exposes

| 名称            | 说明     | 类型                                                  |
| --------------- | -------- | ----------------------------------------------------- |
| `startCellEdit` | 开起编辑 | `function` <docs-tip content='() => void'></docs-tip> |
| `stopCellEdit`  | 停止编辑 | `function` <docs-tip content='() => void'></docs-tip> |
