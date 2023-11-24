import path from 'path'
import fs from 'fs/promises'
import consola from 'consola'
import { confirm, input } from '@inquirer/prompts'
import minimist from 'minimist'
import chalk from 'chalk'
import { compRoot } from '../utils/paths'
import { getTargetFileTemplate, getSrcFileTemplate, getTestFileTemplate } from './template'

const args = minimist(process.argv.slice(2))

const arg = args._[0]

let componentName = arg

const validateComponentName = (name: string) => {
  // eslint-disable-next-line no-useless-escape
  const reg = /^[a-z]+\-?[a-z]+\-?[a-z]+$/
  return reg.test(name)
}

const main = async () => {
  if (!arg) {
    componentName = await input({
      message: 'Please enter component name?'
    })
  }

  if (!componentName) {
    return Promise.reject('Please enter component name!')
  }

  const is = await confirm({
    message: `Confirm create ${chalk.blue(componentName)} component?`
  })

  if (!is) {
    return Promise.reject('Not sure!')
  }

  if (!validateComponentName(componentName)) {
    return Promise.reject(`${chalk.blue(componentName)} is not a illegal component name!`)
  }

  // 主文件
  const targetDir = path.resolve(compRoot, componentName)
  const targetFile = path.resolve(targetDir, 'index.ts')

  // 测试文件
  const testDir = path.resolve(targetDir, '__tests__')
  const testFile = path.resolve(testDir, `${componentName}.test.tsx`)

  // 样式文件
  const styleDir = path.resolve(targetDir, 'style')
  const styleIndexFile = path.resolve(styleDir, 'index.ts')
  const styleCSSFile = path.resolve(styleDir, 'css.ts')

  // src文件
  const srcDir = path.resolve(targetDir, 'src')
  const srcIndexFile = path.resolve(srcDir, 'index.vue')

  try {
    await fs.stat(targetDir)
    return Promise.reject(`${componentName} component already exists!`)
  } catch (error) {
    // 创建文件夹
    await fs.mkdir(targetDir, { recursive: true })
    await fs.mkdir(testDir, { recursive: true })
    await fs.mkdir(srcDir, { recursive: true })
    await fs.mkdir(styleDir, { recursive: true })
    // 创建文件
    await fs.writeFile(targetFile, getTargetFileTemplate(componentName))
    await fs.writeFile(testFile, getTestFileTemplate(componentName))
    await fs.writeFile(srcIndexFile, getSrcFileTemplate(componentName))
    // style 下文件
    await fs.writeFile(styleIndexFile, '')
    await fs.writeFile(styleCSSFile, '')
    return componentName
  }
}

main()
  .then(componentName => {
    consola.success(`Successfully created ${chalk.blue(componentName)} component!`)
  })
  .catch(err => {
    consola.error(err)
  })
