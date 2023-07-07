<template>
  <el-dialog
    v-model="subVisible"
    :top="top"
    :width="width"
    :title="title"
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
              {{ cancelText }}
            </el-button>
            <el-button type="primary" :loading="confirmLoading" @click="handleConfirm">
              {{ confirmText }}
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
  confirmText: '取消',
  confirmLoading: false,
  cancelText: '确定',
  hasFooter: true,
  title: '弹窗',
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
