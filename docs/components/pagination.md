# Pagination 分页

## 基础用法

:::demo

pagination/basic

:::

## Pagination API

## Pagination Attributes

| 名称                    | 说明     | 类型                                                      | 默认值                                          | 是否必须 |
| ----------------------- | -------- | --------------------------------------------------------- | ----------------------------------------------- | -------- |
| `align`                 | 对齐方式 | `string` <docs-tip content="'left' / 'right'"></docs-tip> | `right`                                         | 否       |
| `model-value / v-model` | 分页值   | `object` [PageInfo](/components/type.html#pageinfo)       | `{  page: 1,pageSize: 10}`                      | 否       |
| `total`                 | 总数     | `number`                                                  | `0`                                             | 否       |
| `pageSizeList`          | 分页列表 | `array` <docs-tip content="number[]"></docs-tip>          | `[10, 20, 30, 40, 50, 100, 200, 300, 400, 500]` | 否       |
| ...                     | ...      | ...                                                       | ...                                             | ...      |

:::tip 提示
**`...`表示同时支持所有 `el-pagination` Attributes**
:::

## Pagination Events

| 名称     | 说明                                 | 类型                                                                   |
| -------- | ------------------------------------ | ---------------------------------------------------------------------- |
| `change` | 分页组件 page 或者 pageSize 改变触发 | `function` <docs-tip content='(pageInfo:PageInfo) => void'></docs-tip> |

::: tip 提示
el-pagination 的其他事件的支持写法 如 prev-click

```html
<PlusPagination @prev-click="handlePrevClick" />
```
