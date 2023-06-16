# Radio 单选

## 基础用法

:::demo

radio/basic

:::

## Radio API

### Radio Attributes

| 名称                    | 说明                 | 类型                                                | 默认值  | 是否必须 |
| ----------------------- | -------------------- | --------------------------------------------------- | ------- | -------- |
| `model-value / v-model` | 选中项绑定值         | `string/ number/ boolean`                           | `''`    | 否       |
| `data`                  | radio 的数据源       | `{ label: string; value: string/number/boolean }[]` | `[]`    | 是       |
| `isCancel`              | 是否可以取消选中状态 | `boolean`                                           | `false` | 否       |

### Radio Events

| 名称          | 说明                      | 类型                                               |
| ------------- | ------------------------- | -------------------------------------------------- |
| `radioChange` | 单个 value 变化触发的事件 | [Function] `(value:string/number/boolean) => void` |
