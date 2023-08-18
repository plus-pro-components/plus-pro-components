<template>
  <div
    :class="['plus-steps-form', $attrs.direction === 'vertical' ? 'plus-steps-from-vertical' : '']"
  >
    <el-steps :active="active" finish-status="success" v-bind="$attrs">
      <el-step v-for="(item, index) in data" :key="index" v-bind="item">
        <template v-if="slots.icon" #icon>
          <slot name="icon" :icon="item.icon" :title="item.title" :description="item.description" />
        </template>
        <template v-if="slots.title" #title>
          <slot
            name="title"
            :icon="item.icon"
            :title="item.title"
            :description="item.description"
          />
        </template>
        <template v-if="slots.description" #description>
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
      v-bind="data[active - 1].form"
      :has-reset="active !== 1"
      :submit-text="
        active === data.length ? t('plus.stepsForm.submitText') : t('plus.stepsForm.nextText')
      "
      :reset-text="t('plus.stepsForm.preText')"
      @submit="next"
      @reset="pre"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, useSlots } from 'vue'
import { cloneDeep } from 'lodash-es'
import type { StepProps } from 'element-plus'
import type { FieldValues, Mutable } from '@plus-pro-components/types'
import type { PlusFormProps } from '@plus-pro-components/components/form'
import { useLocale } from '@plus-pro-components/hooks'

export interface PlusStepFrom {
  title: Mutable<StepProps>['title']
  description?: Mutable<StepProps>['description']
  icon?: Mutable<StepProps>['icon']
  status?: Mutable<StepProps>['status']
  form: PlusFormProps
}

export interface PlusStepsFormProps {
  modelValue: number
  data: PlusStepFrom[]
}

export interface PlusStepsFormEmits {
  (e: 'pre', modelValue: number): void
  (e: 'next', modelValue: number, values: any): void
  (e: 'update:modelValue', active: number): void
}

defineOptions({
  name: 'PlusStepsForm'
})

const props = withDefaults(defineProps<PlusStepsFormProps>(), {
  modelValue: 1,
  data: () => []
})
const slots = useSlots()
console.log(slots)

const emit = defineEmits<PlusStepsFormEmits>()
const { t } = useLocale()
const active = ref(cloneDeep(props.modelValue))

// 上一步
const pre = () => {
  if (active.value-- > props.data.length + 1) active.value = 1
  emit('pre', active.value)
  emit('update:modelValue', active.value)
}

// 下一步
const next = (values: FieldValues) => {
  if (active.value++ > props.data.length - 1) active.value = props.data.length
  emit('next', active.value, values)
  emit('update:modelValue', active.value)
}
</script>
