import type { DialogProps } from 'element-plus'
import type { RecordType, Mutable } from '@plus-pro-components/types'

export interface PlusDialogSelfProps {
  modelValue?: boolean
  confirmText?: string
  cancelText?: string
  confirmLoading?: boolean
  hasFooter?: boolean
  footerAlign?: 'left' | 'right' | 'center'
  top?: string
  width?: string | number
  title?: string
}

export type PlusDialogProps = PlusDialogSelfProps & Partial<Mutable<DialogProps>> & RecordType

export interface PlusDialogEmits {
  (e: 'update:modelValue', visible: boolean): void
  (e: 'cancel'): void
  (e: 'confirm'): void
}
