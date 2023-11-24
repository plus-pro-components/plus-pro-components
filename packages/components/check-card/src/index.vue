<template>
  <div
    class="plus-check-card"
    :class="[
      plusCheckCardClass(),
      state.checked ? 'plus-check-card--checked' : '',
      disabled ? 'plus-check-card--disabled' : ''
    ]"
    @click="isChecked"
  >
    <div class="plus-check-card_avatar">
      <el-avatar v-if="avatar" :src="avatar" v-bind="avatarProps" />
    </div>
    <div class="plus-check-card_rightContent">
      <div v-if="title" class="plus-check-card_title">{{ title }}</div>
      <div v-if="discription" class="plus-check-card_discription">{{ discription }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { ComponentSize } from 'element-plus'
import type { RecordType } from '@plus-pro-components/types'

const classDataEnum: Record<Exclude<ComponentSize, ''>, string> = {
  large: 'plus-check-card--large',
  default: 'plus-check-card--default',
  small: 'plus-check-card--small'
}

export interface PlusCheckCardProps {
  modelValue?: string
  size?: ComponentSize
  avatar?: string
  avatarProps?: RecordType
  title?: string
  discription?: string
  disabled?: boolean
}

export interface PlusCheckCardEmits {
  (e: 'update:modelValue', data: boolean): void
  (e: 'change', data: boolean): void
}

export interface CheckCardState {
  checked: boolean
}
defineOptions({
  name: 'PlusCheckCard'
})

const props = withDefaults(defineProps<PlusCheckCardProps>(), {
  modelValue: '',
  size: 'default',
  avatar: '',
  avatarProps: () => ({}),
  title: '',
  discription: '',
  disabled: false
})

const emit = defineEmits<PlusCheckCardEmits>()

const state: CheckCardState = reactive({
  checked: false
})

const plusCheckCardClass = () => {
  return props.size ? classDataEnum[props.size] : 'plus-check-card--default'
}

const isChecked = () => {
  if (props.disabled) return
  state.checked = !state.checked
  emit('update:modelValue', state.checked)
  emit('change', state.checked)
}
</script>
