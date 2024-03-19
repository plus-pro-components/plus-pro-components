# DialogForm 表单

DialogForm 组件是 [PlusDialog](/components/dialog.html)和 [PlusForm](/components/form.html) 组件的组合。

::: warning 注意
表单`v-model`绑定的值尽量使用 ref 定义绑定的值，以避免 reactive 带来的响应式丢失问题。 <el-text  type="primary" tag="ins">[参考 reactive 的局限性](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive)</el-text>
:::

## 基础用法

:::demo

dialog-form/basic

:::

## 自定义表单项

支持 [PlusForm 自定义表单项](/components/form.html#自定义表单项-renderfield) 自定义表单项 的三种(`renderField`/`slot`/`jsx`)方式。

:::demo

dialog-form/slot

:::

## 自定义表单 label

支持 [PlusForm 自定义表单 label](/components/form.html#自定义表单-label-插槽) 自定义表单项 的三种(`renderLabel`/`slot`/`jsx`)方式。
:::demo

dialog-form/slot-label

:::

## 自定义底部

`DialogForm` 组件由 [PlusDialog](/components/dialog.html)和 [PlusForm](/components/form.html) 组成，它同时支持两个组件的底部插槽，`DialogForm`默认使用的[PlusDialog](/components/dialog.html)的底部按钮，所以[PlusForm](/components/form.html)组件的 `hasFooter`属性默认给了 `false`。要定义[PlusForm](/components/form.html)组件的底部，需要[PlusDialog](/components/dialog.html)组件的 `hasFooter`属性给 `false`，[PlusForm](/components/form.html)组件的 `hasFooter`属性给`true`。

:::demo

dialog-form/custom-footer

:::

## DialogForm API

## DialogForm Attributes

| 名称                        | 说明                                                                                                             | 类型                                                               | 默认值                                         | 是否必须 |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------- | -------- |
| `model-value / v-model`     | 表单绑定值 <el-text type="warning">（尽量使用 ref 定义绑定的值，以避免 reactive 带来的响应式丢失问题）</el-text> | `object`[FieldValues](/components/type.html#fieldvalues)           |                                                | 否       |
| `visible / v-model:visible` | 弹窗显示                                                                                                         | `boolean`                                                          | `false`                                        | 否       |
| `form`                      | [PlusForm](/components/form.html) 的 props                                                                       | `object`[PlusFormProps](/components/form.html#form-attributes)     | `{hasFooter:false,footerAlign:'right'}`        | 否       |
| `dialog`                    | [PlusDialog](/components/dialog.html) 的 props                                                                   | `object`[PlusDialogProps](/components/form.html#dialof-attributes) | `{width:"800px",top:"10vh", title:"弹窗表单"}` | 否       |

## DialogForm Events

| 名称      | 说明                   | 类型                                                                                        |
| --------- | ---------------------- | ------------------------------------------------------------------------------------------- |
| `confirm` | 点击确定按钮触发的事件 | `function` <docs-tip content='(values: FieldValues) => void'></docs-tip>                    |
| `change`  | 表单变化触发的事件     | `function` <docs-tip content='(values: FieldValues,column: PlusColumn) => void'></docs-tip> |
| `cancel`  | 点击取消按钮触发的事件 | `function` <docs-tip content='() => void'></docs-tip>                                       |

## DialogForm Slots

| 插槽名                                | 说明                                                                                                                               | 作用域插槽参数                                                     |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `dialog-header`                       | [PlusDialog](/components/dialog.html#dialog-slots) 的 header slot                                                                  |                                                                    |
| `dialog-footer`                       | [PlusDialog](/components/dialog.html#dialog-slots) 的 header slot                                                                  | `{handleConfirm,handleCancel}` 弹窗表单默认的**确定**,**取消**方法 |
| `form-footer`                         | [PlusForm](/components/form.html#form-slots) 的 footer slot， 配置属性 `:form="{hasFooter:true}"` 生效                             | `{handleSubmit,handleReset} ` 表单默认的**提交**，**重置**方法     |
| `tooltip-icon`<el-tag>v0.0.3</el-tag> | [PlusForm](/components/form.html#form-slots) 的 tooltip icon                                                                       |                                                                    |
| `form-group-header`                   | [PlusForm](/components/form.html#form-slots) 的 group-header slot                                                                  | `{title,columns,icon}`                                             |
| `plus-field-*`                        | [PlusForm](/components/form.html#form-slots) 的自定义表单项，组件会自动根据配置项的 prop 生成对应的插槽                            | `{prop,label,fieldProps,valueType,column}`                         |
| `plus-label-*`                        | [PlusForm](/components/form.html#form-slots) 的自定义表单项 label，组件会自动根据配置项的 prop 生成对应的插槽                      | `{prop,label,fieldProps,valueType,column}`                         |
| `plus-extra-*`                        | [PlusForm](/components/form.html#form-slots)的自定义渲染 el-form-item 下一行额外的内容，组件会自动根据配置项的 prop 生成对应的插槽 | `{column}`                                                         |

## Exposes

| 名称           | 说明           | 类型                                                                 |
| -------------- | -------------- | -------------------------------------------------------------------- |
| `formInstance` | `el-form` 实例 | `object` <docs-tip content="InstanceType<typeof ElForm>"></docs-tip> |
