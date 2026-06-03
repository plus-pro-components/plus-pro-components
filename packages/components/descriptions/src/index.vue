<template>
  <el-descriptions
    :key="subColumnsKey"
    :title="title"
    :column="column"
    class="plus-description"
    :class="{ 'no-border': !border }"
    :border="elBorder"
    v-bind="$attrs"
  >
    <slot>
      <el-descriptions-item
        v-for="(item, index) in subColumns"
        :key="item.prop"
        :label="getLabel(item.label)"
        :class-name="
          (item.descriptionsItemProps?.className || '') +
          ' plus-description__name  plus-description__content'
        "
        :label-class-name="
          (item.descriptionsItemProps?.labelClassName || '') +
          ' plus-description__label' +
          (getIsRequired(item, index) ? ' is-required' : '')
        "
        v-bind="item.descriptionsItemProps || descriptionsItemProps"
      >
        <template #label>
          <component
            :is="item.renderDescriptionsLabel"
            v-if="item.renderDescriptionsLabel && isFunction(item.renderDescriptionsLabel)"
            :label="getLabel(item.label)"
            :column="item"
            :row="data"
          />

          <!-- plus-desc-label-* -->
          <template v-else-if="hasDescLabelSlot(item.prop)">
            <slot
              :name="getDescLabelSlotName(item.prop)"
              :column="item"
              :row="data"
              :label="getLabel(item.label)"
            />
          </template>

          <!-- normal -->
          <template v-else>{{ getLabel(item.label) }}</template>
        </template>

        <!-- 第一优先级表单 -->
        <template v-if="editable">
          <PlusDisplayItem
            ref="plusDisplayItemInstance"
            :column="item"
            :row="data"
            editable
            :form-props="formProps"
            @change="data => handleChange(data, index, item)"
          />
        </template>

        <!-- renderDescriptionsItem -->
        <component
          :is="item.renderDescriptionsItem"
          v-else-if="item.renderDescriptionsItem && isFunction(item.renderDescriptionsItem)"
          :value="getDisplayValue(item.prop)"
          :column="item"
          :row="data"
        />

        <!-- plus-desc-* -->
        <template v-else-if="hasDescSlot(item.prop)">
          <slot
            :name="getDescSlotName(item.prop)"
            :column="item"
            :row="data"
            :value="getDisplayValue(item.prop)"
          />
        </template>

        <!-- normal -->
        <template v-else>
          <PlusDisplayItem :column="item" :row="data" />
        </template>
      </el-descriptions-item>
    </slot>

    <template #title>
      <slot name="title" />
    </template>

    <template #extra>
      <slot name="extra" />
    </template>
  </el-descriptions>
</template>

<script lang="ts" setup>
import type { ExtractPropTypes } from 'vue'
import { computed, unref, ref, shallowRef, watch, useSlots } from 'vue'
import type { descriptionProps } from 'element-plus'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import type {
  PlusColumn,
  RecordType,
  Mutable,
  FieldValueType,
  IntrinsicAttributes
} from '@plus-pro-components/types'
import type { TableFormRefRow } from '@plus-pro-components/components/table'
import { PlusDisplayItem } from '@plus-pro-components/components/display-item'
import {
  isFunction,
  getDescSlotName,
  getDescLabelSlotName,
  getValue,
  getLabel
} from '@plus-pro-components/components/utils'
import type { PlusDisplayItemInstance } from '@plus-pro-components/components/display-item'
import type { PlusFormProps } from '@plus-pro-components/components/form'

export type DescriptionProps = Partial<
  Mutable<ExtractPropTypes<typeof descriptionProps>> & IntrinsicAttributes
>

type FormChangeCallBackParams = {
  column: PlusColumn
  index: number
  prop: string
  row: RecordType
  value: FieldValueType
}
export interface PlusDescriptionsProps {
  data: RecordType
  columns?: PlusColumn[]
  column?: number
  title?: string
  border?: boolean
  /**
   * 是否整体可编辑
   * @version 0.1.17
   * @default false
   */
  editable?: boolean
  /**
   * PlusFormProps 优先级低于column.formProps
   * @version 0.1.17
   */
  formProps?: PlusFormProps
  /**
   * el-descriptions-item 的props 优先级低于column.descriptionsItemProps
   * @version 0.1.17
   */
  descriptionsItemProps?: RecordType
}
export interface PlusDescriptionsEmits {
  (e: 'formChange', data: FormChangeCallBackParams): void
}
export interface PlusTableTableColumnStatus {
  text: string
  color: string
}

defineOptions({
  name: 'PlusDescriptions'
})

const props = withDefaults(defineProps<PlusDescriptionsProps>(), {
  data: () => ({}),
  columns: () => [],
  title: '',
  column: 3,
  border: true,
  editable: false,
  formProps: undefined,
  descriptionsItemProps: undefined
})

const emit = defineEmits<PlusDescriptionsEmits>()
const slots = useSlots()

const plusDisplayItemInstance = ref<PlusDisplayItemInstance[] | null>()

const elBorder = computed(() => (props.editable ? true : props.border))

/**
 * 表单的ref
 */
const formRefs = shallowRef<TableFormRefRow[]>([])

const subColumns = computed(() =>
  props.columns.filter(item => unref(item.hideInDescriptions) !== true)
)

const getDisplayValue = (prop: string) => getValue(props.data, prop)

const hasDescSlot = (prop: string) => !!slots[getDescSlotName(prop)]
const hasDescLabelSlot = (prop: string) => !!slots[getDescLabelSlotName(prop)]

const subColumnsKey = computed(() => subColumns.value.map(i => i.prop).join(','))

/**
 *  设置表单ref
 */
const setFormRef = () => {
  if (!plusDisplayItemInstance.value?.length) return
  const list =
    plusDisplayItemInstance.value?.map(item => ({
      ...item,
      ...item?.getDisplayItemInstance()
    })) || []

  formRefs.value = list as unknown as TableFormRefRow[]
}

watch(
  plusDisplayItemInstance,
  () => {
    setFormRef()
  },
  {
    deep: true,
    flush: 'post'
  }
)

/**
 * 判断是否是required
 * @param item
 */
const getIsRequired = (item: PlusColumn, index: number) => {
  const itemFormProps = isFunction(item.formProps)
    ? item.formProps(props.data[item.prop], { row: props.data, index })
    : unref(item.formProps)
  const rules = Reflect.get(itemFormProps?.rules || props.formProps?.rules || {}, item.prop) || {}
  const isRequired = Object.values(rules).some(i => i.required)
  return isRequired
}

/**
 * 表单发生变化
 * @param data
 * @param index
 * @param item
 */
const handleChange = (
  data: { value: any; prop: string; row: RecordType },
  index: number,
  item: PlusColumn
) => {
  const formChangeCallBackParams = { ...data, index, column: { ...item } }
  emit('formChange', formChangeCallBackParams)
}

const validate = async () => {
  try {
    await Promise.all(
      formRefs.value?.map((item: TableFormRefRow) => item.formInstance.value?.validate())
    )
  } catch (errors: any) {
    return Promise.reject(errors)
  }
}

const clearValidate = () => {
  formRefs.value?.forEach((item: TableFormRefRow) => {
    item.formInstance.value?.clearValidate()
  })
}

defineExpose({
  formRefs,
  validate,
  clearValidate
})
</script>
