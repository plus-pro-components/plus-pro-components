# 自定义命名空间

支持 element-plus 的命名空间

Element Plus 提供的默认命名空间为 el。 在特殊情况下，我们需要自定义命名空间。

由于我们使用 sass 书写样式，如果您需要自定义所有命名空间， 我们假定用户使用了 sass 书写样式。

您必须同时设置 `ElConfigProvider` 和 `scss` `$namespace` 以及 `plus-pro-components` `scss`的 `$el-namespace`

## 设置 ElConfigProvider

使用 ElConfigProvider 包装您的根组件。

```html
<!-- App.vue -->
<template>
  <el-config-provider namespace="ep">
    <!-- ... -->
  </el-config-provider>
</template>
```

## 设置 SCSS 和 CSS 变量

创建 `styles/element/index.scss`:

```scss {5,6,7}
@forward 'element-plus/theme-chalk/src/mixins/config.scss' with (
  $namespace: 'ep'
);

@forward 'plus-pro-components/theme-chalk/src/mixins/config.scss' with (
  $el-namespace: 'ep'
);
```

在 `vite.config.ts` 中导入 `styles/element/index.scss`：

> Webpack 也是如此，它需要在 preprocessorOptions 中设置

```ts
import { defineConfig } from 'vite'
// https://vitejs.dev/config/
export default defineConfig({
  // ...
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`
      }
    }
  }
  // ...
})
```
