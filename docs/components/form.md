# Form 表单

## 基础用法

:::demo

form/basic

:::

## Form API

## Form Attributes

| 名称                    | 说明                      | 类型                                                                                             | 默认值  | 是否必须 |
| ----------------------- | ------------------------- | ------------------------------------------------------------------------------------------------ | ------- | -------- |
| `model-value / v-model` | 表单绑定值                | [FieldValues](/components/type.html#fieldvalues)                                                 |         | 否       |
| `columns`               | 表单配置信息              | [PlusColumn[]](/components/config.html)                                                          | `[]`    | 否       |
| `labelWidth`            | el-form 的 labelWidth     | `string`                                                                                         | `84px`  | 否       |
| `labelPosition`         | el-form 的 labelPosition  | `'left' / 'right' / 'top'`                                                                       | `left`  | 否       |
| `labelSuffix`           | el-form 的 labelSuffix    | `string`                                                                                         | `:`     | 否       |
| `hasErrorTip`           | 是否需要校验 message 提示 | `boolean`                                                                                        | `true`  | 否       |
| `hasFooter`             | 是否需要全部底部按钮      | `boolean`                                                                                        | `true`  | 否       |
| `footerAlign`           | 底部按钮对齐方式          | `left`/`right`                                                                                   | `left`  | 否       |
| `hasCancel`             | 是否需要底部按钮 `取消`   | `boolean`                                                                                        | `true`  | 否       |
| `submitLoading`         | 确定按钮 loading          | `boolean`                                                                                        | `false` | 否       |
| `rules`                 | 表单校验                  | el-form 的 rules [FormRules](https://element-plus.org/zh-CN/component/form.html#form-attributes) | `{}`    | 否       |
| ...                     | ...                       | ...                                                                                              | ...     | ...      |

**`...`表示同时支持所有[ElForm Attributes](https://element-plus.org/zh-CN/component/form.html#form-attributes)**

:::tip 提示
**model 参数已在组件内部处理，一般不需要传**。
:::

## Form Events

| 名称          | 说明                             | 类型                               |
| ------------- | -------------------------------- | ---------------------------------- |
| `submit`      | 点击确定按钮校验通过触发的事件   | [Function] `(values: any) => void` |
| `change`      | 表单变化触发的事件               | [Function] `(values:any) => void`  |
| `cancel`      | 点击取消按钮触发的事件           | [Function] `() => void`            |
| `submitError` | 点击确定按钮校验不通过触发的事件 | [Function] `(error:any) => void`   |
| ...           | ...                              | ...                                |

**`...`表示同时支持所有[ElForm Events](https://element-plus.org/zh-CN/component/form.html#form-%E4%BA%8B%E4%BB%B6)**

:::tip 提示

如 el-form 的 validate。

:::

## Form Slots

| 插槽名    | 说明                                  |
| --------- | ------------------------------------- |
| `default` | 表单的内容 默认是 `PlusFormItem` 组件 |
| `footer`  | 表单底部按钮                          |

## Exposes

| 名称           | 说明           | 类型                          |
| -------------- | -------------- | ----------------------------- |
| `formInstance` | `el-form` 实例 | `InstanceType<typeof ElForm>` |

**拿到 formInstance 后支持所有[ElForm 方法](https://element-plus.org/zh-CN/component/form.html#form-exposes)**

::: tip 提示
如 `validate`,`validateField`等
:::
