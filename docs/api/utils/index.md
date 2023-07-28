# @plus-pro-components/utils

## 简介

`@plus-pro-components/utils` 提供了 web 开发常用的工具库，结合 plus-pro-components 使用会非常方便，它具有以下优点：

- 会随着主包一起下载，无需单独安装。
- 独立的 npm 包，也可以独立安装后用于其他项目。
- 它提供了基于 ES Module 的开箱即用的 [Tree Shaking](https://webpack.js.org/guides/tree-shaking/) 功能，无需担心引入会导致打包体积增大。
- 使用 TypeScript 编写，提供 d.ts，使用起来安全又便捷。

**独立安装**

```sh
# 选择一个你喜欢的包管理器
# NPM
$ npm install @plus-pro-components/utils   --save
# Yarn
$ yarn add @plus-pro-components/utils
# pnpm
$ pnpm install @plus-pro-components/utils
```

**使用示例**

```ts
import { formatMoney } from '@plus-pro-components/utils'

formatMoney('100')
```
