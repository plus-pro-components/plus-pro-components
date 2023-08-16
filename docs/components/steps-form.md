# StepsForm 分步表单

引导用户按照流程完成任务的分步导航条， 可根据实际应用场景设定步骤，步骤不得少于 2 步。

## 基础用法

设置 `active` 属性，接受一个 `Number`，表明步骤的 `index`，从 0 开始。`data` 是分步表单所需的数据。

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

## 插槽渲染分步表单

设置 simple 可应用简洁风格，该条件下 align-center / description / direction / space 都将失效。
:::demo

steps-form/slots

:::

## StepsForm API

## StepsForm Attributes

| 名称                    | 说明               | 类型             | 默认值 | 是否必须 |
| ----------------------- | ------------------ | ---------------- | ------ | -------- |
| `model-value / v-model` | 分步表单绑定值     | number           | `1`    | 是       |
| `data`                  | 分步表单展示的数据 | `PlusStepFrom[]` | `[]`   | 是       |
| ...                     | ...                | ...              | ...    | ...      |

`...`表示同时支持所有 [ElSteps Attributes](https://element-plus.org/zh-CN/component/steps.html#steps-%E5%B1%9E%E6%80%A7)

## StepsForm Events

| 名称   | 说明                             | 类型                                                       |
| ------ | -------------------------------- | ---------------------------------------------------------- |
| `next` | 点击下一步按钮校验通过触发的事件 | [Function] `(active: number, values: FieldValues) => void` |
| `pre`  | 点击上一步按钮触发的事件         | [Function] `(active: number) => void`                      |

## StepsForm Slots

| 插槽名 | 说明 |
| ------ | ---- |
| ...    | ...  |

`...`表示同时支持所有 [ElStep](https://element-plus.org/zh-CN/component/steps.html#step-%E6%8F%92%E6%A7%BD) 的其他插槽 如 `icon title description `
