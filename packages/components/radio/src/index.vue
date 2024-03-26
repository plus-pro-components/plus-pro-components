<template>
  <el-radio-group ref="radioGroupInstance" v-model="state.radio" v-bind="$attrs">
    <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
      <component :is="fieldSlot" v-bind="data" />
    </template>

    <!-- element-plus 版本号小于2.6.0 -->
    <template v-if="versionIsLessThan260">
      <el-radio
        v-for="item in options"
        :key="item.value"
        ref="radioInstance"
        :label="item.value"
        v-bind="item.fieldItemProps"
        @click="radioClick($event, item.value, item.fieldItemProps)"
        @change="change(item.value)"
      >
        <template #default>
          <component :is="item.fieldSlot" v-if="isFunction(item.fieldSlot)" v-bind="item" />
          <component
            :is="fieldChildrenSlot"
            v-else-if="isFunction(fieldChildrenSlot)"
            v-bind="item"
          />
          <template v-else> {{ item.label }} </template>
        </template>
      </el-radio>
    </template>
    <!-- element-plus 版本号大于等于2.6.0 -->
    <template v-else>
      <el-radio
        v-for="item in options"
        :key="item.value"
        ref="radioInstance"
        :value="item.value"
        v-bind="item.fieldItemProps"
        @click="radioClick($event, item.value, item.fieldItemProps)"
        @change="change(item.value)"
      >
        <template #default>
          <component :is="item.fieldSlot" v-if="isFunction(item.fieldSlot)" v-bind="item" />
          <component
            :is="fieldChildrenSlot"
            v-else-if="isFunction(fieldChildrenSlot)"
            v-bind="item"
          />
          <template v-else> {{ item.label }} </template>
        </template>
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script setup lang="ts">
import { reactive, watch, ref, useAttrs } from 'vue'
import { ElRadio, ElRadioGroup } from 'element-plus'
import type { OptionsRow, PlusColumn } from '@plus-pro-components/types'
import { versionIsLessThan260, isFunction } from '@plus-pro-components/components/utils'

type ValueType = string | number | boolean
export interface PlusRadioProps {
  modelValue?: ValueType
  options: OptionsRow[]
  isCancel?: boolean
  fieldSlots?: PlusColumn['fieldSlots']
  fieldChildrenSlot?: PlusColumn['fieldChildrenSlot']
}
export interface PlusRadioEmits {
  (e: 'change', value: ValueType): void
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
  options: () => [],
  isCancel: true,
  fieldSlots: undefined,
  fieldChildrenSlot: undefined
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

const attrs = useAttrs()

const radioClick = (
  e: MouseEvent,
  val: ValueType,
  fieldItemProps: OptionsRow['fieldItemProps']
) => {
  if (Reflect.has(attrs, 'disabled') || fieldItemProps?.disabled) {
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
  emit('change', state.radio)
}

const change = (val: ValueType) => {
  if (props.isCancel) return
  emit('update:modelValue', val)
  emit('change', val)
}

defineExpose({
  radioInstance,
  radioGroupInstance
})
</script>
