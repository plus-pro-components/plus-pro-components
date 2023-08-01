<template>
  <el-drawer
    ref="drawerInstance"
    v-model="subVisible"
    :title="t('plus.drawerForm.title')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-bind="drawer"
    @close="handleCancel"
  >
    <template #header>
      <slot name="drawer-header" />
    </template>

    <template #footer>
      <slot name="drawer-footer" />
    </template>

    <PlusForm
      ref="formInstance"
      v-model="state"
      footer-align="right"
      v-bind="(form as any)"
      @submit="handleSubmitForm"
      @change="handleChange"
      @cancel="handleCancel"
    >
      <template #footer>
        <slot name="form-footer" />
      </template>
    </PlusForm>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { PlusForm } from '@plus-pro-components/components/form'
import type { PlusFormInstance, PlusFormProps } from '@plus-pro-components/components/form'
import type { FieldValues } from '@plus-pro-components/types'
import { ElDrawer } from 'element-plus'
import { useLocale } from '@plus-pro-components/hooks'

export interface PlusDrawerFormProps {
  modelValue?: FieldValues
  visible?: boolean
  drawer?: any
  form?: PlusFormProps
}

export interface PlusDrawerFormEmits {
  (e: 'update:modelValue', data: FieldValues): void
  (e: 'update:visible', visible: boolean): void
  (e: 'submit', data: FieldValues): void
  (e: 'change', data: FieldValues): void
  (e: 'cancel'): void
}

defineOptions({
  name: 'PlusDrawerForm'
})

const props = withDefaults(defineProps<PlusDrawerFormProps>(), {
  modelValue: () => ({}),
  visible: false,
  drawer: () => ({}),
  form: () => ({})
})

const emit = defineEmits<PlusDrawerFormEmits>()
const { t } = useLocale()

const formInstance = ref<PlusFormInstance>()
const drawerInstance = ref<InstanceType<typeof ElDrawer>>()

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
  drawerInstance,
  formInstance: formInstance.value?.formInstance
})
</script>
