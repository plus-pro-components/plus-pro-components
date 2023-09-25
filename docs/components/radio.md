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

## 定义属性

:::demo

radio/custom

:::

## Radio API

## Radio Attributes

| 名称                    | 说明                 | 类型                                                     | 默认值 | 是否必须 |
| ----------------------- | -------------------- | -------------------------------------------------------- | ------ | -------- |
| `model-value / v-model` | 选中项绑定值         | `string/ number/ boolean`                                |        | 否       |
| `options`               | radio 的数据源       | `array` [OptionsRow[]](/components/type.html#optionsrow) | `[]`   | 是       |
| `isCancel`              | 是否可以取消选中状态 | `boolean`                                                | `true` | 否       |
| ...                     | ...                  | ...                                                      | ...    | ...      |

**`...`表示同时支持所有[ElRadioGroup Attributes](https://element-plus.org/zh-CN/component/radio.html#radiogroup-attributes)，不包含 RadioButton 的属性**

:::tip 提示

el-radio 的 props 使用 `options` 中的 `fieldItemProps` 。
:::

## Radio Events

| 名称     | 说明                      | 类型                                                                             |
| -------- | ------------------------- | -------------------------------------------------------------------------------- |
| `change` | 单个 value 变化触发的事件 | `function` <docs-tip content='(value:string/number/boolean) => void'></docs-tip> |

## Exposes

| 名称                 | 说明                  | 类型                                                                      |
| -------------------- | --------------------- | ------------------------------------------------------------------------- |
| `radioGroupInstance` | `el-radio-group` 实例 | `object`<docs-tip content='InstanceType<typeof ElRadioGroup>'></docs-tip> |
| `radioInstance`      | `el-radio`实例        | `object`<docs-tip content='InstanceType<typeof ElRadio>'></docs-tip>      |
