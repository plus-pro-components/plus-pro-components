<template>
  <!-- 表单第一优先级 -->
  <PlusForm
    v-if="isForm"
    ref="formInstance"
    v-bind="column.formProps"
    :model="subRow"
    :has-footer="false"
    label-suffix=""
    label-width="0"
    class="plus-display-item__form"
  >
    <PlusFormItem
      ref="formItemInstance"
      v-model="displayValue"
      class="plus-display-item__form__item"
      v-bind="column"
      label=""
      @change="handleChange"
    >
      <template
        v-if="$slots[getFieldSlotName(column.prop)]"
        #[getFieldSlotName(column.prop)]="data"
      >
        <slot :name="getFieldSlotName(column.prop)" v-bind="data" />
      </template>
    </PlusFormItem>
  </PlusForm>

  <!-- 自定义显示 -->
  <PlusRender
    v-else-if="column.render && isFunction(column.render)"
    :render="column.render"
    :params="params"
    :callback-value="displayValue"
    :custom-field-props="customFieldProps"
    :slots="column.slots"
  />

  <!-- 插槽 -->
  <slot
    v-else-if="$slots[getTableCellSlotName(column.prop)]"
    :name="getTableCellSlotName(column.prop)"
    :prop="column.prop"
    :value-type="column.valueType"
    :row="subRow"
    :value="displayValue"
    :field-props="customFieldProps"
    :column="column"
  />

  <!--显示HTML -->
  <span
    v-else-if="column.renderHTML && isFunction(column.renderHTML)"
    class="plus-display-item"
    v-html="column.renderHTML(displayValue, { row: subRow, column, index })"
  />

  <!--显示图片 -->
  <el-image
    v-else-if="column.valueType === 'img'"
    class="plus-display-item plus-display-item__image"
    fit="cover"
    preview-teleported
    :src="imageUrl.url"
    :preview-src-list="column.preview !== false ? imageUrl.options : []"
    v-bind="customFieldProps"
  />

  <!--显示链接 -->
  <el-link
    v-else-if="column.valueType === 'link'"
    type="primary"
    class="plus-display-item plus-display-item__link"
    v-bind="customFieldProps"
  >
    {{ column.linkText || displayValue }}
  </el-link>

  <!-- 格式化时间 -->
  <span
    v-else-if="column.valueType === 'date-picker' && displayValue"
    class="plus-display-item"
    v-bind="customFieldProps"
  >
    {{ formatDate(displayValue) }}
  </span>

  <!-- 格式化金钱 -->
  <span
    v-else-if="column.valueType === 'money'"
    class="plus-display-item"
    v-bind="customFieldProps"
  >
    {{ formatMoney(displayValue) }}
  </span>

  <!-- 状态显示 -->
  <span
    v-else-if="
      column.valueType === 'select' ||
      column.valueType === 'radio' ||
      column.valueType === 'checkbox'
    "
    class="plus-display-item plus-display-item__badge"
    v-bind="customFieldProps"
  >
    <span
      v-if="getStatus.color || getStatus.type"
      :class="[
        'plus-display-item__badge__dot',
        getStatus.type && !getStatus.color ? 'plus-display-item__badge__dot--' + getStatus.type : ''
      ]"
      :style="{ backgroundColor: getStatus.color }"
    />
    {{ getStatus.label }}
  </span>

  <!-- 标签 -->
  <el-tag
    v-else-if="column.valueType === 'tag'"
    class="plus-display-item"
    v-bind="customFieldProps"
  >
    {{ displayValue }}
  </el-tag>

  <!-- 进度条 -->
  <el-progress
    v-else-if="column.valueType === 'progress'"
    class="plus-display-item"
    :percentage="displayValue"
    v-bind="customFieldProps"
  />

  <!-- 复制 -->
  <span v-else-if="column.valueType === 'copy'" class="plus-display-item">
    <el-icon
      size="16"
      color="var(--el-color-primary)"
      class="plus-display-item__icon__copy"
      v-bind="customFieldProps"
      @click="handelClickCopy(column, subRow)"
    >
      <DocumentCopy v-if="!subRow.isCopy" />
      <Select v-else />
    </el-icon>
    {{ displayValue }}
  </span>

  <!-- 代码块 -->
  <pre
    v-else-if="column.valueType === 'code'"
    class="plus-display-item plus-display-item__pre"
    v-bind="customFieldProps"
  >
      {{ displayValue }}
  </pre>

  <!-- 没有format -->
  <span v-else class="plus-display-item" v-bind="customFieldProps">{{ displayValue }} </span>
</template>

<script lang="ts" setup>
import { DocumentCopy, Select } from '@element-plus/icons-vue'
import { PlusFormItem } from '@plus-pro-components/components/form-item'
import { PlusForm } from '@plus-pro-components/components/form'
import type { PlusFormInstance } from '@plus-pro-components/components/form'
import { formatDate, formatMoney, isFunction, isArray } from '@plus-pro-components/utils'
import {
  getCustomProps,
  getTableCellSlotName,
  getFieldSlotName,
  getValue,
  setValue
} from '@plus-pro-components/components/utils'
import { ref, watch, computed } from 'vue'
import type { PlusColumn, RecordType, FieldValueType } from '@plus-pro-components/types'
import { useGetOptions } from '@plus-pro-components/hooks'
import { PlusRender } from '@plus-pro-components/components/render'

export interface PlusDisplayItemProps {
  column: PlusColumn
  row: RecordType
  index?: number
}
export interface PlusTableTableColumnEmits {
  (e: 'change', data: { value: FieldValueType; prop: string; row: RecordType }): void
}

defineOptions({
  name: 'PlusDisplayItem'
})

const props = withDefaults(defineProps<PlusDisplayItemProps>(), {
  column: () => ({ prop: '', label: '' }),
  row: () => ({}),
  index: 0
})
const emit = defineEmits<PlusTableTableColumnEmits>()

const isCellEdit = ref(false)
const isForm = computed(() => props.column.editable === true || isCellEdit.value === true)

const currentStatus = ref({})
const customFieldProps = ref<any>({})
const formInstance = ref<PlusFormInstance>()
const formItemInstance = ref()
const options = useGetOptions(props.column)

const subRow = ref(props.row)

/** 多层值支持 */
const displayValue = computed({
  get() {
    return getValue(subRow.value, props.column.prop)
  },
  set(value) {
    setValue(subRow.value, props.column.prop, value)
  }
})

const params = computed(() => ({
  row: subRow.value,
  column: props.column,
  index: props.index
}))

const imageUrl = computed(() => {
  const option = displayValue.value
  if (option && typeof option === 'string') {
    return { options: [option], url: option }
  }
  if (isArray(option)) {
    return { options: option, url: option[0] }
  }
  return { options: [], url: '' }
})

const getStatus = computed(() => {
  const option = options.value?.find(i => i.value === displayValue.value)
  if (!option) {
    return { label: '', value: '' }
  }
  return option
})

watch(
  options,
  val => {
    const option = val?.find(i => i.value === displayValue.value)
    currentStatus.value = option || {}
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => props.column.fieldProps,
  val => {
    getCustomProps(val, displayValue.value, subRow.value, props.index, 'fieldProps')
      .then(data => {
        customFieldProps.value = data
      })
      .catch(err => {
        throw err
      })
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => props.row,
  val => {
    subRow.value = { ...val }
  },
  {
    immediate: true,
    deep: true
  }
)

const copy = (data: string) => {
  const url = data
  const textarea = document.createElement('textarea')
  textarea.readOnly = true
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  textarea.value = url
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('Copy')
  textarea.remove()
}

const handelClickCopy = (item: PlusColumn, row: RecordType) => {
  copy(row[item.prop])
  row.isCopy = true
  setTimeout(() => {
    row.isCopy = false
  }, 3000)
}

const handleChange = (value: FieldValueType) => {
  emit('change', { value, prop: props.column.prop, row: subRow })
}

const startCellEdit = () => {
  isCellEdit.value = true
}

const stopCellEdit = () => {
  isCellEdit.value = false
}

const getDisplayItemInstance = () => {
  return {
    index: props.index,
    prop: props.column.prop,
    formInstance: computed(() => formInstance.value?.formInstance),
    formItemInstance: computed(() => formItemInstance.value?.formItemInstance)
  }
}

defineExpose({
  startCellEdit,
  stopCellEdit,
  getDisplayItemInstance
})
</script>
