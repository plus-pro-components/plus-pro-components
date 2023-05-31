<template>
  <el-dialog
    v-model="subVisible"
    :top="top"
    :width="width"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleCancel"
    append-to-body
    class="plus-dialog"
    v-bind="$attrs"
  >
    <template #header>
      <slot name="header">{{ header }}</slot>
    </template>

    <div class="plus-dialog">
      <slot />
    </div>

    <template v-if="hasFooter" #footer>
      <slot name="footer">
        <div>
          <span class="dialog-footer">
            <el-button @click="handleCancel">
              {{ cancelText || t('el.popconfirm.cancelButtonText') }}
            </el-button>
            <el-button type="primary" :loading="confirmLoading" @click="handleConfirm">
              {{ confirmText || t('el.popconfirm.confirmButtonText') }}
            </el-button>
          </span>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useLocale } from 'element-plus'

export interface PlusDialogProps {
  modelValue?: boolean
  confirmText?: string
  cancelText?: string
  confirmLoading?: boolean
  hasFooter?: boolean
  top?: string
  width?: string
  header?: string
}

export interface PlusDialogEmits {
  (e: 'update:modelValue', visible: boolean): void
  (e: 'cancel'): void
  (e: 'confirm'): void
}

defineOptions({
  name: 'PlusDialog'
})

const { t } = useLocale()

const props = withDefaults(defineProps<PlusDialogProps>(), {
  modelValue: false,
  confirmText: '',
  confirmLoading: false,
  cancelText: '',
  hasFooter: true,
  header: '',
  top: '15vh',
  width: '460px'
})

const emit = defineEmits<PlusDialogEmits>()

const subVisible = ref(false)

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
