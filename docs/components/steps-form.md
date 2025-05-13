# StepsForm 分步表单

StepsForm 组件是 [ElSteps,ElStep](https://element-plus.org/zh-CN/component/steps.html)和 [PlusForm](/components/form.html) 组件的组合，支持 [PlusForm](/components/form.html) 组件的所有自定义函数和插槽，
它的主要用途是引导用户按照流程完成任务的分步导航条， 可根据实际应用场景设定步骤，步骤不得少于 2 步。

## 基础用法

设置 `active` 属性，接受一个 `Number`，表明步骤，从 1 开始。`data` 是分步表单所需的数据。

:::demo

steps-form/basic

:::

## 垂直的分步表单

垂直方向的分步表单。

只需要设置 direction 属性为 vertical 即可。
:::demo

steps-form/vertical-stepsform

:::

## 带图标的分步表单

通过 icon 属性来设置图标， 图标的类型可以参考 Icon 组件的文档。
:::demo

steps-form/icon-stepsform

:::

## 简洁风格的分步表单

设置 simple 可应用简洁风格，该条件下 align-center / description / direction / space 都将失效。
:::demo

steps-form/simple

:::

## 插槽渲染分步表单头部

设置 simple 可应用简洁风格，该条件下 align-center / description / direction / space 都将失效。
:::demo

steps-form/slots

:::

## 插槽渲染分步表单每一步内容

<el-tag>v0.1.22</el-tag> 新增

设置 step-\* 可应用自定义插槽渲染每一步内容，\*表示的是步骤数，从 1 开始。

:::demo

steps-form/step-slots

:::

## StepsForm API

## StepsForm Attributes

| 名称                                  | 说明                   | 类型                                                               | 默认值   | 是否必须                                      |
| ------------------------------------- | ---------------------- | ------------------------------------------------------------------ | -------- | --------------------------------------------- |
| `model-value / v-model`               | 分步表单绑定的第几步值 | `number`                                                           | `1`      | 否 (<el-tag>v0.1.14</el-tag> 版本前是 `必须`) |
| `data`                                | 分步表单展示的数据     | `array` [PlusStepFromRow[]](/components/type.html#plusstepfromrow) | `[]`     | 否 (<el-tag>v0.1.14</el-tag> 版本前是 `必须`) |
| `submitText` <el-tag>v0.1.14</el-tag> | 提交按钮文字           | `string`                                                           | `提交`   | 否                                            |
| `nextText` <el-tag>v0.1.14</el-tag>   | 下一步按钮文字         | `string`                                                           | `下一步` | 否                                            |
| `preText` <el-tag>v0.1.14</el-tag>    | 上一步按钮文字         | `string`                                                           | `上一步` | 否                                            |
| ...                                   | ...                    | ...                                                                | ...      | ...                                           |

`...`表示同时支持所有 [ElSteps Attributes](https://element-plus.org/zh-CN/component/steps.html#steps-%E5%B1%9E%E6%80%A7)

## StepsForm Events

| 名称                              | 说明                                         | 类型                                                                                                                                                           |
| --------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `change`                          | 表单变化触发的事件                           | `function` <docs-tip content='(values: FieldValues,column: PlusColumn) => void'></docs-tip>                                                                    |
| `pre`                             | 点击`上一步`按钮触发的事件                   | `function` <docs-tip content='(active: number) => void'></docs-tip>                                                                                            |
| `next`                            | 点击`下一步`（`提交`）按钮校验通过触发的事件 | `function` <docs-tip content='(active: number, values: FieldValues, allValues: FieldValues) => void'></docs-tip> `allValues`参数为<el-tag>v0.1.23</el-tag>新增 |
| `submit` <el-tag>v0.1.23</el-tag> | 点击`提交`按钮触发的事件                     | `function` <docs-tip content='(active: number, values: FieldValues, allValues: FieldValues) => void'></docs-tip>                                               |

## StepsForm Slots

| 插槽名                           | 说明                                          | 作用域插槽参数                                                                                  |
| -------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| step-\* <el-tag>v0.1.22</el-tag> | 每一步内容的插槽，\*表示的是步骤数，从 1 开始 | `{title,form,description,icon,status}` [PlusStepFromRow](/components/type.html#plusstepfromrow) |
| ...                              | ...                                           | ...                                                                                             |

`...`表示同时支持所有 [ElStep](https://element-plus.org/zh-CN/component/steps.html#step-%E6%8F%92%E6%A7%BD) 的其他插槽 如 `icon, title, description `
