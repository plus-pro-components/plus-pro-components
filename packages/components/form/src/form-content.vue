<template>
  <el-row v-bind="rowProps" class="plus-form__row">
    <PlusCollapseTransition
      :collapse-duration="collapseDuration"
      :collapse-transition="collapseTransition"
    >
      <el-col v-for="item in columns" :key="item.prop" v-bind="item.colProps || colProps">
        <!-- el-form-item上一行的内容 -->
        <div
          v-if="item.renderPrevious || $slots[getPreviousSlotName(item.prop)]"
          class="plus-form-item-previous"
        >
          <component
            :is="item.renderPrevious"
            v-if="isFunction(item.renderPrevious)"
            v-bind="item"
          />

          <slot
            v-else-if="$slots[getPreviousSlotName(item.prop)]"
            :name="getPreviousSlotName(item.prop)"
            v-bind="item"
          />
        </div>

        <PlusFormItem
          :model-value="getModelValue(item.prop)"
          v-bind="item"
          :clearable="clearable"
          :has-label="getHasLabel(item.hasLabel)"
          @change="value => handleChange(value, item)"
        >
          <!--表单项label插槽 -->
          <template
            v-if="$slots[getLabelSlotName(item.prop)]"
            #[getLabelSlotName(item.prop)]="data"
          >
            <slot :name="getLabelSlotName(item.prop)" v-bind="data" />
          </template>

          <!--表单项插槽 -->
          <template
            v-if="$slots[getFieldSlotName(item.prop)]"
            #[getFieldSlotName(item.prop)]="data"
          >
            <slot :name="getFieldSlotName(item.prop)" v-bind="data" />
          </template>

          <!--表单tooltip插槽 -->
          <template v-if="$slots['tooltip-icon']" #tooltip-icon>
            <slot name="tooltip-icon" />
          </template>
        </PlusFormItem>

        <!-- el-form-item 下一行额外的内容 -->
        <div
          v-if="item.renderExtra || $slots[getExtraSlotName(item.prop)]"
          class="plus-form-item-extra"
        >
          <component
            :is="item.renderExtra"
            v-if="item.renderExtra && isFunction(item.renderExtra)"
            v-bind="item"
          />

          <slot
            v-else-if="$slots[getExtraSlotName(item.prop)]"
            :name="getExtraSlotName(item.prop)"
            v-bind="item"
          />
        </div>
      </el-col>
    </PlusCollapseTransition>

    <!-- 搜索的footer插槽  -->
    <slot name="search-footer" />
  </el-row>
</template>

<script lang="ts" setup>
import type { Ref, ComputedRef } from 'vue'
import { ref, watch, unref } from 'vue'
import { ElRow, ElCol } from 'element-plus'
import { PlusFormItem } from '@plus-pro-components/components/form-item'
import type {
  PlusColumn,
  FieldValues,
  FieldValueType,
  PlusRowProps,
  PlusColProps
} from '@plus-pro-components/types'
import {
  getLabelSlotName,
  getFieldSlotName,
  getExtraSlotName,
  getPreviousSlotName,
  isFunction,
  getValue,
  setValue,
  isBoolean
} from '@plus-pro-components/components/utils'
import PlusCollapseTransition from './collapse-transition.vue'

export interface PlusFormContentProps {
  modelValue?: FieldValues
  hasLabel?: boolean
  columns?: PlusColumn[]
  rowProps?: PlusRowProps
  colProps?: PlusColProps
  /**
   * @desc 动画时长
   * @version v0.1.15
   */
  collapseDuration?: number
  /**
   * @desc 是否开启折叠动画
   * @version v0.1.15
   */
  collapseTransition?: boolean
  /**
   *  @version v0.1.18
   */
  clearable?: boolean
}

export interface PlusFormContentEmits {
  (e: 'update:modelValue', values: FieldValues): void
  (e: 'change', values: FieldValues, column: PlusColumn): void
}

defineOptions({
  name: 'PlusFormContent'
})

const props = withDefaults(defineProps<PlusFormContentProps>(), {
  modelValue: () => ({}),
  hasLabel: true,
  rowProps: () => ({}),
  colProps: () => ({}),
  columns: () => [],
  collapseDuration: undefined,
  collapseTransition: undefined,
  clearable: true
})
const emit = defineEmits<PlusFormContentEmits>()

const values = ref<FieldValues>({})

const getHasLabel = (hasLabel?: boolean | Ref<boolean> | ComputedRef<boolean>) => {
  const has = unref(hasLabel) as boolean
  if (isBoolean(has)) {
    return has
  }
  return props.hasLabel
}

watch(
  () => props.modelValue,
  val => {
    values.value = val
  },
  {
    immediate: true
  }
)

const getModelValue = (prop: string) => getValue(values.value, prop)

const handleChange = (value: FieldValueType, column: PlusColumn) => {
  setValue(values.value, column.prop, value)
  emit('update:modelValue', values.value)
  emit('change', values.value, column)
}
</script>
