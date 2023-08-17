# DisplayItem 显示单项组件

[PlusTable](/components/table.html) 组件单元格显示的每一项。

## 基础用法

:::demo

display-item/basic

:::

## DisplayItem API

## DisplayItem Attributes

| 名称     | 说明           | 类型                                          | 默认值 | 是否必须 |
| -------- | -------------- | --------------------------------------------- | ------ | -------- |
| `column` | 需要显示的配置 | `object`[PlusColumn](/components/config.html) |        | 是       |
| `row`    | 数据           | `object`                                      |        | 是       |
| `index`  | 索引           | `number`                                      |        |

## Exposes

| 名称            | 说明     | 类型                                                  |
| --------------- | -------- | ----------------------------------------------------- |
| `startCellEdit` | 开起编辑 | `function` <docs-tip content='() => void'></docs-tip> |
| `stopCellEdit`  | 停止编辑 | `function` <docs-tip content='() => void'></docs-tip> |
