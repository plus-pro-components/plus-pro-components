# InputTag 输入标签

InputTag 组件由 [ElTag](https://element-plus.org/zh-CN/component/tag.html) 和[ElInput](https://element-plus.org/zh-CN/component/input.html) 组成。

## 基础用法

:::demo

input-tag/basic

:::

## 数量限制

:::demo

input-tag/limit

:::

## 禁用

:::demo

input-tag/disabled

:::

## 触发方式

默认 `失去焦点`、`按回车键`、`按空格键`都可以触发，这几种触发方式可以任意组合。
:::demo

input-tag/trigger

:::

## InputTag API

## InputTag Attributes

| 名称                                      | 说明                                                                               | 类型                                                               | 默认值                       | 是否必须 |
| ----------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------- | -------- |
| `model-value / v-model`                   | 输入标签组件绑定值 （**不可重复**）                                                | `array` <docs-tip content="string[]"></docs-tip>                   |                              | 否       |
| `trigger`                                 | 触发输入内容变成标签的方式                                                         | `array`/`string` <docs-tip content="string[]/string"></docs-tip>   | `['blur', 'enter', 'space']` | 否       |
| `limit`                                   | tag 的最大数量                                                                     | `number`                                                           |                              | 否       |
| `formatTag`<el-tag>v0.0.3</el-tag>        | 格式化标签内容                                                                     | `function` <docs-tip content='(tag: string) => string'></docs-tip> |                              | 否       |
| `retainInputValue`<el-tag>v0.0.3</el-tag> | 是否保留输入框的内容                                                               | `boolean`                                                          | `false`                      | 否       |
| `tagProps`                                | [ElTag](https://element-plus.org/zh-CN/component/tag.html#tag-attributes) 的 props | `object`                                                           |                              | 否       |
| `inputProps`                              | [ElInput](https://element-plus.org/zh-CN/component/input.html) 的 props            | `object`                                                           |                              | 否       |

## InputTag Events

| 名称                            | 说明                 | 类型                                                                                  |
| ------------------------------- | -------------------- | ------------------------------------------------------------------------------------- |
| `change`                        | tag 数据改变时触发   | `function` <docs-tip content='(tags:string[]) => void'></docs-tip>                    |
| `remove`<el-tag>v0.0.3</el-tag> | 移除 tag 触发        | `function` <docs-tip content='(tag:string) => void'></docs-tip>                       |
| `blur`<el-tag>v0.0.3</el-tag>   | 输入框失去焦点时触发 | `function` <docs-tip content='(value: string, event: FocusEvent) => void'></docs-tip> |
| `enter`<el-tag>v0.0.3</el-tag>  | 按下回车键触发       | `function` <docs-tip content='(value: string, event: MouseEvent) => void'></docs-tip> |
| `space`<el-tag>v0.0.3</el-tag>  | 按下空格键触发       | `function` <docs-tip content='(value: string, event: MouseEvent) => void'></docs-tip> |

## Exposes

| 名称            | 说明                                                                | 类型                                                                             |
| --------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `inputInstance` | [ElInput](https://element-plus.org/zh-CN/component/input.html) 实例 | `object` <docs-tip content="import('element-plus')['InputInstance']"></docs-tip> |
| `tagInstance`   | [ElTag](https://element-plus.org/zh-CN/component/tag.html) 实例     | `object` <docs-tip content="import('element-plus')['TagInstance']"></docs-tip>   |
