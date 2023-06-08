# 本地开发指南

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

- 此时 packages/components/table 文件夹下有了如下目录

  ```sh

  ├── index.ts          #主文件 导出组件和类型
  ├── src
  |  └── index.vue      #组件实际代码
  └── __tests__
    └── table.test.tsx #单元测试代码  主要测试 props slots event
  ```

  然后添加组件实际代码和对应的单元测试

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

- 打开 packages/play/src/views/table.vue 里面新增代码

  ```html
  <template>
    <PlusTable />
  </template>
  ```

- 打开终端地址即可预览组件

### 3. 组件的测试

单元测试 写完之后 执行

```sh
pnpm run test
```

查看测试覆盖率

```sh
pnpm run test:coverage
```

### 4. 文档的添加

- 进入 docs/components

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
