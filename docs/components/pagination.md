# Pagination 分页

## 基础用法

:::demo

pagination/basic

:::

## 对齐方式

支持 `left`、`right`、`center`(<el-tag>v0.1.28</el-tag>新增) 三种对齐方式。

:::demo

pagination/align

:::

## 左右侧内容 自定义

<el-tag>v0.0.2</el-tag>

`align` 属性默认是 `right`，插槽 `pagination-left` 默认生效。要使用`pagination-right` 插槽，需要设置`align` 属性为 `left`。

<el-tag>v0.1.28</el-tag>
设置 `align` 为 `center` 时分页器将居中显示，且左右两个插槽都可使用。
:::demo

pagination/slot

:::

## Pagination API

## Pagination Attributes

| 名称                    | 说明     | 类型                                                                                                           | 默认值                                          | 是否必须 |
| ----------------------- | -------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | -------- |
| `align`                 | 对齐方式 | `string` <docs-tip content="'left' / 'right' / 'center'"></docs-tip> （`center`<el-tag>v0.1.28</el-tag> 新增） | `right`                                         | 否       |
| `model-value / v-model` | 分页值   | `object` [PageInfo](/components/type.html#pageinfo)                                                            | `{  page: 1,pageSize: 10}`                      | 否       |
| `total`                 | 总数     | `number`                                                                                                       | `0`                                             | 否       |
| `pageSizeList`          | 分页列表 | `array` <docs-tip content="number[]"></docs-tip>                                                               | `[10, 20, 30, 40, 50, 100, 200, 300, 400, 500]` | 否       |
| ...                     | ...      | ...                                                                                                            | ...                                             | ...      |

:::tip 提示
**`...`表示同时支持所有 [el-pagination](https://element-plus.org/zh-CN/component/pagination.html#%E5%B1%9E%E6%80%A7) Attributes**
:::

## Pagination Events

| 名称     | 说明                                 | 类型                                                                   |
| -------- | ------------------------------------ | ---------------------------------------------------------------------- |
| `change` | 分页组件 page 或者 pageSize 改变触发 | `function` <docs-tip content='(pageInfo:PageInfo) => void'></docs-tip> |

::: tip 提示
el-pagination 的其他事件的支持写法 如 prev-click，如下示例
:::
示例：

```html
<PlusPagination @prev-click="handlePrevClick" />
```

## Pagination Slots

| 插槽名                                    | 说明                                                                                              |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `pagination-left`<el-tag>v0.0.2</el-tag>  | 分页器左侧内容 ，`align` 为 `right` 或 `center`（<el-tag>v0.1.28</el-tag> 新增） 时生效。 |
| `pagination-right`<el-tag>v0.0.2</el-tag> | 分页器右侧内容 ，`align` 为 `left` 或 `center`（<el-tag>v0.1.28</el-tag> 新增） 时生效。  |
