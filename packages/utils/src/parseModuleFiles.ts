/**
 * @desc 解析路径名称
 * @param path
 * @returns
 */
export const parsePathName = (path: string): string => {
  const start = path.lastIndexOf('/') || path.lastIndexOf('\\')
  const end = path.lastIndexOf('.')
  return path.slice(start + 1, end)
}

/**
 * @desc 解析import.meta.globEager导入的模块化文件。
 * 如果文件名称是index.ts的话直接放在{}里。
 * 其他文件名称会放在文件名称所在的对象里，如 app.ts，放在{ app:{} }里。
 * @param moduleFiles
 * @returns modules 返回解析后的对象
 */
export function parseModuleFiles<T>(
  moduleFiles: Record<string, { [key: string]: T | any }>
): Record<string, unknown> {
  const modules: any = {}
  Object.keys(moduleFiles).forEach(key => {
    const name = parsePathName(key)
    const value = (moduleFiles[key] && moduleFiles[key].default) || {}
    if (name === 'index') {
      Object.keys(value).forEach(item => {
        modules[item] = value[item]
      })
    } else {
      modules[name] = value
    }
  })
  return modules
}
