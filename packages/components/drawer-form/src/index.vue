<template>
  <el-drawer
    ref="drawerInstance"
    v-model="subVisible"
    :size="size || '540px'"
    :title="t('plus.drawerForm.title')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-bind="drawer"
    @close="handleCancel"
  >
    <template v-if="$slots['drawer-header']" #header>
      <slot name="drawer-header" />
    </template>

    <template v-if="$slots['drawer-footer']" #footer>
      <slot name="drawer-footer" />
    </template>

    <PlusForm
      ref="formInstance"
      v-model="state"
      footer-align="right"
      v-bind="(form as any)"
      @submit="handleSubmitForm"
      @change="handleChange"
      @reset="handleReset"
    >
      <template v-if="$slots['form-footer']" #footer>
        <slot name="form-footer" />
      </template>

      <template v-if="$slots['form-group-header']" #group-header>
        <slot name="form-group-header" />
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
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, watch, computed, useSlots } from 'vue'
import { PlusForm } from '@plus-pro-components/components/form'
import type { PlusFormProps } from '@plus-pro-components/components/form'
import type { FieldValues, PlusColumn } from '@plus-pro-components/types'
import { ElDrawer } from 'element-plus'
import { useLocale } from '@plus-pro-components/hooks'
import type { FormInstance } from 'element-plus'
import {
  getFieldSlotName,
  getLabelSlotName,
  getExtraSlotName,
  filterSlots
} from '@plus-pro-components/components/utils'

export interface PlusDrawerFormProps {
  modelValue?: FieldValues
  visible?: boolean
  drawer?: any
  size?: string | number
  form?: PlusFormProps
}
export interface PlusDrawerFormEmits {
  (e: 'update:modelValue', values: FieldValues): void
  (e: 'update:visible', visible: boolean): void
  (e: 'submit', values: FieldValues): void
  (e: 'change', values: FieldValues, column: PlusColumn): void
  (e: 'cancel'): void
  (e: 'reset'): void
}

defineOptions({
  name: 'PlusDrawerForm'
})

const props = withDefaults(defineProps<PlusDrawerFormProps>(), {
  modelValue: () => ({}),
  visible: false,
  size: '540px',
  drawer: () => ({}),
  form: () => ({})
})
const emit = defineEmits<PlusDrawerFormEmits>()

const { t } = useLocale()
const formInstance = ref<any>()
const computedFormInstance = computed(() => formInstance.value?.formInstance as FormInstance)
const drawerInstance = ref<InstanceType<typeof ElDrawer>>()
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

const handleSubmitForm = () => {
  emit('submit', state.value)
}

const handleCancel = () => {
  subVisible.value = false
  emit('update:visible', subVisible.value)
  emit('cancel')
}
const handleReset = () => {
  emit('reset')
}

defineExpose({
  drawerInstance,
  formInstance: computedFormInstance
})
</script>
