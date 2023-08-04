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
    <template #header>
      <slot name="header" />
    </template>

    <div class="plus-dialog">
      <slot />
    </div>

    <template v-if="hasFooter" #footer>
      <slot name="footer">
        <div>
          <span class="dialog-footer">
            <el-button @click="handleCancel">
              {{ cancelText || t('plus.dialog.cancelText') }}
            </el-button>
            <el-button type="primary" :loading="confirmLoading" @click="handleConfirm">
              {{ confirmText || t('plus.dialog.confirmText') }}
            </el-button>
          </span>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import type { DialogProps } from 'element-plus'
import { useLocale } from '@plus-pro-components/hooks'

export interface PlusDialogProps
  extends /* @vue-ignore */ Partial<Omit<DialogProps, 'modelValue' | 'title'>> {
  modelValue?: boolean
  confirmText?: string
  cancelText?: string
  confirmLoading?: boolean
  hasFooter?: boolean
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
  width: '460px'
})
const emit = defineEmits<PlusDialogEmits>()

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
