<template>
  <el-radio-group v-model="state.radio" v-bind="$attrs">
    <el-radio
      v-for="item in data"
      :key="item.value"
      :label="item.value"
      @click="radioClick($event, item.value)"
      @change="change(item.value)"
    >
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

type ValueType = string | number | boolean

export interface PlusRadioProps {
  modelValue?: ValueType
  data: { label: string; value: ValueType }[]
  isCancel?: boolean
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
  isCancel: false
})

const emit = defineEmits<PlusRadioEmits>()

const state: RadioState = reactive({
  radio: ''
})
watch(
  () => props.modelValue,
  val => {
    state.radio = val
  },
  { immediate: true }
)

const radioClick = (e: MouseEvent, val: ValueType) => {
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
</script>
