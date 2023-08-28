# 快速开始

本节将介绍如何在项目中使用 `PlusProComponents`。

## 使用之前

在开始使用` PlusProComponents` 之前，有必要先了解以下基础知识，我们假设您已经写过 `Vue 3`，并掌握了下面的内容。

- [Vue 组件](https://cn.vuejs.org/guide/essentials/component-basics.html)

- [单文件组件](https://cn.vuejs.org/guide/scaling-up/sfc.html)

- [渲染函数](https://cn.vuejs.org/guide/extras/render-function.html)

- [TypeScript](https://www.typescriptlang.org/) (非必须，但是有 TypeScript 基础，使用起来会更加方便。)

## 前置环境

`PlusProComponents` 依赖 `Vue` 和 `ElementPlus`，在开始之前建议先配置 `Vue` 和 `ElementPlus` 环境。

[Vue 快速上手](https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application)

[ElementPlus 安装指南](https://element.eleme.cn/#/zh-CN/component/quickstart)

## 用法

## 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

> main.ts

```typescript{5,6,12}
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import PlusProComponents from 'plus-pro-components'
import 'plus-pro-components/index.css'

import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(PlusProComponents)
app.mount('#app')
```

## Volar 支持

如果您使用 Volar，请在 tsconfig.json 中通过 compilerOptions.type 指定全局组件类型。

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["plus-pro-components/global"]
  }
}
```

## 按需导入 <el-tag  effect="dark">推荐</el-tag>

PlusProComponents 提供了基于 ES Module 的开箱即用的 [Tree Shaking](https://webpack.js.org/guides/tree-shaking/) 功能。

- 导入基础样式
  > main.ts

```ts
import 'plus-pro-components/index.css' // 5.5kb
```

- 导入组件
  > App.vue

```html{2,6}
<template>
  <PlusPagination :total="100"  />
</template>

<script setup>
  import { PlusPagination } from 'plus-pro-components'
</script>
```

## CDN

::: tip 提示
使用 CDN 时，在 HTML 中所有的组件都是小写中划线隔开的形式，不支持单标签。

例如：

```html
<!-- 不支持 -->
<PlusPagination :total="100" />
```

需要写成

```html
<!-- 支持 -->
<plus-pagination :total="100"></plus-pagination>
```

:::

示例

<div class="glitch-embed-wrap" style="height: 420px; width: 100%;">
  <iframe src="https://codepen.io/l-x-f/embed/KKrbRxW?height=469&theme-id=light&default%20-tab=html,result"   style="height: 100%; width: 100%; border: 0;"></iframe>
</div>
