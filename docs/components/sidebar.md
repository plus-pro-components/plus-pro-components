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

## 外链

路由信息的`path`给 `/+ 链接` 例： `/https://plus-pro-components.com` 。路由信息配置[ PlusRouteRecordRaw](/components/type.html#plusrouterecordraw)

:::demo

sidebar/external

:::

## 在菜单中不显示某一级

路由信息的`meta` 中添加 `hideInMenu: true`即可。路由信息配置[ PlusRouteRecordRaw](/components/type.html#plusrouterecordraw)

:::demo

sidebar/hidden

:::

## 自定义菜单 icon

路由信息的`meta.icon`支持组件，函数和 VNode。可以支持图片 icon，el-icon，Svg icon，Symbol svg icon, Iconfont icon，Font-awesome icon 等几乎所有常见 icon。 路由信息配置[ PlusRouteRecordRaw](/components/type.html#plusrouterecordraw)

:::demo

sidebar/icon

:::

## 自定义菜单头部区域

自定义菜单头部区域 支持 `renderMenuExtra`渲染函数 和`sidebar-extra`插槽， `renderMenuExtra` 优先级高于 插槽。

:::demo

sidebar/extra

:::

## 自定义菜单显示 (renderTitle)

:::warning 注意
**render 函数的优先级高于插槽**
:::

:::demo

sidebar/render-menu-item-title

:::

## 自定义菜单显示 (jsx/tsx)

:::demo

sidebar/menu-item-title-tsx

:::

## 自定义菜单显示 (插槽)

:::warning 注意
**插槽优先级低于 render**
:::

:::demo

sidebar/menu-item-title-slots

:::

## Sidebar API

## Sidebar Attributes

| 名称                        | 说明                     | 类型                                                                                    | 默认值  | 是否必须 |
| --------------------------- | ------------------------ | --------------------------------------------------------------------------------------- | ------- | -------- |
| `routes`                    | 侧边栏的路由信息         | `array` [PlusRouteRecordRaw[]](/components/type.html#plusrouterecordraw)                | `[]`    | 否       |
| `collapse/v-model:collapse` | 侧边栏闭合               | `boolean`                                                                               | `false` | 否       |
| `width`                     | 侧边栏不闭合时的宽度     | `number / string`                                                                       | `200`   | 否       |
| `renderTitle`               | 自定义菜单每项标题显示   | `function` <docs-tip content='(route:PlusRouteRecordRaw) => VNode / string'></docs-tip> |         | 否       |
| `renderMenuItem`            | 自定义 菜单的 menuItem   | `function` <docs-tip content='(route:PlusRouteRecordRaw) => VNode / string'></docs-tip> |         | 否       |
| `renderSubMenuItem`         | 自定义 菜单的 subMenu    | `function` <docs-tip content='(route:PlusRouteRecordRaw) => VNode / string'></docs-tip> |         | 否       |
| `renderMenuExtra`           | 自定义在菜单头和菜单之间 | `function` <docs-tip content='(route:PlusRouteRecordRaw) => VNode / string'></docs-tip> |         | 否       |
| ...                         | ...                      | ...                                                                                     | ...     | ...      |

:::tip 提示
**`...`表示同时支持所有 [el-menu](https://element-plus.org/zh-CN/component/menu.html#menu-attributes) Attributes**
:::

## Sidebar Events

| 名称             | 说明                     | 类型                                                                  |
| ---------------- | ------------------------ | --------------------------------------------------------------------- |
| `toggleCollapse` | 侧边栏闭合（开启）时触发 | `function` <docs-tip content='(collapse:boolean) => void'></docs-tip> |

## Sidebar Slots

| 插槽名               | 说明                     | 作用域插槽参数                                                       |
| -------------------- | ------------------------ | -------------------------------------------------------------------- |
| `sidebar-item`       | 自定义菜单的 menuItem    | route [PlusRouteRecordRaw](/components/type.html#plusrouterecordraw) |
| `sidebar-sub`        | 自定义菜单的 subMenu     | route [PlusRouteRecordRaw](/components/type.html#plusrouterecordraw) |
| `sidebar-item-title` | 自定义菜单每项标题显示   | route [PlusRouteRecordRaw](/components/type.html#plusrouterecordraw) |
| `sidebar-extra`      | 自定义在菜单头和菜单之间 | route [PlusRouteRecordRaw](/components/type.html#plusrouterecordraw) |

:::warning 注意
**render 函数的优先级高于插槽**
:::

## Exposes

| 名称                  | 说明           | 类型                                               |
| --------------------- | -------------- | -------------------------------------------------- |
| `collapse`            | 侧边栏闭合状态 | `boolean`                                          |
| `toggleCollapse`      | 切换侧边栏     | `function`<docs-tip content='()=>void'></docs-tip> |
| `plusSidebarInstance` | el-menu 的实例 | `object`                                           |
