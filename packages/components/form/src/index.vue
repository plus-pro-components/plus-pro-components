<template>
  <el-form
    ref="formInstance"
    :rules="rules"
    :label-width="labelWidth"
    class="plus-form"
    :label-position="labelPosition"
    :validate-on-rule-change="false"
    :label-suffix="labelSuffix"
    v-bind="$attrs"
    :model="state.values"
  >
    <slot>
      <PlusFormItem
        v-for="item in state.subColumns"
        :key="item.prop"
        v-model="state.values[item.prop]"
        v-bind="item"
        @change="handleChange"
      />
    </slot>

    <div
      v-if="hasFooter"
      class="plus-form__footer"
      :style="{ justifyContent: footerAlign === 'left' ? 'flex-start' : 'flex-end' }"
    >
      <slot name="footer">
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">
          <!-- 确定 -->
          {{ confirmText || t('plus.form.confirmText') }}
        </el-button>

        <el-button v-if="hasCancel" @click="handleCancel">
          <!-- 取消 -->
          {{ cancelText || t('plus.form.cancelText') }}
        </el-button>
      </slot>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, computed } from 'vue'
import type { FormInstance, FormRules, FormProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useLocale } from '@plus-pro-components/hooks'
import { PlusFormItem } from '@plus-pro-components/components/form-item'
import type { PlusColumn, FieldValues, Mutable } from '@plus-pro-components/types'

export interface PlusFormProps extends /* @vue-ignore */ Partial<Mutable<FormProps>> {
  modelValue?: FieldValues
  columns?: PlusColumn[]
  labelWidth?: string
  labelPosition?: 'left' | 'right' | 'top'
  labelSuffix?: string
  hasErrorTip?: boolean
  hasFooter?: boolean
  hasCancel?: boolean
  confirmText?: string
  cancelText?: string
  submitLoading?: boolean
  footerAlign?: 'left' | 'right'
  rules?: FormRules
}

export interface PlusFormState {
  values: FieldValues
  subColumns: any
}

export interface PlusFormEmits {
  (e: 'update:modelValue', values: FieldValues): void
  (e: 'submit', values: FieldValues): void
  (e: 'change', values: FieldValues): void
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
  confirmText: '',
  cancelText: '',
  footerAlign: 'left',
  formProps: () => ({}),
  rules: () => ({}),
  columns: () => []
})

const emit = defineEmits<PlusFormEmits>()

const { t } = useLocale()

const formInstance = ref<FormInstance>()

const state = reactive<PlusFormState>({
  values: { ...props.modelValue },
  subColumns: []
})

state.subColumns = computed<any>(() => props.columns.filter(item => item.hideInForm !== true))

const handleChange = () => {
  emit('change', state.values)
  emit('update:modelValue', state.values)
}

watch(
  () => props.modelValue,
  val => {
    state.values = val
  },
  {
    deep: true,
    immediate: true
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
      ElMessage.warning(values[0]?.[0]?.message || t('plus.form.errorTip'))
    }
    emit('submitError', errors)
  }
}

const handleCancel = (): void => {
  clearValidate()
  emit('cancel')
}

defineExpose({
  formInstance
})
</script>
