# Radio 单选

## 简介

PlusRadio 是在 el-radio-group 和 el-radio 上做的封装，核心功能点是 radio 再次点击可以取消，一般的使用场景是表单默认值是空的情况且非必填，ElementPlus 的组件不支持单选可以取消。

:::tip 提示

要使用 el-radio-button 请直接使用 ElementPlus 官方组件。
:::

## 基础用法

:::demo

radio/basic

:::

## Radio API

## Radio Attributes

| 名称                    | 说明                            | 类型                                                | 默认值  | 是否必须 |
| ----------------------- | ------------------------------- | --------------------------------------------------- | ------- | -------- |
| `model-value / v-model` | 选中项绑定值                    | `string/ number/ boolean`                           | `''`    | 否       |
| `data`                  | radio 的数据源                  | `{ label: string; value: string/number/boolean }[]` | `[]`    | 是       |
| `isCancel`              | 是否可以取消选中状态            | `boolean`                                           | `false` | 否       |
| `groupProps`            | `el-radio-group` 的所有 `props` | `object`                                            | `{}`    | 否       |
| `radioProps`            | `el-radio` 的所有 `props`       | `object`                                            | `{}`    | 否       |

## Radio Events

| 名称          | 说明                      | 类型                                               |
| ------------- | ------------------------- | -------------------------------------------------- |
| `radioChange` | 单个 value 变化触发的事件 | [Function] `(value:string/number/boolean) => void` |

## Exposes

| 名称                 | 说明                   | 类型                                |
| -------------------- | ---------------------- | ----------------------------------- |
| `radioInstance`      | 开始的`el-date-picker` | `InstanceType<typeof ElRadio>`      |
| `radioGroupInstance` | 结束的`el-date-picker` | `InstanceType<typeof ElRadioGroup>` |
