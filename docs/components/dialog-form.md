# DialogForm 表单

DialogForm 组件是 [PlusDialog](/components/dialog.html)和 [PlusForm](/components/form.html) 组件的组合。

## 基础用法

:::demo

dialog-form/basic

:::

## 自定义表单项 <el-tag>v0.0.1-beta.32</el-tag>

支持 [PlusForm 自定义表单项](/components/form.html#自定义表单项-renderfield) 自定义表单项 的三种(`renderField`/`slot`/`jsx`)方式。

:::demo

dialog-form/slot

:::

## 自定义表单 label <el-tag>v0.0.1-beta.32</el-tag>

支持 [PlusForm 自定义表单 label](/components/form.html#自定义表单-label-插槽) 自定义表单项 的三种(`renderLabel`/`slot`/`jsx`)`方式。
:::demo

dialog-form/slot-label

:::

## DialogForm API

## DialogForm Attributes

| 名称                        | 说明                                           | 类型                                                               | 默认值                                                         | 是否必须 |
| --------------------------- | ---------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------- | -------- |
| `model-value / v-model`     | 表单绑定值                                     | `object`[FieldValues](/components/type.html#fieldvalues)           |                                                                | 否       |
| `visible / v-model:visible` | 弹窗显示                                       | `boolean`                                                          | `false`                                                        | 否       |
| `form`                      | [PlusForm](/components/form.html) 的 props     | `object`[PlusFormProps](/components/form.html#form-attributes)     | `{footerAlign:"right"}`                                        | 否       |
| `dialog`                    | [PlusDialog](/components/dialog.html) 的 props | `object`[PlusDialogProps](/components/form.html#dialof-attributes) | `{hasFooter:false,width:"800px",top:"10vh", title:"弹窗表单"}` | 否       |

## DialogForm Events

| 名称      | 说明                   | 类型                                                                                        |
| --------- | ---------------------- | ------------------------------------------------------------------------------------------- |
| `confirm` | 点击确定按钮触发的事件 | `function` <docs-tip content='(values: FieldValues) => void'></docs-tip>                    |
| `change`  | 表单变化触发的事件     | `function` <docs-tip content='(values: FieldValues,column: PlusColumn) => void'></docs-tip> |
| `cancel`  | 点击取消按钮触发的事件 | `function` <docs-tip content='() => void'></docs-tip>                                       |

## DialogForm Slots

| 插槽名              | 说明                                                                           | 作用域插槽参数                             |
| ------------------- | ------------------------------------------------------------------------------ | ------------------------------------------ |
| `dialog-header`     | [PlusDialog](/components/dialog.html#dialog-slots) 的 header slot              |                                            |
| `form-footer`       | [PlusForm-footer](/components/form.html#form-slots) 的 footer slot             | `{handleReset,handleSubmit}`               |
| `form-group-header` | [PlusForm-group-header](/components/form.html#form-slots) 的 group-header slot | `{title,columns,icon}`                     |
| `plus-field-*`      | 自定义表单项，组件会自动根据配置项的 prop 生成对应的插槽                       | `{prop,label,fieldProps,valueType,column}` |
| `plus-label-*`      | 自定义表单项 label，组件会自动根据配置项的 prop 生成对应的插槽                 | `{prop,label,fieldProps,valueType,column}` |

## Exposes

| 名称           | 说明           | 类型                                                                 |
| -------------- | -------------- | -------------------------------------------------------------------- |
| `formInstance` | `el-form` 实例 | `object` <docs-tip content="InstanceType<typeof ElForm>"></docs-tip> |
