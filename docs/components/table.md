# Table 表格

## 基础用法

:::demo

table/basic

:::

## Table API

## Table Attributes

| 名称             | 说明                      | 类型                                                                     | 默认值                                      | 是否必须 |
| ---------------- | ------------------------- | ------------------------------------------------------------------------ | ------------------------------------------- | -------- |
| `columns`        | 表格配置信息              | [PlusColumn[]](/components/config.html)                                  | `[]`                                        | 是       |
| `tableData`      | 表格数据                  | `any[]`                                                                  | `[]`                                        | 是       |
| `pagination`     | 分页参数                  | [PlusPaginationProps](/components/pagination.html#pagination-attributes) | [见下文](/components/table.html#pagination) | 否       |
| `actionBar`      | 操作栏参数                | [ActionBarProps](/components/type.html#actionbarprops)                   | [见下文](/components/table.html#actionBar)  | 否       |
| `isShowNumber`   | 是否需要序号              | `boolean`                                                                | `true`                                      | 否       |
| `isSelection`    | 是否是多选表格            | `boolean`                                                                | `false`                                     | 否       |
| `isShowDragSort` | 表格是否可拖拽            | `boolean`                                                                | `false`                                     | 否       |
| `hasExpand`      | 是否需要展开行            | `boolean`                                                                | `true`                                      | 否       |
| `loadingStatus`  | 加载状态                  | `boolean`                                                                | `boolean`                                   | 否       |
| `tableTitle`     | 自定义表格标题            | `string`                                                                 | ``                                          | 否       |
| `height`         | 表格高度                  | `string`                                                                 | ``                                          | 否       |
| `tableProps`     | `el-table` 的其他 `props` | `object`                                                                 | `{}`                                        | 否       |

## pagination

`pagination` 默认值

```json
{
  "show": true,
  "total": 0,
  "pageSizeList": [10, 20, 30, 40, 50, 100, 200, 300, 400, 500],
  "modelValue": {
    "page": 1,
    "pageSize": 20
  }
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

| 名称                  | 说明                                 | 类型                                                                                      |
| --------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------- |
| `subPaginationChange` | 分页改变触发                         | [Function] `(pageInfo: PageInfo) => void`                                                 |
| `subSelected`         | 多选触发                             | [Function] `(data:any) => void`                                                           |
| `subCurrent`          | 选中表格行触发                       | [Function] `(data:any) => void`                                                           |
| `subExpandChange`     | 点击展开行触发                       | [Function] `(data:any) => void`                                                           |
| `subSortChange`       | 点击排序触发                         | [Function] `(data:any) => void`                                                           |
| `subClickRow`         | 点击行触发                           | [Function] `(row: any, column: any, event: any) => void`                                  |
| `subClickButton`      | 点击操作栏触发                       | [Function] `({row: any, column: any, event: any}) => void`                                |
| `subSortEnd`          | 拖拽排序列图标触发                   | [Function] `({newIndex: number, oldIndex: number}) => void`                               |
| `subChange`           | 表格中有可以编辑的表单项目改变时触发 | [Function] `({ value: any; prop: string; row: any; index: number; column: any }) => void` |

## Table Slots

| 插槽名    | 说明       |
| --------- | ---------- |
| `title`   | 表格标题   |
| `toolbar` | 工具栏左侧 |
| `expand`  | 展开行     |
