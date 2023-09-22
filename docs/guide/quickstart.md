# 快速开始

本节将介绍如何在项目中使用 `PlusProComponents`。

## 使用之前

在开始使用` PlusProComponents` 之前，有必要先了解以下基础知识，我们假设您已经写过 `Vue 3`，并掌握了下面的内容。

- [Vue 组件](https://cn.vuejs.org/guide/essentials/component-basics.html)

- [单文件组件](https://cn.vuejs.org/guide/scaling-up/sfc.html)

- [渲染函数](https://cn.vuejs.org/guide/extras/render-function.html)

- [TypeScript](https://www.typescriptlang.org/) (非必须，但是有 TypeScript 基础，使用起来会更加方便。)

<p style="margin-top:80px;"> </p>

# 用法

**`plus-pro-components` 和`element-plus` 导入方式需要保持一致。**

## 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

> main.ts

```typescript{8,9,16}
import { createApp } from 'vue'

// 导入element-plus 及其样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入plus-pro-components 及其样式
import PlusProComponents from 'plus-pro-components'
import 'plus-pro-components/index.css'

import App from './App.vue'
const app = createApp(App)
app.use(ElementPlus)

// 使用
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

## 自动按需导入 <el-tag  effect="dark">推荐</el-tag>

`PlusProComponents` 提供了基于`ES Module` 的开箱即用的 [Tree Shaking](https://webpack.js.org/guides/tree-shaking/) 功能。

- 1. 安装插件

  ```sh
  pnpm install -D unplugin-vue-components unplugin-auto-import @plus-pro-components/resolver
  ```

- 2.  配置 `vite.config.ts` 或者配置 `webpack.config.js` [参考](https://element-plus.gitee.io/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)

  ```ts {7,17}
  // vite.config.ts
  import { defineConfig } from 'vite'
  import AutoImport from 'unplugin-auto-import/vite'
  import Components from 'unplugin-vue-components/vite'
  import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

  import { PlusProComponentsResolver } from '@plus-pro-components/resolver'

  export default defineConfig({
    // ...
    plugins: [
      // ...
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver(), PlusProComponentsResolver()]
      })
    ]
  })
  ```

- 3. 使用组件

     > App.vue

```html{3}
<template>
  <!-- 自动导入 -->
  <PlusPagination :total="total"  />
</template>

<script setup>
  const total = 100
</script>
```

## 手动导入

手动导入需要导入组件和其对应的样式文件。如下示例：

```html
<template>
  <PlusDatePicker></PlusDatePicker>
</template>

<script>
  import { PlusDatePicker } from 'plus-pro-components'
  import 'plus-pro-components/es/components/date-picker/style/css'

  export default {
    components: { PlusDatePicker }
  }
</script>
```

## CDN

示例

<div class="glitch-embed-wrap" style="height: 420px; width: 100%;">
  <iframe src="https://codepen.io/l-x-f/embed/KKrbRxW?height=469&theme-id=light&default%20-tab=html,result"   style="height: 100%; width: 100%; border: 0;"></iframe>
</div>

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
