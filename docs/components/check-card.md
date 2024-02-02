# CheckCard 多选卡片

## 简介

PlusCheckCard 集合多种相关联说明信息，并且可被选择的卡片。PlusCheckCardGroup 集成 PlusCheckCard 可以实现多选功能。

## 基础用法

:::demo

check-card/basic

:::

## 不同尺寸

配置 size 尺寸大小，当前可选 large，default，small，不同尺寸仅宽度不同。可以根据需要修改样式自定义大小。

:::demo

check-card/size

:::

## 禁用

配置 disabled 可实现禁用。

:::demo

check-card/disabled

:::

## 操作栏

:::demo

check-card/extra

:::

## 自定义 (render)

:::warning 注意
**render 函数的优先级高于插槽**
:::

`title`，`description` 和`avatar` 属性支持 字符串和渲染函数 和`undefined`，当值是 undefined 时不渲染。

:::demo

check-card/custom

:::

## 自定义 (jsx/tsx)

:::demo

check-card/tsx

:::

## 自定义 (插槽)

:::warning 注意
**插槽优先级低于 render**
:::

`title`，`description` 和`avatar` 支持 同名插槽。

:::demo

check-card/slot

:::

## CheckCard API

## CheckCard Attributes

| 名称                    | 说明               | 类型                                                                          | 默认值 | 是否必须 |
| ----------------------- | ------------------ | ----------------------------------------------------------------------------- | ------ | -------- |
| `model-value / v-model` | 绑定值             | `boolean`                                                                     |        | 否       |
| `avatar`                | 头像               | `string`/ `function` <docs-tip content="(data) => VNode / string"></docs-tip> |        | 否       |
| `avatarProps`           | el-avatar 的 props | `object`                                                                      |        | 否       |
| `title`                 | 标题               | `string`/ `function` <docs-tip content="(data) => VNode / string"></docs-tip> |        | 否       |
| `description`           | 描述               | `string`/ `function` <docs-tip content="(data) => VNode / string"></docs-tip> |        | 否       |
| `extra`                 | 操作栏             | `function` <docs-tip content="(data) => VNode / string"></docs-tip>           |        | 否       |
| `size`                  | 尺寸               | `string` <docs-tip content='"default" / "small" / "large"'></docs-tip>        |        | 否       |
| `disabled`              | 禁用               | `boolean`                                                                     |        | 否       |

## CheckCard Events

| 名称     | 说明           | 类型                                                                 |
| -------- | -------------- | -------------------------------------------------------------------- |
| `change` | 点击卡片时触发 | `function` <docs-tip content='(checked:boolean) => void'></docs-tip> |
| `extra`  | 点击操作栏触发 | `function` <docs-tip content='() => void'></docs-tip>                |

## CheckCard Slots

| 插槽名        | 说明          | 作用域插槽参数                                                      |
| ------------- | ------------- | ------------------------------------------------------------------- |
| `avatar`      | 自定义 头像   | `object` <docs-tip content='{avatar,title,description}'></docs-tip> |
| `title`       | 自定义 标题   | `object` <docs-tip content='{avatar,title,description}'></docs-tip> |
| `description` | 自定义 描述   | `object` <docs-tip content='{avatar,title,description}'></docs-tip> |
| `extra`       | 自定义 操作栏 | `object` <docs-tip content='{avatar,title,description}'></docs-tip> |
