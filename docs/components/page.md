# Page 页面

Page 组件是 [PlusSearch](/components/search.html)和 [PlusTable](/components/table.html) 组件的组合。

## 基础用法

:::demo

page/basic

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

## 增删改查 (CRUD)

典型的增删改查。

:::demo

page/crud

:::

## Page API

## Page Attributes

| 名称                 | 说明                                                                                                                                                                                                                                       | 类型                                                                                                                           | 默认值 | 是否必须 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------ | -------- |
| `columns`            | 配置信息                                                                                                                                                                                                                                   | `array`[PlusColumn[]](/components/config.html)                                                                                 | `[]`   | 是       |
| `request`            | request 是 Page 最重要的 API，request 会接收一个对象。对象中必须要有 data，如果需要手动分页 total 也是必需的。request 会接管 loading 的设置，同时在查询表单查询和 params 参数发生修改时重新执行。同时 查询表单的值和 params 参数也会带入。 | `function`<docs-tip content="(params:PageInfo & { [index: string]: any }) => Promise<{ data: any;total?: number}>"></docs-tip> |        | 是       |
| `search`             | [PlusSearch](/components/search.html) 的 props                                                                                                                                                                                             | `false` / (`object`[PlusSearchProps](/components/search.html#search-attributes) )                                              | `{}`   | 否       |
| `table`              | [PlusTable](/components/table.html) 的 props                                                                                                                                                                                               | `object`[PlusTableProps](/components/table.html#table-attributes)                                                              | `{}`   | 否       |
| `params`             | request 的 params 其他参数，默认会带 pageSize，page 和 PlusSearch 组件中的值                                                                                                                                                               | `object`                                                                                                                       | `{}`   | 否       |
| `postData`           | 对通过 request 获取的数据进行处理                                                                                                                                                                                                          | `function`<docs-tip content="<T = any>(data: T[]) => T[]"></docs-tip>                                                          |        | 否       |
| `beforeSearchSubmit` | 搜索之前进行一些修改                                                                                                                                                                                                                       | `function` <docs-tip content="<T = any>(params: T) => T"></docs-tip>                                                           |        | 否       |
| `isCard`             | 表格和搜索是否需要 el-card 包裹 默认 true                                                                                                                                                                                                  | `boolean`                                                                                                                      | `true` | 否       |
| `searchCardProps`    | 搜索外层的 el-card 的 props ，当 isCard 为 true 时生效                                                                                                                                                                                     | `object`                                                                                                                       | `{}`   | 否       |
| `tableCardProps`     | 表格外层的 el-card 的 props ，当 isCard 为 true 时生效                                                                                                                                                                                     | `object`                                                                                                                       | `{}`   |

## Page Events

| 名称           | 说明               | 类型                                                            |
| -------------- | ------------------ | --------------------------------------------------------------- |
| `requestError` | 数据加载失败时触发 | `function` <docs-tip content='(error: any) => void'></docs-tip> |

::: tip 提示
支持 [PlusSearch](/components/search.html) 和
[PlusTable](/components/table.html) 的的所有事件，如 [PlusSearch](/components/search.html) 的`search`, PlusTable 的`row-click`等

示例：

```html
<PlusPage :search="{ onSearch:() => {} }" :table="{ onRowClick: () => {} }" />
```

:::

## Page Slots

| 插槽名          | 说明                                                     |
| --------------- | -------------------------------------------------------- |
| `table-title`   | [PlusTable](/components/table.html) 表格标题             |
| `table-toolbar` | [PlusTable](/components/table.html) 工具栏左侧           |
| `table-expand`  | [PlusTable](/components/table.html) 展开行               |
| `table-append`  | [PlusTable](/components/table.html)（el-table） 最后一行 |
| `table-empty`   | [PlusTable](/components/table.html) （el-table）空状态   |
| `search-footer` | [PlusSearch](/components/search.html) 的 footer          |

## Page Exposes

| 名称                 | 说明                                                  | 类型                                                                                         |
| -------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `plusSearchInstance` | [PlusSearch](/components/table.html)的实例            | `object` <docs-tip content="import('plus-pro-components')['PlusSearchInstance']"></docs-tip> |
| `plusTableInstance`  | [PlusTable](/components/table.html)的实例             | `object`<docs-tip content="import('plus-pro-components')['PlusTableInstance']"></docs-tip>   |
| `getList`            | 获取数据方法，可以用来重新加载数据                    | `function` <docs-tip content='() => void'></docs-tip>                                        |
| `handleRest`         | 重置搜索数据，并将 page 置为 1 ，然后重新加载 getList | `function` <docs-tip content='() => void'></docs-tip>                                        |
