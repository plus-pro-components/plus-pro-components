import type { App, Component } from 'vue'

export const makeInstaller = (components: Component[] = []) => {
  const install = (app: App) => {
    components.forEach((component: Component) => app.component(component.name as string, component))
  }
  return {
    install
  }
}
