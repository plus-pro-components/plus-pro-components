# 快速开始

本节将介绍如何在项目中使用 `PlusProComponents`。

## 使用之前

在开始使用` PlusProComponents` 之前，有必要先了解以下基础知识，我们假设您已经写过 `Vue 3`，并掌握了下面的内容。

- [Vue 组件](https://cn.vuejs.org/guide/essentials/component-basics.html)

- [单文件组件](https://cn.vuejs.org/guide/scaling-up/sfc.html)

- [渲染函数](https://cn.vuejs.org/guide/extras/render-function.html)

- [透传 Attributes](https://cn.vuejs.org/guide/components/attrs.html)

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

### Volar 支持

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

- 2.  配置 `vite.config.ts` 或者配置 `webpack(vue).config.js`

  [@plus-pro-components/resolver 文档](/ecosystem/resolver.html)

  ::: code-group

  ```ts {6,16} [vite.config.ts]
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

  ```js {5,15} [webpack.config.js]
  // webpack.config.js
  const AutoImport = require('unplugin-auto-import/webpack')
  const Components = require('unplugin-vue-components/webpack')
  const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
  const { PlusProComponentsResolver } = require('@plus-pro-components/resolver')

  module.exports = {
    // ...
    plugins: [
      // ...
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [PlusProComponentsResolver(), ElementPlusResolver()]
      })
    ]
  }
  ```

  ```js {6,17} [vue.config.js]
  // vue.config.js
  const { defineConfig } = require('@vue/cli-service')
  const AutoImport = require('unplugin-auto-import/webpack')
  const Components = require('unplugin-vue-components/webpack')
  const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
  const { PlusProComponentsResolver } = require('@plus-pro-components/resolver')

  module.exports = defineConfig({
    // ...
    configureWebpack: {
      plugins: [
        // ...
        AutoImport({
          resolvers: [ElementPlusResolver()]
        }),
        Components({
          resolvers: [PlusProComponentsResolver(), ElementPlusResolver()]
        })
      ]
    }
  })
  ```

  :::

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

### 自动按需导入示例工程

如果你需要新建一个项目，我们推荐使用 Vite。

以下是 plus-pro-components 官方提供的一些示例项目，你可以克隆该项目，并直接拷贝代码来使用。

- [vite-project](https://github.com/plus-pro-components/plus-pro-components-demos/tree/main/vite-project)：使用 Vue 3、Vite 、element-plus、plus-pro-components 搭建应用。

- [vue-cli-project](https://github.com/plus-pro-components/plus-pro-components-demos/tree/main/vue-cli-project)：使用 Vue 3、vue-cli@5 、element-plus、plus-pro-components 搭建应用。

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
