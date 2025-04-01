import type { TableColumnCtx } from 'element-plus'
import type { RecordType } from './global'
import type { PlusColumn } from './plus'

export {}

/**
 * 所有表格的类型 默认是 ''
 */
export type TableValueType =
  | 'img'
  | 'link'
  | 'money'
  | 'tag'
  | 'progress'
  | 'copy'
  | 'code'
  | 'divider'
  | 'avatar'
  | ''

/**
 *  表格的类型
 */
export type TableColumnProps = {
  /**
   *  @desc 禁止表头过滤 默认`false`
   *  @deprecated 请使用 `disabledHeaderFilter` 代替
   */
  headerFilter?: boolean
  /**
   *  @desc 禁止表头过滤 默认`false`
   */
  disabledHeaderFilter?: boolean

  /**
   * 表头过滤中默认是否勾选
   * @version v0.1.22 新增
   * @default true
   */
  headerIsChecked?: boolean

  /**
   * @desc 表格行的其他配置 （不包含label prop width minWidth）
   */
  tableColumnProps?: Partial<
    Omit<TableColumnCtx<any>, 'label ' | 'prop' | 'width' | 'minWidth'> & { [key: string]: any }
  >

  /**
   * @desc 图片预览  默认开启  给 false 关闭  仅当 valueType 等于 img 时有效，
   */
  preview?: boolean

  /**
   * @desc  el-link 的文字 valueType 等于 link 时生效 ，默认取得是 prop 对应的表格数据
   *
   * 使用场景：例如每列都要显示 一个 `下载` 固定不变
   */
  linkText?: string

  /**
   * @desc 格式化表格内容显示
   * @version v0.1.12 新增
   * @see https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7
   */
  formatter?: (
    value: any,
    data: { row: RecordType; column: PlusColumn; index: number }
  ) => string | number
}
