# Table 表格

## 基础用法

:::demo

table/basic

:::

## 自定义操作栏

actionBar 的`type` 支持 `button`,`icon`和 `link`, 对应 element plus 的 ElButton,ElIcon 和 ElLink 组件。

配置 `confirm` 即可实现二次确认。

配置 `show` 即可实现权限和动态显示。

:::demo

table/action-bar

:::

## 拖动排序

:::demo

table/drag-sort

:::

## 标题栏

:::demo

table/title-bar

:::

## 分页栏

:::demo

table/page-bar

:::

## 可编辑表格 (整体)

:::demo

table/edit-bar

:::

## 可编辑表格 (单行)

可编辑和校验单行，也可以控制单行的每一个单元格的编辑状态和校验。核心方法是 调用 formRefs 里的方法。
:::demo

table/cell-edit

:::

## 自定义表格项和表单项

- 自定义表格项的核心方法是定义 `render`方法。
  `render` 方法可以返回以下三种情况

  - 调用 vue 的[渲染函数 h](https://cn.vuejs.org/guide/extras/render-function.html) 返回一个 `VNode`。
  - 返回一个 [Component](https://cn.vuejs.org/api/built-in-special-elements.html#component)。 （配合[PlusColumn](/components/config.html) 的 `slots`使用 ）
  - 返回一个 [string](https://cn.vuejs.org/api/built-in-special-elements.html#component)。（渲染原生标签，配合[PlusColumn](/components/config.html) 的 `slots`使用 ）

- 自定义表格项还支持 `renderHTML`方法，需要返回一个 HTML 字符串。

- 自定义表单项参考[自定义表单项](/components/form.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A1%A8%E5%8D%95%E9%A1%B9) （
  需要开启 `editable`）

:::demo

table/custom-cell

:::

## 高级表格

:::demo

table/advanced

:::

## Table API

## Table Attributes

| 名称                           | 说明                                       | 类型                                                                                                                                                                                    | 默认值                                       | 是否必须 |
| ------------------------------ | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| `columns`                      | 表格配置信息                               | [PlusColumn[]](/components/config.html)                                                                                                                                                 | `[]`                                         | 是       |
| `tableData`                    | 表格数据                                   | `any[]`                                                                                                                                                                                 | `[]`                                         | 是       |
| `pagination`                   | 分页参数 （默认 `false` 给参数就显示）     | `false`/ [PlusPaginationProps](/components/pagination.html#pagination-attributes)                                                                                                       | `false`                                      | 否       |
| `actionBar`                    | 操作栏参数 （默认 `false` 给参数就显示）   | `false`/ [ActionBarProps](/components/type.html#actionbarprops)                                                                                                                         | `false`                                      | 否       |
| `hasToolbar`                   | 是否需要标题栏                             | `boolean`                                                                                                                                                                               | `true`                                       | 否       |
| `isShowNumber`                 | 是否需要序号                               | `boolean`                                                                                                                                                                               | `false`                                      | 否       |
| `isSelection`                  | 是否是多选表格                             | `boolean`                                                                                                                                                                               | `false`                                      | 否       |
| `dragSortable`                 | 表格拖拽配置 （默认 `false` 给参数就显示） | `false` /[SortableOptions](http://www.sortablejs.com/options.html)                                                                                                                      | `false`                                      | 否       |
| `hasExpand`                    | 是否需要展开行                             | `boolean`                                                                                                                                                                               | `false`                                      | 否       |
| `loadingStatus`                | 加载状态                                   | `boolean`                                                                                                                                                                               | `false`                                      | 否       |
| `title`                        | 自定义表格标题                             | `string`                                                                                                                                                                                | `表格`                                       | 否       |
| `height`                       | 表格高度                                   | `string`                                                                                                                                                                                |                                              | 否       |
| `headerCellStyle`              | 表格表头样式                               | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties)                                                                                                              | `{backgroundColor: '#F5F9FD',color: '#777'}` | 否       |
| `indexContentStyle`            | 序号栏样式                                 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) / `((row: any, index: number) =>`[CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties)) | `{}`                                         | 否       |
| `dragSortableTableColumnProps` | 拖拽栏 el-table-column 的 props            | [RecordType](/components/type.html#recordtype)                                                                                                                                          | `{}`                                         | 否       |
| `indexTableColumnProps`        | 序号栏 el-table-column 的 props            | [RecordType](/components/type.html#recordtype)                                                                                                                                          | `{}`                                         | 否       |
| ...                            | ...                                        | ...                                                                                                                                                                                     | ...                                          | ...      |

**`...`表示同时支持所有[ElTable Attributes](https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7)**

:::tip 提示

el-table 的其他属性写法示例 如 `stripe`,`border`,`fit`等

示例：

```html
<PlusTable :stripe="true" :border="true" :fit="false" />
```

:::

## Table Events

| 名称                       | 说明                                             | 类型                                                                                      |
| -------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `paginationChange`         | 分页改变触发                                     | [Function] `(pageInfo: PageInfo) => void`                                                 |
| `clickAction`              | 点击操作栏触发（需要二次确认的，点击确认时触发） | [ButtonsCallBackParams](/components/type.html#buttonscallbackparams)                      |
| `clickActionConfirmCancel` | 点击操作栏需要二次确认的取消时触发               | [ButtonsCallBackParams](/components/type.html#buttonscallbackparams)                      |
| `dragSortEnd`              | 拖拽排序列图标触发                               | [Function] `({newIndex: number, oldIndex: number}) => void`                               |
| `formChange`               | 表格中有可以编辑的表单项目改变时触发             | [Function] `({ value: any; prop: string; row: any; index: number; column: any }) => void` |
| ...                        | ...                                              | ...                                                                                       |

**`...`表示同时支持所有[ElTable 事件](https://element-plus.org/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6)**

::: tip 提示
el-table 的其他事件写法示例 如 `select`,`select-all`,`row-click`等

示例：

```html
<PlusTable @select="handleSelect" @select-all="handleSelectAll" />
```

:::

## Table Slots

| 插槽名    | 说明       |
| --------- | ---------- |
| `title`   | 表格标题   |
| `toolbar` | 工具栏左侧 |
| `expand`  | 展开行     |
| ...       | ...        |

**`...`表示同时支持所有[ElTable 插槽](https://element-plus.org/zh-CN/component/table.html#table-%E6%8F%92%E6%A7%BD)**

::: tip 提示
el-table 的其他插槽 如 `append`,`empty`等
:::

## Table Exposes

| 名称            | 说明             | 类型                                      |
| --------------- | ---------------- | ----------------------------------------- |
| `tableInstance` | `el-table`的实例 | `import('element-plus')['TableInstance']` |

**拿到 tableInstance 后支持所有[ElTable 方法](https://element-plus.org/zh-CN/component/table.html#table-%E6%96%B9%E6%B3%95)**

::: tip 提示
如 `clearSelection`,`getSelectionRows`等
:::
