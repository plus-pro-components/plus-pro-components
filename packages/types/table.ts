import type { TableColumnCtx } from 'element-plus'

export {}

/**
 * 所有表格的类型 默认是 ''
 */
export type TableValueType = 'img' | 'link' | 'money' | 'tag' | 'progress' | 'copy' | 'code' | ''

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
   *  @desc  el-link 的文字 valueType 等于 link 时生效 ，默认取得是 prop 对应的表格数据
   *
   * 使用场景：例如每列都要显示 一个 `下载` 固定不变
   */
  linkText?: string
}
