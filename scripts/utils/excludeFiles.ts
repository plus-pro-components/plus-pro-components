// 基础
const excludes = ['node_modules', 'test', 'mock', 'dist', 'eslint-config', 'utils', 'play']

export const excludeEchartsFiles = (files: string[]) => {
  return files.filter(path => !excludes.some(exclude => path.includes(exclude)))
}

export const excludeFiles = (files: string[]) => {
  return files.filter(path => ![...excludes, 'echarts'].some(exclude => path.includes(exclude)))
}
