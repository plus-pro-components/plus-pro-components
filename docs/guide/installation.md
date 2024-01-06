# 安装

## 环境支持

| [![edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)](http://godban.github.io/browsers-support-badges/) |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge                                                                                                                                              | last 2 versions                                                                                                                                         | last 2 versions                                                                                                                                         | last 2 versions                                                                                                                                         |

### 版本

`PlusProComponents` 目前还处于快速开发迭代中。

[![ElementPlus version badge](https://img.shields.io/npm/v/plus-pro-components.svg?style=flat-square)](https://www.npmjs.org/package/plus-pro-components)

## 使用包管理器 <el-tag  effect="dark">推荐</el-tag>

**建议您使用包管理器 (NPM, [Yarn](https://classic.yarnpkg.com/lang/en/), [pnpm](https://pnpm.io/)) 安装 plus-pro-components**。

::: code-group

```sh [npm]
npm install plus-pro-components   --save
```

```sh [yarn]
yarn add plus-pro-components
```

```sh [pnpm]
pnpm install plus-pro-components
```

:::

## 浏览器直接引入

直接通过浏览器的 HTML 标签导入 plus-pro-components，然后就可以使用全局变量 `PlusProComponents` 了。

根据不同的 CDN 提供商有不同的引入方式， 我们在这里以[unpkg](https://unpkg.com) 和 [jsDelivr](https://jsdelivr.com) 举例。 你也可以使用其它的 CDN 供应商。

### unpkg

```html{10,12}
<head>
  <!-- 导入element-plus样式 -->
  <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />
  <!-- 导入vue3 -->
  <script src="//unpkg.com/vue@3"></script>
  <!-- 导入element-plus -->
  <script src="//unpkg.com/element-plus"></script>

  <!-- 导入plus-pro-components样式 -->
  <link rel="stylesheet" href="//unpkg.com/plus-pro-components/index.css" />
  <!--导入plus-pro-components"  -->
  <script src="//unpkg.com/plus-pro-components"></script>
</head>
```

### jsDelivr

```html{10,12}
<head>
  <!-- 导入element-plus样式 -->
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/element-plus/dist/index.css" />
  <!-- 导入vue3 -->
  <script src="//cdn.jsdelivr.net/npm/vue@3"></script>
  <!-- 导入element-plus -->
  <script src="//cdn.jsdelivr.net/npm/element-plus"></script>

  <!-- 导入plus-pro-components样式 -->
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/plus-pro-components/index.css" />
  <!--导入plus-pro-components"  -->
  <script src="//cdn.jsdelivr.net/npm/plus-pro-components"></script>
</head>
```

::: warning 建议
默认使用最新版本，使用时建议加上版本号 如使用`0.0.1-beta.32`版本，防止因版本导致应用出现问题。

[https://cdn.jsdelivr.net/npm/plus-pro-components@0.0.1-beta.32/index.min.js](https://cdn.jsdelivr.net/npm/plus-pro-components@0.0.1-beta.32/index.min.js)
:::
