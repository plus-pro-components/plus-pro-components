import type { App, DefineComponent } from 'vue'

export const makeInstaller = (components: DefineComponent[] = []) => {
  const install = (app: App): any => {
    components.forEach((component: DefineComponent) => app.component(component.name, component))
  }
  return {
    install
  }
}
