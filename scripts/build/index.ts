import { resolve } from 'path'
import { copyFile, readFile, writeFile } from 'fs/promises'
import consola from 'consola'
import { buildOutput, pcOutput, projRoot, pcPackage } from '../utils/paths'
import { copy } from 'fs-extra'
import all from './all'
import modules from './modules'
import dts from './dts'

const copyFiles = () =>
  Promise.all([
    copyFile(pcPackage, resolve(pcOutput, 'package.json')),
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

const updateVersion = async () => {
  const pcOutputPkg = resolve(pcOutput, 'package.json')
  const mainPackageInfo = await readFile(pcOutputPkg, 'utf-8')
  const packageInfo = await readFile(resolve(projRoot, 'package.json'), 'utf-8')
  const mainPkg = JSON.parse(mainPackageInfo)
  const pkg = JSON.parse(packageInfo)
  mainPkg.version = pkg.version
  await writeFile(pcOutputPkg, JSON.stringify(mainPkg, null, 2) + '\n')
}

const task = [...all, ...modules, ...dts]

Promise.all(task)
  .then(async () => {
    await copyDts()
    consola.success('Successfully copied definition file!')
    await copyFiles()
    consola.success('Successfully copied package.json and README.md and global.d.ts!')
    await updateVersion()
    consola.success('Successfully updated version!')
  })
  .catch(err => {
    console.log(err)
  })
