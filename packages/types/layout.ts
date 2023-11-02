import type { RouteRecordRaw } from 'vue-router'
import type { VNode, Component } from 'vue'

/**
 * 路由配置类型
 *
 * @description 继承自 vue-router 的 RouteRecordRaw，无侵入，仅仅只扩展 meta，meta除了扩展的属性外，同时支持添加任意自定义属性
 *
 */
export type PlusRouteRecordRaw = Partial<RouteRecordRaw> & {
  /**
   * meta除了扩展的属性外，同时支持添加任意自定义属性
   *
   */
  meta?: {
    /**
     * 页面标题   标题存在面包屑才回显示
     */
    title?: string

    /**
     * 图标
     */
    icon?: Component | VNode

    /**
     * 是否外链 默认 false
     */
    isExternal?: boolean

    /**
     * 排序，默认为0 只对第一级有效
     */
    sort?: number

    /**
     * 在侧边栏菜单中隐藏，默认false 不隐藏
     */
    hiddenMenu?: boolean

    /**
     * 隐藏面包屑，默认false 不隐藏
     */
    hiddenBreadcrumb?: boolean
  }
}
