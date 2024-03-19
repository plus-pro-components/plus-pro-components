# FormItem 表单单项组件

[PlusForm](/components/form.html) 组件的每一项。

::: warning 注意
表单`v-model`绑定的值尽量使用 ref 定义绑定的值，以避免 reactive 带来的响应式丢失问题。 <el-text  type="primary" tag="ins">[参考 reactive 的局限性](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive)</el-text>
:::

## 基础用法

设置 `valueType` 控制表单的类型。

:::demo

form-item/basic

:::

## 异步（动态）数据用法

[PlusColumn](/components/config.html) 配置中的 `options` 支持数组， computed，函数和 Promise。

:::demo

form-item/async

:::

## 自定义表单项 (插槽)

:::warning 注意
**插槽 的优先级低于 renderField，高于 valueType**。
:::

`PlusFormItem` 组件会自动根据配置项的 `prop` 生成对应的插槽，例如下面的配置项，则会自动生成两个名称叫做 [ **plus-field-`name`** ]和 [ **plus-field-`status`**] 的两个插槽，插槽的生成规则就是 固定 key 值 [ **plus-field-** ] 然后加上 配置项的 `prop`。

```html
<!--   自动生成对应的插槽 'plus-field-name' -->
<PlusFormItem label="自定义" prop="name">
  <template #plus-field-name>
    <el-input placeholder="自定义输入框插槽" />
  </template>
</PlusFormItem>

<!-- 自动生成对应的插槽 'plus-field-status' -->
<PlusFormItem label="自定义" prop="name">
  <template #plus-field-status>
    <el-input placeholder="自定义输入框插槽" />
  </template>
</PlusFormItem>
```

:::demo

form-item/custom-slot

:::

## 自定义表单项 (renderField)

:::warning 注意
**renderField 的优先级高于插槽**。
:::

自定义表单项的核心方法是定义 `renderField`方法， `renderField` 方法需要调用 vue 的[渲染函数 h](https://cn.vuejs.org/guide/extras/render-function.html) 返回一个 `VNode`

::: tip 提示
`renderField 返回的值`的`props` 和配置项的`fieldProps`会同时生效，`renderField 返回的值`的`props`优先级高于 `fieldProps`.

:::

:::demo

form-item/custom

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

form-item/custom-tsx

:::

## 自定义表单 label (插槽)

:::warning 注意
**插槽 的优先级低于 renderLabel，高于 label**。
:::

`PlusFormItem` 组件会自动根据配置项的 `prop` 生成对应的插槽，例如下面的配置项，则会自动生成两个名称叫做 [ **plus-label-`name`** ]和 [ **plus-label-`status`**] 的两个插槽，插槽的生成规则就是 固定 key 值 [ **plus-label-** ] 然后加上 配置项的 `prop`。

```html
<!--   自动生成对应的插槽 'plus-label-name' -->
<PlusFormItem label="自定义" prop="name">
  <template #plus-label-name>
    <el-input placeholder="自定义输入框插槽" />
  </template>
</PlusFormItem>

<!-- 自动生成对应的插槽 'plus-label-status' -->
<PlusFormItem label="自定义" prop="name">
  <template #plus-label-status>
    <el-input placeholder="自定义输入框插槽" />
  </template>
</PlusFormItem>
```

:::demo

form-item/custom-label-slot

:::

## 自定义表单 label (renderLabel)

:::warning 注意
**renderLabel 的优先级高于插槽**。
:::

自定义表单项的核心方法是定义 `renderLabel`方法， `renderLabel` 方法需要调用 vue 的[渲染函数 h](https://cn.vuejs.org/guide/extras/render-function.html) 返回一个 `VNode`

:::demo

form-item/custom-label

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

form-item/custom-label-tsx

:::

## 所有支持的类型

:::demo

form-item/all

:::

## FormItem API

## FormItem Attributes

| 名称                    | 说明                                                                                                              | 类型                                                                                                                       | 默认值 | 是否必须 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------ | -------- |
| `model-value / v-model` | 表单绑定值 <el-text type="warning">（尽量使用 ref 定义绑定的值，以避免 reactive 带来的响应式丢失问题）</el-text>  | `object`[FieldValues](/components/type.html#fieldvalues)                                                                   |        | 否       |
| `label`                 | el-form-item 的 label                                                                                             | `string`                                                                                                                   |        | 是       |
| `prop`                  | el-input 等所有表单项的双向绑定的值；                                                                             | `string`                                                                                                                   |        | 是       |
| `valueType`             | 值的类型                                                                                                          | `string`[FormItemValueType](/components/type.html#formitemvaluetype)                                                       |        | 否       |
| `options`               | el-select，el-radio-group，el-checkbox-group 选项 ，支持数组，函数，和 Promise                                    | `array/function/promise`[OptionsType](/components/type.html#optionstype)                                                   |        | 否       |
| `tooltip`               | 展示一个 icon，hover 时展示一些提示信息                                                                           | `string` / (`object`[ElTooltipProps](https://element-plus.org/zh-CN/component/tooltip.html#attributes) )                   |        | 否       |
| `renderField`           | 自定义渲染 el-form-item 下的 field-item 组件，自定义渲染同步表单的值的核心方法是调用 onChange 回调把值传给表单    | `function` <docs-tip content='(value:any,onChange: (value: any) => void, props: any ) => VNode '></docs-tip>               |        | 否       |
| `formItemProps`         | 传递给 el-form-item 的配置，支持所有 el-form-item 的 props。值支持对象 object，computed，函数和 Promise。         | `object/function/promise`[PropsItemType](/components/type.html#propsitemtype)                                              |        | 否       |
| `fieldProps`            | 传递给具体表单项和表格显示的配置，如 el-input，el-select 的 props。 值支持对象 object，computed，函数和 Promise。 | `object/function/promise`[PropsItemType](/components/type.html#propsitemtype)                                              |        | 否       |
| `renderLabel`           | 自定义渲染 el-form-item 下 label 行显示内容                                                                       | `function` <docs-tip content='(label: any, data:{ row: object; index: number; column: PlusColumn}) =>  VNode '></docs-tip> |        | 否       |

## FormItem Slots

| 插槽名         | 说明                                                           | 作用域插槽参数                             |
| -------------- | -------------------------------------------------------------- | ------------------------------------------ |
| `plus-field-*` | 自定义表单项，组件会自动根据配置项的 prop 生成对应的插槽       | `{prop,label,fieldProps,valueType,column}` |
| `plus-label-*` | 自定义表单项 label，组件会自动根据配置项的 prop 生成对应的插槽 | `{prop,label,fieldProps,valueType,column}` |

## Exposes

| 名称               | 说明                           | 类型                                                                     |
| ------------------ | ------------------------------ | ------------------------------------------------------------------------ |
| `formItemInstance` | el-form-tem 实例               | `object` <docs-tip content='InstanceType<typeof ElFormItem>'></docs-tip> |
| `fieldInstance`    | 具体的表单单项实例 如 el-input | `object`                                                                 |
