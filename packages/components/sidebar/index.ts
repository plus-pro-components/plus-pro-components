import Sidebar from './src/index.vue'
import SidebarItem from './src/sidebar-item.vue'

export type PlusSidebarInstance = InstanceType<typeof Sidebar>
export type { PlusSidebarProps } from './src/index.vue'

export const PlusSidebar = Sidebar
export const PlusSidebarItem = SidebarItem
