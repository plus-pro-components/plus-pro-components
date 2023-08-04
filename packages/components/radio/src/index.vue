<template>
  <el-radio-group
    ref="radioGroupInstance"
    v-model="state.radio"
    :disabled="disabled"
    v-bind="groupProps"
  >
    <el-radio
      v-for="item in data"
      :key="item.value"
      ref="radioInstance"
      :label="item.value"
      v-bind="radioProps"
      @click="radioClick($event, item.value)"
      @change="change(item.value)"
    >
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import { ElRadio, ElRadioGroup } from 'element-plus'

type ValueType = string | number | boolean
export interface PlusRadioProps {
  modelValue?: ValueType
  data: { label: string; value: ValueType }[]
  isCancel?: boolean
  disabled?: boolean
  groupProps?: any
  radioProps?: any
}
export interface PlusRadioEmits {
  (e: 'radioChange', value: ValueType): void
  (e: 'update:modelValue', value: ValueType): void
}
export interface RadioState {
  radio: ValueType
}

defineOptions({
  name: 'PlusRadio'
})

const props = withDefaults(defineProps<PlusRadioProps>(), {
  modelValue: '',
  data: () => [],
  isCancel: false,
  disabled: false,
  groupProps: () => ({}),
  radioProps: () => ({})
})
const emit = defineEmits<PlusRadioEmits>()

const radioInstance = ref<InstanceType<typeof ElRadio> | null>()
const radioGroupInstance = ref<InstanceType<typeof ElRadioGroup> | null>()
const state: RadioState = reactive({ radio: '' })

watch(
  () => props.modelValue,
  val => {
    state.radio = val
  },
  { immediate: true }
)

const radioClick = (e: MouseEvent, val: ValueType) => {
  if (props.disabled || props.groupProps.disabled) {
    return
  }
  if (!props.isCancel) {
    return
  } else {
    e.preventDefault()
  }
  // click阻止了change事件
  state.radio === val ? (state.radio = '') : (state.radio = val)
  emit('update:modelValue', state.radio)
  emit('radioChange', state.radio)
}

const change = (val: ValueType) => {
  if (props.isCancel) return
  emit('update:modelValue', val)
  emit('radioChange', val)
}

defineExpose({
  radioInstance,
  radioGroupInstance
})
</script>
