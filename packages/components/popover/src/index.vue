<template>
  <el-popover
    v-if="hasFilterTableHeader"
    :placement="placement"
    :width="width"
    :trigger="trigger"
    :title="title"
    :visible="state.visible"
    :show-arrow="false"
    @show="handleShow"
    @hide="state.visible = false"
  >
    <div v-click-outside="onClickOutside">
      <slot />
    </div>

    <div v-if="hasShowBottomButton" style="text-align: right; margin: 0">
      <el-button size="small" text @click="handleCancelPopover">{{
        cancelText || t('el.popconfirm.cancelButtonText')
      }}</el-button>
      <el-button
        size="small"
        type="primary"
        :loading="confirmLoading"
        @click="handleConfrimPopover"
        >{{ confirmText || t('el.popconfirm.confirmButtonText') }}</el-button
      >
    </div>
    <template #reference>
      <!-- <el-icon :size="20" color="#919191">
        <Setting />
      </el-icon> -->
      <span @click="handleClick">
        <slot name="icon" />
      </span>
    </template>
  </el-popover>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { useLocale, ClickOutside as vClickOutside } from 'element-plus'
export interface PlusPopoverProps {
  hasFilterTableHeader?: boolean
  hasShowBottomButton?: boolean
  placement: string
  width: number
  trigger?: string
  title?: string
  confirmLoading?: boolean
  cancelText?: string
  confirmText?: string
}
export interface PlusPopoverEmits {
  (e: 'cancel'): void
  (e: 'confirm'): void
  (e: 'show'): void
}
defineOptions({
  name: 'PlusPopover'
})
const { t } = useLocale()
const state = reactive({
  // 控制弹框显示隐藏
  visible: false
})
withDefaults(defineProps<PlusPopoverProps>(), {
  // 是否显示 popver 弹出框
  hasFilterTableHeader: false,
  // 是否显示底部按钮
  hasShowBottomButton: false,
  // 出现位置
  placement: 'bottom',
  // 宽度
  width: 150,
  // 触发方式
  trigger: 'hover',
  title: '',
  confirmLoading: false,
  cancelText: '',
  confirmText: ''
})
const emit = defineEmits<PlusPopoverEmits>()
const handleCancelPopover = (): void => {
  emit('cancel')
  state.visible = false
}
const handleConfrimPopover = (): void => {
  emit('confirm')
  state.visible = false
}
const handleClick = (): void => {
  state.visible = true
}
const onClickOutside = () => {
  state.visible = false
}
const handleShow = () => {
  emit('show')
}
</script>
