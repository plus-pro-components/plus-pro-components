# Breadcrumb 面包屑

## 简介

PlusBreadcrumb 展示面包屑。

## 基础用法

:::demo

breadcrumb/basic

:::

## 不显示某一级

路由信息的`meta` 中添加 `hiddenInBreadcrumb: true`即可。 路由信息配置[ PlusRouteRecordRaw](/components/type.html#plusrouterecordraw)

:::demo

breadcrumb/hidden

:::

## 自定义 (renderTitle)

:::warning 注意
**render 函数的优先级高于插槽**
:::

:::demo

breadcrumb/render

:::

## 自定义 (jsx/tsx)

:::demo

breadcrumb/tsx

:::

## 自定义 (插槽)

:::warning 注意
**插槽优先级低于 render**
:::

:::demo

breadcrumb/slots

:::

## Breadcrumb API

## Breadcrumb Attributes

| 名称          | 说明                                           | 类型                                                                                    | 默认值  | 是否必须 |
| ------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------- | ------- | -------- |
| `routes`      | 面包屑的路由信息，不传默认取的是 route.matched | `array` [PlusRouteRecordRaw[]](/components/type.html#plusrouterecordraw)                |         | 否       |
| `replace`     | 面包屑跳转时是否是替换模式                     | `boolean`                                                                               | `false` | 否       |
| `renderTitle` | 自定义 面包屑显示                              | `function` <docs-tip content='(route:PlusRouteRecordRaw) => VNode / string'></docs-tip> |         | 否       |
| ...           | ...                                            | ...                                                                                     | ...     | ...      |

:::tip 提示
**`...`表示同时支持所有 [el-breadcrumb](https://element-plus.org/zh-CN/component/breadcrumb.html#breadcrumb-attributes) Attributes**
:::

## Breadcrumb Slots

| 插槽名                  | 说明              | 作用域插槽参数                                                       |
| ----------------------- | ----------------- | -------------------------------------------------------------------- |
| `breadcrumb-item-title` | 自定义 面包屑显示 | route [PlusRouteRecordRaw](/components/type.html#plusrouterecordraw) |

:::warning 注意
**render 函数的优先级高于插槽**
:::
