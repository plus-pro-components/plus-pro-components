<template>
  <el-popover v-model:visible="subVisible" v-bind="$attrs">
    <slot />

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
      <span>
        <slot name="reference" />
      </span>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useLocale } from '@plus-pro-components/hooks'
import { ElPopover, ElButton } from 'element-plus'

export interface PlusPopoverProps {
  hasShowBottomButton?: boolean
  confirmLoading?: boolean
  cancelText?: string
  confirmText?: string
}
export interface PlusPopoverEmits {
  (e: 'cancel'): void
  (e: 'confirm'): void
}

defineOptions({
  name: 'PlusPopover'
})

const props = withDefaults(defineProps<PlusPopoverProps>(), {
  // 是否显示底部按钮
  hasShowBottomButton: false,
  confirmLoading: false,
  cancelText: '',
  confirmText: '',
  visible: false
})
const emit = defineEmits<PlusPopoverEmits>()

const subVisible = ref(false)
const { t } = useLocale()

watch(
  () => props.visible,
  val => {
    subVisible.value = val
  },
  {
    immediate: true
  }
)

const handleCancelPopover = (): void => {
  subVisible.value = false
  emit('cancel')
}

const handleConfirmPopover = (): void => {
  subVisible.value = false
  emit('confirm')
}
</script>
