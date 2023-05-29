import process from 'process'
import path from 'path'
import { mkdir, readFile, writeFile } from 'fs/promises'
import consola from 'consola'
import * as vueCompiler from 'vue/compiler-sfc'
import glob from 'fast-glob'
import chalk from 'chalk'
import { Project } from 'ts-morph'
import type { CompilerOptions, SourceFile } from 'ts-morph'
import { ecRoot, projRoot, ecOutput, hooksRoot } from './paths'
import { excludeFiles, pathRewriter } from './utils'

const TSCONFIG_PATH = path.resolve(projRoot, 'tsconfig.echarts.json')

/**
 * fork = require( https://github.com/egoist/vue-dts-gen/blob/main/src/index.ts
 */
export const main = async (outDir: string) => {
  const compilerOptions: CompilerOptions = {
    emitDeclarationOnly: true,
    outDir: outDir,
    baseUrl: projRoot,
    preserveSymlinks: true,
    skipLibCheck: true,
    noImplicitAny: false
  }
  const project = new Project({
    compilerOptions,
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true
  })

  const sourceFiles = await addSourceFiles(project)
  consola.success('Added source files for echarts components')

  typeCheck(project)
  consola.success('Type check passed for echarts components!')

  await project.emit({
    emitOnlyDtsFiles: true
  })

  const tasks = sourceFiles.map(async sourceFile => {
    const relativePath = path.relative(ecRoot, sourceFile.getFilePath())
    consola.trace(chalk.yellow(`Generating definition for file: ${chalk.bold(relativePath)}`))

    const emitOutput = sourceFile.getEmitOutput()
    const emitFiles = emitOutput.getOutputFiles()

    if (emitFiles.length === 0) {
      throw new Error(`Emit no file: ${chalk.bold(relativePath)}`)
    }

    const subTasks = emitFiles.map(async outputFile => {
      const filepath = outputFile.getFilePath()
      await mkdir(path.dirname(filepath), {
        recursive: true
      })

      await writeFile(filepath, pathRewriter(outputFile.getText()), 'utf8')
    })

    await Promise.all(subTasks)
  })

  await Promise.all(tasks)
  consola.success('Successfully generated definition for echarts components file!')
}

async function addSourceFiles(project: Project) {
  project.addSourceFileAtPath(path.resolve(projRoot, 'typings/page.d.ts'))

  const globSourceFile = '**/*.{js?(x),ts?(x),vue}'
  const filePaths = excludeFiles(
    await glob([globSourceFile], {
      cwd: ecRoot,
      absolute: true,
      onlyFiles: true
    })
  )

  const hookPaths = excludeFiles(
    await glob(globSourceFile, {
      cwd: hooksRoot,
      onlyFiles: true
    })
  )

  const sourceFiles: SourceFile[] = []
  await Promise.all([
    ...filePaths.map(async file => {
      if (file.endsWith('.vue')) {
        const content = await readFile(file, 'utf-8')
        const hasTsNoCheck = content.includes('@ts-nocheck')

        const sfc = vueCompiler.parse(content)
        const { script, scriptSetup } = sfc.descriptor
        if (script || scriptSetup) {
          let content = (hasTsNoCheck ? '// @ts-nocheck\n' : '') + (script?.content ?? '')

          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx'
            })
            content += compiled.content
          }

          const lang = scriptSetup?.lang || script?.lang || 'js'
          const sourceFile = project.createSourceFile(
            `${path.relative(process.cwd(), file)}.${lang}`,
            content
          )
          sourceFiles.push(sourceFile)
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    }),
    ...hookPaths.map(async file => {
      const content = await readFile(path.resolve(hooksRoot, file), 'utf-8')
      sourceFiles.push(project.createSourceFile(path.resolve(ecRoot, 'hooks', file), content))
    })
  ])

  return sourceFiles
}

function typeCheck(project: Project) {
  const diagnostics = project.getPreEmitDiagnostics()
  if (diagnostics.length > 0) {
    consola.error(project.formatDiagnosticsWithColorAndContext(diagnostics))
    const err = new Error('Failed to generate dts.')
    consola.error(err)
    throw err
  }
}

const outDirEs = path.resolve(ecOutput, 'es')
const outDirLib = path.resolve(ecOutput, 'lib')

export default [main(outDirEs), main(outDirLib)]
