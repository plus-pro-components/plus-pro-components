<template>
  <div
    :class="['plus-steps-form', $attrs.direction === 'vertical' ? 'plus-steps-from-vertical' : '']"
  >
    <el-steps :active="active" finish-status="success" v-bind="$attrs">
      <el-step v-for="item in data" :key="item.title" v-bind="item">
        <template v-if="$slots.icon" #icon>
          <slot name="icon" :icon="item.icon" :title="item.title" :description="item.description" />
        </template>

        <template v-if="$slots.title" #title>
          <slot
            name="title"
            :icon="item.icon"
            :title="item.title"
            :description="item.description"
          />
        </template>

        <template v-if="$slots.description" #description>
          <slot
            name="description"
            :icon="item.icon"
            :title="item.title"
            :description="item.description"
          />
        </template>
      </el-step>
    </el-steps>

    <PlusForm
      v-bind="data[currentIndex].form"
      :has-reset="active !== 1"
      :submit-text="
        active === data.length
          ? submitText || t('plus.stepsForm.submitText')
          : nextText || t('plus.stepsForm.nextText')
      "
      :reset-text="preText || t('plus.stepsForm.preText')"
      @submit="next"
      @reset="pre"
      @change="handleChange"
    >
      <slot v-if="$slots[slotName]" :name="slotName" v-bind="data[currentIndex]" />
    </PlusForm>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect, computed } from 'vue'
import { ElSteps, ElStep } from 'element-plus'
import type { FieldValues, PlusColumn } from '@plus-pro-components/types'
import { useLocale } from '@plus-pro-components/hooks'
import { PlusForm } from '@plus-pro-components/components/form'
import type { PlusStepFromRow } from './type'

export interface PlusStepsFormProps {
  /**
   *
   * @version 0.1.14  变更为可选
   */
  modelValue?: number
  /**
   * 数据
   * @version 0.1.14  变更为可选
   */
  data?: PlusStepFromRow[]
  /**
   * 提交按钮文字
   * @version 0.1.14
   * @default 提交
   */
  submitText?: string
  /**
   * 下一步按钮文字
   * @version 0.1.14
   * @default 下一步
   */
  nextText?: string
  /**
   * 上一步按钮文字
   * @version 0.1.14
   * @default 上一步
   */
  preText?: string
}
export interface PlusStepsFormEmits {
  (e: 'pre', modelValue: number): void
  /**
   * @version 0.1.23 新增参数  allValues
   */
  (e: 'next', modelValue: number, values: FieldValues, allValues: FieldValues): void
  /**
   * @version 0.1.23
   */
  (e: 'submit', modelValue: number, values: FieldValues, allValues: FieldValues): void
  (e: 'update:modelValue', active: number): void
  (e: 'change', values: FieldValues, column: PlusColumn): void
}

defineOptions({
  name: 'PlusStepsForm'
})

const props = withDefaults(defineProps<PlusStepsFormProps>(), {
  modelValue: 1,
  data: () => [],
  submitText: undefined,
  nextText: undefined,
  preText: undefined
})

const emit = defineEmits<PlusStepsFormEmits>()
const { t } = useLocale()
const active = ref()

watchEffect(() => {
  active.value = props.modelValue
})

const currentIndex = computed(() => active.value - 1)

const slotName = computed(() => `step-${active.value}`)

const allValues = computed(() =>
  props.data?.reduce((pre, current) => ({ ...pre, ...current.form?.modelValue }), {})
)

const handleChange = (values: FieldValues, column: PlusColumn) => {
  emit('change', values, column)
}

// 上一步
const pre = () => {
  if (active.value-- > props.data.length + 1) active.value = 1
  emit('update:modelValue', active.value)
  emit('pre', active.value)
}

// 下一步
const next = (values: FieldValues) => {
  // Save current active value for comparison
  const currentActive = active.value;

  // Update active value, ensuring it doesn't exceed max index
  active.value = Math.min(currentActive + 1, props.data.length);

  emit('update:modelValue', active.value);
  emit('next', active.value, values, allValues.value);

  // Check if moving from last step to completion
  if (currentActive === props.data.length && active.value === props.data.length) {
    emit('submit', active.value, values, allValues.value);
  }
}
</script>
