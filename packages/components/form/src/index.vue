<template>
  <el-form
    ref="formInstance"
    :rules="rules"
    :label-width="hasLabel ? labelWidth : 0"
    class="plus-form"
    :class="hasLabel ? '' : 'no-has-label'"
    :label-position="labelPosition"
    :validate-on-rule-change="false"
    :label-suffix="hasLabel ? labelSuffix : ''"
    v-bind="attrs"
    :model="model"
    @validate="handleValidate"
  >
    <slot>
      <!-- 分组表单 -->
      <template v-if="subGroup">
        <el-card
          v-for="(groupItem, index) in subGroup"
          :key="unref(groupItem.title)"
          v-bind="groupItem.cardProps || cardProps"
          class="plus-form__group__item"
        >
          <template #header>
            <slot
              name="group-header"
              :title="unref(groupItem.title)"
              :columns="groupItem.columns"
              :icon="groupItem.icon"
              :index="index"
            >
              <div class="plus-form__group__item__icon">
                <el-icon v-if="groupItem.icon">
                  <component :is="groupItem.icon" />
                </el-icon>
                {{ unref(groupItem.title) }}
              </div>
            </slot>
          </template>

          <slot
            v-if="$slots[getSlotName('form-group', groupItem.name)]"
            :name="getSlotName('form-group', groupItem.name)"
            v-bind="groupItem"
            :index="index"
          />

          <PlusFormContent
            v-else
            v-model="values"
            :row-props="rowProps"
            :col-props="colProps"
            :columns="filterHide(groupItem.columns)"
            :has-label="hasLabel"
            :collapse-transition="collapseTransition"
            :collapse-duration="collapseDuration"
            :clearable="clearable"
            @change="handleChange"
          >
            <template v-for="(_, key) in $slots" :key="key" #[key]="data">
              <slot :name="key" v-bind="data" />
            </template>
          </PlusFormContent>
        </el-card>
      </template>

      <!-- 普通表单 -->
      <template v-else>
        <PlusFormContent
          v-model="values"
          :row-props="rowProps"
          :col-props="colProps"
          :columns="subColumns"
          :has-label="hasLabel"
          :collapse-transition="collapseTransition"
          :collapse-duration="collapseDuration"
          :clearable="clearable"
          @change="handleChange"
        >
          <template v-for="(_, key) in $slots" :key="key" #[key]="data">
            <slot :name="key" v-bind="data" />
          </template>
        </PlusFormContent>
      </template>
    </slot>

    <div v-if="hasFooter" class="plus-form__footer" :style="style">
      <slot name="footer" v-bind="{ handleReset, handleSubmit }">
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
import { ref, watch, computed, unref, useAttrs, withModifiers } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage, ElForm, ElCard, ElButton, ElIcon } from 'element-plus'
import { useLocale } from '@plus-pro-components/hooks'
import type { PlusColumn, FieldValues, RecordType } from '@plus-pro-components/types'
import {
  isArray,
  isPlainObject,
  isFunction,
  getSlotName
} from '@plus-pro-components/components/utils'
import PlusFormContent from './form-content.vue'
import type { PlusFormSelfProps, PlusFormEmits } from './type'

defineOptions({
  name: 'PlusForm',
  inheritAttrs: false
})

const props = withDefaults(defineProps<PlusFormSelfProps>(), {
  modelValue: () => ({}),
  defaultValues: () => ({}),
  labelWidth: '80px',
  labelPosition: 'left',
  rowProps: () => ({}),
  colProps: () => ({}),
  labelSuffix: ':',
  hasErrorTip: true,
  hasFooter: true,
  hasReset: true,
  hasLabel: true,
  submitLoading: false,
  submitText: '',
  resetText: '',
  footerAlign: 'left',
  rules: () => ({}),
  columns: () => [],
  group: false,
  cardProps: () => ({}),
  prevent: false,
  collapseDuration: undefined,
  collapseTransition: undefined,
  clearable: true
})
const emit = defineEmits<PlusFormEmits>()

const { t } = useLocale()
const formInstance = ref<FormInstance | null>(null)
const values = ref<FieldValues>({})

const filterHide = (columns?: PlusColumn[]) => {
  return columns?.filter(item => unref(item.hideInForm) !== true) || []
}
const model = computed(() => values.value)
const style = computed(() => ({
  justifyContent:
    props.footerAlign === 'left'
      ? 'flex-start'
      : props.footerAlign === 'center'
      ? 'center'
      : 'flex-end'
}))
const subColumns = computed(() => filterHide(props.columns))
const subGroup = computed(() =>
  isArray(props.group) ? props.group?.filter(item => unref(item.hideInGroup) !== true) : props.group
)

const originAttrs = useAttrs()
const attrs = computed(() => ({
  ...originAttrs,
  ...(props.prevent
    ? {
        onSubmit: withModifiers(
          (...arg: any[]) => {
            if (originAttrs?.onSubmit && isFunction(originAttrs?.onSubmit)) {
              // eslint-disable-next-line @typescript-eslint/no-extra-semi
              ;(originAttrs.onSubmit as any)(...arg)
            }
          },
          ['prevent']
        )
      }
    : {})
}))

watch(
  () => props.modelValue,
  val => {
    values.value = val
  },
  {
    immediate: true
  }
)

const handleChange = (_: FieldValues, column: PlusColumn) => {
  emit('update:modelValue', values.value)
  emit('change', values.value, column)
}

// 清空校验
const clearValidate = (): void => {
  formInstance.value?.clearValidate()
}

const handleSubmit = async () => {
  try {
    const valid = await formInstance.value?.validate()
    if (valid) {
      emit('submit', values.value)
      return true
    }
  } catch (errors: unknown) {
    if (props.hasErrorTip) {
      ElMessage.closeAll()
      const values: RecordType[] | false =
        isPlainObject(errors) && Object.values(errors as RecordType)
      const message = values ? values[0]?.[0]?.message : undefined
      ElMessage.warning(message || t('plus.form.errorTip'))
    }
    emit('submitError', errors)
  }
  return false
}

const handleReset = (): void => {
  clearValidate()
  values.value = { ...props.defaultValues }
  emit('update:modelValue', values.value)
  emit('reset', values.value)
}

const handleValidate = (...args: any[]): void => {
  emit('validate', ...args)
}

defineExpose({
  formInstance,
  handleSubmit,
  handleReset
})
</script>
