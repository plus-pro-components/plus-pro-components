# Descriptions 描述列表

## 基础用法

:::demo

descriptions/basic

:::

## 自定义内容 (插槽)

<el-tag>v0.0.2</el-tag>

PlusDescriptions 组件会自动根据配置项的 prop 生成对应的插槽， 插槽的生成规则就是 固定 key 值 **[ plus-desc- ]** 然后加上 配置项的 prop。

:::warning 注意
**插槽 的优先级低于 `renderDescriptionsItem`，高于`render`和`renderHTML`**。
:::

:::demo

descriptions/slot

:::

## 自定义内容 (renderDescriptionsItem/jsx)

<el-tag>v0.0.2</el-tag>

自定义内容支持 `renderDescriptionsItem`，`render`和`renderHTML`，优先级从高到低。 参考配置[columns](/components/config.html)

:::demo

descriptions/render

:::

## 自定义 label (插槽)

<el-tag>v0.0.2</el-tag>

PlusDescriptions 组件会自动根据配置项的 prop 生成对应的插槽， 插槽的生成规则就是 固定 key 值 **[ plus-desc-label- ]** 然后加上 配置项的 prop。

:::warning 注意
**插槽 的优先级低于 renderDescriptionsLabel**。
:::

:::demo

descriptions/slot-label

:::

## 自定义 label (renderDescriptionsLabel/jsx)

<el-tag>v0.0.2</el-tag>

:::warning 注意
**renderDescriptionsLabel 的优先级高于插槽**。
:::

:::demo

descriptions/render-label

:::

## Descriptions API

## Descriptions Attributes

| 名称      | 说明             | 类型                                           | 默认值 | 是否必须 |
| --------- | ---------------- | ---------------------------------------------- | ------ | -------- |
| `columns` | 描述列表配置信息 | `array`[PlusColumn[]](/components/config.html) | `[]`   | 是       |
| `data`    | 描述列表数据     | `object`                                       | `{}`   | 是       |
| ...       | ...              | ...                                            | ...    | ...      |

:::tip 提示
**`...`表示同时支持所有 [el-descriptions](https://element-plus.org/zh-CN/component/descriptions.html#descriptions-attributes) Attributes**
:::

## Descriptions Slots

| 插槽名                                      | 说明                                                         | 作用域插槽参数         |
| ------------------------------------------- | ------------------------------------------------------------ | ---------------------- |
| `plus-desc-*` <el-tag>v0.0.2</el-tag>       | 自定义描述，组件会自动根据配置项的 prop 生成对应的插槽       | `{value,data,column}`  |
| `plus-desc-label-*` <el-tag>v0.0.2</el-tag> | 自定义描述 label，组件会自动根据配置项的 prop 生成对应的插槽 | `{label,data, column}` |
| ...                                         | ...                                                          | ...                    |

:::tip 提示
**`...`表示同时支持所有 [el-descriptions](https://element-plus.org/zh-CN/component/descriptions.html#descriptions-slots) Slots**
:::
