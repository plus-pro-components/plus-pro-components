# 快速开始

本节将介绍如何在项目中使用 PlusProComponents。

## 用法

### 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

> main.ts

```typescript{5,10}
 import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import PlusProComponents from 'plus-pro-components'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(PlusProComponents)
app.mount('#app')
```

#### Volar 支持

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

### 按需手动导入

PlusProComponents 提供了基于 ES Module 的开箱即用的 [Tree Shaking](https://webpack.js.org/guides/tree-shaking/) 功能。

> App.vue

```html
<template>
  <plus-pagination :total="100" show />
</template>
<script>
  import { PlusPagination } from 'plus-pro-components'
  export default {
    components: { PlusPagination }
  }
</script>
```
