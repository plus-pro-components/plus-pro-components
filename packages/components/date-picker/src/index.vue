<template>
  <div class="plus-date-picker">
    <el-date-picker
      v-model="state.start"
      type="datetime"
      :placeholder="startPlaceholder"
      :format="format"
      :value-format="valueFormat"
      :readonly="readonly"
      :disabled="disabled"
      :disabled-date="disabledStartDate"
      class="plus-date-picker__start"
      @change="handleChange"
    />
    <span class="plus-date-picker__middle"> {{ rangeSeparator }} </span>
    <el-date-picker
      v-model="state.end"
      :disabled="disabled"
      type="datetime"
      :format="format"
      :value-format="valueFormat"
      :placeholder="endPlaceholder"
      :readonly="readonly"
      :disabled-date="disabledEndDate"
      class="plus-date-picker__end"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

export interface PlusDatePickerProps {
  modelValue?: string[]
  startPlaceholder?: string
  format?: string
  valueFormat?: string
  readonly?: boolean
  disabled?: boolean
  rangeSeparator?: string
  endPlaceholder?: string
}
export interface PlusRadioEmits {
  (e: 'change', value: string[]): void
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
  format: 'YYYY-MM-D HH:mm:ss',
  rangeSeparator: '/',
  startPlaceholder: '请输入开始时间',
  endPlaceholder: '请输入结束时间',
  readonly: false,
  disabled: false
})

const emit = defineEmits<PlusRadioEmits>()

const state: DatePickerState = reactive({
  start: '',
  end: ''
})
const disabledStartDate = (time: Date) => {
  if (!state.end) return false
  return time.getTime() > new Date(state.end).getTime()
}

const disabledEndDate = (time: Date) => {
  if (!state.start) return false
  return time.getTime() + 24 * 60 * 60 * 1000 < new Date(state.start).getTime()
}

watch(
  () => props.modelValue,
  val => {
    const [start, end] = val
    state.start = start
    state.end = end
  },
  {
    immediate: true,
    deep: true
  }
)

const handleChange = () => {
  const res = [state.start, state.end]
  emit('update:modelValue', res)
  emit('change', res)
}
</script>

<style lang="scss">
.plus-date-picker {
  border: none;
  display: flex;
  flex-wrap: nowrap;
  .el-input__prefix {
    display: none;
  }
  .plus-date-picker__middle {
    display: inline-block;
    line-height: 30px;
    border-top: 1px solid #ebeff2;
    border-bottom: 1px solid #ebeff2;
    background-color: #fff;
  }
  .el-input__wrapper {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ebeff2;
    box-shadow: none;
    padding-right: 0;
  }
  .plus-date-picker__start {
    .el-input__wrapper {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: none;
    }
  }
  .plus-date-picker__end {
    .el-input__wrapper {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: 0;
    }
  }
}
</style>
