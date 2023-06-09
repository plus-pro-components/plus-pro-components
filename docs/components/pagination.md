# Pagination 分页

## 基础用法

:::demo

pagination/basic

:::

## Pagination API

### Pagination Attributes

| 名称                    | 说明     | 类型       | 默认值                                          | 是否必须 |
| ----------------------- | -------- | ---------- | ----------------------------------------------- | -------- |
| `model-value / v-model` | 分页值   | `PageInfo` | `{  page: 1,pageSize: 20}`                      | 否       |
| `show`                  | 是否显示 | `boolean`  | `true`                                          | 否       |
| `total`                 | 总数     | `number`   | `0`                                             | 否       |
| `pageSizeList`          | 分页列表 | `number[]` | `[10, 20, 30, 40, 50, 100, 200, 300, 400, 500]` | 否       |
| ...                     | ...      | ...        | ...                                             | ...      |

**`...`表示同时支持所有 `el-pagination` Attributes**

### Pagination Events

| 名称     | 说明                                 | 类型                                     |
| -------- | ------------------------------------ | ---------------------------------------- |
| `change` | 分页组件 page 或者 pageSize 改变触发 | [Function] `(pageInfo:PageInfo) => void` |
