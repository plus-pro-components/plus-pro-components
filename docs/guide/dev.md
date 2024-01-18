# 本地开发指南

## 开发环境

| 类型          | 名称              | 版本           |
| ------------- | ----------------- | -------------- |
| 操作系统      | Windows 11 专业版 | 22000.1098     |
| 开发工具      | Microsoft VS Code | 1.79.0         |
| 调试工具      | Google Chrome     | 104.0.5112.102 |
| 代码版本控制  | git               | 2.37.0         |
| 语言环境      | node              | 16.18.0        |
| 包管理器      | npm               | 8.19.2         |
| 包管理器      | yarn              | 1.22.19        |
| 包管理器      | pnpm              | 8.5.0          |
| node 版本管理 | nvm               | 1.1.7          |
| npm 源管理    | nrm               | 1.2.5          |

## 项目结构

```sh

├── CHANGELOG.md            #changelog文件
├── commitlint.config.js    #commitlint配置
├── docs                    #文档所在目录
|  ├── .vitepress           #vitepress配置
|  ├── components           #组件文档
|  ├── examples             #组件文档对应的vue示例
|  ├── deploy.sh            #文档部署脚本
|  ├── guide                #快速开始文档
|  ├── index.md             #文档首页
|  ├── package.json
|  ├── public
|  └── utils
├── global.d.ts              #全局组件ts提示
├── LICENSE                  #LICENSE 文件
├── package.json
├── packages                 #包文件夹
|  ├── components            #主组件
|  ├── constants             #固定变量
|  ├── eslint-config         #eslint配置独立
|  ├── hooks                 #hooks
|  ├── locale                #国际化
|  ├── play                  #组件实时预览
|  ├── plus-pro-components   #主包入口
|  ├── utils                 #工具
|  ├── theme-chalk           #样式
|  └── types                 #公共TS类型
├── pnpm-lock.yaml
├── pnpm-workspace.yaml      #工作空间配置
├── README.md                #项目介绍
├── scripts                  #脚本
|  ├── build                 #主包打包
|  ├── changelog             #changelog
|  ├── create-component      #新增组件
|  ├── release               #整包release
|  ├── utils                 #公共打包工具
|  ├── commit.sh             #代码提交
|  └── publish.sh            #整包发布
├── tsconfig.base.json       #tsconfig配置
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.vitest.json
├── tsconfig.web.json
├── typings                   #全局d.ts
|  └── env.d.ts
└── vitest.config.ts          #vitest配置

```

## 克隆仓库

```sh
git clone https://github.com/plus-pro-components/plus-pro-components.git
```

如果 GitHub 克隆速度较慢，你也可以直接克隆 plus-pro-components 在 gitee 上的[镜像仓库](https://gitee.com/plus-pro-components/plus-pro-components.git)，同步可能会存在时差。

```bash
git clone https://gitee.com/plus-pro-components/plus-pro-components.git
```

## 启动项目

```sh
pnpm i
```

## 文档网站预览

```sh
pnpm docs:dev
```

## 本地开发

```sh
pnpm dev
```

## 添加新的组件步骤

例如现在需要新增一个新的组件 组件名叫 `table` 对应的 vue 组件名称叫 `PlusTable`（所有组件名字以`Plus` 开头，组件的基本代码全部会自动生成。）

### 1. 组件创建

- 执行创建组件脚本

  ```sh
  pnpm run new table
  ```

- 确定

  ```
  Confirm create table component? yes
  ```

- 此时 packages/components/table 文件夹已经生成并且有了如下目录

  ```sh

  ├── index.ts          #主文件
  ├── src
  |  └── index.vue      #组件实际代码
  ├── style
  |  ├── index.ts       #组件按需加载 scss 样式，包含自身样式和外部样式
  |  └── css.ts         #组件按需加载 css 样式，包含自身样式和外部样式
  └── __tests__
    └── table.test.tsx  #单元测试代码  主要测试组件中的 props、event、slots、样式、CSS class 名、生命周期钩子，和其他相关的问题。
  ```

  然后添加组件实际代码和对应的单元测试

- 导出组件
  packages/components/index.ts 新增

  ```ts
  export * from './table'
  ```

- 在 packages/plus-pro-components/component.ts 添加新增的组件 `PlusTable`

  ```js
  import { PlusTable } from '@plus-pro-components/components/table'

  const plugins: Component[] = [PlusDialog, PlusPagination, PlusTable]
  ```

- 在 `global.d.ts` 添加类型

  ```ts{3}
  declare module '@vue/runtime-core' {
    export interface GlobalComponents {
      PlusTable: typeof import('plus-pro-components')['PlusTable']
    }
  }
  ```

### 2. 预览组件

- 执行下面的命令

  ```sh
  pnpm run dev
  ```

- 打开 packages/play/src/views/table.vue(文件自动生成) 里面新增如下代码

  ```html
  <template>
    <PlusTable />
  </template>
  ```

- 打开终端地址即可预览组件

### 3. 组件的测试 单元测试 写完之后 执行

```sh
pnpm run test
```

查看测试覆盖率

```sh
pnpm run test:coverage
```

### 4. 文档的添加

- 执行打包命令

```sh
pnpm run build
```

- 在 docs/components 文件下

- 新建文件 table.md 内容写法参考之前的

- 执行 `pnpm run start` 后的地址即可预览本地组件

## 代码提交

```sh
pnpm run commit
```

## 打包组件

```sh
 pnpm run build
```
