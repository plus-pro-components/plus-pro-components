# @plus-pro-components/utils

[![@plus-pro-components/utils version badge](https://img.shields.io/npm/v/@plus-pro-components/utils.svg?style=flat-square)](https://www.npmjs.org/package/@plus-pro-components/utils)

有新的工具需求 👉 欢迎 [issues](https://github.com/plus-pro-components/plus-pro-components/issues)

## 简介

`@plus-pro-components/utils` 提供了 web 开发常用的工具库，它具有以下特点：

- 和`plus-pro-components`解耦，独立的 npm 包，可选安装。
- 安装后结合 plus-pro-components 使用会非常方便。
- 它提供了基于 ES Module 的开箱即用的 [Tree Shaking](https://webpack.js.org/guides/tree-shaking/) 功能，无需担心引入会导致打包体积增大。
- 使用 TypeScript 编写，提供 d.ts，使用起来安全便捷。

## 独立安装

::: code-group

```sh [npm]
npm install @plus-pro-components/utils  --save
```

```sh [yarn]
yarn add @plus-pro-components/utils
```

```sh [pnpm]
pnpm install @plus-pro-components/utils
```

:::

## 使用示例

```ts
import { formatMoney } from '@plus-pro-components/utils'

formatMoney('100') // ￥100.00
```
