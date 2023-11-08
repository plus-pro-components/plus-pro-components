# Layout

## 简介

PlusLayout 是由 [PlusBreadcrumb ](/components/breadcrumb.html)， [PlusHeader ](/components/header.html)， [PlusSidebar ](/components/sidebar.html)三个组件组合而成。

## 基础用法

:::demo

layout/basic

:::

## Layout API

## Layout Attributes

| 名称              | 说明                    | 类型                                                                          | 默认值 | 是否必须 |
| ----------------- | ----------------------- | ----------------------------------------------------------------------------- | ------ | -------- |
| `breadcrumbProps` | PlusBreadcrumb 的 props | `object` [PlusBreadcrumb ](/components/breadcrumb.html#breadcrumb-attributes) |        | 否       |
| `headerProps`     | PlusHeader 的 props     | `object`[PlusHeader ](/components/header.html#header-attributes)              |        | 否       |
| `sidebarProps`    | PlusSidebar 的 props    | `object`[PlusSidebar ](/components/sidebar.html#sidebar-attributes)           |        | 否       |

## Exposes

| 名称                  | 说明               | 类型     |
| --------------------- | ------------------ | -------- |
| `plusSidebarInstance` | PlusSidebar 的实例 | `object` |

## Slots

| 插槽名                  | 说明                                                              | 作用域插槽参数                                                       |
| ----------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| `default`               | 内容，一般需要给 RouterView 组件，配合路由信息展示页面            |                                                                      |
| `breadcrumb-item-title` | 自定义[PlusBreadcrumb ](/components/breadcrumb.html)面包屑显示    | route [PlusRouteRecordRaw](/components/type.html#plusrouterecordraw) |
| `header-left`           | 自定义[PlusHeader ](/components/header.html)头部左侧              | `{logo,title}`                                                       |
| `header-right`          | 自定义[PlusHeader ](/components/header.html)头部右侧              | `{userInfo,title}`                                                   |
| `sidebar-item`          | 自定义 [PlusSidebar ](/components/sidebar.html)菜单的 menuItem    | route [PlusRouteRecordRaw](/components/type.html#plusrouterecordraw) |
| `sidebar-sub`           | 自定义 [PlusSidebar ](/components/sidebar.html)菜单的 subMenu     | route [PlusRouteRecordRaw](/components/type.html#plusrouterecordraw) |
| `sidebar-item-title`    | 自定义 [PlusSidebar ](/components/sidebar.html)菜单每项标题显示   | route [PlusRouteRecordRaw](/components/type.html#plusrouterecordraw) |
| `sidebar-extra`         | 自定义 [PlusSidebar ](/components/sidebar.html)在菜单头和菜单之间 | route [PlusRouteRecordRaw](/components/type.html#plusrouterecordraw) |
