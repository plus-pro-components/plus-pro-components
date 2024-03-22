# Search 搜索

::: warning 注意
表单`v-model`绑定的值尽量使用 ref 定义绑定的值，以避免 reactive 带来的响应式丢失问题。 <el-text  type="primary" tag="ins">[参考 reactive 的局限性](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive)</el-text>
:::

## 基础用法

:::demo

search/basic

:::

## 显示个数

配置 `show-number` 属性为显示个数，默认值 2。

:::demo

search/show-number

:::

## 展开收缩隐藏

配置 `hasUnfold` 属性为`false`展开收缩隐藏，同时默认值显示所有搜索框。

:::demo

search/hide-unfold

:::

## 自定义搜索按钮

使用`search-footer` 自定义搜索按钮.

:::demo

search/search-footer

:::

## 默认搜索参数

配置 `defaultValues`属性，设置默认搜索参数，当页面**点击重置按钮**时 [PlusSearch](/components/search.html) 组件的`model-value / v-model` 会被设置为 defaultValues。

:::demo

search/default-values

:::

## 隐藏 label

`has-label` 设置为 `false` 时, 隐藏 label

:::demo

search/hide-label

:::

## 异步数据用法

[PlusColumn](/components/config.html) 配置中的 `options` 支持数，函数和 Promise。
[PlusColumn](/components/config.html) 配置中的 `fieldProps` 支持对象 object，函数和 Promise。

:::demo

search/async

:::

## Search API

## Search Attributes

| 名称                    | 说明                                                                                                                 | 类型                                                                                    | 默认值                              | 是否必须 |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------- | -------- |
| `model-value / v-model` | 搜索表单绑定值 <el-text type="warning">（尽量使用 ref 定义绑定的值，以避免 reactive 带来的响应式丢失问题）</el-text> | `object`[FieldValues](/components/type.html#fieldvalues)                                |                                     | 否       |
| `defaultValues`         | 点击重置按钮时 赋值给表单                                                                                            | `object` [FieldValues](/components/type.html#fieldvalues)                               | `{}`                                | 否       |
| `columns`               | 搜索配置信息                                                                                                         | `array` [PlusColumn[]](/components/config.html)                                         | `[]`                                | 否       |
| `hasFooter`             | 是否需要全部按钮                                                                                                     | `boolean`                                                                               | `true`                              | 否       |
| `hasReset`              | 是否需要底部按钮 `重置`                                                                                              | `boolean`                                                                               | `true`                              | 否       |
| `hasUnfold`             | 是否显示展开收缩按钮， 当 columns 中有效的数据（hideInSearch 不为 true）的长度小于`showNumber` 时自动隐藏            | `boolean`                                                                               | `true`                              | 否       |
| `searchLoading`         | 查询按钮 loading                                                                                                     | `boolean`                                                                               | `false`                             | 否       |
| `searchText`            | 查询按钮文字                                                                                                         | `string`                                                                                | `查询`                              | 否       |
| `resetText`             | 重置按钮文字                                                                                                         | `string`                                                                                | `重置`                              | 否       |
| `inline`                | 一行内显示                                                                                                           | `boolean`                                                                               | `true`                              | 否       |
| `showNumber`            | 默认显示个数                                                                                                         | `number`                                                                                | `2`                                 | 否       |
| `rowProps`              | el-row 属性                                                                                                          | `object`[RowProps](https://element-plus.org/zh-CN/component/layout.html#row-attributes) | `{gutter: 20}`                      | 否       |
| `colProps`              | el-col 属性                                                                                                          | `object`[ColProps](https://element-plus.org/zh-CN/component/layout.html#col-attributes) | `{xs: 24,sm: 12,md: 8,lg: 8,xl: 6}` | 否       |
| ...                     | ...                                                                                                                  | ...                                                                                     | ...                                 | ...      |

:::tip 提示
**`...`表示同时支持所有 [PlusFrom 方法](/components/form.html) Attributes** 。
:::

## Search Events

| 名称                              | 说明                    | 类型                                                                                        |
| --------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------- |
| `search`                          | 点击查询按钮触发的事件  | `function` <docs-tip content='(values: FieldValues) => void'></docs-tip>                    |
| `change`                          | 表单变化触发的事件      | `function` <docs-tip content='(values: FieldValues,column: PlusColumn) => void'></docs-tip> |
| `reset`                           | 点击重置按钮触发的事件  | `function` <docs-tip content='(values: FieldValues) => void'></docs-tip>                    |
| `collapse`<el-tag>v0.0.6</el-tag> | 点击展开/收起触发的事件 | `function` <docs-tip content='(isShowUnfold: Boolean) => void'></docs-tip>                  |

## Search Slots

| 插槽名                                | 说明                                                                                                                               | 作用域插槽参数                                         |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `footer`                              | 自定义搜索 按钮组 区域                                                                                                             | `{isShowUnfold,handleReset,handleSearch,handleUnfold}` |
| `tooltip-icon`<el-tag>v0.0.5</el-tag> | tooltip icon                                                                                                                       |                                                        |
| `plus-field-*`                        | [PlusForm](/components/form.html#form-slots) 的自定义表单项，组件会自动根据配置项的 prop 生成对应的插槽                            | `{prop,label,fieldProps,valueType,column}`             |
| `plus-label-*`                        | [PlusForm](/components/form.html#form-slots) 的自定义表单项 label，组件会自动根据配置项的 prop 生成对应的插槽                      | `{prop,label,fieldProps,valueType,column}`             |
| `plus-extra-*`                        | [PlusForm](/components/form.html#form-slots)的自定义渲染 el-form-item 下一行额外的内容，组件会自动根据配置项的 prop 生成对应的插槽 | `{column}`                                             |

**footer 作用域插槽参数说明**

| 作用域插槽参数 | 说明                 | 类型                                                 | 默认值  |
| -------------- | -------------------- | ---------------------------------------------------- | ------- |
| `isShowUnfold` | 多余搜索表单展开情况 | `boolean`                                            | `false` |
| `handleReset`  | 执行重置按钮方法     | `function` <docs-tip content="()=> void"></docs-tip> |         |
| `handleSearch` | 执行搜索按钮方法     | `function` <docs-tip content="()=> void"></docs-tip> |         |
| `handleUnfold` | 执行展开按钮方法     | `function` <docs-tip content="()=> void"></docs-tip> |         |

## Exposes

| 名称               | 说明             | 类型                                                      |
| ------------------ | ---------------- | --------------------------------------------------------- |
| `plusFormInstance` | `PlusFrom` 实例  | `object` <docs-tip content="PlusFormInstance"></docs-tip> |
| `handleReset`      | 执行重置按钮方法 | `function` <docs-tip content="()=> void"></docs-tip>      |
| `handleSearch`     | 执行搜索按钮方法 | `function` <docs-tip content="()=> void"></docs-tip>      |
| `handleUnfold`     | 执行展开按钮方法 | `function` <docs-tip content="()=> void"></docs-tip>      |

::: tip 提示
拿到 plusFormInstance 中的 formInstance 可以支持所有[PlusFrom 方法](/components/form.html)，
如 `validate`,`validateField`等
:::
