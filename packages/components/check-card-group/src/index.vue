<template>
  <div class="plus-check-card-group">
    <PlusCheckCard
      v-for="(item, index) in options"
      :key="item.value || index"
      :size="size"
      :disabled="disabled"
      v-bind="item"
      :model-value="getChecked(item.value)"
      @change="handleChange($event, item.value)"
      @extra="handleExtra(item)"
    >
      <!--  插槽支持 统一插槽和个性化插槽 -->
      <template v-if="$slots['avatar-' + item.value] || $slots.avatar" #avatar="data">
        <slot v-if="$slots['avatar-' + item.value]" :name="'avatar-' + item.value" v-bind="data" />
        <slot v-if="$slots.avatar" name="avatar" v-bind="data" />
      </template>

      <template v-if="$slots['title-' + item.value] || $slots.title" #title="data">
        <slot v-if="$slots['title-' + item.value]" :name="'title-' + item.value" v-bind="data" />
        <slot v-if="$slots.title" name="title" v-bind="data" />
      </template>

      <template
        v-if="$slots['description-' + item.value] || $slots.description"
        #description="data"
      >
        <slot
          v-if="$slots['description-' + item.value]"
          :name="'description-' + item.value"
          v-bind="data"
        />
        <slot v-if="$slots.description" name="description" v-bind="data" />
      </template>

      <template v-if="$slots['extra-' + item.value] || $slots.extra" #extra="data">
        <slot v-if="$slots['extra-' + item.value]" :name="'extra-' + item.value" v-bind="data" />
        <slot v-if="$slots.extra" name="extra" v-bind="data" />
      </template>
    </PlusCheckCard>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watchEffect } from 'vue'
import { PlusCheckCard } from '@plus-pro-components/components/check-card'
import type { PlusCheckCardProps } from '@plus-pro-components/components/check-card'
import type { ComponentSize } from 'element-plus'

export type ArrayValueType = (string | number)[]
export type SingleValueType = string | number
export type ValueType = ArrayValueType | SingleValueType

export interface PlusCheckCardGroupProps {
  modelValue?: ValueType
  options?: (PlusCheckCardProps & { value: string | number })[]
  size?: ComponentSize
  disabled?: boolean
  multiple?: boolean
}

export interface PlusCheckCardGroupEmits {
  (e: 'update:modelValue', checked: ValueType): void
  (e: 'change', checked: ValueType): void
  (e: 'extra', item: PlusCheckCardProps & { value: string | number }): void
}

export interface CheckCardState {
  checkList: ArrayValueType
  checked: SingleValueType
}
defineOptions({
  name: 'PlusCheckCardGroup'
})

const props = withDefaults(defineProps<PlusCheckCardGroupProps>(), {
  modelValue: () => [],
  options: () => [],
  size: undefined,
  disabled: false,
  multiple: false
})

const emit = defineEmits<PlusCheckCardGroupEmits>()

const state: CheckCardState = reactive({
  checkList: [],
  checked: ''
})

watchEffect(() => {
  if (props.multiple) {
    state.checkList = props.modelValue as ArrayValueType
  } else {
    state.checked = props.modelValue as SingleValueType
  }
})

const getChecked = (value: SingleValueType) => {
  if (props.multiple) {
    return state.checkList.includes(value)
  } else {
    return state.checked === value
  }
}

const handleChange = (model: boolean, value: SingleValueType) => {
  if (props.multiple) {
    if (model) {
      state.checkList.push(value)
    } else {
      state.checkList = state.checkList.filter(item => item !== value)
    }
    emit('update:modelValue', state.checkList)
    emit('change', state.checkList)
  } else {
    const val = model ? value : ''
    emit('update:modelValue', val)
    emit('change', val)
  }
}

const handleExtra = (item: PlusCheckCardProps & { value: string | number }) => {
  if (props.disabled) return
  emit('extra', item)
}
</script>
