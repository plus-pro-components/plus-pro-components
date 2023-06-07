## 启动项目

```sh
pnpm i
```

## 网站预览

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

例如现在需要新增一个新的组件 组件名叫 table

1. 执行新增脚本

```sh
 pnpm new
```

2. 终端输入组件名称

```
? Please Enter component name? table
```

3. 确定

```
Confirm create table component? yes
```

4.  此时 packages/components/table 文件夹下有了如下目录

```sh

├── index.ts          #主文件 导出组件和类型
├── src
|  └── index.vue      #组件实际代码
└── __tests__
   └── table.test.tsx #单元测试代码  主要测试 props slots event

```

## 打包组件 components

```sh
pnpm stub  # 打桩 只需本地执行一次，后面就不需要执行了
pnpm build:main
```

## 发布组件 components

1. release

```sh
pnpm release
```

2. publish npm

```sh
npm run build
cd dist/plus-pro-components

npm publish
 cd -
```
