# DrawerForm 表单

## 基础用法

:::demo

drawer-form/basic

:::

## DrawerForm API

## DrawerForm Attributes

| 名称                        | 说明               | 类型                                                                                         | 默认值                                                                 | 是否必须 |
| --------------------------- | ------------------ | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | -------- |
| `model-value / v-model`     | 表单绑定值         | [RecordType](/components/type.html#recordtype)                                               |                                                                        | 否       |
| `visible / v-model:visible` | 抽屉显示           | `boolean`                                                                                    | `false`                                                                | 否       |
| `form`                      | PlusForm 的 props  | [PlusFormProps](/components/form.html#form-attributes)                                       | `{footerAlign:"right"}`                                                | 否       |
| `drawer`                    | el-drawer 的 props | [ElDrawerProps](https://element-plus.gitee.io/zh-CN/component/drawer.html#drawer-attributes) | `{closeOnClickModal:false,closeOnPressEscape:false, title:"抽屉表单"}` | 否       |

## DrawerForm Events

| 名称     | 说明                           | 类型                               |
| -------- | ------------------------------ | ---------------------------------- |
| `submit` | 点击确定按钮校验通过触发的事件 | [Function] `(values: any) => void` |
| `change` | 表单变化触发的事件             | [Function] `(values:any) => void`  |
| `cancel` | 点击取消按钮触发的事件         | [Function] `() => void`            |

## DrawerForm Slots

| 插槽名          | 说明                     |
| --------------- | ------------------------ |
| `drawer-header` | el-drawer 的 header slot |
| `drawer-footer` | el-drawer 的 footer slot |
| `form-foote`    | PlusForm 的 footer slot  |

## Exposes

| 名称             | 说明             | 类型                            |
| ---------------- | ---------------- | ------------------------------- |
| `formInstance`   | `el-form` 实例   | `InstanceType<typeof ElForm>`   |
| `drawerInstance` | `el-drawer` 实例 | `InstanceType<typeof ElDrawer>` |
