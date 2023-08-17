# Popover 弹出框

## 基础用法

:::demo

popover/basic

:::

## 内容可扩展

:::demo

popover/expand

:::

## 虚拟触发

:::demo

popover/virtual

:::

## 嵌套操作

:::demo

popover/nest

:::

## Popover API

## Popover Attributes

| 名称                  | 说明               | 类型      | 默认值  | 是否必须 |
| --------------------- | ------------------ | --------- | ------- | -------- |
| `visible`             | `Popover` 是否显示 | `boolean` | `false` | 否       |
| `hasShowBottomButton` | 是否显示底部按钮   | `boolean` | `false` | 否       |
| ...                   | ...                | ...       | ...     | ...      |

`...`表示同时支持所有 [ElPopover Attributes](https://element-plus.org/zh-CN/component/popover.html#attributes)

## Popover Events

| 名称      | 说明             | 类型                                                  |
| --------- | ---------------- | ----------------------------------------------------- |
| `show`    | 显示时触发       | `function` <docs-tip content='() => void'></docs-tip> |
| `confirm` | 点击确定按钮触发 | `function` <docs-tip content='() => void'></docs-tip> |
| `cancel`  | 点击取消按钮触发 | `function` <docs-tip content='() => void'></docs-tip> |
| ...       | ...              | ...                                                   |

`...`表示同时支持所有 [ElPopover Attributes](https://element-plus.org/zh-CN/component/popover.html#events)

## Popover Slots

| 插槽名 | 说明 |
| ------ | ---- |
| ...    | ...  |

`...`表示同时支持所有 [ElPopover Attributes](https://element-plus.org/zh-CN/component/popover.html#slots)
