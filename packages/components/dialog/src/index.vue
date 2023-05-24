<template>
  <el-dialog
    ref="dialog"
    v-model="subVisible"
    :top="top"
    :before-close="handleCancel"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="false"
    :destroy-on-close="destroyOnClose"
    :show-close="showClose"
    append-to-body
    class="app-dialog"
  >
    <template #header>
      <div v-if="title">
        <span class="el-dialog__title" style="user-select: none">
          {{ title }}
        </span>
        <span v-if="subTitle" class="sub-title"> {{ subTitle }}</span>
      </div>
    </template>

    <div :class="[contentClass, 'dialog-slot-content']">
      <slot />
    </div>

    <template v-if="hasFooter" #footer>
      <div>
        <span class="dialog-footer">
          <el-button @click="handleCancel"> {{ cancelText }} </el-button>
          <el-button type="primary" :loading="confirmLoading" @click="handleConfirm">
            {{ confirmText }}
          </el-button>
        </span>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'PlusDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    top: {
      type: String,
      default: '15vh'
    },
    width: {
      type: String,
      default: '690px'
    },
    hasFooter: {
      type: Boolean,
      default: false
    },
    confirmLoading: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    contentClass: {
      type: String,
      default: ''
    },

    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '关闭'
    }
  },
  emits: ['confirm', 'cancel', 'change', 'update:modelValue'],
  setup(props, { emit }) {
    const subVisible = ref(false)
    const handleConfirm = (): void => {
      emit('confirm')
    }
    const handleCancel = (): void => {
      emit('update:modelValue', false)
      emit('cancel')
      emit('change', false)
    }
    watch(
      () => props.modelValue,
      val => {
        subVisible.value = val
      },
      {
        immediate: true
      }
    )
    return { subVisible, handleConfirm, handleCancel }
  }
})
</script>
