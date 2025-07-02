<template>
  <el-radio-group ref="radioGroupInstance" v-model="state.radio" class="plus-radio" v-bind="$attrs">
    <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
      <component :is="fieldSlot" v-bind="data" />
    </template>

    <!-- element-plus 版本号小于2.6.0 -->
    <template v-if="versionIsLessThan260">
      <el-radio
        v-for="item in options"
        :key="`${item.label}${item.value}`"
        ref="radioInstance"
        :label="item.value"
        v-bind="isFunction(item.fieldItemProps) ? item.fieldItemProps(item as unknown as OptionsRow ) : item.fieldItemProps"
        @click="
          radioClick(
            $event,
            item.value,
            isFunction(item.fieldItemProps)
              ? item.fieldItemProps(item as unknown as OptionsRow)
              : item.fieldItemProps
          )
        "
        @change="change(item.value)"
      >
        <template #default>
          <component
            :is="item.fieldSlot"
            v-if="isFunction(item.fieldSlot)"
            :model-value="state.radio"
            :column="props"
            v-bind="item"
          />
          <component
            :is="fieldChildrenSlot"
            v-else-if="isFunction(fieldChildrenSlot)"
            :model-value="state.radio"
            :column="props"
            v-bind="item"
          />
          <template v-else> {{ item?.label }} </template>
        </template>
      </el-radio>
    </template>
    <!-- element-plus 版本号大于等于2.6.0 -->
    <template v-else>
      <el-radio
        v-for="item in options"
        :key="`${item.label}${item.value}`"
        ref="radioInstance"
        :value="item.value"
        v-bind="isFunction(item.fieldItemProps) ? item.fieldItemProps(item as unknown as OptionsRow ) : item.fieldItemProps"
        @click="
          radioClick(
            $event,
            item.value,
            isFunction(item.fieldItemProps)
              ? item.fieldItemProps(item as unknown as OptionsRow)
              : item.fieldItemProps
          )
        "
        @change="change(item.value)"
      >
        <template #default>
          <component
            :is="item.fieldSlot"
            v-if="isFunction(item.fieldSlot)"
            :model-value="state.radio"
            :column="props"
            v-bind="item"
          />
          <component
            :is="fieldChildrenSlot"
            v-else-if="isFunction(fieldChildrenSlot)"
            :model-value="state.radio"
            :column="props"
            v-bind="item"
          />
          <template v-else> {{ item?.label }} </template>
        </template>
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script setup lang="ts">
import { reactive, watch, ref, useAttrs } from 'vue'
import { ElRadio, ElRadioGroup } from 'element-plus'
import type { OptionsRow, PlusColumn, RecordType } from '@plus-pro-components/types'
import { versionIsLessThan260, isFunction } from '@plus-pro-components/components/utils'

type ValueType = string | number | boolean
export interface PlusRadioProps {
  modelValue?: ValueType
  options: OptionsRow<RecordType>[]
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

const radioClick = (e: MouseEvent, val: ValueType | undefined, fieldItemProps: RecordType) => {
  if (Reflect.get(attrs, 'disabled') || fieldItemProps?.disabled) {
    return
  }
  if (!props.isCancel) {
    return
  } else {
    e.preventDefault()
  }
  // click阻止了change事件
  state.radio = state.radio === val ? '' : (val as ValueType)
  emit('update:modelValue', state.radio)
  emit('change', state.radio)
}

const change = (val: ValueType | undefined) => {
  if (props.isCancel) return
  emit('update:modelValue', val as ValueType)
  emit('change', val as ValueType)
}

defineExpose({
  radioInstance,
  radioGroupInstance
})
</script>
