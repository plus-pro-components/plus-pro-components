# date-picker

## 基础用法

:::demo

date-picker/basic

:::

## DatePicker API

### DatePicker Attributes

| 名称                    | 说明                                      | 类型       | 默认值                | 是否必须 |
| ----------------------- | ----------------------------------------- | ---------- | --------------------- | -------- |
| `model-value / v-model` | 绑定值                                    | `string[]` | `false`               | 否       |
| `format`                | 显示在输入框中的格式                      | `string`   | `YYYY-MM-DD HH:mm:ss` | 否       |
| `valueFormat`           | 绑定值的格式。 不指定则绑定值为 Date 对象 | `string`   | `YYYY-MM-DD HH:mm:ss` | 否       |
| `readonly`              | 只读                                      | `boolean`  | `false`               | 否       |
| `disabled`              | 禁用                                      | `boolean`  | `false`               | 否       |
| `rangeSeparator`        | 开始时间和结束时间中间的分隔符            | `string`   | `/`                   | 否       |
| `startPlaceholder`      | 开始时间的占位内容                        | `string`   | `''`                  | 否       |
| `endPlaceholder`        | 结束时间的占位内容                        | `string`   | `''`                  | 否       |

### DatePicker Events

| 名称     | 说明           | 类型                                  |
| -------- | -------------- | ------------------------------------- |
| `change` | 用户选值时触发 | [Function] `(value:string[]) => void` |
