import fs from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'
import { format } from 'prettier'
import glob from 'fast-glob'

const resolve = (dir: string) => fileURLToPath(new URL(dir, import.meta.url))

export const gFiles = async () => {
  const formatConfigPath = resolve('../../.prettierrc.js')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const formatConfig = require(formatConfigPath)

  const components = await glob('**/*.vue', {
    cwd: '../components',
    absolute: true,
    onlyFiles: true
  })

  const routes = []

  for (let index = 0; index < components.length; index++) {
    const item = components[index]
    const reg = /\/components\/(\w+)\//g
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const routeName = reg.exec(item)![1]
    const viewFile = resolve(`./src/views/${routeName}.vue`)

    // 生成视图views文件
    try {
      await fs.access(viewFile)
    } catch (error) {
      const template = `<template>${routeName}</template>`
      const data = format(template, { ...formatConfig, parser: 'vue' })
      await fs.writeFile(viewFile, data)
    }

    routes.push({
      path: `/${routeName}`,
      name: `${routeName}`,
      component: `@/views/${routeName}/index.vue`
    })
  }

  const result = `export default ${JSON.stringify(routes)}`
  const data = format(result, { ...formatConfig, parser: 'babel-ts' })
  const routesFile = resolve('./src/router/routes.ts')

  // 生成路由routes文件
  await fs.writeFile(routesFile, data)
}
