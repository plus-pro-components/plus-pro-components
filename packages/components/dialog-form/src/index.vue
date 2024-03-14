<template>
  <PlusDialog
    v-model="subVisible"
    width="800px"
    top="10vh"
    :title="t('plus.dialogForm.title')"
    v-bind="dialog"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    <template v-if="$slots['dialog-header']" #header>
      <slot name="dialog-header" />
    </template>

    <template v-if="$slots['dialog-footer']" #footer>
      <slot name="dialog-footer" v-bind="{ handleConfirm, handleCancel }" />
    </template>

    <PlusForm
      ref="formInstance"
      v-model="state"
      :has-footer="false"
      footer-align="right"
      v-bind="form"
      @change="handleChange"
    >
      <template v-if="$slots['form-footer']" #footer="data">
        <slot name="form-footer" v-bind="data" />
      </template>

      <template v-if="$slots['form-group-header']" #group-header="data">
        <slot name="form-group-header" v-bind="data" />
      </template>

      <!--表单项label插槽 -->
      <template v-for="(_, key) in labelSlots" :key="key" #[key]="data">
        <slot :name="key" v-bind="data" />
      </template>

      <!--表单单项的插槽 -->
      <template v-for="(_, key) in fieldSlots" :key="key" #[key]="data">
        <slot :name="key" v-bind="data" />
      </template>

      <!--el-form-item 下一行额外的内容 的插槽 -->
      <template v-for="(_, key) in extraSlots" :key="key" #[key]="data">
        <slot :name="key" v-bind="data" />
      </template>

      <!--表单tooltip插槽 -->
      <template v-if="$slots['tooltip-icon']" #tooltip-icon>
        <slot name="tooltip-icon" />
      </template>
    </PlusForm>
  </PlusDialog>
</template>

<script lang="ts" setup>
import { ref, watch, computed, useSlots } from 'vue'
import { useLocale } from '@plus-pro-components/hooks'
import type { PlusFormProps } from '@plus-pro-components/components/form'
import { PlusForm } from '@plus-pro-components/components/form'
import type { PlusDialogProps } from '@plus-pro-components/components/dialog'
import { PlusDialog } from '@plus-pro-components/components/dialog'
import type { FieldValues, PlusColumn } from '@plus-pro-components/types'
import type { FormInstance } from 'element-plus'
import {
  getFieldSlotName,
  getLabelSlotName,
  getExtraSlotName,
  filterSlots
} from '@plus-pro-components/components/utils'

export interface PlusDialogFormProps {
  modelValue?: FieldValues
  visible?: boolean
  dialog?: PlusDialogProps
  form?: PlusFormProps
}
export interface PlusDialogFormEmits {
  (e: 'update:modelValue', values: FieldValues): void
  (e: 'update:visible', visible: boolean): void
  (e: 'confirm', values: FieldValues): void
  (e: 'change', values: FieldValues, column: PlusColumn): void
  (e: 'cancel'): void
}

defineOptions({
  name: 'PlusDialogForm'
})

const props = withDefaults(defineProps<PlusDialogFormProps>(), {
  modelValue: () => ({}),
  visible: false,
  dialog: () => ({}),
  form: () => ({})
})
const emit = defineEmits<PlusDialogFormEmits>()

const { t } = useLocale()
const formInstance = ref<any>()
const computedFormInstance = computed(() => formInstance.value?.formInstance as FormInstance)

const state = ref<FieldValues>({})
const subVisible = ref(false)
const slots = useSlots()

/**
 * 表单label的插槽
 */
const labelSlots = filterSlots(slots, getLabelSlotName())

/*
 * 表单单项的插槽
 */
const fieldSlots = filterSlots(slots, getFieldSlotName())

/**
 * el-form-item 下一行额外的内容 的插槽
 */
const extraSlots = filterSlots(slots, getExtraSlotName())

watch(
  () => props.visible,
  val => {
    subVisible.value = val
  },
  {
    immediate: true
  }
)

watch(
  () => props.modelValue,
  val => {
    state.value = val
  },
  {
    immediate: true
  }
)

const handleChange = (values: FieldValues, column: PlusColumn) => {
  emit('update:modelValue', values)
  emit('change', values, column)
}

const handleConfirm = async () => {
  try {
    const valid = await computedFormInstance.value?.validate()
    if (valid) {
      emit('confirm', state.value)
    }
  } catch (error) {
    console.warn(error)
  }
}

const handleCancel = () => {
  subVisible.value = false
  emit('update:visible', subVisible.value)
  emit('cancel')
}

defineExpose({
  handleConfirm,
  handleCancel,
  formInstance: computedFormInstance
})
</script>
