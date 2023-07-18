<template>
  <el-form
    ref="formInstance"
    :model="state.values"
    :rules="rules"
    :label-width="labelWidth"
    class="plus-form"
    :label-position="labelPosition"
    :validate-on-rule-change="false"
    :label-suffix="labelSuffix"
    v-bind="formProps"
  >
    <slot>
      <PlusFormItem
        v-for="item in state.subColumns"
        :key="item.prop"
        v-model="state.values[item.prop]"
        v-bind="item"
      />
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
import { reactive, ref, watch, computed } from 'vue'
import type { FormInstance, FormRules, FormProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import PlusFormItem from '@plus-pro-components/components/form-item'
import type { PlusColumn, RecordType } from '@plus-pro-components/types'

export interface PlusFormProps {
  modelValue: RecordType
  columns: PlusColumn[]
  labelWidth?: string
  labelPosition?: 'left' | 'right' | 'top'
  labelSuffix?: string
  hasErrorTip?: boolean
  hasFooter?: boolean
  hasCancel?: boolean
  confirmText?: string
  cancelText?: string
  submitLoading?: boolean
  rules?: FormRules
  formProps?: Partial<FormProps>
}

export interface PlusFormState {
  values: any
  subColumns: any
}

export interface PlusFormEmits {
  (e: 'update:modelValue', values: any): void
  (e: 'submit', values: any): void
  (e: 'change', values: any): void
  (e: 'cancel'): void
  (e: 'submitError', errors: any): void
}

defineOptions({
  name: 'PlusForm'
})

const props = withDefaults(defineProps<PlusFormProps>(), {
  modelValue: () => ({}),
  labelWidth: '80px',
  labelPosition: 'left',
  labelSuffix: ':',
  hasErrorTip: true,
  hasFooter: true,
  hasCancel: true,
  submitLoading: false,
  confirmText: '确定',
  cancelText: '取消',
  formProps: () => ({}),
  rules: () => ({}),
  columns: () => []
})

const emit = defineEmits<PlusFormEmits>()

const formInstance = ref<FormInstance>()

const state = reactive<PlusFormState>({
  values: { ...props.modelValue },
  subColumns: []
})

state.subColumns = computed<any>(() => props.columns.filter(item => item.hideInForm !== true))

watch(
  () => state.values,
  val => {
    emit('change', val)
    emit('update:modelValue', val)
  },
  {
    deep: true
  }
)

// 清空校验
const clearValidate = (): void => {
  formInstance.value?.clearValidate()
}

const handleSubmit = async () => {
  try {
    const valid = await formInstance.value?.validate()
    if (valid) {
      emit('submit', state.values)
    }
  } catch (errors: any) {
    if (props.hasErrorTip) {
      ElMessage.closeAll()
      const values: any[] = Object.values(errors)
      ElMessage.warning(values[0]?.[0]?.message || '请完整填写表单并再次提交！')
    }
    emit('submitError', errors)
  }
}

const handleCancel = (): void => {
  clearValidate()
  emit('cancel')
}

defineExpose({
  clearValidate,
  formInstance
})
</script>
