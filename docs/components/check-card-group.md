# CheckCardGroup 多选卡片组

## 简介

PlusCheckCardGroup 集成 [PlusCheckCard](/components/check-card.html) 实现多选功能。

## 单选用法

:::demo

check-card-group/basic

:::

## 多选用法

配置 multiple 可实现多选。

:::demo

check-card-group/multiple

:::

## 不同尺寸

配置 size 控制整体尺寸大小，当前可选 large，default，small，不同尺寸仅宽度不同。 options 中的 size 优先级更高。

:::demo

check-card-group/size

:::

## 禁用

配置 disabled 控制整体 禁用， options 中的 disabled 优先级更高。

:::demo

check-card-group/disabled

:::

## 自定义 (render)

:::warning 注意
**render 函数的优先级高于插槽**
:::

:::demo

check-card-group/custom

:::

## 自定义 (jsx/tsx)

:::demo

check-card-group/tsx

:::

## 自定义 (插槽)

:::warning 注意
**插槽优先级低于 render**
:::

插槽支持**整体**配置 和**个性化**配置，**整体插槽**会改变每一项，**个性化插槽**可以单独定制其中的某一项。

**个性化插槽**说明：`CheckCardGroup` 组件会自动根据配置项的 `value` 生成对应的插槽，例如下面的配置项，则会自动生成以下名称叫做 [ **title-`0`** ]，[ **avatar-`0`**] ， [ **description-`0`**]，[ **title-`1`** ]，[ **avatar-`1`**] 和 [ **description-`1`**] 的插槽，插槽的生成规则就是 固定 key 值 [ **title-** ]，[ **avatar-** ] ，[ **description-** ] 然后加上 配置项的 `value`。`extra` 插槽 也是同样的逻辑 [ **extra-** ] + `value` 。

```ts
const options = [
  {
    title: 'title0',
    value: '0',
    description: 'description0',
    avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  },
  {
    title: 'title1',
    value: '1',
    description: 'description1',
    avatar: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
  }
]
```

:::demo

check-card-group/slot

:::

## CheckCardGroup API

## CheckCardGroup Attributes

| 名称                    | 说明                                                                                                                                        | 类型                                                                                              | 默认值  | 是否必须 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------- | -------- |
| `model-value / v-model` | 绑定值                                                                                                                                      | `string/number` / (`array` <docs-tip content='string[]/number[]/(number /string)[]'></docs-tip> ) |         | 否       |
| `options`               | 数据数组，支持 [PlusCheckCard](/components/check-card.html#checkcard-attributes) 的所有 `props` (`modelValue` 除外)，数组中`value` 为必选项 | `array` <docs-tip content=' (PlusCheckCardProps & { value: string / number })[]'></docs-tip>      |         | 否       |
| `size`                  | 尺寸                                                                                                                                        | `string` <docs-tip content='"default" / "small" / "large"'></docs-tip>                            |         | 否       |
| `disabled`              | 禁用                                                                                                                                        | `boolean`                                                                                         | `false` | 否       |
| `multiple`              | 多选，当值为`true` 时 `v-model` 的类型是对应的数组。                                                                                        | `boolean`                                                                                         | `false` | 否       |

## CheckCardGroup Events

| 名称     | 说明           | 类型                                                                                                         |
| -------- | -------------- | ------------------------------------------------------------------------------------------------------------ |
| `change` | 点击卡片时触发 | `function` <docs-tip content='(checked: (string/number)[]) => void'></docs-tip>                              |
| `extra`  | 点击操作栏触发 | `function` <docs-tip content='(option: PlusCheckCardProps & { value: string / number }) => void'></docs-tip> |

## CheckCardGroup Slots

| 插槽名             | 说明          | 作用域插槽参数                                                      |
| ------------------ | ------------- | ------------------------------------------------------------------- |
| `avatar`(-\*)      | 自定义 头像   | `object` <docs-tip content='{avatar,title,description}'></docs-tip> |
| `title`(-\*)       | 自定义 标题   | `object` <docs-tip content='{avatar,title,description}'></docs-tip> |
| `description`(-\*) | 自定义 描述   | `object` <docs-tip content='{avatar,title,description}'></docs-tip> |
| `extra`(-\*)       | 自定义 操作栏 | `object` <docs-tip content='{avatar,title,description}'></docs-tip> |

:::tip 提示

带 `-*` 表示是个性化插槽，组件会自动根据配置项的 value 生成对应的插槽
:::
