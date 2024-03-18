# 版本升级

## 从 v0.0.3 迁移到 v0.0.4

### PlusFormItem 表单单项组件

- 表单单项组件 移除了 `valueType === 'date-picker'`时，`el-date-picker` 组件的默认属性 `format` 和`value-format`，原来的默认值都为 `YYYY-MM-DD HH:mm:ss`。

- 受影响的组件

  - [PlusForm](/components/form.html),
  - [PlusDialogForm](/components/dialog-form.html)
  - [PlusDrawerForm ](/components/drawer-form.html)
  - [PlusStepsForm ](/components/steps-form.html)
  - [PlusSearch ](/components/search.html)
  - [PlusDisplayItem ](/components/display-item.html)
  - [PlusTable ](/components/table.html)
  - [PlusPage ](/components/page.html)

## 从 v0.0.2 迁移到 v0.0.3

### 高级组件通用配置 columns

- `headerFilter`参数已经移除，请使用 `disabledHeaderFilter`代替。[ 参考 columns](/components/config.html)
