# @plus-pro-components/resolver

## 简介

`@plus-pro-components/resolver` 是为 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 提供的官方加载包，可以按需自动导入`plus-pro-components`的组件及其样式文件。

## 使用

- 安装

  ```sh
  pnpm i @plus-pro-components/resolver
  ```

- 配置

  ```ts {5,11}
  // vite.config.ts
  import { defineConfig } from 'vite'
  import Components from 'unplugin-vue-components/vite'

  import { PlusProComponentsResolver } from '@plus-pro-components/resolver'

  export default defineConfig({
    // ...
    plugins: [
      Components({
        resolvers: [PlusProComponentsResolver({ importStyle: 'css' })]
      })
    ]
  })
  ```

## 配置参数说明

| 参数名称             | 说明                     | 类型                                                  | 默认值  | 是否必须 |
| -------------------- | ------------------------ | ----------------------------------------------------- | ------- | -------- |
| `ssr`                | 是否是 ssr               | `boolean`                                             | `false` | 否       |
| `importStyle`        | 导入的样式文件类型       | `string` <docs-tip content="'scss'/'css'"></docs-tip> | `css`   | 否       |
| `exclude`            | 不需要加载的组件名称正则 | `RegExp`                                              |         | 否       |
| `noStylesComponents` | 不需要加载样式的组件名称 | `array` <docs-tip content='string[]'></docs-tip>      |         | 否       |
