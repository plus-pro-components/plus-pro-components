import { resolve, join } from 'path'
import { copyFile } from 'fs/promises'
import consola from 'consola'
import { buildOutput, pcOutput, projRoot, pcPackage } from './paths'
import { copy } from 'fs-extra'
import all from './all'
import modules from './modules'
import dts from './dts'

const copyFiles = () =>
  Promise.all([
    copyFile(pcPackage, join(pcOutput, 'package.json')),
    copyFile(resolve(projRoot, 'README.md'), resolve(pcOutput, 'README.md')),
    copyFile(resolve(projRoot, 'global.d.ts'), resolve(pcOutput, 'global.d.ts'))
  ])

const copyDts = async () => {
  const src = resolve(buildOutput, 'types', 'packages')
  const targetES = resolve(pcOutput, 'es')
  const targetLib = resolve(pcOutput, 'lib')
  await copy(src, targetES)
  await copy(src, targetLib)
}

const task = [...all, ...modules, ...dts]

Promise.all(task).then(async () => {
  await copyDts()
  consola.success('Successfully copied definition file!')
  await copyFiles()
  consola.success('Successfully copied package.json and README.md and global.d.ts!')
})
