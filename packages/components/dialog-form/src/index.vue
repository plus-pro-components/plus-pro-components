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

    <PlusForm
      ref="formInstance"
      v-model="state"
      footer-align="right"
      v-bind="form"
      :has-footer="false"
      @change="handleChange"
    >
      <template v-if="$slots['form-footer']" #footer>
        <slot name="form-footer" />
      </template>

      <template v-if="$slots['form-group-header']" #group-header>
        <slot name="form-group-header" />
      </template>
    </PlusForm>
  </PlusDialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useLocale } from '@plus-pro-components/hooks'
import type { PlusFormProps } from '@plus-pro-components/components/form'
import { PlusForm } from '@plus-pro-components/components/form'
import type { PlusDialogProps } from '@plus-pro-components/components/dialog'
import { PlusDialog } from '@plus-pro-components/components/dialog'
import type { FieldValues, PlusColumn } from '@plus-pro-components/types'
import type { FormInstance } from 'element-plus'

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
const state = ref<FieldValues>({})
const subVisible = ref(false)

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
    immediate: true,
    deep: true
  }
)

const handleChange = (values: FieldValues, column: PlusColumn) => {
  emit('update:modelValue', values)
  emit('change', values, column)
}

const handleConfirm = () => {
  emit('confirm', state.value)
}

const handleCancel = () => {
  subVisible.value = false
  emit('update:visible', subVisible.value)
  emit('cancel')
}

defineExpose({
  formInstance: formInstance.value?.formInstance as FormInstance
})
</script>
