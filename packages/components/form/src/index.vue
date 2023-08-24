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
    :model="model"
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
          <el-row v-bind="rowProps">
            <el-col
              v-for="(item, index) in filterHide(groupItem.columns)"
              :key="item.prop + index"
              v-bind="item.colProps || colProps"
            >
              <PlusFormItem
                v-model="state.values[item.prop]"
                v-bind="item"
                @change="() => handleChange(item)"
              >
                <template
                  v-if="$slots[getLabelSlotName(item.prop)]"
                  #[getLabelSlotName(item.prop)]="{ fieldProps, valueType }"
                >
                  <slot
                    :name="getLabelSlotName(item.prop)"
                    :prop="item.prop"
                    :label="item.label"
                    :field-props="fieldProps"
                    :value-type="valueType"
                  />
                </template>
                <template v-if="$slots[item.prop]" #[item.prop]="{ fieldProps, valueType }">
                  <slot
                    :name="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    :field-props="fieldProps"
                    :value-type="valueType"
                  />
                </template>
              </PlusFormItem>
            </el-col>
          </el-row>
        </el-card>
      </template>

      <!-- 普通表单 -->
      <template v-else>
        <el-row v-bind="rowProps">
          <el-col
            v-for="(item, index) in state.subColumns"
            :key="item.prop + index"
            v-bind="item.colProps || colProps"
          >
            <PlusFormItem
              v-model="state.values[item.prop]"
              v-bind="item"
              @change="() => handleChange(item)"
            >
              <template
                v-if="$slots[getLabelSlotName(item.prop)]"
                #[getLabelSlotName(item.prop)]="{ fieldProps, valueType }"
              >
                <slot
                  :name="getLabelSlotName(item.prop)"
                  :prop="item.prop"
                  :label="item.label"
                  :field-props="fieldProps"
                  :value-type="valueType"
                />
              </template>
              <template v-if="$slots[item.prop]" #[item.prop]="{ fieldProps, valueType }">
                <slot
                  :name="item.prop"
                  :prop="item.prop"
                  :label="item.label"
                  :field-props="fieldProps"
                  :value-type="valueType"
                />
              </template>
            </PlusFormItem>
          </el-col>
          <el-col v-bind="colProps">
            <slot name="searchFooter" />
          </el-col>
        </el-row>
      </template>
    </slot>

    <div
      v-if="hasFooter"
      class="plus-form__footer"
      :style="{ justifyContent: footerAlign === 'left' ? 'flex-start' : 'flex-end' }"
    >
      <slot name="footer">
        <el-button v-if="hasReset" @click="handleReset">
          <!-- 重置 -->
          {{ resetText || t('plus.form.resetText') }}
        </el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">
          <!-- 提交 -->
          {{ submitText || t('plus.form.submitText') }}
        </el-button>
      </slot>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import type { DefineComponent } from 'vue'
import { reactive, ref, watch, computed } from 'vue'
import type { FormInstance, FormRules, FormProps, RowProps, ColProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useLocale } from '@plus-pro-components/hooks'
import { PlusFormItem } from '@plus-pro-components/components/form-item'
import type { PlusColumn, FieldValues, Mutable } from '@plus-pro-components/types'
import { cloneDeep } from 'lodash-es'
import { getLabelSlotName } from '@plus-pro-components/components/utils'

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
  rowProps?: Partial<Mutable<RowProps>>
  colProps?: Partial<Mutable<ColProps>>
  labelSuffix?: string
  hasErrorTip?: boolean
  hasFooter?: boolean
  hasReset?: boolean
  submitText?: string
  resetText?: string
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
  (e: 'change', values: FieldValues, column: PlusColumn): void
  (e: 'reset'): void
  (e: 'submitError', errors: any): void
}

defineOptions({
  name: 'PlusForm'
})

const props = withDefaults(defineProps<PlusFormProps>(), {
  modelValue: () => ({}),
  labelWidth: '80px',
  labelPosition: 'left',
  rowProps: () => ({}),
  colProps: () => ({}),
  labelSuffix: ':',
  hasErrorTip: true,
  hasFooter: true,
  hasReset: true,
  submitLoading: false,
  submitText: '',
  resetText: '',
  footerAlign: 'left',
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
const model = computed(() => cloneDeep(state.values))

state.subColumns = computed<any>(() => filterHide(props.columns))

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

const handleChange = (column: PlusColumn) => {
  emit('change', state.values, column)
  emit('update:modelValue', state.values)
}

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

const handleReset = (): void => {
  clearValidate()
  state.values = {}
  emit('reset')
}

defineExpose({
  formInstance
})
</script>
