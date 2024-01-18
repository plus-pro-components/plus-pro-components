<template>
  <div
    v-click-outside="onClickOutside"
    class="plus-date-picker"
    :class="{
      'is-focus': isFocus
    }"
  >
    <el-date-picker
      ref="startPickerInstance"
      v-model="state.start"
      type="datetime"
      :placeholder="t('plus.datepicker.startPlaceholder')"
      :format="format"
      :value-format="valueFormat"
      :disabled-date="subStartDisabledDate"
      class="plus-date-picker__start"
      clearable
      v-bind="startProps"
      @change="handleChange"
      @focus="handleFocus"
    />
    <span class="plus-date-picker__middle"> {{ rangeSeparator }} </span>
    <el-date-picker
      ref="endPickerInstance"
      v-model="state.end"
      type="datetime"
      :format="format"
      :value-format="valueFormat"
      :placeholder="t('plus.datepicker.endPlaceholder')"
      :disabled-date="subEndDisabledDate"
      class="plus-date-picker__end"
      clearable
      v-bind="endProps"
      @change="handleChange"
      @focus="handleFocus"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import { ElDatePicker, ClickOutside as vClickOutside } from 'element-plus'
import { isFunction } from '@plus-pro-components/components/utils'
import { useLocale } from '@plus-pro-components/hooks'

export interface PlusDatePickerProps {
  modelValue?: string[]
  format?: string
  valueFormat?: string
  rangeSeparator?: string
  type?: 'year' | 'month' | 'date' | 'dates' | 'datetime' | 'week'
  startProps?: any
  endProps?: any
  startDisabledDate?: (startTime: Date, endValue: string) => boolean
  endDisabledDate?: (endTime: Date, startValue: string) => boolean
}
export interface PlusRadioEmits {
  (e: 'change', value: string[]): void
  (e: 'focus', event: FocusEvent): void
  (e: 'update:modelValue', value: string[]): void
}
export interface DatePickerState {
  start: string
  end: string
}

defineOptions({
  name: 'PlusDatePicker'
})

const props = withDefaults(defineProps<PlusDatePickerProps>(), {
  modelValue: () => [],
  valueFormat: 'YYYY-MM-DD HH:mm:ss',
  format: 'YYYY-MM-DD HH:mm:ss',
  rangeSeparator: '/',
  type: 'datetime',
  startProps: () => ({}),
  endProps: () => ({}),
  startDisabledDate: (startTime, endValue) => {
    if (!endValue) return false
    return startTime.getTime() > new Date(endValue).getTime()
  },
  endDisabledDate: (endTime, startValue) => {
    if (!startValue) return false
    return endTime.getTime() < new Date(startValue).getTime()
  }
})
const emit = defineEmits<PlusRadioEmits>()

const { t } = useLocale()
const startPickerInstance = ref<InstanceType<typeof ElDatePicker> | null>()
const endPickerInstance = ref<InstanceType<typeof ElDatePicker> | null>()
const state: DatePickerState = reactive({
  start: '',
  end: ''
})
const isFocus = ref(false)

const handleFocus = (event: FocusEvent) => {
  isFocus.value = true
  emit('focus', event)
}
const onClickOutside = () => {
  isFocus.value = false
}

const subStartDisabledDate = (time: Date) => {
  if (props.startDisabledDate && isFunction(props.startDisabledDate)) {
    return props.startDisabledDate(time, state.end)
  }
  return false
}

const subEndDisabledDate = (time: Date) => {
  if (props.endDisabledDate && isFunction(props.endDisabledDate)) {
    return props.endDisabledDate(time, state.start)
  }
  return false
}

watch(
  () => props.modelValue,
  val => {
    const [start, end] = val
    state.start = start
    state.end = end
  },
  {
    immediate: true
  }
)

const handleChange = () => {
  const res = [state.start, state.end]
  emit('update:modelValue', res)
  emit('change', res)
}

defineExpose({
  startPickerInstance,
  endPickerInstance
})
</script>
