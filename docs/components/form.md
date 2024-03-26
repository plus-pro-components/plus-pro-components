# Form 表单

::: warning 注意
表单`v-model`绑定的值尽量使用 ref 定义绑定的值，以避免 reactive 带来的响应式丢失问题。 <el-text  type="primary" tag="ins">[参考 reactive 的局限性](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive)</el-text>
:::

## 基础用法(默认通栏)

:::demo

form/basic

:::

## 两列

:::demo

form/two-columns

:::

## 混合

:::demo

form/mixed

:::

## 隐藏 label

表单整体的`hasLabel` 设置为 `false` 时, 隐藏 label。配置[columns](/components/config.html)中的 `hasLabel`可以控制单个表单项的 label 是否显示， 优先级会更高。

:::demo

form/has-label

:::

## 异步（动态）数据用法

[PlusColumn](/components/config.html) 配置中的 `options` 支持数组，computed，函数和 Promise。
[PlusColumn](/components/config.html) 配置中的 `fieldProps`和`formItemProps` 支持对象 object，computed，函数和 Promise。

**常见的使用场景是数据来自后端接口，这里调用后端接口，options 返回 [OptionsRow[]](/components/type.html#optionsrow)数组即可。**

:::demo

form/async

:::

## 数据属性联动

[PlusColumn](/components/config.html)的`fieldProps`，`formItemProps`，`options`，`hideInForm`等根据数据变化，动态显示设置。

如下示例，点击状态选择框，当状态为`已解决` 时，`要求1 多选框`会变成 1 个可选， `名称 1，2 输入框`会被禁用，`标签 1 输入框`会被隐藏，`标签 2 输入框`会变成必填。

:::demo

form/data-attribute-linkage

:::

## 分组表单

配置 `group` 字段，则显示分组。配置 `group` 字段后，`columns` 则不在生效。

:::demo

form/group

:::

## 分组表单自定义头部

添加 `group-header` 插槽即可实现。

:::demo

form/group-header

:::

## 自定义表单底部按钮

组件提供 `footer` 插槽可以自定义表单底部，并提供默认的 **提交**方法、**重置**方法 的作用域插槽参数 `{handleSubmit,handleReset}`。

:::demo

form/custom-footer

:::

## 表单单项插槽配置

组件提供 `fieldSlots` 对象可以简易配置表单单项插槽， `fieldSlots` 的插槽配置是根据表单的 [valueType](/components/config.html#valuetype-可选的表单值) 自动进行匹配的，
如：

- `valueType` 是 `undefined`(默认值)时，`fieldSlots`的插槽就是给 [ElInput](https://element-plus.org/zh-CN/component/input.html#slots)的。
- `valueType` 是 `autocomplete`时，`fieldSlots`的插槽就是给 [ElAutocomplete](https://element-plus.org/zh-CN/component/autocomplete.html#slots)的。
- 其他以此类推（特殊的除外）

**特殊的**

- `valueType` 是 `checkbox`时，`fieldSlots`的插槽就是给 [ElCheckboxGroup ](https://element-plus.org/zh-CN/component/checkbox.html#checkboxbutton-api)的。
- `valueType` 是 `radio`时，`fieldSlots`的插槽就是给 [ElRadioGroup ](https://element-plus.org/zh-CN/component/radio.html#radiogroup-slots)的。

要实现更强大的自定义，请使用[自定义表单项](/components/form.html#自定义表单项-插槽)。

::: warning 注意

valueType 的值对应的组件本身没有插槽时，`fieldSlots`不生效。
:::

:::demo

form/field-slots

:::

## 自定义表单项 (插槽)

:::warning 注意
**插槽 的优先级低于 renderField，高于 valueType**。
:::

`PlusForm` 组件会自动根据配置项的 `prop` 生成对应的插槽，例如下面的配置项，则会自动生成两个名称叫做 [ **plus-field-`name`** ]和 [ **plus-field-`status`**] 的两个插槽，插槽的生成规则就是 固定 key 值 [ **plus-field-** ] 然后加上 配置项的 `prop`。

```ts
import { PlusColumn } from 'plus-pro-components'

const tableConfig: PlusColumn[] = [
  {
    label: '名称',
    // 自动生成对应的插槽 'plus-field-name'
    prop: 'name'
  },
  {
    label: '状态',
    // 自动生成对应的插槽 'plus-field-status'
    prop: 'status'
  }
]
```

:::demo

form/custom-slot

:::

## 自定义表单项 (renderField)

:::warning 注意
**renderField 的优先级高于插槽**。
:::

自定义表单项的核心方法是定义 `renderField`方法， `renderField` 方法需要返回一个 [VNode](https://cn.vuejs.org/guide/extras/render-function.html) 或 `String`

::: tip 提示
`renderField 返回的值`的`props` 和配置项的`fieldProps`会同时生效，`renderField 返回的值`的`props`优先级高于 `fieldProps`.

:::

:::demo

form/custom

:::

## 自定义表单项 (jsx/tsx)

:::warning 注意

jsx/tsx 的使用需要将 vue 单文件组件的`script`的属性 `lang`设置为`jsx`或者`tsx`，`jsx` 中值使用单花括号`{}`绑定。

```html
<script lang="tsx" setup></script>
```

:::

`jsx/tsx` 的支持本质是`jsx/tsx`解析出来是`VNode`, 使用 renderField 函数自定义表单项。

:::demo

form/custom-tsx

:::

## 自定义表单 label (插槽)

:::warning 注意
**插槽 的优先级低于 renderLabel，高于 label**。
:::

`PlusForm` 组件会自动根据配置项的 `prop` 生成对应的插槽，例如下面的配置项，则会自动生成两个名称叫做 [ **plus-label-`name`** ]和 [ **plus-label-`status`**] 的两个插槽，插槽的生成规则就是 固定 key 值 [ **plus-label-** ] 然后加上 配置项的 `prop`。

```ts
import { PlusColumn } from 'plus-pro-components'

const tableConfig: PlusColumn[] = [
  {
    label: '名称',
    // 自动生成对应的插槽 'plus-label-name'
    prop: 'name'
  },
  {
    label: '状态',
    // 自动生成对应的插槽 'plus-label-status'
    prop: 'status'
  }
]
```

:::demo

form/custom-label-slot

:::

## 自定义表单 label (renderLabel)

:::warning 注意
**renderLabel 的优先级高于插槽**。
:::

自定义表单项的核心方法是定义 `renderLabel`方法， `renderLabel` 方法需要返回一个 [VNode](https://cn.vuejs.org/guide/extras/render-function.html) 或 `String`

:::demo

form/custom-label

:::

## 自定义表单 label (jsx/tsx)

:::warning 注意

jsx/tsx 的使用需要将 vue 单文件组件的`script`的属性 `lang`设置为`jsx`或者`tsx`，`jsx` 中值使用单花括号`{}`绑定。

```html
<script lang="tsx" setup></script>
```

:::

`jsx/tsx` 的支持本质是`jsx/tsx`解析出来是`VNode`, 使用 renderField 函数自定义表单项。

:::demo

form/custom-label-tsx

:::

## 自定义表单下一行的内容

支持 [renderExtra](/components/config.html) 渲染函数，支持 jsx/tsx，支持插槽，插槽的生成规则就是 固定 key 值 [ **plus-extra-** ] 然后加上 配置项的 `prop`。

:::demo

form/extra

:::

## 自定义表单每一项子项的内容

<el-tag>v0.0.7</el-tag>

::: warning 注意

- 仅当[PlusColumn](/components/config.html)的`valueType` 为 `checkbox` | `radio` | `select` |`plus-radio`之一时生效。

- 当[PlusColumn](/components/config.html)的`valueType` 为`select`时，不建议定义`label`【无法回显】

- 当 `fieldSlot`函数 和`fieldChildrenSlot`函数同时出现的时候，`fieldSlot`函数的优先级更高。

  :::

[PlusColumn](/components/config.html)提供 [fieldChildrenSlot](/components/config.html) 函数可整体自定义表单每一项的子项，[PlusColumn](/components/config.html)的`options`中提供 [fieldSlot](/components/type.html#optionsrow) 函数可单独自定义表单每一项子项的内容。

:::demo

form/field-children-slot

:::

## 自定义 tooltip icon

<el-tag>v0.0.3</el-tag>

使用`tooltip-icon`插槽 可自定义 tooltip icon。

:::demo

form/tooltip-icon-slot

:::

## 所有内置的表单类型

:::demo

form/all

:::

## Form API

## Form Attributes

| 名称                    | 说明                                                                                                             | 类型                                                                                     | 默认值  | 是否必须 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------- | -------- |
| `model-value / v-model` | 表单绑定值 <el-text type="warning">（尽量使用 ref 定义绑定的值，以避免 reactive 带来的响应式丢失问题）</el-text> | `object` [FieldValues](/components/type.html#fieldvalues)                                |         | 否       |
| `defaultValues`         | 点击重置按钮时 赋值给表单                                                                                        | `object` [FieldValues](/components/type.html#fieldvalues)                                | `{}`    | 否       |
| `columns`               | 表单配置信息                                                                                                     | `array`[PlusColumn[]](/components/config.html)                                           | `[]`    | 否       |
| `rowProps`              | el-row 的 props                                                                                                  | `object`[RowProps](https://element-plus.org/zh-CN/component/layout.html#row-attributes)  |         | 否       |
| `colProps`              | el-col 属性                                                                                                      | `object`[ColProps](https://element-plus.org/zh-CN/component/layout.html#col-attributes)  |         | 否       |
| `labelWidth`            | el-form 的 labelWidth                                                                                            | `string`                                                                                 | `80px`  | 否       |
| `labelPosition`         | el-form 的 labelPosition                                                                                         | `string` <docs-tip content="'left' / 'right' / 'top'"></docs-tip>                        | `left`  | 否       |
| `labelSuffix`           | el-form 的 labelSuffix                                                                                           | `string`                                                                                 | `:`     | 否       |
| `hasErrorTip`           | 是否需要校验 message 提示                                                                                        | `boolean`                                                                                | `true`  | 否       |
| `hasFooter`             | 是否需要底部按钮                                                                                                 | `boolean`                                                                                | `true`  | 否       |
| `footerAlign`           | 底部按钮对齐方式                                                                                                 | `string` <docs-tip content="'left' / 'right' / 'center' "></docs-tip>                    | `left`  | 否       |
| `hasReset`              | 是否需要底部按钮 `重置`                                                                                          | `boolean`                                                                                | `true`  | 否       |
| `hasLabel`              | 是否显示 label，值为`false`时`labelWidth`会被设置为`0`，labelSuffix 会被设置为`''`                               | `boolean`                                                                                | `true`  | 否       |
| `submitLoading`         | 确定按钮 loading                                                                                                 | `boolean`                                                                                | `false` | 否       |
| `rules`                 | 表单校验                                                                                                         | `object` [FormRules](https://element-plus.org/zh-CN/component/form.html#form-attributes) | `{}`    | 否       |
| `group`                 | 分组表单配置                                                                                                     | `false` / (`object` [PlusFormGroupRow](/components/type.html#plusformgrouprow) )         | `{}`    | 否       |
| `submitText`            | 提交按钮文字                                                                                                     | `string`                                                                                 | `提交`  | 否       |
| `resetText`             | 重置按钮文字                                                                                                     | `string`                                                                                 | `重置`  | 否       |
| ...                     | ...                                                                                                              | ...                                                                                      | ...     | ...      |

**`...`表示同时支持所有[ElForm Attributes](https://element-plus.org/zh-CN/component/form.html#form-attributes)**

:::tip 提示
**[ElForm](https://element-plus.org/zh-CN/component/form.html#form-attributes) 的 model 参数已在组件内部处理，一般不需要传**。
:::

## Form Events

| 名称          | 说明                             | 类型                                                                                        |
| ------------- | -------------------------------- | ------------------------------------------------------------------------------------------- |
| `submit`      | 点击提交按钮校验通过触发的事件   | `function` <docs-tip content='(values: FieldValues) => void'></docs-tip>                    |
| `change`      | 表单变化触发的事件               | `function` <docs-tip content='(values: FieldValues,column: PlusColumn) => void'></docs-tip> |
| `reset`       | 点击重置按钮触发的事件           | `function` <docs-tip content='(values: FieldValues) => void'></docs-tip>                    |
| `submitError` | 点击提交按钮校验不通过触发的事件 | `function` <docs-tip content='(error:any) => void'></docs-tip>                              |
| ...           | ...                              | ...                                                                                         |

**`...`表示同时支持所有[ElForm Events](https://element-plus.org/zh-CN/component/form.html#form-%E4%BA%8B%E4%BB%B6)**

:::tip 提示

如 el-form 的 validate。

示例：

> 模板中

```html
<PlusForm @validate="handleValidate" />
```

> setup 中

```ts
const handleValidate = (prop: FormItemProp, isValid: boolean, message: string) => {
  console.log(dropdownItem)
}
```

:::

## Form Slots

| 插槽名                                | 说明                                                                                 | 作用域插槽参数                             |
| ------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------ |
| `default`                             | 表单的内容 默认是 `PlusFormItem` 组件                                                |                                            |
| `footer`                              | 表单底部按钮                                                                         | `{handleReset,handleSubmit}`               |
| `tooltip-icon`<el-tag>v0.0.3</el-tag> | tooltip icon                                                                         |                                            |
| `group-header`                        | 分组表单头部，配置 group 字段时生效。                                                | `{title,columns,icon}`                     |
| `plus-field-*`                        | 自定义表单项，组件会自动根据配置项的 prop 生成对应的插槽                             | `{prop,label,fieldProps,valueType,column}` |
| `plus-label-*`                        | 自定义表单项 label，组件会自动根据配置项的 prop 生成对应的插槽                       | `{prop,label,fieldProps,valueType,column}` |
| `plus-extra-*`                        | 自定义渲染 el-form-item 下一行额外的内容，组件会自动根据配置项的 prop 生成对应的插槽 | `{column}`                                 |

## Exposes

| 名称           | 说明                                                                | 类型                                                                 |
| -------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `formInstance` | `el-form` 实例                                                      | `object` <docs-tip content="InstanceType<typeof ElForm>"></docs-tip> |
| `handleReset`  | 表单默认的重置方法                                                  | `function` <docs-tip content="() => void"></docs-tip>                |
| `handleSubmit` | 表单默认的提交方法，有校验的话，校验成功返回`true`，失败返回`false` | `function` <docs-tip content=" () => Promise<boolean>"></docs-tip>   |

**拿到 formInstance 后支持所有[ElForm 方法](https://element-plus.org/zh-CN/component/form.html#form-exposes)**

::: tip 提示
如 `validate`,`validateField`等
:::
