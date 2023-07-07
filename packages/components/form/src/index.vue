<template>
  <el-form
    ref="formInstance"
    :model="modelValue"
    :rules="state.rules"
    :label-width="labelWidth"
    :size="size"
    class="plus-form"
    :label-position="labelPosition"
    :validate-on-rule-change="false"
    :label-suffix="labelSuffix"
    v-bind="formProps"
  >
    <slot>
      <PlusFormItem v-for="item in columns" :key="item.prop" v-bind="item" />
    </slot>

    <div v-if="hasFooter" class="plus-form-footer">
      <slot name="footer">
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">
          <!-- 确定 -->
          {{ confirmText }}
        </el-button>

        <el-button v-if="hasCancel" @click="handleCancel">
          <!-- 取消 -->
          {{ cancelText }}
        </el-button>
      </slot>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, ComponentSize, FormRules, FormProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import PlusFormItem from '@plus-pro-components/components/form-item'

export interface PlusFormProps {
  modelValue: any
  labelWidth?: string
  size?: ComponentSize
  labelPosition?: 'left' | 'right' | 'top'
  labelSuffix?: string
  hasErrorTip?: boolean
  hasFooter?: boolean
  hasCancel?: boolean
  confirmText?: string
  cancelText?: string
  submitLoading?: boolean
  formProps?: Partial<FormProps>
  columns?: any[]
}

export interface PlusFormState {
  rules: FormRules
}

export interface PlusFormEmits {
  (e: 'subSubmit'): void
  (e: 'subCancel'): void
  (e: 'subSubmitError', errors: any): void
}

defineOptions({
  name: 'PlusForm'
})

const props = withDefaults(defineProps<PlusFormProps>(), {
  modelValue: () => ({}),
  labelWidth: '80px',
  size: 'default',
  labelPosition: 'left',
  labelSuffix: ':',
  hasErrorTip: true,
  hasFooter: true,
  hasCancel: true,
  submitLoading: false,
  confirmText: '确定',
  cancelText: '取消',
  formProps: () => ({}),
  columns: () => []
})

const emit = defineEmits<PlusFormEmits>()

const formInstance = ref<FormInstance>()

const state = reactive<PlusFormState>({
  rules: {}
})

// 清空校验
const clearValidate = (): void => {
  formInstance.value?.clearValidate()
}

const handleSubmit = async () => {
  try {
    const valid = await formInstance.value?.validate()
    if (valid) {
      emit('subSubmit')
    }
  } catch (errors: any) {
    if (props.hasErrorTip) {
      ElMessage.closeAll()
      const values: any[] = Object.values(errors)
      ElMessage.warning(values[0]?.[0]?.message || '请完整填写表单并再次提交！')
    }
    emit('subSubmitError', errors)
  }
}

const handleCancel = (): void => {
  clearValidate()
  emit('subCancel')
}

defineExpose({
  clearValidate,
  formInstance
})
</script>
