# DisplayItem 显示单项组件

[PlusTable](/components/table.html) 组件单元格显示的每一项。

## 基础用法

:::demo

display-item/basic

:::

## 单项插槽配置

:::demo

display-item/field-slots

:::

## DisplayItem API

## DisplayItem Attributes

| 名称     | 说明           | 类型                                          | 默认值 | 是否必须 |
| -------- | -------------- | --------------------------------------------- | ------ | -------- |
| `column` | 需要显示的配置 | `object`[PlusColumn](/components/config.html) |        | 是       |
| `row`    | 数据           | `object`                                      |        | 是       |
| `index`  | 索引           | `number`                                      |        |

## DisplayItem Slots

| 插槽名        | 说明                                                     | 作用域插槽参数                                       |
| ------------- | -------------------------------------------------------- | ---------------------------------------------------- |
| `plus-cell-*` | 自定义显示项，组件会自动根据配置项的 prop 生成对应的插槽 | `{row,prop,label,fieldProps,value,valueType,column}` |

## Exposes

| 名称            | 说明     | 类型                                                  |
| --------------- | -------- | ----------------------------------------------------- |
| `startCellEdit` | 开起编辑 | `function` <docs-tip content='() => void'></docs-tip> |
| `stopCellEdit`  | 停止编辑 | `function` <docs-tip content='() => void'></docs-tip> |
