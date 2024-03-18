# Table 表格

## 表格整体设计

![设计](/table.png 'table')

## 基础用法

配置[columns](/components/config.html)表头和`table-data`表格数据。
:::demo

table/basic

:::

## 数据多级显示

[columns](/components/config.html)中的 `prop`支持 `x.y.z`形式的 多（无限）级数据形式。

:::warning 注意
**数据级不宜过多，可能会影响性能**。
:::

:::demo

table/multiple-level-display

:::

## 自定义状态

配置项中`valueType`为`select`、`radio`或`checkbox `时，
配置[columns](/components/config.html)中的[options](/components/type.html#optionstype)，表格会自动显示 `value` 对应的`状态`和 `label`。

默认的逻辑是 表格的`tableData`中的`实际值`和 `options` 中 `value` 对比 严格相等的话，会取当前项的 `label` 显示在表格中，想自定义显示逻辑的话，只需配置[columns](/components/config.html) 中 `customGetStatus`即可。

:::demo

table/status

:::

## 表格列样式简单修改

配置[columns](/components/config.html)中的 `fieldProps`，不仅会作用于表单单项，也会作用于表格单项。使用 `fieldProps`可以做简单的样式修改，更强大的自定义样式，请使用[自定义表格项](/components/table.html#自定义表格项和表单项-插槽)。

:::demo

table/cell-style

:::

## 自定义操作栏

默认不显示。配置`actionBar`即可。 `actionBar` 中的`type` 支持 `button`，`icon`和 `link`，对应`element plus` 的 [ElButton](https://element-plus.org/zh-CN/component/button.html)，[ElIcon](https://element-plus.org/zh-CN/component/icon.html) 和 [ElLink ](https://element-plus.org/zh-CN/component/link.html)组件。

配置 `confirm` 即可实现二次确认。配置 `show` 即可实现权限和动态显示。

:::demo

table/action-bar

:::

## 标题栏

标题栏默认显示右侧工具栏， 可以使用`title`，`toolbar`插槽定制。不需要的的话配置
`<PlusTable :title-bar="false" />`即可。

:::demo

table/title-bar

:::

## 拖动排序行

配置`drag-sortable`，同时配合`dragSortEnd`使用。

:::demo
table/drag-sort
:::

## 列设置拖拽排序列

配置 [TitleBar](/components/type.html#titlebar)中的`columnSetting`中的`dragSort`属性，默认为 `true` 可拖拽。

不需要可以给 `false`: `<PlusTable :title-bar="{ columnSetting: { dragSort: false } }" />`。

如下示例， 点击 表格右上角列设置 <el-icon color="#606266" ><Setting /></el-icon> 图标，即可通过列设置拖拽排序列。

:::demo

table/drag-sort-column

:::

## 分页栏

默认不显示，配置`pagination`属性即可。

:::demo

table/pagination

:::

## 序号栏

默认不显示。配置`hasIndexColumn` 为 `true`即可。 配置`indexContentStyle` 可定制序号栏样式。使用`indexTableColumnProps` 为序号栏配置[el-table-column](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7)属性。

:::demo

table/index-column

:::

## 多选

配置`is-selection`属性为`true`，即可显示表格多选框。默认值`false`。配合 [el-table ](https://element-plus.org/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6)`selection-change` 事件使用。
:::demo

table/multiple

:::

## 树形结构

配置`tree-props`树形为`children: 'children'`，数据结构中有 children 即可。
树形懒加载表格还需设置`lazy`，`load`。注意：`children`中的`id`和表格`id`不能重复。`row-key`默认值`id`。

:::demo

table/tree

:::

## 展开行

配置`has-expand`属性 `true` 可显示展开行，默认值 `false`。配合插槽 `expand` 使用。

:::demo

table/expand

:::

## 可编辑表格 (整体)

:::demo

table/all-cell-edit

:::

## 可编辑表格 (单行)

可编辑和校验单行，也可以控制单行的每一个单元格的编辑状态和校验。核心方法是 调用 `formRefs` 里的`startCellEdit()`方法。
:::demo

table/row-edit

:::

## 可编辑表格 (单元格)

可编辑和校验单元格。核心方法是 调用 `formRefs` 里的`startCellEdit()`方法。
:::demo

table/cell-edit

:::

## 可编辑表格 (手动控制)

:::demo

table/hand-edit

:::

## 表格显示单项插槽配置

组件提供 `fieldSlots` 对象可以简易配置表格显示单项插槽， `fieldSlots` 的插槽配置是根据表格的 [valueType](/components/config.html#valuetype-可选的显示值) 自动进行匹配的，
如：

- `valueType` 是 `img` ，`fieldSlots`的插槽就是给 [ElImage](https://element-plus.org/zh-CN/component/image.html#image-slots)的。
- `valueType` 是 `link`时，`fieldSlots`的插槽就是给 [ElLink](https://element-plus.org/zh-CN/component/link.html#slots)的。
- 其他以此类推

要实现更强大的自定义，请使用[自定义表格项](/components/table.html#自定义表格项和表单项-插槽)。

::: warning 注意

valueType 的值对应的组件不是 element-plus 组件时，`fieldSlots`不生效，或者组件本身没有插槽时也不生效。
:::

:::demo

table/field-slots

:::

## 自定义表格项和表单项 ( 插槽 )

:::warning 注意
**插槽 的优先级低于 render，高于数据**。
:::

- 自定义表格项

  `PlusTable` 组件会自动根据配置项的 `prop` 生成对应的插槽，例如下面的配置项，则会自动生成两个名称叫做 [ **plus-cell-`name`** ]和 [ **plus-cell-`status`**] 的两个插槽，插槽的生成规则就是 固定 key 值 [ **plus-cell-** ] 然后加上 配置项的 `prop`。

  ```ts
  import { PlusColumn } from 'plus-pro-components'

  const tableConfig: PlusColumn[] = [
    {
      label: '名称',
      // 自动生成对应的插槽 'plus-cell-name'
      prop: 'name'
    },
    {
      label: '状态',
      // 自动生成对应的插槽 'plus-cell-status'
      prop: 'status'
    }
  ]
  ```

  插槽作用域中会返回 `scoped` 参数,`scoped` 中 包含 `prop`、`label`、`valueType`和`column`等参数可供使用。

- 自定义表单项

  参考[自定义表单项(插槽)](/components/form.html#自定义表单项-插槽) （
  表格中需要开启 `editable`）

:::demo

table/custom-cell-slot

:::

## 自定义表格项和表单项 (render)

:::warning 提示
**render 的优先级高于插槽**。
:::

- 自定义表格项

  使用 render 函数自定义表格项。
  `render` 方法需要返回一个 [VNode](https://cn.vuejs.org/guide/extras/render-function.html) 或 `String`。

  自定义表格项还支持 `renderHTML`方法，需要返回一个 HTML 字符串。**谨慎使用，确保 HTML 字符串可信。**

- 自定义表单项

  参考[自定义表单项-renderField](/components/form.html#自定义表单项-renderfield) （
  表格中需要开启 `editable`）

:::demo

table/custom-cell

:::

## 自定义表格项和表单项 (jsx/tsx)

:::warning 注意

jsx/tsx 的使用需要将 vue 单文件组件的`script`的属性 `lang`设置为`jsx`或者`tsx`，`jsx` 中值使用单花括号`{}`绑定。

```html
<script lang="tsx" setup></script>
```

:::

- 自定义表格项

  `jsx/tsx` 的支持本质是`jsx/tsx`解析出来是`VNode`, 使用 render 函数自定义表格项。

- 自定义表单项

  参考[自定义表单项-jsx-tsx](/components/form.html#自定义表单项-jsx-tsx) （
  表格中需要开启 `editable`）

:::demo

table/custom-cell-tsx

:::

## 自定义表格表头 (插槽)

:::warning 注意
**插槽 的优先级低于 renderHeader，高于 label**。
:::

`PlusTable` 组件会自动根据配置项的 `prop` 生成对应的插槽，例如下面的配置项，则会自动生成两个名称叫做 [ **plus-header-`name`** ]和 [ **plus-header-`status`**] 的两个插槽，插槽的生成规则就是 固定 key 值 [ **plus-header-** ] 然后加上 配置项的 `prop`。

```ts
import { PlusColumn } from 'plus-pro-components'

const tableConfig: PlusColumn[] = [
  {
    label: '名称',
    // 自动生成对应的插槽 'plus-header-name'
    prop: 'name'
  },
  {
    label: '状态',
    // 自动生成对应的插槽 'plus-header-status'
    prop: 'status'
  }
]
```

插槽作用域中会返回 `scoped` 参数,`scoped` 中 包含 `prop`、`label`、`valueType`和`column`等参数可供使用。

:::demo

table/custom-header-slot

:::

## 自定义表格表头 (renderHeader)

:::warning 注意
**renderHeader 的优先级高于插槽**。
:::

- 使用 renderHeader 函数自定义表格项。
  `renderHeader` 方法需要返回一个 [VNode](https://cn.vuejs.org/guide/extras/render-function.html) 或 `String`。

:::demo

table/custom-header

:::

## 自定义表格表头 (jsx/tsx)

:::warning 注意

jsx/tsx 的使用需要将 vue 单文件组件的`script`的属性 `lang`设置为`jsx`或者`tsx`，`jsx` 中值使用单花括号`{}`绑定。

```html
<script lang="tsx" setup></script>
```

:::

`jsx/tsx` 的支持本质是`jsx/tsx`解析出来是`VNode`, 使用 renderHeader 函数自定义表格表头。

:::demo

table/custom-header-tsx

:::

## 自定义 icon

<el-tag>v0.0.3</el-tag>

组件提供了以下插槽可以自定义 icon

| 插槽名                 | 说明                            |
| ---------------------- | ------------------------------- |
| `action-bar-more-icon` | 操作栏更多旁边的 icon           |
| `tooltip-icon`         | 表格表头 tooltip icon           |
| `drag-sort-icon`       | 表格拖拽行 和 列设置里拖拽 icon |
| `column-settings-icon` | 表格表头 列设置 icon            |
| `density-icon`         | 表格表头 密度 icon              |

:::demo

table/icon-slot

:::

## 综合表格

:::demo

table/advanced

:::

## Table API

## Table Attributes

| 名称                           | 说明                                       | 类型                                                                                                                                                                          | 默认值        | 是否必须 |
| ------------------------------ | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------- |
| `columns`                      | 表格配置信息                               | `array` [PlusColumn[]](/components/config.html)                                                                                                                               | `[]`          | 是       |
| `tableData`                    | 表格数据                                   | `array`                                                                                                                                                                       | `[]`          | 是       |
| `pagination`                   | 分页参数 （默认 `false` 给参数就显示）     | `false` / (`object` [PlusPaginationProps](/components/pagination.html#pagination-attributes) )                                                                                | `false`       | 否       |
| `actionBar`                    | 操作栏参数 （默认 `false` 给参数就显示）   | `false` / (`object`[ActionBarProps](/components/type.html#actionbarprops) )                                                                                                   | `false`       | 否       |
| `titleBar`                     | 标题栏                                     | `boolean`/ (`object`[TitleBar](/components/type.html#titlebar))                                                                                                               | `true`        | 否       |
| `hasIndexColumn`               | 是否需要序号                               | `boolean`                                                                                                                                                                     | `false`       | 否       |
| `isSelection`                  | 是否是多选表格                             | `boolean`                                                                                                                                                                     | `false`       | 否       |
| `dragSortable`                 | 表格拖拽配置 （默认 `false` 给参数就显示） | `false` / (`object`[SortableOptions](http://www.sortablejs.com/options.html) )                                                                                                | `false`       | 否       |
| `hasExpand`                    | 是否需要展开行                             | `boolean`                                                                                                                                                                     | `false`       | 否       |
| `loadingStatus`                | 加载状态                                   | `boolean`                                                                                                                                                                     | `false`       | 否       |
| `height`                       | 表格高度                                   | `string`                                                                                                                                                                      |               | 否       |
| `headerCellStyle`              | 表格表头样式                               | `object` [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties)                                                                                           |               | 否       |
| `indexContentStyle`            | 序号栏样式                                 | (`object` [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) ) / `function` <docs-tip content='(row: any, index: number) =>CSSProperties'></docs-tip> | `{}`          | 否       |
| `dragSortableTableColumnProps` | 拖拽栏 el-table-column 的 props            | `object`                                                                                                                                                                      | `{}`          | 否       |
| `indexTableColumnProps`        | 序号栏 el-table-column 的 props            | `object`                                                                                                                                                                      | `{}`          | 否       |
| `selectionTableColumnProps`    | 选择栏 el-table-column 的 props            | `object`                                                                                                                                                                      | `{width: 40}` | 否       |
| `expandTableColumnProps`       | 展开栏 el-table-column 的 props            | `object`                                                                                                                                                                      | `{}`          | 否       |
| ...                            | ...                                        | ...                                                                                                                                                                           | ...           | ...      |

**`...`表示同时支持所有[ElTable Attributes](https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7)**

:::tip 提示

el-table 的其他属性写法示例 如 `stripe`,`border`,`fit`等

示例：

```html
<PlusTable :stripe="true" :border="true" :fit="false" />
```

:::

## Table Events

| 名称                       | 说明                                             | 类型                                                                                                                    |
| -------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `paginationChange`         | 分页改变触发                                     | `function` <docs-tip content='(pageInfo: PageInfo) => void'></docs-tip>                                                 |
| `clickAction`              | 点击操作栏触发（需要二次确认的，点击确认时触发） | `function` [ButtonsCallBackParams](/components/type.html#buttonscallbackparams)                                         |
| `clickActionConfirmCancel` | 点击操作栏需要二次确认的取消时触发               | `function` [ButtonsCallBackParams](/components/type.html#buttonscallbackparams)                                         |
| `dragSortEnd`              | 拖拽排序行触发                                   | `function` <docs-tip content='({newIndex: number, oldIndex: number}) => void'></docs-tip>                               |
| `formChange`               | 表格中有可以编辑的表单项目改变时触发             | `function` <docs-tip content='({ value: any; prop: string; row: any; index: number; column: any }) => void'></docs-tip> |
| ...                        | ...                                              | ...                                                                                                                     |

**`...`表示同时支持所有[ElTable 事件](https://element-plus.org/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6)**

::: tip 提示
el-table 的其他事件写法示例 如 `select`,`select-all`,`row-click`等

示例：

> 模板中

```html
<PlusTable @select="handleSelect" @select-all="handleSelectAll" />
```

> setup 中

```ts
const handleSelect = (selection: any[], row: any) => {
  console.log(selection, row)
}
const handleSelectAll = (selection: any[]) => {
  console.log(selection)
}
```

:::

## Table Slots

| 插槽名                                        | 说明                                                                                                                                                                                               | 作用域插槽参数                                       |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `title`                                       | 表格标题                                                                                                                                                                                           |                                                      |
| `toolbar`                                     | 工具栏左侧                                                                                                                                                                                         |                                                      |
| `expand`                                      | 展开行                                                                                                                                                                                             |                                                      |
| `pagination-left`<el-tag>v0.0.2</el-tag>      | 分页器左侧内容 （默认生效，`align` 属性默认是 `right`）                                                                                                                                            |                                                      |
| `pagination-right`<el-tag>v0.0.2</el-tag>     | 分页器右侧内容 （`align` 属性是 `left`时生效）                                                                                                                                                     |                                                      |
| `action-bar-more-icon`<el-tag>v0.0.3</el-tag> | 操作栏更多旁边的 icon                                                                                                                                                                              |                                                      |
| `tooltip-icon`<el-tag>v0.0.3</el-tag>         | 表格表头 tooltip icon                                                                                                                                                                              |                                                      |
| `drag-sort-icon`<el-tag>v0.0.3</el-tag>       | 表格拖拽行 和 列设置里拖拽 icon                                                                                                                                                                    |                                                      |
| `column-settings-icon`<el-tag>v0.0.3</el-tag> | 表格表头 列设置 icon                                                                                                                                                                               |                                                      |
| `density-icon`<el-tag>v0.0.3</el-tag>         | 表格表头 密度 icon                                                                                                                                                                                 |                                                      |
| `plus-cell-*`                                 | 自定义表格项，组件会自动根据配置项的 prop 生成对应的插槽                                                                                                                                           | `{row,prop,label,fieldProps,valueType,value,column}` |
| `plus-header-*`                               | 自定义表格项 header，组件会自动根据配置项的 prop 生成对应的插槽                                                                                                                                    | `{prop,label,fieldProps,valueType,column}`           |
| `plus-field-*`                                | [PlusForm](/components/form.html#form-slots) 的自定义表单项，组件会自动根据配置项的 prop 生成对应的插槽 ，需要开启属性 [PlusColumn['editable']](/components/config.html)                           | `{prop,label,fieldProps,valueType,column,row}`       |
| `plus-extra-*`                                | [PlusForm](/components/form.html#form-slots)的自定义渲染 el-form-item 下一行额外的内容，组件会自动根据配置项的 prop 生成对应的插槽，需要开启属性 [PlusColumn['editable']](/components/config.html) | `{column,row}`                                       |
| ...                                           | ...                                                                                                                                                                                                | ...                                                  |

**`...`表示同时支持所有[ElTable 插槽](https://element-plus.org/zh-CN/component/table.html#table-%E6%8F%92%E6%A7%BD)**

::: tip 提示
el-table 的其他插槽 如 `append`,`empty`等
:::

## Table Exposes

| 名称            | 说明                                                                   | 类型                                                                                            |
| --------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `tableInstance` | `el-table`的实例                                                       | `object` `import('element-plus')['TableInstance']`                                              |
| `formRefs`      | 表格中所有 form 的实例，可以用来控制表格是否可编辑，以及表格表单检验等 | `object` <docs-tip content='ShallowRef<Record<string / number, TableFormRefRow[]>>'></docs-tip> |

**拿到 tableInstance 后支持所有[ElTable 方法](https://element-plus.org/zh-CN/component/table.html#table-%E6%96%B9%E6%B3%95)**

::: tip 提示
如 `clearSelection`,`getSelectionRows`等
:::

<script setup>
import { Setting } from '@element-plus/icons-vue'
</script>
