# 贡献指南

### 介绍

感谢您使用 PlusProComponents。

以下是关于向 PlusProComponents 提交反馈或代码的指南。在向 PlusProComponents 提交 issue 或者 PR 之前，请先花几分钟时间阅读以下内容。

### Issue 规范

- 遇到问题时，请先确认这个问题是否已经在 issue 中有记录或者已被修复。
- 提 issue 时，请用简短的语言描述遇到的问题，并添加出现问题时的**环境** 和复现步骤，必要时需提供可复现问题最小代码仓库。

  #### 环境包含

  - `浏览器` 版本
  - `操作系统` 版本
  - `node` 版本
  - `vite`/ `webpack` / `Rollup` / `Vue CLI` 构建工具版本， 是否使用 `CDN`
  - `vue` 版本
  - `element-plus` 版本
  - `plus-pro-components` 版本

## 参与开发

### [参考本地开发](/guide/dev.html)

### 代码规范

在编写代码时，请注意：

- 确保代码可以通过仓库的 ESLint 校验。
- 确保代码格式是规范的，使用 prettier 进行代码格式化。
- 确保没有使用超出兼容性范围的 API.

## 提交 Pull Request

### 参考指南

如果你是第一次在 GitHub 上提 Pull Request ，可以阅读下面这两篇文章来学习：

- [第一次参与开源](https://github.com/firstcontributions/first-contributions/blob/main/translations/README.zh-cn.md)
- [如何优雅地在 GitHub 上贡献代码](https://segmentfault.com/a/1190000000736629)

### Pull Request 规范

在提交 Pull Request 时，请注意：

- 保持你的 PR 足够小，一个 PR 只解决单个问题或添加单个功能。
- 当新增组件或者修改原有组件时，记得增加或者修改对应的单元测试，保证代码的稳定。
- 在 PR 中请添加合适的描述，并关联相关的 Issue。

### Pull Request 流程

1. fork 主仓库，如果已经 fork 过，请同步主仓库的最新代码。
2. 基于 fork 后仓库的 dev 分支新建一个分支，比如 `feature/docs`。
3. 在新分支上进行开发，开发完成后，提 Pull Request 到主仓库的 dev 分支。
4. Pull Request 会在 Review 通过后被合并到主仓库。
5. 等待 PlusProComponents 发布新版本，一般是每周一次。

### Pull Request 标题格式

Pull Request 的标题应该遵循以下格式：

```bash
type(ComponentName?)：commit message
```

示例：

- docs: fix typo in quickstart
- build: optimize build speed
- fix(component[form-item]): incorrect style
- feat(component[table]): add color prop

可选的类型：

- feat
- fix
- build
- docs
- test
- style
- ci
- refactor
- perf
- chore
- revert

### 同步最新代码

提 Pull Request 前，请依照下面的流程同步主仓库的最新代码：

```bash
# 添加主仓库到 remote
git remote add upstream https://github.com/plus-pro-components/plus-pro-components.git

# 拉取主仓库最新代码
git fetch upstream

# 切换至 dev 分支
git checkout dev

# 合并主仓库代码
git merge upstream/dev
```
