# @plus-pro-components/eslint-config

[![@plus-pro-components/eslint-config version badge](https://img.shields.io/npm/v/@plus-pro-components/eslint-config.svg?style=flat-square)](https://www.npmjs.org/package/@plus-pro-components/eslint-config)

## 简介

`@plus-pro-components/eslint-config` 是 `plus-pro-components` 内置的 eslint 配置集合，集成了常用的 `vue`、`ts`、`import`插件，为快速配置 eslint 提供保障。

## 使用

- 安装

  ```sh
  pnpm i @plus-pro-components/eslint-config
  ```

- 配置

  ```js {4}
  // .eslintrc.js
  module.exports = {
    root: true,
    extends: ['@plus-pro-components/eslint-config']
  }
  ```
