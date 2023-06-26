import path from 'path'
import fs from 'fs/promises'
import consola from 'consola'
import { confirm, input } from '@inquirer/prompts'
import { compRoot } from '../utils/paths'

const main = async () => {
  const componentName = await input({
    message: 'Please enter component name?'
  })

  if (!componentName) {
    return Promise.reject('Please enter component name!')
  }

  const is = await confirm({
    message: `Confirm create ${componentName} component?`
  })

  if (!is) {
    return Promise.reject('Not sure!')
  }

  // 主文件
  const targetDir = path.resolve(compRoot, componentName)
  const targetFile = path.resolve(targetDir, 'index.ts')

  // 测试文件
  const testDir = path.resolve(targetDir, '__test__')
  const testFile = path.resolve(testDir, `${componentName}.test.tsx`)

  // 实际代码文件
  const srcDir = path.resolve(targetDir, 'src')
  const srcFile = path.resolve(srcDir, 'index.vue')

  try {
    await fs.stat(targetDir)
    return Promise.reject(`${componentName} component already exists!`)
  } catch (error) {
    // 创建文件夹
    await fs.mkdir(targetDir, { recursive: true })
    await fs.mkdir(testDir, { recursive: true })
    await fs.mkdir(srcDir, { recursive: true })
    // 创建文件
    await fs.writeFile(targetFile, '')
    await fs.writeFile(testFile, '')
    await fs.writeFile(srcFile, '')

    return componentName
  }
}

main()
  .then(name => {
    consola.success(`Successfully created ${name} component!`)
  })
  .catch(err => {
    consola.error(err)
  })
