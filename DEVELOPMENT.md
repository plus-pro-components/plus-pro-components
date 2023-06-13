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

├── changelog.config.js     #changelog 配置
├── CHANGELOG.md            #changelog文件
├── commitlint.config.js    #commitlint配置
├── DEVELOPMENT.md          #本地开发指南
├── docs                    #文档所在目录
|  ├── components           #组件文档
|  ├── deploy.sh            #文档部署脚本
|  ├── guide                #快速开始文档
|  ├── index.md
|  ├── package.json
|  ├── public
|  └── utils
├── global.d.ts              #全局组件ts提示
├── LICENSE                  #LICENSE 文件
├── package.json
├── packages                 #包文件夹
|  ├── components            #主组件包
|  ├── constants             #固定变量
|  ├── echarts               #echarts独立组件包
|  ├── eslint-config         #eslint配置独立包
|  ├── hooks                 #hooks包
|  ├── play                  #组件预览包
|  ├── plus-pro-components   #主包入口
|  └── utils                 #工具包
├── pnpm-lock.yaml
├── pnpm-workspace.yaml      #工作空间配置
├── README.md                #项目介绍
├── scripts                  #脚本
|  ├── build                 #主包components打包
|  ├── build-echarts         #echarts独立组件包打包
|  ├── commit.sh             #代码提交
|  ├── create-component      #新增组件
|  ├── publish.sh            #发包到npm
|  └── release               #整包release
├── tsconfig.base.json       #tsconfig配置
├── tsconfig.echarts.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.vitest.json
├── tsconfig.web.json
├── typings                   #全局d.ts
|  ├── env.d.ts
|  └── plus.d.ts
└── vitest.config.ts          #vitest配置

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

- 打桩

  ```sh
  pnpm stub
  ```

- 启动

  ```sh
  pnpm dev
  ```

## 添加新的组件步骤

例如现在需要新增一个新的组件 组件名叫 `table` 对应的 vue 组件名称叫 `PlusTable`（所有组件名字以`Plus` 开头。）

### 1. 组件创建

- 执行创建组件脚本

  ```sh
  pnpm run new
  ```

- 终端输入组件名称

  ```
  ? Please Enter component name? table
  ```

- 确定

  ```
  Confirm create table component? yes
  ```

- 此时 packages/components/table 文件夹已经生成并且有了如下目录

  ```sh

  ├── index.ts          #主文件 导出组件和类型
  ├── src
  |  └── index.vue      #组件实际代码
  └── __tests__
    └── table.test.tsx #单元测试代码  主要测试组件中的 props、event、slots、样式、CSS class 名、生命周期钩子，和其他相关的问题。
  ```

  然后添加组件实际代码和对应的单元测试

- 导出组件
  packages/components/index.ts 新增

```ts
export * from './table'
```

### 2. 预览组件

- 在 packages/plus-pro-components/component.ts 添加新增的组件 `PlusTable`

  ```js
  import { PlusTable } from '@plus-pro-components/components/table'

  const plugins: DefineComponent[] = [PlusDialog, PlusPagination, PlusTable]
  ```

- 执行下面的命令

  ```sh
  pnpm run dev
  ```

- 打开 packages/play/src/views/table.vue(文件自动生成) 里面新增代码

  ```html
  <template>
    <PlusTable />
  </template>
  ```

- 打开终端地址即可预览组件

### 3. 组件全局类型的添加

在 global.d.ts 添加

```ts
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PlusTable: typeof import('plus-pro-components')['PlusTable']
  }
}
```

### 4. 组件的测试

单元测试 写完之后 执行

```sh
pnpm run test
```

查看测试覆盖率

```sh
pnpm run test:coverage
```

### 5. 文档的添加

- 在 docs/components 文件下

- 新建文件 table.md 内容写法参考之前的

- 执行 `pnpm run docs:dev` 后的地址即可预览组件文档

## 代码提交

```sh
pnpm run commit
```

## 打包组件 components

```sh
pnpm stub  # 打桩 只需本地执行一次，后面就不需要执行了
pnpm build:main
```

## 发布组件 components `谨慎使用`

1. release `谨慎使用`

```sh
pnpm run release
```

2. 发布到 npm `谨慎使用`

```sh
pnpm run publish
```
