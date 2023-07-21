# Table 表格

## 基础用法

:::demo

table/basic

:::

## 自定义操作栏

actionBar 的`buttonType` 支持 `button` 和 `link`, 对应 element plus 的 ElButton 和 ElLink 组件

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

可校验
:::demo

table/cell-edit

:::

## 高级表格

:::demo

table/advanced

:::

## Table API

## Table Attributes

| 名称                | 说明                    | 类型                                                                                                                                                                                    | 默认值                                       | 是否必须 |
| ------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| `columns`           | 表格配置信息            | [PlusColumn[]](/components/config.html)                                                                                                                                                 | `[]`                                         | 是       |
| `tableData`         | 表格数据                | `any[]`                                                                                                                                                                                 | `[]`                                         | 是       |
| `pagination`        | 分页参数                | [PlusPaginationProps](/components/pagination.html#pagination-attributes)                                                                                                                | [见下文](/components/table.html#pagination)  | 否       |
| `actionBar`         | 操作栏参数              | [ActionBarProps](/components/type.html#actionbarprops)                                                                                                                                  | [见下文](/components/table.html#actionBar)   | 否       |
| `hasTableHeader`    | 是否标题栏              | `boolean`                                                                                                                                                                               | `false`                                      | 否       |
| `isShowNumber`      | 是否需要序号            | `boolean`                                                                                                                                                                               | `false`                                      | 否       |
| `isSelection`       | 是否是多选表格          | `boolean`                                                                                                                                                                               | `false`                                      | 否       |
| `dragSortable`      | 表格拖拽配置            | [SortableOptions](http://www.sortablejs.com/options.html)/ `boolean`                                                                                                                    | `false`                                      | 否       |
| `hasExpand`         | 是否需要展开行          | `boolean`                                                                                                                                                                               | `false`                                      | 否       |
| `loadingStatus`     | 加载状态                | `boolean`                                                                                                                                                                               | `false`                                      | 否       |
| `title`             | 自定义表格标题          | `string`                                                                                                                                                                                | ``                                           | 否       |
| `height`            | 表格高度                | `string`                                                                                                                                                                                | ``                                           | 否       |
| `headerCellStyle`   | 表格表头样式            | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties)                                                                                                              | `{backgroundColor: '#F5F9FD',color: '#777'}` | 否       |
| `tableProps`        | `el-table`的其他`props` | `object`                                                                                                                                                                                | `{}`                                         | 否       |
| `indexContentStyle` | 序号栏样式              | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) / `((row: any, index: number) =>`[CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties)) | `{}`                                         | 否       |

**支持所有[ElTable 属性](https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7)**

::: tip 提示
el-table 的其他属性的支持写法 如 `stripe`,`border`,`max-height`等

```html
<PlusTable
  :tableProps="{
  stripe: true,
  stripe: true
  maxHeight: '100vh'
  }"
/>
```

:::

## pagination

`pagination` 默认值

```json
{
  "show": true,
  "total": 0,
  "pageSizeList": [
    10, 20, 30,

    40, 50, 100, 200, 300, 400, 500
  ],
  "modelValue": { "page": 1, "pageSize": 20 }
}
```

## actionBar

`actionBar` 默认值

```json
{
  "show": true,
  "fixed": "right",
  "buttonType": "link",
  "optionColumnWidth": 300,
  "buttonCount": 3,
  "buttonsName": {}
}
```

## Table Events

| 名称               | 说明                                 | 类型                                                                                      |
| ------------------ | ------------------------------------ | ----------------------------------------------------------------------------------------- |
| `paginationChange` | 分页改变触发                         | [Function] `(pageInfo: PageInfo) => void`                                                 |
| `clickAction`      | 点击操作栏触发                       | [Function] `({row: any, column: any, event: any}) => void`                                |
| `dragSortEnd`      | 拖拽排序列图标触发                   | [Function] `({newIndex: number, oldIndex: number}) => void`                               |
| `formChange`       | 表格中有可以编辑的表单项目改变时触发 | [Function] `({ value: any; prop: string; row: any; index: number; column: any }) => void` |

**支持所有[ElTable 事件](https://element-plus.org/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6)**

::: tip 提示
el-table 的其他事件的支持写法 如 `select`,`select-all`,`row-click`等

```html
<PlusTable
  :tableProps="{
  onSelect: () => {},
  onSelectAll: () => {}
  onRowClick: () => {}
  }"
/>
```

:::

## Table Slots

| 插槽名    | 说明       |
| --------- | ---------- |
| `title`   | 表格标题   |
| `toolbar` | 工具栏左侧 |
| `expand`  | 展开行     |

**支持所有[ElTable 插槽](https://element-plus.org/zh-CN/component/table.html#table-%E6%8F%92%E6%A7%BD)**

::: tip 提示
el-table 的其他插槽 如 `append`,`empty`等
:::

## Table Exposes

| 名称            | 说明             | 类型                                      |
| --------------- | ---------------- | ----------------------------------------- |
| `tableInstance` | `el-table`的实例 | `import('element-plus')['TableInstance']` |

**支持所有[ElTable 方法](https://element-plus.org/zh-CN/component/table.html#table-%E6%96%B9%E6%B3%95)**

::: tip 提示
如 `clearSelection`,`getSelectionRows`等
:::
