import path from 'path'
import { readFile, writeFile, mkdir, access } from 'fs/promises'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import postcssNested from 'postcss-nested'
import scss from 'postcss-scss'
import cssnano from 'cssnano'
import glob from 'fast-glob'
import { copy } from 'fs-extra'
import consola from 'consola'
import { pcOutput } from '../../scripts/utils/paths'

const resolve = (...dir: string[]) => path.resolve(__dirname, ...dir)
const styleRoot = resolve('./src')
const distFolder = path.resolve(__dirname, 'dist')
const distBundle = path.resolve(pcOutput, 'theme-chalk')

const main = async () => {
  /**
   * 加载src下所有scss文件
   */
  const files = await glob([`**/*.scss`, `!**/*index.scss`], {
    cwd: resolve(styleRoot),
    absolute: true
  })

  /**
   * 生成./dist文件
   */
  try {
    await access(distFolder)
  } catch (error) {
    await mkdir(distFolder)
  }

  /* 不压缩css内容 */
  let index = ''

  for (const item of files) {
    const content = await readFile(item)
    const { name } = path.parse(item)

    /**
     * 生成压缩css
     */
    const result = await postcss([postcssNested as any, autoprefixer, cssnano]).process(content, {
      from: item,
      parser: scss.parse
    })

    await writeFile(resolve(distFolder, `plus-${name}.css`), result.css)

    index += result.css
  }
  /**
   * 生成index.css文件
   */
  await writeFile(resolve(distFolder, `index.css`), index)

  /**
   * 复制src的文件到 ./dist/src
   */
  await copy(styleRoot, resolve(distFolder, 'src'))

  /**
   * 复制打包后的文件到/dist/plus-pro-components/theme-chalk
   */
  await copy(distFolder, resolve(distBundle))

  /**
   * 复制打包后的index.css文件到/dist/plus-pro-components/index.css
   */
  await copy(resolve(distFolder, 'index.css'), resolve(pcOutput, 'index.css'))
}

main()
  .then(() => {
    consola.success(`Successfully build theme-chalk!`)
  })
  .catch(err => {
    consola.error(err)
  })
