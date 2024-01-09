<template>
  <el-dialog
    v-model="subVisible"
    :top="top"
    :width="width"
    :title="title || t('plus.dialog.title')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="false"
    :before-close="handleCancel"
    class="plus-dialog"
    v-bind="$attrs"
  >
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>

    <div class="plus-dialog-body">
      <slot />
    </div>

    <template v-if="hasFooter" #footer>
      <div class="plus-dialog-footer" :style="style">
        <slot name="footer">
          <el-button @click="handleCancel">
            {{ cancelText || t('plus.dialog.cancelText') }}
          </el-button>
          <el-button type="primary" :loading="confirmLoading" @click="handleConfirm">
            {{ confirmText || t('plus.dialog.confirmText') }}
          </el-button>
        </slot>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watchEffect, computed } from 'vue'
import type { DialogProps } from 'element-plus'
import { ElDialog, ElButton } from 'element-plus'
import { useLocale } from '@plus-pro-components/hooks'

export interface PlusDialogProps
  extends /* @vue-ignore */ Partial<Omit<DialogProps, 'modelValue' | 'title'>> {
  modelValue?: boolean
  confirmText?: string
  cancelText?: string
  confirmLoading?: boolean
  hasFooter?: boolean
  footerAlign?: 'left' | 'right' | 'center'
  top?: string
  width?: string
  title?: string
}
export interface PlusDialogEmits {
  (e: 'update:modelValue', visible: boolean): void
  (e: 'cancel'): void
  (e: 'confirm'): void
}

defineOptions({
  name: 'PlusDialog'
})

const props = withDefaults(defineProps<PlusDialogProps>(), {
  modelValue: false,
  confirmText: '',
  confirmLoading: false,
  cancelText: '',
  hasFooter: true,
  title: '',
  top: '15vh',
  width: '460px',
  footerAlign: 'right'
})
const emit = defineEmits<PlusDialogEmits>()
const style = computed(() => ({
  justifyContent:
    props.footerAlign === 'left'
      ? 'flex-start'
      : props.footerAlign === 'center'
      ? 'center'
      : 'flex-end'
}))
const subVisible = ref(false)
const { t } = useLocale()

watchEffect(() => {
  subVisible.value = props.modelValue
})

const handleConfirm = (): void => {
  emit('confirm')
}

const handleCancel = (): void => {
  emit('update:modelValue', false)
  emit('cancel')
}
</script>
