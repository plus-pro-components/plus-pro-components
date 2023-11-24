<template>
  <div
    class="plus-check-card"
    :class="[
      getClass(),
      state.checked ? 'plus-check-card--checked' : '',
      disabled ? 'plus-check-card--disabled' : ''
    ]"
    @click="handleClick"
  >
    <div class="plus-check-card__avatar-wrapper">
      <component
        :is="avatar"
        v-if="isFunction(avatar)"
        :avatar="avatar"
        :title="title"
        :description="description"
      />
      <slot
        v-else-if="$slots.avatar"
        name="avatar"
        :avatar="avatar"
        :title="title"
        :description="description"
      />

      <el-avatar v-else-if="isString(avatar)" :src="(avatar as string)" v-bind="avatarProps" />
    </div>

    <div class="plus-check-card__right-content">
      <div v-if="title || $slots.title" class="plus-check-card__title">
        <div class="plus-check-card__title-left">
          <component
            :is="title"
            v-if="isFunction(title)"
            :avatar="avatar"
            :title="title"
            :description="description"
          />

          <slot
            v-else-if="$slots.title"
            name="title"
            :title="title"
            :avatar="avatar"
            :description="description"
          />
          <template v-else> {{ title }}</template>
        </div>

        <div class="plus-check-card__title-right" @click.stop="handelExtra">
          <component
            :is="extra"
            v-if="isFunction(extra)"
            :avatar="avatar"
            :title="title"
            :description="description"
          />

          <slot
            v-else-if="$slots.extra"
            name="extra"
            :title="title"
            :avatar="avatar"
            :description="description"
          />
        </div>
      </div>

      <div v-if="description || $slots.description" class="plus-check-card__description">
        <component
          :is="description"
          v-if="isFunction(description)"
          :title="title"
          :avatar="avatar"
          :description="description"
        />
        <slot
          v-else-if="$slots.description"
          name="description"
          :title="title"
          :description="description"
          :avatar="avatar"
        />
        <template v-else> {{ description }}</template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { VNode } from 'vue'
import { reactive, watchEffect } from 'vue'
import type { ComponentSize } from 'element-plus'
import { ElAvatar } from 'element-plus'
import type { RecordType } from '@plus-pro-components/types'
import { isString, isFunction } from '@plus-pro-components/components/utils'

const classDataEnum: Record<Exclude<ComponentSize, ''>, string> = {
  large: 'plus-check-card--large',
  default: 'plus-check-card--default',
  small: 'plus-check-card--small'
}

export interface PlusCheckCardProps {
  modelValue?: boolean
  size?: ComponentSize
  avatar?:
    | string
    | ((data: Pick<PlusCheckCardProps, 'avatar' | 'title' | 'description'>) => VNode | string)
  avatarProps?: RecordType
  title?:
    | string
    | ((data: Pick<PlusCheckCardProps, 'avatar' | 'title' | 'description'>) => VNode | string)
  description?:
    | string
    | ((data: Pick<PlusCheckCardProps, 'avatar' | 'title' | 'description'>) => VNode | string)
  disabled?: boolean
  extra?: (data: Pick<PlusCheckCardProps, 'avatar' | 'title' | 'description'>) => VNode | string
}

export interface PlusCheckCardEmits {
  (e: 'update:modelValue', checked: boolean): void
  (e: 'change', checked: boolean): void
  (e: 'extra'): void
}

export interface CheckCardState {
  checked: boolean
}
defineOptions({
  name: 'PlusCheckCard'
})

const props = withDefaults(defineProps<PlusCheckCardProps>(), {
  modelValue: false,
  size: 'default',
  avatar: undefined,
  avatarProps: () => ({}),
  title: undefined,
  description: undefined,
  extra: undefined,
  disabled: false
})

const emit = defineEmits<PlusCheckCardEmits>()

const state: CheckCardState = reactive({
  checked: false
})

watchEffect(() => {
  state.checked = props.modelValue
})

const getClass = () => {
  return props.size ? classDataEnum[props.size] : 'plus-check-card--default'
}

const handleClick = () => {
  if (props.disabled) return
  state.checked = !state.checked
  emit('update:modelValue', state.checked)
  emit('change', state.checked)
}

const handelExtra = () => {
  if (props.disabled) return
  emit('extra')
}
</script>
