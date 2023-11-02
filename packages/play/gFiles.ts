import fs from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'
import { format } from 'prettier'
import glob from 'fast-glob'
import { camelCase, upperFirst } from 'lodash'

const resolve = (dir: string) => fileURLToPath(new URL(dir, import.meta.url))

export const gFiles = async () => {
  const formatConfigPath = resolve('../../.prettierrc.js')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const formatConfig = require(formatConfigPath)

  const components = await glob('**/src/index.vue', {
    cwd: '../components',
    absolute: true,
    onlyFiles: true
  })

  const routes = []
  const navData = []

  for (let index = 0; index < components.length; index++) {
    const item = components[index]
    const reg = /\/components\/([a-zA-Z_-]+)\/src/g
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const routeName = reg.exec(item)![1]
    const viewFile = resolve(`./src/views/${routeName}.vue`)

    // 生成视图views文件
    try {
      await fs.access(viewFile)
    } catch (error) {
      const template = `<template><Plus${upperFirst(camelCase(routeName))}/></template>`
      const data = format(template, { ...formatConfig, parser: 'vue' })
      await fs.writeFile(viewFile, data)
    }

    routes.push({
      path: `/${routeName}`,
      name: `${routeName}`,
      component: `@/views/${routeName}.vue`
    })
    navData.push(`<router-link class="link" to="/${routeName}">${routeName}</router-link>`)
  }

  const result = `export default ${JSON.stringify(routes)}`
  const data = format(result, { ...formatConfig, parser: 'babel-ts' })
  const routesFile = resolve('./src/router/__routes.ts')
  const navFile = resolve('./src/__nav.vue')
  const navDataStr = format(`<template><div class="nav">${navData.join(' ')}</div></template>`, {
    ...formatConfig,
    parser: 'vue'
  })

  // __routes.ts 文件处理
  try {
    await fs.access(routesFile)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const originRoutes = await import('./src/router/__routes.ts')
    if (originRoutes.default?.length !== routes.length) {
      // 生成路由routes文件
      await fs.writeFile(routesFile, data)
    }
  } catch {
    await fs.writeFile(routesFile, data)
  }

  // __nav.vue 文件处理
  try {
    await fs.access(navFile)
    const originNav = await fs.readFile('./src/__nav.vue', 'utf-8')
    const reg = /<router-link/g
    const originNavArray = [...originNav.matchAll(reg)]
    if (originNavArray?.length !== routes.length) {
      // 生成路由导航文件
      await fs.writeFile(navFile, navDataStr)
    }
  } catch {
    await fs.writeFile(navFile, navDataStr)
  }
}
