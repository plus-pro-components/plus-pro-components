import path from 'path'
import fs from 'fs'
import semver from 'semver'
import consola from 'consola'
import execa from 'execa'
import { checkbox, select, input } from '@inquirer/prompts'
import { findWorkspacePackages } from '@pnpm/find-workspace-packages'
import { projRoot, projPackage } from '../utils/paths'
import { PKG_NAME } from '../utils'
import { genVersion } from './gen-version'

type SemverRow = {
  release: semver.ReleaseType
  optionsOrLoose?: boolean | semver.Options | string
  identifier?: string
}

// 打印
const echo = (msg: string) => consola.success(msg)

// 运行脚本
const run = (bin: string, args: string[], opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })

//  版本列表
const versionIncrements: SemverRow[] = [
  {
    release: 'patch'
  },
  {
    release: 'minor'
  },
  {
    release: 'major'
  },
  {
    release: 'prepatch',
    optionsOrLoose: 'rc',
    identifier: '1'
  },
  {
    release: 'preminor',
    optionsOrLoose: 'rc',
    identifier: '1'
  },
  {
    release: 'premajor',
    optionsOrLoose: 'rc',
    identifier: '1'
  },
  {
    release: 'prerelease',
    optionsOrLoose: 'alpha',
    identifier: '1'
  },
  {
    release: 'prerelease',
    optionsOrLoose: 'beta',
    identifier: '1'
  }
]

// 获取工作空间包
const getWorkspaceList = async (dir = projRoot) => {
  const pkgs = await findWorkspacePackages(projRoot)
  return pkgs
    .filter(pkg => pkg.dir.startsWith(dir))
    .filter(pkg => pkg.manifest.private !== true && pkg.manifest.name)
}

/**
 * 更新版本号
 * @param {string} version
 */
const updatePackage = (version: string, pkgPath: string) => {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

// 获取版本
const getVersion = async (currentVersion: string, pkgName: string) => {
  // 发布版本
  let version: string | null
  const selectChoices = versionIncrements
    .map(item => {
      const value = semver.inc(
        currentVersion,
        item.release,
        item.optionsOrLoose as any,
        item.identifier
      )
      const name = `${item.release} (${value})`

      return {
        name,
        value
      }
    })
    .concat({ name: 'custom', value: 'custom' })

  version = await select({
    message: `Select release type (${pkgName})`,
    choices: selectChoices
  })

  // 自定义版本
  if (version === 'custom') {
    version = await input({ message: 'Enter custom version' })
    // 校验版本
    if (!semver.valid(version)) {
      throw new Error(`Illegal version: ${version}`)
    }
  }

  return version
}

// 提交
async function commit(version?: string) {
  try {
    // 打tag
    if (version) {
      await run('git', ['tag', '-a', `v${version}`, '-m', `v${version}`])
    }

    // 生成changelog
    if (version) {
      await run('npm', ['run', '--name', 'changelog'])
    }

    // 更新导出 版本号
    await genVersion(version)

    await run('git', ['add', '-A'])
    await run('npm', ['run', '--name', 'gitcz'])
    await run('git', ['pull'])

    // push tag
    if (version) {
      await run('git', ['push', '--tags'])
    }
    await run('git', ['push'])
    echo(`\ncommit success ${version}`)
  } catch (error: any) {
    throw new Error(error)
  }
}

const main = async () => {
  const workspaceList = await getWorkspaceList()
  const workspaceNames = workspaceList.map(item => item.manifest.name) as string[]
  const workspaceMaps = workspaceList.map(item => ({
    dir: item.dir,
    name: item.manifest.name,
    version: item.manifest.version,
    pkgPath: path.resolve(item.dir, 'package.json')
  }))

  // 选择需要更新的包
  let selectPackages: string[] = []
  const checkboxChoices = workspaceNames.map(item => ({
    name: item,
    value: item,
    checked: item === PKG_NAME
  }))
  const packages = await checkbox({
    message: 'Which packages would you like to include?',
    choices: [{ name: 'all', value: 'all' }, ...checkboxChoices]
  })

  if (!packages.length) {
    throw new Error('Please select one or more packages!')
  }

  if (packages.includes('all')) {
    selectPackages = workspaceNames
  } else {
    selectPackages = [...packages]
  }

  // 更新版本号
  for (let index = 0; index < selectPackages.length; index++) {
    const name = selectPackages[index]
    const packageInfo = workspaceMaps.find(i => i.name === name)
    const pkg = name === PKG_NAME ? JSON.parse(fs.readFileSync(projPackage, 'utf-8')) : packageInfo
    const pkgPath = name === PKG_NAME ? projPackage : packageInfo?.pkgPath
    const version = await getVersion(pkg.version as string, packageInfo?.name as string)
    updatePackage(version as string, pkgPath as string)
    consola.success(`Successfully updated version ${name}!`)
  }

  if (selectPackages.includes(PKG_NAME)) {
    const mainPkg = JSON.parse(fs.readFileSync(projPackage, 'utf-8'))
    commit(mainPkg.version)
  } else {
    commit()
  }
}

main()
  .then(() => {
    console.log('success')
  })
  .catch(err => {
    console.log(err)
  })
