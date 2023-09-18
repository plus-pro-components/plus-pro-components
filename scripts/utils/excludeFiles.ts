// 基础
const excludes = [
  'node_modules',
  'test',
  'mock',
  'dist',
  'packages/eslint-config',
  'packages/utils',
  'packages/play',
  'packages/theme-chalk',
  'packages/resolver'
]

export const excludeFiles = (files: string[]) => {
  return files.filter(path => ![...excludes].some(exclude => path.includes(exclude)))
}
