# Breadcrumb 面包屑

## 简介

PlusBreadcrumb 展示面包屑。

## 基础用法

:::demo

breadcrumb/basic

:::

## 不显示某一级

路由信息的`meta` 中添加 `hiddenBreadcrumb: true`即可。

:::demo

breadcrumb/hidden

:::

## 自定义 (renderTitle)

:::demo

breadcrumb/render

:::

## 自定义 (jsx/tsx)

:::demo

breadcrumb/tsx

:::

## 自定义 (插槽)

:::demo

breadcrumb/slots

:::

## Breadcrumb API

## Breadcrumb Attributes

| 名称          | 说明                                           | 类型                                                                           | 默认值  | 是否必须 |
| ------------- | ---------------------------------------------- | ------------------------------------------------------------------------------ | ------- | -------- |
| `routes`      | 面包屑的路由信息，不传默认取的是 route.matched | `array` [PlusRouteRecordRaw[]](/components/type.html#plusrouterecordraw)       |         | 否       |
| `replace`     | 面包屑跳转时是否是替换模式                     | `boolean`                                                                      | `false` | 否       |
| `renderTitle` | 自定义 面包屑显示                              | `function` <docs-tip content='(route:PlusRouteRecordRaw) => VNode'></docs-tip> |         | 否       |
| ...           | ...                                            | ...                                                                            | ...     | ...      |

:::tip 提示
**`...`表示同时支持所有 `el-breadcrumb` Attributes**
:::

## Breadcrumb Slots

| 插槽名                  | 说明              |
| ----------------------- | ----------------- |
| `breadcrumb-item-title` | 自定义 面包屑显示 |
