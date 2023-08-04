<template>
  <el-popover
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

    <div v-if="hasShowBottomButton" style="padding-top: 12px">
      <el-button size="small" plain @click="handleCancelPopover">
        {{ cancelText || t('plus.popover.cancelText') }}
      </el-button>

      <el-button
        size="small"
        type="primary"
        :loading="confirmLoading"
        @click="handleConfirmPopover"
      >
        {{ confirmText || t('plus.popover.confirmText') }}
      </el-button>
    </div>

    <template #reference>
      <span @click="handleClick">
        <slot name="icon" />
      </span>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import { useLocale } from '@plus-pro-components/hooks'

export interface PlusPopoverProps {
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

withDefaults(defineProps<PlusPopoverProps>(), {
  // 是否显示 popover 弹出框
  hasToolbar: false,
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

const { t } = useLocale()
const state = reactive({
  // 控制弹框显示隐藏
  visible: false
})

const handleCancelPopover = (): void => {
  emit('cancel')
  state.visible = false
}

const handleConfirmPopover = (): void => {
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
