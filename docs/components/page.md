# Page 页面

Page 组件是 [PlusSearch](/components/search.html)和 [PlusTable](/components/table.html) 组件的组合。

## 基础用法

:::demo

page/basic

:::

## 搜索值响应（v-model:search-values）

<el-tag>v0.1.31</el-tag>

通过 `v-model:search-values` 绑定搜索表单的值，当搜索表单中任意字段发生变化时，绑定的值会实时更新。同时支持 `searchChange` 事件，可以获取变化的字段信息。

:::demo

page/model-value

:::

## 手动控制搜索值

<el-tag>v0.1.17</el-tag>

可使用实例中提供的方法`setSearchFieldsValue` `getSearchFieldsValue` `clearSearchFieldsValue`手动控制搜索值。

:::demo

page/setValue

:::

## 搜索参数处理

配置`before-search-submit`方法，可在请求前替换参数名。

:::demo

page/replace-search-key

:::

## 默认搜索参数

配置 `search.defaultValues`属性，设置默认搜索参数，当页面**初始化**和**点击搜索重置按钮**时 [PlusSearch](/components/search.html) 组件的`model-value / v-model` 会被设置为 defaultValues。

:::demo

page/default-search-values

:::

## 默认分页参数

配置 `defaultPageInfo`属性，可以修改默认的分页参数，`defaultPageInfo`的`TS`类型为[PageInfo](/components/type.html#pageinfo)。配置`defaultPageSizeList`属性可以修改分页列表，其他分页属性配置可以使用`pagination`属性。

:::demo

page/default-page

:::

## 自定义搜索按钮

使用`search-footer` 自定义搜索按钮.

:::demo

page/search-footer

:::

## 自定义搜索表单插槽的使用

<el-tag>v0.1.25</el-tag>
当 [PlusPage](/components/page.html) 组件的`search-slot`属性为`true`时，表单相关的
`plus-field-*`、
`plus-label-*`（只对搜索表单生效）、
`plus-extra-*`、
`plus-previous-*`、
插槽会作用于 到 [PlusSearch](/components/search.html) 组件，默认插槽都是作用于 [PlusTable](/components/table.html) 组件的（表格开启编辑时）。

:::demo

page/search-slot

:::

## 搜索和表格展示顺序控制

<el-tag>v0.1.4</el-tag>

默认情况下搜索和表格会按`columns`的顺序展示，搜索可以使用[order](/components/config.html) 参数控制展示顺序(默认值为`0`)，[order](/components/config.html) 越大越靠前。

:::demo

page/order

:::

## 增删改查 (CRUD)

典型的增删改查。

:::demo

page/crud

:::

## Page API

## Page Attributes

| 名称                                                            | 说明                                                                                                                                                                                                                                       | 类型                                                                                                                           | 默认值                                          | 是否必须 |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- | -------- |
| `search-values / v-model:search-values`<el-tag>v0.1.31</el-tag> | 搜索表单绑定值 <el-text type="warning">（尽量使用 ref 定义绑定的值，以避免 reactive 带来的响应式丢失问题）</el-text>                                                                                                                       | `object`[FieldValues](/components/type.html#fieldvalues)                                                                       |                                                 | 否       |
| `columns`                                                       | 配置信息                                                                                                                                                                                                                                   | `array`[PlusColumn[]](/components/config.html)                                                                                 | `[]`                                            | 是       |
| `request`                                                       | request 是 Page 最重要的 API，request 会接收一个对象。对象中必须要有 data，如果需要手动分页 total 也是必需的。request 会接管 loading 的设置，同时在查询表单查询和 params 参数发生修改时重新执行。同时 查询表单的值和 params 参数也会带入。 | `function`<docs-tip content="(params:PageInfo & { [index: string]: any }) => Promise<{ data: any;total?: number}>"></docs-tip> |                                                 | 是       |
| `search`                                                        | [PlusSearch](/components/search.html) 的 props，不包含`model-value / v-model`，`columns`，`searchLoading`属性。                                                                                                                            | `false` / (`object`[PlusSearchProps](/components/search.html#search-attributes) )                                              | `{}`                                            | 否       |
| `table`                                                         | [PlusTable](/components/table.html) 的 props，不包含`tableData`,`columns`，`loadingStatus`,`pagination`属性。                                                                                                                              | `object`[PlusTableProps](/components/table.html#table-attributes)                                                              | `{}`                                            | 否       |
| `params`                                                        | request 的 params 其他参数，默认会带 pageSize，page 和 [PlusSearch](/components/search.html)组件中的值，它的优先级高于其他配置。                                                                                                           | `object`                                                                                                                       | `{}`                                            | 否       |
| `postData`                                                      | 对通过 request 获取的数据进行处理                                                                                                                                                                                                          | `function`<docs-tip content="<T = any>(data: T[]) => T[]"></docs-tip>                                                          |                                                 | 否       |
| `beforeSearchSubmit`                                            | 搜索之前进行一些修改                                                                                                                                                                                                                       | `function` <docs-tip content="<T = any>(params: T) => T"></docs-tip>                                                           |                                                 | 否       |
| `defaultPageInfo`                                               | 默认分页参数                                                                                                                                                                                                                               | `object` [PageInfo](/components/type.html#pageinfo)                                                                            | `{page:1, pageSize:10}`                         | 否       |
| `defaultPageSizeList`                                           | 默认分页列表                                                                                                                                                                                                                               | `array` <docs-tip content="number[]"></docs-tip>                                                                               | `[10, 20, 30, 40, 50, 100, 200, 300, 400, 500]` | 否       |
| `pagination`                                                    | 分页组件[PlusPagination](/components/pagination.html) 的 props，不包含`total`，`modelValue`，`pageSizeList`。不需要分页可以给`false`(<el-tag>v0.1.0</el-tag> 新增)。                                                                       | `object`[PlusPagination Props](/components/pagination.html#pagination-attributes) \| `false`( <el-tag>v0.1.0</el-tag> 新增)    |                                                 | 否       |
| `isCard`                                                        | 表格和搜索是否需要 el-card 包裹                                                                                                                                                                                                            | `boolean`                                                                                                                      | `true`                                          |
| `dividerProps`<el-tag>v0.1.0</el-tag>                           | [el-divider](https://element-plus.org/zh-CN/component/divider.html#attributes) 的 props                                                                                                                                                    | `object`[ElDividerProps](https://element-plus.org/zh-CN/component/divider.html#attributes) \| `false`                          | `false`                                         | 否       |
| `searchCardProps`                                               | 搜索外层的 [el-card](https://element-plus.org/zh-CN/component/card.html#attributes) 的 props ，当 isCard 为 true 时生效                                                                                                                    | `object`[ElCardProps](https://element-plus.org/zh-CN/component/card.html#attributes)                                           | `{}`                                            | 否       |
| `tableCardProps`                                                | 表格外层的 [el-card](https://element-plus.org/zh-CN/component/card.html#attributes) 的 props ，当 isCard 为 true 时生效                                                                                                                    | `object`[ElCardProps](https://element-plus.org/zh-CN/component/card.html#attributes)                                           | `{}`                                            | 否       |
| `immediate`<el-tag>v0.0.9</el-tag>                              | 是否立即执行`request`获取表格数据,如为`false`,组件渲染完成后将不会主动调用`request`                                                                                                                                                        | `boolean`                                                                                                                      | `true`                                          | 否       |
| `pageInfoMap`<el-tag>v0.1.0</el-tag>                            | request 默认分页参数字段是 `page`, `pageSize`,可以使用此参数自定义分页参数                                                                                                                                                                 | `object` <docs-tip content="{ page?: string; pageSize?: string }"></docs-tip>                                                  | `{page:'page',pageSize:'pageSize'}`             | 否       |
| `searchSlot`<el-tag>v0.1.25</el-tag>                            | 自定义的表单插槽默认作用于 [PlusTable](/components/table.html)， 当`searchSlot`位`true`时， 自定义的表单插槽作用于 [PlusSearch](/components/search.html) 组件 。                                                                           | `boolean`                                                                                                                      | `false`                                         | 否       |
| `resetSearch` <el-tag>v0.1.31</el-tag>                          | 是否在重置后进行搜索                                                                                                                                                                                                                       | `boolean`                                                                                                                      | `true`                                          | 否       |

## Page Events

| 名称                                     | 说明                                                                            | 类型                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `requestError`                           | 数据加载失败时触发                                                              | `function` <docs-tip content='(error: any) => void'></docs-tip>                            |
| `requestComplete`<el-tag>v0.1.5</el-tag> | 数据加载完成时触发                                                              | `function` <docs-tip content='(tableData: any[]) => void'></docs-tip>                      |
| `search`                                 | 点击搜索按钮时触发，（并将 page 置为 1 ，然后重新加载<el-tag>v0.1.8</el-tag> ） | `function` <docs-tip content='(data: FieldValues) => void'></docs-tip>                     |
| `reset`                                  | 点击重置按钮时触发，并将 page 置为 1 ，然后重新加载                             | `function` <docs-tip content='(data: FieldValues) => void'></docs-tip>                     |
| `searchChange`<el-tag>v0.1.31</el-tag>   | 搜索表单中任意字段值变化时触发                                                  | `function` <docs-tip content='(data: FieldValues, column: PlusColumn) => void'></docs-tip> |
| `paginationChange`                       | 分页改变时触发                                                                  | `function` <docs-tip content='(pageInfo: PageInfo) => void'></docs-tip>                    |

::: tip 提示
支持 [PlusSearch](/components/search.html) 和
[PlusTable](/components/table.html) 的所有事件，如 [PlusSearch](/components/search.html) 的`search`, [PlusTable](/components/table.html) 的`row-click`等，如下示例
:::

示例：

```html
<PlusPage :search="{ onSearch:() => {} }" :table="{ onRowClick: () => {} }" />
```

## Page Slots

| 插槽名                                        | 说明                                                                                                                                                                                                                                                        | 作用域插槽参数                                                                              |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `table-title`                                 | [PlusTable](/components/table.html) 表格标题                                                                                                                                                                                                                |                                                                                             |
| `table-toolbar`                               | [PlusTable](/components/table.html) 工具栏左侧                                                                                                                                                                                                              |                                                                                             |
| `table-expand`                                | [PlusTable](/components/table.html) 展开行                                                                                                                                                                                                                  |                                                                                             |
| `table-append`                                | [PlusTable](/components/table.html)（el-table） 最后一行                                                                                                                                                                                                    |                                                                                             |
| `table-empty`                                 | [PlusTable](/components/table.html) （el-table）空状态                                                                                                                                                                                                      |                                                                                             |
| `search-footer`                               | [PlusSearch](/components/search.html) 的 footer                                                                                                                                                                                                             |                                                                                             |
| `pagination-left`<el-tag>v0.0.3</el-tag>      | [PlusTable](/components/table.html)分页器左侧内容 （默认生效，`align` 属性默认是 `right`）                                                                                                                                                                  |                                                                                             |
| `pagination-right`<el-tag>v0.0.3</el-tag>     | [PlusTable](/components/table.html) 分页器右侧内容 （`align` 属性是 `left`时生效）                                                                                                                                                                          |                                                                                             |
| `action-bar-more-icon`<el-tag>v0.0.3</el-tag> | [PlusTable](/components/table.html)操作栏更多旁边的 icon                                                                                                                                                                                                    |                                                                                             |
| `tooltip-icon`<el-tag>v0.0.3</el-tag>         | [PlusTable](/components/table.html) 表格表头 tooltip icon                                                                                                                                                                                                   |                                                                                             |
| `drag-sort-icon`<el-tag>v0.0.3</el-tag>       | [PlusTable](/components/table.html)表格拖拽行 和 列设置里拖拽 icon                                                                                                                                                                                          |                                                                                             |
| `column-settings-icon`<el-tag>v0.0.3</el-tag> | [PlusTable](/components/table.html)表格表头 列设置 icon                                                                                                                                                                                                     |                                                                                             |
| `density-icon`<el-tag>v0.0.3</el-tag>         | [PlusTable](/components/table.html)表格表头 密度 icon                                                                                                                                                                                                       |                                                                                             |
| `edit-icon`<el-tag>v0.1.4</el-tag>            | [PlusTable](/components/table.html) 表格处于编辑状态时的 icon                                                                                                                                                                                               |                                                                                             |
| `extra`<el-tag>v0.1.5</el-tag>                | 表格和搜索中间位置的插槽                                                                                                                                                                                                                                    |                                                                                             |
| `plus-cell-*`                                 | 自定义表格项，组件会自动根据配置项的 prop 生成对应的插槽                                                                                                                                                                                                    | `object` <docs-tip content='{row,prop,label,fieldProps,valueType,value,column}'></docs-tip> |
| `plus-header-*`                               | 自定义表格项 header，组件会自动根据配置项的 prop 生成对应的插槽                                                                                                                                                                                             | `object` <docs-tip content='{prop,label,fieldProps,valueType,column}'></docs-tip>           |
| `plus-field-*`                                | [PlusForm](/components/form.html#form-slots) 的自定义表单项，组件会自动根据配置项的 prop 生成对应的插槽 ，表格需要开启属性 [PlusColumn['editable']](/components/config.html)，搜索需要开启`searchSlot`                                                      | `object` <docs-tip content='{prop,label,fieldProps,valueType,column,row}'></docs-tip>       |
|                                               |
| `plus-label-*` <el-tag>v0.1.25</el-tag>       | 自定义**搜索**表单项 `label`，组件会自动根据配置项的 `prop` 生成对应的插槽 ，**此插槽只对搜索表单生效，搜索需要开启`searchSlot`**                                                                                                                           | `{prop,label,fieldProps,valueType,column}`                                                  |
| `plus-extra-*` <el-tag>v0.1.25</el-tag>       | 自定义表单渲染[el-form-item](https://element-plus.org/zh-CN/component/form.html#formitem-api) 下一行额外的内容，组件会自动根据配置项的 `prop` 生成对应的插槽 ，表格需要开启属性 [PlusColumn['editable']](/components/config.html)，搜索需要开启`searchSlot` | `{column}`                                                                                  |
| `plus-previous-*` <el-tag>v0.1.25</el-tag>    | 自定义表单渲染[el-form-item](https://element-plus.org/zh-CN/component/form.html#formitem-api) 上一行额外的内容，组件会自动根据配置项的 `prop` 生成对应的插槽 ，表格需要开启属性 [PlusColumn['editable']](/components/config.html)，搜索需要开启`searchSlot` | `{column}`                                                                                  |

## Page Exposes

| 名称                                                                                          | 说明                                                                            | 类型                                                                                         |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `plusSearchInstance`                                                                          | [PlusSearch](/components/table.html)的实例                                      | `object` <docs-tip content="import['plus-pro-components']('PlusSearchInstance')"></docs-tip> |
| `plusTableInstance`                                                                           | [PlusTable](/components/table.html)的实例                                       | `object`<docs-tip content="import['plus-pro-components']('PlusTableInstance')"></docs-tip>   |
| `getList`                                                                                     | 获取数据方法，可以用来重新加载数据                                              | `function` <docs-tip content='() => void'></docs-tip>                                        |
| <el-text tag="del"> `handleRest` </el-text> <el-tag type="danger">deprecated v0.1.14</el-tag> | 重置搜索数据，并将 page 置为 1 ，然后重新加载 getList                           | `function` <docs-tip content='() => void'></docs-tip>                                        |
| `handleReset`<el-tag>v0.1.14</el-tag>                                                         | 重置搜索数据，并将 page 置为 1 ，然后重新加载 getList                           | `function` <docs-tip content='() => void'></docs-tip>                                        |
| `setSearchFieldsValue`<el-tag>v0.1.17</el-tag>                                                | 手动设置搜索值 ，传入一个对象参数，只会修改对象参数中对应值。                   | `function` <docs-tip content=' (val: RecordType) => void'></docs-tip>                        |
| `getSearchFieldsValue`<el-tag>v0.1.17</el-tag>                                                | 手动获取搜索值 ，传入一个字段`key`则获取的是字段`key`对应的值，默认返回所有值。 | `function` <docs-tip content='(key?: keyof any) => FieldValueType\| FieldValues'></docs-tip> |
| `clearSearchFieldsValue`<el-tag>v0.1.17</el-tag>                                              | 手动清空搜索值                                                                  | `function` <docs-tip content='() => void'></docs-tip>                                        |
| `setTableData`<el-tag>v0.1.23</el-tag>                                                        | 手动设置表格数据和分页总数。不给参数会清空表格数据。                            | `function` <docs-tip content='(data?: RecordType[], total?: number) => void'></docs-tip>     |
