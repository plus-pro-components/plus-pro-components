// 基础
const excludes = [
  'node_modules',
  'test',
  'mock',
  'dist',
  'packages/eslint-config',
  'packages/utils',
  'packages/play'
]

export const excludeEchartsFiles = (files: string[]) => {
  return files.filter(path => !excludes.some(exclude => path.includes(exclude)))
}

export const excludeFiles = (files: string[]) => {
  return files.filter(path => ![...excludes, 'echarts'].some(exclude => path.includes(exclude)))
}
