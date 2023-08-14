# DialogForm 表单

DialogForm 组件是 [PlusDialog](/components/dialog.html)和 [PlusForm](/components/form.html) 组件的组合。

## 基础用法

:::demo

dialog-form/basic

:::

## DialogForm API

## DialogForm Attributes

| 名称                        | 说明                                           | 类型                                                       | 默认值                                                         | 是否必须 |
| --------------------------- | ---------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------- | -------- |
| `model-value / v-model`     | 表单绑定值                                     | [FieldValues](/components/type.html#fieldvalues)           |                                                                | 否       |
| `visible / v-model:visible` | 弹窗显示                                       | `boolean`                                                  | `false`                                                        | 否       |
| `form`                      | [PlusForm](/components/form.html) 的 props     | [PlusFormProps](/components/form.html#form-attributes)     | `{footerAlign:"right"}`                                        | 否       |
| `dialog`                    | [PlusDialog](/components/dialog.html) 的 props | [PlusDialogProps](/components/form.html#dialof-attributes) | `{hasFooter:false,width:"800px",top:"10vh", title:"弹窗表单"}` | 否       |

## DialogForm Events

| 名称     | 说明                           | 类型                                       |
| -------- | ------------------------------ | ------------------------------------------ |
| `submit` | 点击确定按钮校验通过触发的事件 | [Function] `(values: FieldValues) => void` |
| `change` | 表单变化触发的事件             | [Function] `(values: FieldValues) => void` |
| `cancel` | 点击取消按钮触发的事件         | [Function] `() => void`                    |

## DialogForm Slots

| 插槽名                   | 说明                                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `dialog-header`          | [PlusDialog](/components/dialog.html#dialog-slots) 的 header slot                        |
| `form-footer`            | [PlusForm-footer](/components/form.html#form-slots) 的 footer slot                       |
| `form-group-item-header` | [PlusForm-group-item-header](/components/form.html#form-slots) 的 group-item-header slot |

## Exposes

| 名称           | 说明           | 类型                          |
| -------------- | -------------- | ----------------------------- |
| `formInstance` | `el-form` 实例 | `InstanceType<typeof ElForm>` |
