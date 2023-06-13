import { resolve } from 'path'
import { copyFile } from 'fs/promises'
import consola from 'consola'
import { copy } from 'fs-extra'

import { typeOutput, ecOutput, ecRoot } from './paths'
import all from './all'
import modules from './modules'
import dts from './dts'

const task = [...all, ...modules, ...dts]

const copyFiles = () =>
  Promise.all([
    copyFile(resolve(ecRoot, 'package.json'), resolve(ecOutput, 'package.json')),
    copyFile(resolve(ecRoot, 'README.md'), resolve(ecRoot, 'README.md'))
  ])

const copyDts = async () => {
  const src = typeOutput
  const targetES = resolve(ecOutput, 'es')
  const targetLib = resolve(ecOutput, 'lib')
  await copy(src, targetES)
  await copy(src, targetLib)
}

Promise.all(task).then(async () => {
  consola.success('Successfully built into echarts components!')
  await copyDts()
  consola.success('Successfully copied echarts definition file!')
  await copyFiles()
  consola.success('Successfully copied package.json and README.md!')
})
