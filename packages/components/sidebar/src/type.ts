import type { Ref, ComputedRef } from 'vue'
import type { ScrollbarProps } from 'element-plus'
import type {
  PlusRouteRecordRaw,
  Mutable,
  RenderTypes,
  RecordType
} from '@plus-pro-components/types'

export interface PlusSidebarSelfProps {
  routes?: PlusRouteRecordRaw[]
  collapse?: boolean
  defaultActive?: string | ComputedRef<string> | Ref<string>
  /**
   * 自定义 菜单的  menuItem
   * @param route
   */
  renderMenuItem?: (route: PlusRouteRecordRaw) => RenderTypes
  /**
   * 自定义 菜单的 subMenu
   * @param route
   */
  renderSubMenuItem?: (route: PlusRouteRecordRaw) => RenderTypes
  /**
   * 自定义 菜单的标题显示
   * @param route
   */
  renderTitle?: (route: PlusRouteRecordRaw) => RenderTypes
  /**
   * 可以为菜单增加一个额外内容，在菜单头和菜单之间
   * @param route
   */
  renderMenuExtra?: (route: PlusRouteRecordRaw) => RenderTypes
  scrollbarProps?: Partial<Mutable<ScrollbarProps>>

  /**
   * 菜单的宽度
   * @deprecated 0.1.20
   */
  width?: number | string
}

export type PlusSidebarProps = PlusSidebarSelfProps & RecordType

export interface PlusSidebarEmits {
  (e: 'update:collapse', collapse: boolean): void
  (e: 'toggleCollapse', collapse: boolean): void
}
