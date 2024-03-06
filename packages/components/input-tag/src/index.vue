<template>
  <div
    ref="plusInputTagInstance"
    v-click-outside="onClickOutside"
    class="plus-input-tag"
    :class="{ 'is-focus': state.isFocus }"
    @click="handleClick"
  >
    <el-tag
      v-for="tag in state.tags"
      ref="tagInstance"
      :key="tag"
      class="plus-input-tag__tag"
      v-bind="tagProps"
      closable
      @close="handleClose(tag)"
    >
      {{ formatTag && isFunction(formatTag) ? formatTag(tag) : tag }}
    </el-tag>
    <el-input
      ref="inputInstance"
      v-model="state.inputValue"
      class="plus-input-tag__input"
      :placeholder="t('plus.inputTag.placeholder')"
      :disabled="state.tags.length >= limit"
      v-bind="inputProps"
      clearable
      @blur="handle($event, 'blur')"
      @keyup.enter.exact="handle($event, 'enter')"
      @keyup.space.exact="handle($event, 'space')"
    />
  </div>
</template>

<script lang="ts" setup>
import type { InputProps, TagProps, InputInstance, TagInstance } from 'element-plus'
import { ElTag, ElInput, ClickOutside as vClickOutside } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import type { Mutable } from '@plus-pro-components/types'
import { useLocale } from '@plus-pro-components/hooks'
import { isArray, isString, isFunction } from '@plus-pro-components/components/utils'

type TriggerType = 'blur' | 'enter' | 'space'
export interface PlusInputTagProps {
  modelValue?: string[]
  trigger?: TriggerType[] | TriggerType
  inputProps?: Partial<Mutable<InputProps>>
  tagProps?: Partial<Mutable<TagProps>>
  limit?: number
  formatTag?: (tag: string) => string
  retainInputValue?: boolean
}
export interface PlusInputTagEmits {
  (e: 'update:modelValue', data: string[]): void
  (e: 'change', data: string[]): void
  (e: 'remove', tag: string): void
  (e: 'blur', value: string, event: FocusEvent): void
  (e: 'enter', value: string, event: MouseEvent): void
  (e: 'space', value: string, event: MouseEvent): void
}

export interface PlusInputTagState {
  tags: string[]
  inputValue: string
  isFocus: boolean
}

defineOptions({
  name: 'PlusInputTag'
})

const props = withDefaults(defineProps<PlusInputTagProps>(), {
  modelValue: () => [],
  trigger: () => ['blur', 'enter', 'space'],
  limit: Infinity,
  inputProps: () => ({}),
  tagProps: () => ({}),
  formatTag: undefined,
  retainInputValue: false
})
const emit = defineEmits<PlusInputTagEmits>()

const inputInstance = ref<InputInstance | null>()
const tagInstance = ref<TagInstance | null>()
const plusInputTagInstance = ref<HTMLDivElement | null>()
const state = reactive<PlusInputTagState>({
  tags: [],
  inputValue: '',
  isFocus: false
})
const { t } = useLocale()

watch(
  () => props.modelValue,
  val => {
    state.tags = val.slice(0, props.limit)
  },
  { immediate: true }
)

const onClickOutside = () => {
  state.isFocus = false
}

const handleClick = () => {
  state.isFocus = true
  inputInstance.value?.focus()
}

const handleClose = (tag: string) => {
  state.tags = state.tags.filter(item => item !== tag)
  emit('remove', tag)
}

const handleValue = () => {
  if (
    state.inputValue.trim() &&
    !state.tags.includes(state.inputValue.trim()) &&
    state.tags.length < props.limit
  ) {
    state.tags.push(state.inputValue.trim())
  }

  // Retain input value
  if (!props.retainInputValue) {
    state.inputValue = ''
  }

  emit('update:modelValue', state.tags)
  emit('change', state.tags)
}

const handle = (event: MouseEvent | FocusEvent, type: TriggerType) => {
  emit(type as any, state.inputValue, event)

  const triggerList = isArray(props.trigger)
    ? props.trigger
    : isString(props.trigger)
    ? [props.trigger]
    : ['blur', 'enter', 'space']

  if (triggerList.includes(type)) {
    handleValue()
  }
}

defineExpose({ inputInstance, tagInstance })
</script>
