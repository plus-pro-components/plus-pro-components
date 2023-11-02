import { createRouter, createWebHistory } from 'vue-router'
import { capitalize } from 'lodash-es'
import data from './__routes'

const moduleFiles = import.meta.glob('../views/**/*.vue', {
  eager: true
})

const getRoutes = (moduleFiles: Record<string, any>) => {
  const getComponent = (path: string) => {
    const key = Object.keys(moduleFiles).find(i => i.includes(`${path}.vue`)) as string
    return moduleFiles[key]?.default
  }
  return data.map(item => ({
    path: item.path,
    name: capitalize(item.name),
    component: getComponent(item.path),
    meta: {
      title: capitalize(item.name)
    }
  }))
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', redirect: '/dialog' }, ...getRoutes(moduleFiles)]
})

export default router
