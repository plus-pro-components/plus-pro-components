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
import PlusDialog from '@plus-pro-components/components/dialog'
import type { PlusFormInstance } from '@plus-pro-components/components/form'
import type { PlusFormProps } from 'plus-pro-components/es/components/form/src/index.vue'
import type { PlusDialogProps } from 'plus-pro-components/es/components/dialog/src/index.vue'
import PlusForm from '@plus-pro-components/components/form'
import type { RecordType } from '@plus-pro-components/types'

export interface PlusDialogFormProps {
  modelValue?: RecordType
  visible?: boolean
  dialog?: PlusDialogProps
  form?: PlusFormProps
}

export interface PlusDialogFormEmits {
  (e: 'update:modelValue', data: RecordType): void
  (e: 'update:visible', visible: boolean): void
  (e: 'submit', data: string): void
  (e: 'change', data: string): void
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

const state = ref<any>({})

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
const handleChange = (values: any) => {
  emit('update:modelValue', values)
  emit('change', values)
}

const handleSubmitForm = () => {
  emit('submit', state)
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
