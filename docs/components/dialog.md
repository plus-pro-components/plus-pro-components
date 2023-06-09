# Dialog 弹窗

## 基础用法

:::demo

dialog/basic

:::

## Dialog API

### Dialog Attributes

| 名称                    | 说明               | 类型      | 默认值  | 是否必须 |
| ----------------------- | ------------------ | --------- | ------- | -------- |
| `model-value / v-model` | 弹窗是否显示绑定值 | `boolean` | `false` | 否       |
| `confirmText`           | 确认按钮文字       | `string`  | `确认`  | 否       |
| `cancelText`            | 取消按钮文字       | `string`  | `取消`  |
| `confirmLoading`        | 确认按钮 loading   | `boolean` | `false` | 否       |
| `hasFooter`             | 是否需要底部按钮   | `boolean` | `true`  | 否       |
| `top`                   | 弹窗距离顶部的距离 | `string`  | `15vh`  | 否       |
| `width`                 | 弹窗宽             | `string`  | `460px` | 否       |
| `header`                | 弹窗标题           | `string`  | ``      | 否       |
| ...                     | ...                | ...       | ...     | ...      |

**`...`表示同时支持所有 `el-dialog` Attributes**

### Dialog Events

| 名称      | 说明             | 类型                    |
| --------- | ---------------- | ----------------------- |
| `confirm` | 点击确认按钮触发 | [Function] `() => void` |
| `cancel`  | 点击取消按钮触发 | [Function] `() => void` |

### Dialog Slots

| 插槽名    | 说明     |
| --------- | -------- |
| `default` | 弹窗内容 |
| `header`  | 弹窗头部 |
| `footer`  | 弹窗底部 |
