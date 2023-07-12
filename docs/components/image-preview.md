# ImagePreview 弹窗

## 基础用法

:::demo

image-preview/basic

:::

## ImagePreview API

### ImagePreview Attributes

| 名称                    | 说明                   | 类型                                                               | 默认值     | 是否必须 |
| ----------------------- | ---------------------- | ------------------------------------------------------------------ | ---------- | -------- |
| `model-value / v-model` | 预览弹窗是否显示绑定值 | `boolean`                                                          | `false`    | 否       |
| `srcList`               | 预览的数据             | [PlusImagePreviewRow[]](/components/type.html#plusimagepreviewrow) | `[]`       | 否       |
| `title`                 | 弹窗标题               | `string`                                                           | `图片预览` |
