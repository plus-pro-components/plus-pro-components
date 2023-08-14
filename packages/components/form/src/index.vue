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
      <!-- 分组表单 -->
      <template v-if="group">
        <el-card v-for="groupItem in group" :key="groupItem.title" class="plus-form__group__item">
          <template #header>
            <slot
              name="group-item-header"
              :title="groupItem.title"
              :columns="groupItem.columns"
              :icon="groupItem.icon"
            >
              <div class="plus-form__group__item__icon">
                <el-icon v-if="groupItem.icon">
                  <component :is="groupItem.icon" />
                </el-icon>
                {{ groupItem.title }}
              </div>
            </slot>
          </template>

          <PlusFormItem
            v-for="(item, index) in filterHide(groupItem.columns)"
            :key="item.prop + index"
            v-model="state.values[item.prop]"
            v-bind="item"
            @change="handleChange"
          />
        </el-card>
      </template>

      <!-- 普通表单 -->
      <template v-else>
        <PlusFormItem
          v-for="(item, index) in state.subColumns"
          :key="item.prop + index"
          v-model="state.values[item.prop]"
          v-bind="item"
          @change="handleChange"
        />
      </template>
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
import type { DefineComponent } from 'vue'
import { reactive, ref, watch, computed } from 'vue'
import type { FormInstance, FormRules, FormProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useLocale } from '@plus-pro-components/hooks'
import { PlusFormItem } from '@plus-pro-components/components/form-item'
import type { PlusColumn, FieldValues, Mutable } from '@plus-pro-components/types'

/**
 * 分组表单配置项
 */
export interface PlusFormGroupRow {
  title: string
  icon?: DefineComponent
  columns: PlusColumn[]
}

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
  group?: false | PlusFormGroupRow[]
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
  columns: () => [],
  group: false
})
const emit = defineEmits<PlusFormEmits>()

const { t } = useLocale()
const formInstance = ref<FormInstance>()
const state = reactive<PlusFormState>({
  values: { ...props.modelValue },
  subColumns: []
})

const filterHide = (columns: PlusColumn[]) => columns.filter(item => item.hideInForm !== true)

state.subColumns = computed<any>(() => filterHide(props.columns))

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
