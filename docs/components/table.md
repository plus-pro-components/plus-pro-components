# Table 表格

## 表格整体设计

![设计](/table.png 'table')

## 基础用法

配置[columns](/components/config.html)表头和`table-data`表格数据。
:::demo

table/basic

:::

## 自适应内容区高度

<el-tag>v0.1.17</el-tag>

表格配置 `adaptive` 可实现自适应内容区高度，`adaptive` 的默认值是 `false`，`adaptive` 的类型是

```ts
boolean | {
  /** 表格距离页面底部的偏移量，默认值为 `20` */
  offsetBottom?: number
  /** 页面 `resize` 时的防抖时间，默认值为 `60` ms */
  timeout?: number
}
```

::: warning 注意
表格设置`height`属性后， `adaptive`属性将**不在生效**。
:::

:::demo
table/height-adaptive
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

## 操作栏

默认不显示。配置[actionBar](/components/type.html#actionbarprops) 即可，`actionBar `配置参考 [ActionBarProps](/components/type.html#actionbarprops)。

`actionBar` 中的`type` 支持 `button`，`icon`和 `link`，对应`element plus` 的 [ElButton](https://element-plus.org/zh-CN/component/button.html)，[ElIcon](https://element-plus.org/zh-CN/component/icon.html) 和 [ElLink ](https://element-plus.org/zh-CN/component/link.html)组件。

操作栏`actionBar` 中`buttons`配置参考 [ActionBarButtonsRow](/components/type.html#actionbarbuttonsrow)，
`buttons`中每项配置 `confirm` 即可实现二次确认，配置 `show` 即可实现权限和动态显示。

:::demo

table/action-bar

:::

## 操作栏事件

操作栏除了支持[PlusTable Event](/components/table.html#table-events)中的`clickAction`和`clickActionConfirmCancel`外，<el-tag>v0.1.8</el-tag>版本开始支持自身的事件。

[ActionBarButtonsRow](/components/type.html#actionbarbuttonsrow)支持以下事件。

| 事件名                             | 类型                                                                          | 触发说明                                                                                                                                                                |
| ---------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onClick`<el-tag>v0.1.8</el-tag>   | [ActionBarButtonsRow['onClick']](/components/type.html#actionbarbuttonsrow)   | 点击当前按钮的时触发，可与 PlusTable 的事件 `clickAction` 同时触发；操作需要二次确认时：PlusTable 的事件 `clickAction`会在确认时触发，而当前的 onClick 是在点击时触发； |
| `onConfirm`<el-tag>v0.1.8</el-tag> | [ActionBarButtonsRow['onConfirm']](/components/type.html#actionbarbuttonsrow) | 操作需要二次确认时，点击确认时触发                                                                                                                                      |
| `onCancel`<el-tag>v0.1.8</el-tag>  | [ActionBarButtonsRow['onCancel'] ](/components/type.html#actionbarbuttonsrow) | 操作需要二次确认时，点击取消时触发， 可与 PlusTable 的事件 `clickActionConfirmCancel` 同时触发                                                                          |

:::demo

table/action-bar-event

:::

## 操作栏权限控制

小于<el-tag>v0.1.7</el-tag>版本

可使用 [ActionBarButtonsRow](/components/type.html#actionbarbuttonsrow) 中的 `show` 字段控制。

大于等于<el-tag>v0.1.7</el-tag>版本

可使用 [ActionBarButtonsRow](/components/type.html#actionbarbuttonsrow) 中的 `show` 和 `directives`指令字段控制。[参考 vue 渲染函数自定义指令 ](https://cn.vuejs.org/guide/extras/render-function.html#custom-directives)

:::demo

table/action-bar-directives

:::

## 操作栏二次确认类型

<el-tag>v0.1.17</el-tag> 版本新增气泡确认框 [ElPopconfirm](https://element-plus.org/zh-CN/component/popconfirm.html)

设置表格属性 `actionBar.confirmType` 为 `popconfirm` 即可生效，示例： `<PlusTable :action-bar="{ confirmType: 'popconfirm'}" />`

操作栏二次确认类型配置`confirmType`默认值为`messageBox`即 [ElMessageBox.confirm](https://element-plus.org/zh-CN/component/message-box.html)

:::demo

table/action-bar-popconfirm

:::

## 操作栏显示的按钮数量

配置[actionBar](/components/type.html#actionbarprops) `showNumber` 属性，`showNumber`在<el-tag>v0.1.23</el-tag> 版本中新增了函数支持。

:::demo

table/show-number

:::

## 标题栏

标题栏默认显示右侧工具栏， 可以使用`title`，`toolbar`插槽定制。不需要的的话配置
`<PlusTable :title-bar="false" />`即可。

:::demo

table/title-bar

:::

## 拖动排序行

::: warning 注意
拖动排序行对应的 [el-table-column](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7) 的 props，使用[dragSortableTableColumnProps](/components/table.html#table-attributes) 属性配置。
:::

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

## 列设置信息保存

<el-tag>v0.1.22</el-tag> 新增

使用[columns](/components/config.html)[`headerIsChecked`] 字段，配合事件[filterTableHeader](/components/table.html#table-events)使用。

:::demo

table/title-bar-filter

:::

## 分页栏

默认不显示，配置`pagination`属性即可。

:::demo

table/pagination

:::

## 序号栏

::: warning 注意
序号栏对应的 [el-table-column](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7) 的 props，使用[indexTableColumnProps](/components/table.html#table-attributes) 属性配置。
:::

默认不显示。配置`hasIndexColumn` 为 `true`即可。 配置`indexContentStyle` 可定制序号栏样式。使用`indexTableColumnProps` 为序号栏配置[el-table-column](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7)属性。

:::demo

table/index-column

:::

## 多选

::: warning 注意
多选栏对应的 [el-table-column](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7) 的 props，使用[selectionTableColumnProps](/components/table.html#table-attributes) 属性配置。
:::

配置`is-selection`属性为`true`，即可显示表格多选框。默认值`false`。配合 [el-table ](https://element-plus.org/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6)`selection-change` 事件使用。
:::demo

table/multiple

:::

## 展开行

::: warning 注意
展开行栏对应的[el-table-column](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7) 的 props，使用[expandTableColumnProps](/components/table.html#table-attributes) 属性配置。
:::

配置`has-expand`属性 `true` 可显示展开行，默认值 `false`。配合插槽 `expand` 使用。

:::demo

table/expand

:::

## 树形结构

配置`tree-props`树形为`children: 'children'`，数据结构中有 children 即可。
树形懒加载表格还需设置`lazy`，`load`。

::: warning 注意

数据中 `children`中的`id`和表格`id`不能重复。`row-key`默认为`id`。
:::

:::demo

table/tree

:::

## 多级表头

<el-tag>v0.1.7</el-tag>

数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。

只需要将 [el-table-column](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7) 放置于[el-table-column](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7) 中，就可以实现组头。

:::demo

table/multiple-table-header

:::

<el-tag>v0.1.19</el-tag> 新增
在 [columns](/components/config.html) 配置添加 [children](/components/config.html) 属性， 即可实现无限极表头。

:::demo

table/multiple-level-header

:::

## 表格显示单项插槽配置

组件提供 `fieldSlots` 对象可以简易配置表格显示单项插槽， `fieldSlots` 的插槽配置是根据表格的 [valueType](/components/config.html#valuetype-可选的显示值) 自动进行匹配的，
如：

- `valueType` 是 `img` ，`fieldSlots`的插槽就是给 [ElImage](https://element-plus.org/zh-CN/component/image.html#image-slots)的。
- `valueType` 是 `link`时，`fieldSlots`的插槽就是给 [ElLink](https://element-plus.org/zh-CN/component/link.html#slots)的。
- `valueType` 是 `tag`时，`fieldSlots`的插槽就是给 [ElTag](https://element-plus.org/zh-CN/component/tag.html#slots)的。
- 其他以此类推

要实现更强大的自定义，请使用[自定义表格项](/components/table.html#自定义表格项和表单项-插槽)。

::: warning 注意

valueType 的值对应的组件不是 element-plus 组件时，`fieldSlots`不生效，或者组件本身没有插槽时也不生效。
:::

:::demo

table/field-slots

:::

## 可编辑表格 (整体)

::: warning 注意
表格中表单数据不会主动和表格数据同步，需要结合 [formChange](/components/table.html#table-events) 事件手动同步。
:::

<el-tag>v0.1.4 更新</el-tag> 更新整体可编辑

<div style="margin: 10px 0">
  <el-tag>v0.1.6 更新</el-tag>表格数据变更后新数据也可编辑
</div>

表格配置`editable`为`true`即可实现整体可编辑， [columns](/components/config.html)中的 `editable` 优先级会更高。

:::demo

table/all-cell-edit

:::

## 可编辑表格 (单行)

::: warning 注意
表格中表单数据不会主动和表格数据同步，需要结合 [formChange](/components/table.html#table-events) 事件手动同步。
:::

<el-tag>v0.1.6 更新</el-tag>表格数据变更后新数据也可编辑

可编辑和校验单行，也可以控制单行的每一个单元格的编辑状态和校验。核心方法是 调用 `formRefs` 里的`startCellEdit()`方法。
:::demo

table/row-edit

:::

## 可编辑表格 (单元格)

::: warning 注意
表格中表单数据不会主动和表格数据同步，需要结合 [formChange](/components/table.html#table-events) 事件手动同步。
:::

<el-tag>v0.1.6 更新</el-tag>表格数据变更后新数据也可编辑

可编辑和校验单元格。核心方法是 调用 `formRefs` 里的`startCellEdit()`方法。
:::demo

table/cell-edit

:::

## 可编辑表格 (手动控制)

::: warning 注意
表格中表单数据不会主动和表格数据同步，需要结合 [formChange](/components/table.html#table-events) 事件手动同步。
:::

<el-tag>v0.1.6 更新</el-tag>表格数据变更后新数据也可编辑

手动控制表格编辑

:::demo

table/hand-edit

:::

## 可编辑表格 (点击单元格)

::: warning 注意
表格中表单数据不会主动和表格数据同步，需要结合 [formChange](/components/table.html#table-events) 事件手动同步。
:::

<el-tag>v0.1.4 </el-tag>

<div style="margin: 10px 0">
   <el-tag>v0.1.6 更新</el-tag>表格数据变更后新数据也可编辑
</div>

表格属性`editable`支持 `boolean`，`'click'` ， `'dblclick'`：

- 当值为`true` 时：表格都是编辑状态，
- 当值为`false`(默认) 时 ：表格都是显示状态，
- 当值为`'click'`(点击) 或 `'dblclick'`(双击) 时 ：全部表格都是显示状态，同时携带编辑 icon，需要点击或双击才能打开编辑状态，当点击`表格外`退出编辑状态，同时触发`edited`事件，当点击`其他单元格`时会退出当前单元格的编辑状态，不会触发`edited`事件。

::: tip 提示

[PlusColumn](/components/config.html) 配置中的 `editable` 仅支持 `boolean`，优先级高于表格整体的`editable`配置。

:::

:::demo

table/click-cell-edit

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

- 自定义表格项 （格式化表格显示）

  使用 render 函数自定义表格项。
  `render` 方法需要返回一个 [VNode](https://cn.vuejs.org/guide/extras/render-function.html) 或 `string`，返回一个`string`时可以用来格式化表格显示。

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

## 表格显示格式化

表格显示可通过以下三种方式格式化

| 方式一                                                          | 说明                                                                           | [PlusColumn](/components/config.html)[`valueType`]是否生效 | 版本支持                 |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------- | ------------------------ |
| [PlusColumn](/components/config.html)[`render`]返回一个字符串时 | 完全自定义表格行，[PlusColumn](/components/config.html)[`valueType`]不再生效。 | 否                                                         | <el-tag>v0.0.1</el-tag>  |
| [PlusColumn](/components/config.html)[`fieldSlots`]             | 定义[PlusColumn](/components/config.html)[`valueType`]对应的组件的插槽         | 是                                                         | <el-tag>v0.0.1</el-tag>  |
| [PlusColumn](/components/config.html)[`formatter`]              | 仅仅格式化显示的值                                                             | 是                                                         | <el-tag>v0.1.13</el-tag> |

[PlusColumn](/components/config.html)[`render`] [使用示例](/components/table.html#自定义表格项和表单项-render)

[PlusColumn](/components/config.html)[`fieldSlots`] [使用示例](/components/table.html#表格显示单项插槽配置)

以下是[PlusColumn](/components/config.html)[`formatter`] 的示例

<el-tag>v0.1.13</el-tag>

<el-divider/>

:::demo

table/formatter

:::

## 综合表格

:::demo

table/advanced

:::

## Table API

## Table Attributes

| 名称                                | 说明                                       | 类型                                                                                                                                                                          | 默认值                                               | 是否必须 |
| ----------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | -------- |
| `columns`                           | 表格配置信息                               | `array` [PlusColumn[]](/components/config.html)                                                                                                                               | `[]`                                                 | 是       |
| `tableData`                         | 表格数据                                   | `array`                                                                                                                                                                       | `[]`                                                 | 是       |
| `defaultSize`                       | 默认密度（size）                           | `string`<docs-tip content=" '' \| 'small' \| 'default' \| 'large'  "></docs-tip>                                                                                              | `'default'`                                          | 否       |
| `pagination`                        | 分页参数 （默认 `false` 给参数就显示）     | `false` / (`object` [PlusPaginationProps](/components/pagination.html#pagination-attributes) )                                                                                | `false`                                              | 否       |
| `actionBar`                         | 操作栏参数 （默认 `false` 给参数就显示）   | `false` / (`object`[ActionBarProps](/components/type.html#actionbarprops) )                                                                                                   | `false`                                              | 否       |
| `titleBar`                          | 标题栏                                     | `boolean`/ (`object`[TitleBar](/components/type.html#titlebar))                                                                                                               | `true`                                               | 否       |
| `hasIndexColumn`                    | 是否需要序号                               | `boolean`                                                                                                                                                                     | `false`                                              | 否       |
| `isSelection`                       | 是否是多选表格                             | `boolean`                                                                                                                                                                     | `false`                                              | 否       |
| `dragSortable`                      | 表格拖拽配置 （默认 `false` 给参数就显示） | `false` / (`object`[SortableOptions](http://www.sortablejs.com/options.html) )                                                                                                | `false`                                              | 否       |
| `hasExpand`                         | 是否需要展开行                             | `boolean`                                                                                                                                                                     | `false`                                              | 否       |
| `loadingStatus`                     | 加载状态                                   | `boolean`                                                                                                                                                                     | `false`                                              | 否       |
| `height`                            | 表格高度                                   | `string`                                                                                                                                                                      |                                                      | 否       |
| `editable`<el-tag>v0.1.4</el-tag>   | 表格整体可编辑                             | `boolean` / `string` <docs-tip content="'click'\|'dblclick'"></docs-tip>                                                                                                      | `false`                                              | 否       |
| `headerCellStyle`                   | 表格表头样式                               | `object` [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties)                                                                                           | `{'background-color': 'var(--el-fill-color-light)'}` | 否       |
| `indexContentStyle`                 | 序号栏样式                                 | (`object` [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) ) / `function` <docs-tip content='(row: any, index: number) =>CSSProperties'></docs-tip> | `{}`                                                 | 否       |
| `dragSortableTableColumnProps`      | 拖拽栏 el-table-column 的 props            | `object` [ElTableColumnProps](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7)                                                            | `{}`                                                 | 否       |
| `indexTableColumnProps`             | 序号栏 el-table-column 的 props            | `object` [ElTableColumnProps](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7)                                                            | `{}`                                                 | 否       |
| `selectionTableColumnProps`         | 选择栏 el-table-column 的 props            | `object` [ElTableColumnProps](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7)                                                            | `{width: 40}`                                        | 否       |
| `expandTableColumnProps`            | 展开栏 el-table-column 的 props            | `object` [ElTableColumnProps](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7)                                                            | `{}`                                                 | 否       |
| `adaptive` <el-tag>v0.1.17</el-tag> | 表格高度自适应内容区域配置                 | `boolean`\|`object`<docs-tip content="{offsetBottom?: number;timeout?: number}"></docs-tip>                                                                                   | `false`                                              | 否       |
| ...                                 | ...                                        | ...                                                                                                                                                                           | ...                                                  | ...      |

**`...`表示同时支持所有[ElTable Attributes](https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7)**

:::tip 提示

el-table 的其他属性写法示例 如 `stripe`,`border`,`fit`等

示例：

```html
<PlusTable :stripe="true" :border="true" :fit="false" />
```

:::

## Table Events

| 名称                                        | 说明                                                                                                                              | 类型                                                                                                                                                          |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `paginationChange`                          | 分页改变触发                                                                                                                      | `function` <docs-tip content='(pageInfo: PageInfo) => void'></docs-tip>                                                                                       |
| `clickAction`                               | 点击操作栏触发（需要二次确认的，点击确认时触发）                                                                                  | `function` <docs-tip content='(data:ButtonsCallBackParams) => void'></docs-tip> [ButtonsCallBackParams](/components/type.html#buttonscallbackparams)          |
| `clickActionConfirmCancel`                  | 点击操作栏需要二次确认的取消时触发                                                                                                | `function` <docs-tip content='(data:ButtonsCallBackParams) => void'></docs-tip> [ButtonsCallBackParams](/components/type.html#buttonscallbackparams)          |
| `dragSortEnd`                               | 拖拽排序行触发                                                                                                                    | `function` <docs-tip content='({newIndex: number, oldIndex: number}) => void'></docs-tip>                                                                     |
| `formChange`                                | 表格中有可以编辑的表单项目改变时触发                                                                                              | `function` <docs-tip content='(data:FormChangeCallBackParams) => void'></docs-tip> [FormChangeCallBackParams](/components/type.html#formchangecallbackparams) |
| `edited`<el-tag>v0.1.4</el-tag>             | 表格中点击编辑单元格退出时触发                                                                                                    | `function` <docs-tip content='() => void'></docs-tip>                                                                                                         |
| `filterTableHeader`<el-tag>v0.1.22</el-tag> | 表格表头列设置改变时触发，eventType 参数解释： check：表头单个 check； allCheck：全选/取消全选 check； drag：拖拽； reset：重置； | `function` <docs-tip content='(columns:PlusColumn[],eventType:check \| allCheck \| drag \| reset) => void'></docs-tip>                                        |
| ...                                         | ...                                                                                                                               | ...                                                                                                                                                           |

**`...`表示同时支持所有[ElTable 事件](https://element-plus.org/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6)**

::: tip 提示
el-table 的其他事件写法示例 如 `select`,`select-all`,`row-click`等，如下示例
:::

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

## Table Slots

| 插槽名                                        | 说明                                                                                                                                                                                               | 作用域插槽参数                                                                              |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `title`                                       | 表格标题                                                                                                                                                                                           |                                                                                             |
| `toolbar`                                     | 工具栏左侧                                                                                                                                                                                         |                                                                                             |
| `expand`                                      | 展开行                                                                                                                                                                                             |                                                                                             |
| `pagination-left`<el-tag>v0.0.2</el-tag>      | 分页器左侧内容 （默认生效，`align` 属性默认是 `right`）                                                                                                                                            |                                                                                             |
| `pagination-right`<el-tag>v0.0.2</el-tag>     | 分页器右侧内容 （`align` 属性是 `left`时生效）                                                                                                                                                     |                                                                                             |
| `action-bar-more-icon`<el-tag>v0.0.3</el-tag> | 操作栏更多旁边的 icon                                                                                                                                                                              |                                                                                             |
| `tooltip-icon`<el-tag>v0.0.3</el-tag>         | 表格表头 tooltip icon                                                                                                                                                                              |                                                                                             |
| `drag-sort-icon`<el-tag>v0.0.3</el-tag>       | 表格拖拽行 和 列设置里拖拽 icon                                                                                                                                                                    |                                                                                             |
| `column-settings-icon`<el-tag>v0.0.3</el-tag> | 表格表头 列设置 icon                                                                                                                                                                               |                                                                                             |
| `density-icon`<el-tag>v0.0.3</el-tag>         | 表格表头 密度 icon                                                                                                                                                                                 |                                                                                             |
| `edit-icon`<el-tag>v0.1.4</el-tag>            | 表格处于编辑状态时的 icon                                                                                                                                                                          |                                                                                             |
| `plus-cell-*`                                 | 自定义表格项，组件会自动根据配置项的 prop 生成对应的插槽                                                                                                                                           | `object` <docs-tip content='{row,prop,label,fieldProps,valueType,value,column}'></docs-tip> |
| `plus-header-*`                               | 自定义表格项 header，组件会自动根据配置项的 prop 生成对应的插槽                                                                                                                                    | `object` <docs-tip content='{prop,label,fieldProps,valueType,column}'></docs-tip>           |
| `plus-field-*`                                | [PlusForm](/components/form.html#form-slots) 的自定义表单项，组件会自动根据配置项的 prop 生成对应的插槽 ，需要开启属性 [PlusColumn['editable']](/components/config.html)                           | `object` <docs-tip content='{prop,label,fieldProps,valueType,column,row}'></docs-tip>       |
| `plus-extra-*`                                | [PlusForm](/components/form.html#form-slots)的自定义渲染 el-form-item 下一行额外的内容，组件会自动根据配置项的 prop 生成对应的插槽，需要开启属性 [PlusColumn['editable']](/components/config.html) | `{column,row}`                                                                              |
| ...                                           | ...                                                                                                                                                                                                | ...                                                                                         |

**`...`表示同时支持所有[ElTable 插槽](https://element-plus.org/zh-CN/component/table.html#table-%E6%8F%92%E6%A7%BD)**

::: tip 提示
el-table 的其他插槽 如 `append`,`empty`。 **<el-tag>v0.1.7</el-tag> 开始支持 `default` 插槽。**

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
