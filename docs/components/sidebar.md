# Sidebar 侧边栏

## 简介

PlusSidebar 侧边栏，根据路由信息支持多级展示，可自定义展示。

## 基础用法

:::demo

sidebar/basic

:::

## 横向用法

:::demo

sidebar/horizontal

:::

## 自定义菜单显示 (renderTitle)

:::demo

sidebar/render-menu-item-title

:::

## 自定义菜单显示 (jsx/tsx)

:::demo

sidebar/menu-item-title-tsx

:::

## 自定义菜单显示 (插槽)

:::demo

sidebar/menu-item-title-slots

:::

## Sidebar API

## Sidebar Attributes

| 名称                        | 说明                     | 类型                                                                           | 默认值  | 是否必须 |
| --------------------------- | ------------------------ | ------------------------------------------------------------------------------ | ------- | -------- |
| `routes`                    | 侧边栏的路由信息         | `array` [PlusRouteRecordRaw[]](/components/type.html#plusrouterecordraw)       | `[]`    | 否       |
| `collapse/v-model:collapse` | 侧边栏闭合               | `boolean`                                                                      | `false` | 否       |
| `width`                     | 侧边栏不闭合时的宽度     | `number / string`                                                              | `200`   | 否       |
| `renderTitle`               | 自定义菜单每项标题显示   | `function` <docs-tip content='(route:PlusRouteRecordRaw) => VNode'></docs-tip> |         | 否       |
| `renderMenuItem`            | 自定义 菜单的 menuItem   | `function` <docs-tip content='(route:PlusRouteRecordRaw) => VNode'></docs-tip> |         | 否       |
| `renderSubMenuItem`         | 自定义 菜单的 subMenu    | `function` <docs-tip content='(route:PlusRouteRecordRaw) => VNode'></docs-tip> |         | 否       |
| `renderMenuExtra`           | 自定义在菜单头和菜单之间 | `function` <docs-tip content='(route:PlusRouteRecordRaw) => VNode'></docs-tip> |         | 否       |
| ...                         | ...                      | ...                                                                            | ...     | ...      |

:::tip 提示
**`...`表示同时支持所有 `el-menu` Attributes**
:::

## Sidebar Events

| 名称             | 说明             | 类型                                                                  |
| ---------------- | ---------------- | --------------------------------------------------------------------- |
| `toggleCollapse` | 侧边栏闭合时触发 | `function` <docs-tip content='(collapse:boolean) => void'></docs-tip> |

## Sidebar Slots

| 插槽名               | 说明                     | 作用域插槽参数                                                       |
| -------------------- | ------------------------ | -------------------------------------------------------------------- |
| `sidebar-item`       | 自定义菜单的 menuItem    | route [PlusRouteRecordRaw](/components/type.html#plusrouterecordraw) |
| `sidebar-sub`        | 自定义菜单的 subMenu     | route [PlusRouteRecordRaw](/components/type.html#plusrouterecordraw) |
| `sidebar-item-title` | 自定义菜单每项标题显示   | route [PlusRouteRecordRaw](/components/type.html#plusrouterecordraw) |
| `sidebar-extra`      | 自定义在菜单头和菜单之间 | route [PlusRouteRecordRaw](/components/type.html#plusrouterecordraw) |

## Exposes

| 名称                  | 说明           | 类型                                               |
| --------------------- | -------------- | -------------------------------------------------- |
| `collapse`            | 侧边栏闭合状态 | `boolean`                                          |
| `toggleCollapse`      | 切换侧边栏     | `function`<docs-tip content='()=>void'></docs-tip> |
| `plusSidebarInstance` | el-menu 的实例 | `object`                                           |
