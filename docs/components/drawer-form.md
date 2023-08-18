# DrawerForm 表单

DrawerForm 组件是 [ElDrawer](https://element-plus.gitee.io/zh-CN/component/drawer.html)和 [PlusForm](/components/form.html) 组件的组合。

## 基础用法

:::demo

drawer-form/basic

:::

## DrawerForm API

## DrawerForm Attributes

| 名称                        | 说明                                                                           | 类型                                                                                                 | 默认值                                                                 | 是否必须 |
| --------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | -------- |
| `model-value / v-model`     | 表单绑定值                                                                     | `object`[FieldValues](/components/type.html#fieldvalues)                                             |                                                                        | 否       |
| `visible / v-model:visible` | 抽屉显示                                                                       | `boolean`                                                                                            | `false`                                                                | 否       |
| `form`                      | [PlusForm](/components/form.html) 的 props                                     | `object`[PlusFormProps](/components/form.html#form-attributes)                                       | `{footerAlign:"right"}`                                                | 否       |
| `drawer`                    | [ElDrawer](https://element-plus.gitee.io/zh-CN/component/drawer.html) 的 props | `object`[ElDrawerProps](https://element-plus.gitee.io/zh-CN/component/drawer.html#drawer-attributes) | `{closeOnClickModal:false,closeOnPressEscape:false, title:"抽屉表单"}` | 否       |

## DrawerForm Events

| 名称     | 说明                           | 类型                                                                                        |
| -------- | ------------------------------ | ------------------------------------------------------------------------------------------- |
| `submit` | 点击确定按钮校验通过触发的事件 | `function` <docs-tip content='(values: FieldValues) => void'></docs-tip>                    |
| `change` | 表单变化触发的事件             | `function` <docs-tip content='(values: FieldValues,column: PlusColumn) => void'></docs-tip> |
| `cancel` | 点击取消按钮触发的事件         | `function`<docs-tip content='() => void'></docs-tip>                                        |

## DrawerForm Slots

| 插槽名                   | 说明                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `drawer-header`          | [ElDrawer](https://element-plus.gitee.io/zh-CN/component/drawer.html#插槽) 的 header slot |
| `drawer-footer`          | [ElDrawer](https://element-plus.gitee.io/zh-CN/component/drawer.html#插槽) 的 footer slot |
| `form-footer`            | [PlusForm-footer](/components/form.html#form-slots) 的 footer slot                        |
| `form-group-item-header` | [PlusForm-group-item-header](/components/form.html#form-slots) 的 group-item-header slot  |

## Exposes

| 名称             | 说明             | 类型                                                                   |
| ---------------- | ---------------- | ---------------------------------------------------------------------- |
| `formInstance`   | `el-form` 实例   | `object` <docs-tip content="InstanceType<typeof ElForm>"></docs-tip>   |
| `drawerInstance` | `el-drawer` 实例 | `object` <docs-tip content="InstanceType<typeof ElDrawer>"></docs-tip> |
