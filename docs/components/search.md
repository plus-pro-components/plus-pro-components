# Search 搜索

## 基础用法

:::demo

search/basic

:::

## 显示个数

配置 `show-number` 属性为显示个数，默认值 2。

:::demo

search/show-number

:::

## 展开收缩隐藏

配置 `hasUnfold` 属性为`false`展开收缩隐藏，同时默认值显示所有搜索框。

:::demo

search/hide-unfold

:::

## 异步数据用法

[PlusColumn](/components/config.html) 配置中的 `options` 支持数，函数和 Promise。
[PlusColumn](/components/config.html) 配置中的 `fieldProps` 支持对象 object，函数和 Promise。

:::demo

search/async

:::

## Search API

## Search Attributes

| 名称                    | 说明                     | 类型                                                                                     | 默认值  | 是否必须 |
| ----------------------- | ------------------------ | ---------------------------------------------------------------------------------------- | ------- | -------- |
| `model-value / v-model` | 搜索表单绑定值           | `object`[FieldValues](/components/type.html#fieldvalues)                                 |         | 否       |
| `columns`               | 搜索配置信息             | `array` [PlusColumn[]](/components/config.html)                                          | `[]`    | 是       |
| `labelWidth`            | el-form 的 labelWidth    | `string`                                                                                 | `84px`  | 否       |
| `labelPosition`         | el-form 的 labelPosition | `string` <docs-tip content="'left' / 'right' / 'top'"></docs-tip>                        | `left`  | 否       |
| `labelSuffix`           | labelSuffix labelSuffix  | `string`                                                                                 | `:`     | 否       |
| `hasFooter`             | 是否需要全部按钮         | `boolean`                                                                                | `true`  | 否       |
| `hasReset`              | 是否需要底部按钮 `重置`  | `boolean`                                                                                | `true`  | 否       |
| `hasUnfold`             | 是否显示展开收缩按钮     | `boolean`                                                                                | `true`  | 否       |
| `searchLoading`         | 查询按钮 loading         | `boolean`                                                                                | `false` | 否       |
| `searchText`            | 查询按钮文字             | `string`                                                                                 | `查询`  | 否       |
| `resetText`             | 重置按钮文字             | `string`                                                                                 | `重置`  | 否       |
| `inline`                | 一行内显示               | `boolean`                                                                                | `true`  | 否       |
| `showNumber`            | 默认显示个数             | `number`                                                                                 | `2`     | 否       |
| `rowProps`              | el-row 属性              | `object`[RowProps](https://element-plus.org/zh-CN/component/layout.html#row-attributes)  |         | 否       |
| `colProps`              | el-col 属性              | `object` [ColProps](https://element-plus.org/zh-CN/component/layout.html#col-attributes) |         | 否       |
| `rules`                 | 表单校验                 | `object` [FormRules](https://element-plus.org/zh-CN/component/form.html#form-attributes) | `{}`    | 否       |
| ...                     | ...                      | ...                                                                                      | ...     | ...      |

:::tip 提示
**`...`表示同时支持所有 `el-form` Attributes** ，model 参数已在组件内部处理，一般不需要传。
:::

## Search Events

| 名称     | 说明                   | 类型                                                                     |
| -------- | ---------------------- | ------------------------------------------------------------------------ |
| `search` | 点击查询按钮触发的事件 | `function` <docs-tip content='(values: FieldValues) => void'></docs-tip> |
| `change` | 表单变化触发的事件     | `function` <docs-tip content='(values: FieldValues) => void'></docs-tip> |
| `reset`  | 点击重置按钮触发的事件 | `function` <docs-tip content='() => void'></docs-tip>                    |

## Search Slots

| 插槽名   | 说明         |
| -------- | ------------ |
| `footer` | 表单底部按钮 |

## Exposes

| 名称           | 说明           | 类型                                                                 |
| -------------- | -------------- | -------------------------------------------------------------------- |
| `formInstance` | `el-form` 实例 | `object` <docs-tip content="InstanceType<typeof ElForm>"></docs-tip> |

**支持所有[ElForm 方法](https://element-plus.org/zh-CN/component/form.html#form-exposes)**

::: tip 提示
如 `validate`,`validateField`等
:::
