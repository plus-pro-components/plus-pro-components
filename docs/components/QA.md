# 常见问题

## 组件 TypeScript 类型不兼容或错误 ？

借用[Ant Design Pro](https://pro.ant.design/zh-CN/docs/type-script/#ts-ignore)官网的一句话:

`TypeScript 毕竟是一个标注语言，在需要使用 any 的时候不必吝于使用 any，在遇到【动态性比较强的代码】时，不妨使用 as unknown as XXX, 可以节省很多时间。`

`@ts-ignore` `@vue-ignore`

有些时候类型错误是组件的，但是看起来非常难受。会一直编译报错，这里就可以使用 `@ts-ignore` 来暂时忽略它，在模板中还可以使用`@vue-ignore`

> \*.vue

```html
<template>
  <!-- @vue-ignore -->
  <!-- 报错的组件 -->
</template>

<script lang="ts" setup>
  // @ts-ignore
  // 报错的行
</script>
```

## 表格的 columns 使用 ref 定义类型报错

[详见 issues/195](https://github.com/plus-pro-components/plus-pro-components/issues/195)

```ts
import type { Ref } from 'vue'
import type { PlusColumn } from 'plus-pro-components'

//  const columns = ref<PlusColumn[]>([])   类型替换为下面的写法
const columns: Ref<PlusColumn[]> = ref([])
```

## 是否兼容element-plus@2.6.0 ？

是， [详见 issues/79](https://github.com/plus-pro-components/plus-pro-components/issues/79)，[详见 issues/105](https://github.com/plus-pro-components/plus-pro-components/issues/105)

## 按钮，placeholder，标题文本显示异常？

![详见](/i18n-error.png)

![详见](/i18n-error2.png)

问题原因：未配置 `plus-pro-components` 的国际化。

解决方案：[配置国际化](/guide/i18n.html)

## 国际化配置了不起效果？

[详见](/guide/i18n.html#国际化不起效果)

## 表单字段改变后怎么根据改变字段的值通过接口获取另一个字段的 options?

[详见 issues/99](https://github.com/plus-pro-components/plus-pro-components/issues/99)

## PlusTable 和 PlusForm 复用 PlusColumn 问题？

[详见 issues/94](https://github.com/plus-pro-components/plus-pro-components/issues/94)

## 单个组件的事件在哪里配置?

[参考](/components/attrs.html)

## PlusTable 表格操作栏如何居中显示?

小于<el-tag>v0.1.7</el-tag>

```css
.plus-table .plus-table-action-bar .cell {
  justify-content: center;
}
```

大于等于<el-tag>v0.1.7</el-tag>

```html
<PlusTable :action-bar="{ actionBarTableColumnProps: { align: 'center' } }" />
```

## PlusTable 表格操作栏如何做权限控制?

小于<el-tag>v0.1.7</el-tag>

可使用 [ActionBarButtonsRow](/components/type.html#actionbarbuttonsrow) 中的 `show` 字段控制。 [示例](/components/table.html#自定义操作栏)

大于等于<el-tag>v0.1.7</el-tag>

可使用 [ActionBarButtonsRow](/components/type.html#actionbarbuttonsrow) 中的 `directives`指令字段控制。[示例](/components/table.html#权限控制)

## 搜索表单如何改变重置、搜索按钮的顺序?

[参考 flex 布局 order ](https://www.w3school.com.cn/tiy/t.asp?f=cssref_order)

[详见 issues/54](https://github.com/plus-pro-components/plus-pro-components/issues/54)

```css
.plus-search__button__wrapper .el-button {
  order: 2;
}

.plus-search__button__wrapper .el-button--primary {
  order: 1;
  margin-left: 0;
  margin-right: 20px;
}

.plus-search__button__wrapper .el-link {
  order: 3;
}
```

## PlusForm 里面的表单元素，想单独占一行，但是宽度是`{colProps: {span: 8}}` 怎么配置？

```ts
import type { PlusColumn } from 'plus-pro-components'

const columns: PlusColumn[] = [
  {
    label: 'test',
    prop: 'test',
    colProps: {
      span: 8, // 实际宽度是 33.3%
      // @ts-ignore
      style: { marginRight: '67%' }
    }
  }
]
```

## 表单中的某项如何添加 ref 获取实例，使用实例的方法？

```vue {15,50-52}
<template>
  <el-card>
    <PlusForm v-model="state" label-width="140px" :columns="columns" />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { PlusColumn, FieldValues } from 'plus-pro-components'

const state = ref<FieldValues>({
  'tree-select': ''
})

const treeSelectInstance = ref()

watch(treeSelectInstance, val => {
  console.log(val, 'val')
})

const cascaderOptions = [
  {
    value: '0',
    label: '陕西',
    children: [
      {
        value: '0-0',
        label: '西安',
        children: [
          {
            value: '0-0-0',
            label: '新城区'
          },
          {
            value: '0-0-1',
            label: '高新区'
          }
        ]
      }
    ]
  }
]

const columns: PlusColumn[] = [
  {
    label: 'tree-select',
    prop: 'tree-select',
    valueType: 'tree-select',
    fieldProps: {
      ref: e => {
        treeSelectInstance.value = e
      },
      data: cascaderOptions
    }
  }
]
</script>
```
