import type { RouteRecordRaw } from 'vue-router'
import type { VNode, Component } from 'vue'
/**
 * 路由配置类型
 *
 * @description 继承自 vue-router 的 RouteRecordRaw，无侵入，仅仅只扩展 meta，meta除了扩展的属性外，同时支持添加任意自定义属性，
 * 外链的话  path给   '/'+链接   例： `/https://element-plus.org`
 *
 */
export type PlusRouteRecordRaw = Partial<Omit<RouteRecordRaw, 'children'>> & {
  /**
   * meta除了扩展的属性外，同时支持添加任意自定义属性
   *
   */
  meta?: {
    /**
     * 页面标题   标题存在面包屑和菜单名称显示标题  不存在显示路由的 name  name不存在显示路由的 path
     */
    title?: string
    /**
     * 图标
     */
    icon?: Component | VNode | ((route: PlusRouteRecordRaw) => VNode)
    /**
     * 排序，默认为0 只对第一级有效
     */
    sort?: number
    /**
     * 在侧边栏菜单中隐藏，默认false 不隐藏
     */
    hideInMenu?: boolean
    /**
     * 隐藏面包屑，默认false 不隐藏
     */
    hideInBreadcrumb?: boolean
    /**
     * 菜单是否禁用
     * @see https://element-plus.org/zh-CN/component/menu.html#menu-item-attributes
     */
    disabled?: boolean
  }
  children?: PlusRouteRecordRaw[]
}
