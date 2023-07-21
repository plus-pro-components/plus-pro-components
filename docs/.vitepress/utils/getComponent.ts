export const getComponent = (moduleFiles: Record<string, any>, path: string) => {
  const key = Object.keys(moduleFiles).find(i => i.endsWith(`/examples/${path}.vue`)) as string
  return moduleFiles[key]?.default
}
