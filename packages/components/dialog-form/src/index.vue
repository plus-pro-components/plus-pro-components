<template>
  <PlusDialog
    v-model="subVisible"
    :has-footer="false"
    width="800px"
    top="10vh"
    title="弹窗表单"
    v-bind="dialog"
    @cancel="handleCancel"
  >
    <template #header>
      <slot name="dialog-header" />
    </template>

    <PlusForm
      ref="formInstance"
      v-model="state"
      footer-align="right"
      v-bind="form"
      @submit="handleSubmitForm"
      @change="handleChange"
      @cancel="handleCancel"
    >
      <template #footer>
        <slot name="form-footer" />
      </template>
    </PlusForm>
  </PlusDialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { PlusFormInstance, PlusFormProps } from '@plus-pro-components/components/form'
import { PlusForm } from '@plus-pro-components/components/form'
import type { PlusDialogProps } from '@plus-pro-components/components/dialog'
import { PlusDialog } from '@plus-pro-components/components/dialog'
import type { FieldValues } from '@plus-pro-components/types'

export interface PlusDialogFormProps {
  modelValue?: FieldValues
  visible?: boolean
  dialog?: PlusDialogProps
  form?: PlusFormProps
}

export interface PlusDialogFormEmits {
  (e: 'update:modelValue', data: FieldValues): void
  (e: 'update:visible', visible: boolean): void
  (e: 'submit', data: FieldValues): void
  (e: 'change', data: FieldValues): void
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

const formInstance = ref<PlusFormInstance>()

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

const handleChange = (values: any) => {
  emit('update:modelValue', values)
  emit('change', values)
}

const handleSubmitForm = () => {
  emit('submit', state.value)
}

const handleCancel = () => {
  subVisible.value = false
  emit('update:visible', subVisible.value)
  emit('cancel')
}

defineExpose({
  formInstance: formInstance.value?.formInstance
})
</script>
