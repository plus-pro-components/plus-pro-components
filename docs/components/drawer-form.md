# DrawerForm 表单

DrawerForm 组件是 [ElDrawer](https://element-plus.org/zh-CN/component/drawer.html)和 [PlusForm](/components/form.html) 组件的组合。

::: warning 注意
表单`v-model`绑定的值尽量使用 ref 定义绑定的值，以避免 reactive 带来的响应式丢失问题。 <el-text  type="primary" tag="ins">[参考 reactive 的局限性](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive)</el-text>
:::

## 基础用法

:::demo

drawer-form/basic

:::

## 自定义表单项

支持 [PlusForm 自定义表单项](/components/form.html#自定义表单项-renderfield) 自定义表单项 的三种(`renderField`/`slot`/`jsx`)方式。

:::demo

drawer-form/slot

:::

## 自定义表单 label

支持 [PlusForm 自定义表单 label](/components/form.html#自定义表单-label-插槽) 自定义表单项 的三种(`renderLabel`/`slot`/`jsx`)`方式。

:::demo

drawer-form/slot-label

:::

## DrawerForm API

## DrawerForm Attributes

| 名称                        | 说明                                                                                                                 | 类型                                                                                            | 默认值                                                                 | 是否必须 |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | -------- |
| `model-value / v-model`     | 表单绑定 <el-text type="warning">（尽量使用 ref 定义绑定的值，以避免 reactive 带来的响应式丢失问题）</el-text> 值    | `object`[FieldValues](/components/type.html#fieldvalues)                                        |                                                                        | 否       |
| `visible / v-model:visible` | 抽屉显示                                                                                                             | `boolean`                                                                                       | `false`                                                                | 否       |
| `size`                      | Drawer 窗体的大小, 当使用 number 类型时, 以像素为单位, 当使用 string 类型时, 请传入 'x%', 否则便会以 number 类型解释 | `string`/`number`                                                                               | `540px`                                                                | 否       |
| `form`                      | [PlusForm](/components/form.html) 的 props                                                                           | `object`[PlusFormProps](/components/form.html#form-attributes)                                  | `{footerAlign:"right"}`                                                | 否       |
| `drawer`                    | [ElDrawer](https://element-plus.org/zh-CN/component/drawer.html) 的 props                                            | `object`[ElDrawerProps](https://element-plus.org/zh-CN/component/drawer.html#drawer-attributes) | `{closeOnClickModal:false,closeOnPressEscape:false, title:"抽屉表单"}` | 否       |

## DrawerForm Events

| 名称     | 说明                           | 类型                                                                                        |
| -------- | ------------------------------ | ------------------------------------------------------------------------------------------- |
| `submit` | 点击确定按钮校验通过触发的事件 | `function` <docs-tip content='(values: FieldValues) => void'></docs-tip>                    |
| `change` | 表单变化触发的事件             | `function` <docs-tip content='(values: FieldValues,column: PlusColumn) => void'></docs-tip> |
| `cancel` | 点击取消按钮触发的事件         | `function`<docs-tip content='() => void'></docs-tip>                                        |

## DrawerForm Slots

| 插槽名                                | 说明                                                                                                                               | 作用域插槽参数                             |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `drawer-header`                       | [ElDrawer](https://element-plus.org/zh-CN/component/drawer.html#插槽) 的 header slot                                               |                                            |
| `drawer-footer`                       | [ElDrawer](https://element-plus.org/zh-CN/component/drawer.html#插槽) 的 footer slot                                               |                                            |
| `form-footer`                         | [PlusForm](/components/form.html#form-slots) 的 footer slot                                                                        | `{handleReset,handleSubmit}`               |
| `tooltip-icon`<el-tag>v0.0.3</el-tag> | [PlusForm](/components/form.html#form-slots) 的 tooltip icon                                                                       |                                            |
| `form-group-header`                   | [PlusForm](/components/form.html#form-slots) 的 group-header slot                                                                  | `{title,columns,icon}`                     |
| `plus-field-*`                        | [PlusForm](/components/form.html#form-slots) 的自定义表单项，组件会自动根据配置项的 prop 生成对应的插槽                            | `{prop,label,fieldProps,valueType,column}` |
| `plus-label-*`                        | [PlusForm](/components/form.html#form-slots) 的自定义表单项 label，组件会自动根据配置项的 prop 生成对应的插槽                      | `{prop,label,fieldProps,valueType,column}` |
| `plus-extra-*`                        | [PlusForm](/components/form.html#form-slots)的自定义渲染 el-form-item 下一行额外的内容，组件会自动根据配置项的 prop 生成对应的插槽 | `{column}`                                 |

## Exposes

| 名称             | 说明             | 类型                                                                   |
| ---------------- | ---------------- | ---------------------------------------------------------------------- |
| `formInstance`   | `el-form` 实例   | `object` <docs-tip content="InstanceType<typeof ElForm>"></docs-tip>   |
| `drawerInstance` | `el-drawer` 实例 | `object` <docs-tip content="InstanceType<typeof ElDrawer>"></docs-tip> |
