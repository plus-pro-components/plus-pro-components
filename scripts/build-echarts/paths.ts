import path from 'node:path'

const resolve = path.resolve

/** 项目根目录 `/`  */
export const projRoot = resolve(__dirname, '../../')
/** 包目录 `/packages` */
export const pkgRoot = resolve(projRoot, 'packages')

/** `/packages/echarts` */
export const ecRoot = resolve(pkgRoot, 'echarts')

/** `/packages/echarts/dist` */
export const ecOutput = resolve(ecRoot, 'dist')

/** `/packages/hooks` */
export const hooksRoot = resolve(pkgRoot, 'hooks')
