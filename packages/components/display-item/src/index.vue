<template>
  <!-- 表单第一优先级 -->
  <PlusForm
    v-if="isForm"
    ref="formInstance"
    v-model="modelValues"
    :model="modelValues"
    :columns="columns as  PlusColumn[]"
    :has-footer="false"
    :has-label="false"
    v-bind="column.formProps"
    class="plus-display-item__form"
    @change="handleChange"
  >
    <!--表单单项的插槽 -->
    <template v-if="$slots[getFieldSlotName(column.prop)]" #[getFieldSlotName(column.prop)]="data">
      <slot :name="getFieldSlotName(column.prop)" v-bind="data" :row="subRow" />
    </template>

    <!-- 表单el-form-item 下一行额外的内容 的插槽 -->
    <template v-if="$slots[getExtraSlotName(column.prop)]" #[getExtraSlotName(column.prop)]="data">
      <slot :name="getExtraSlotName(column.prop)" v-bind="data" :row="subRow" />
    </template>
  </PlusForm>

  <!-- 自定义显示 -->
  <PlusRender
    v-else-if="column.render && isFunction(column.render)"
    :render="column.render"
    :params="params"
    :callback-value="displayValue"
    :custom-field-props="customFieldProps"
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
  >
    <template v-for="(fieldSlot, key) in column.fieldSlots" :key="key" #[key]="data">
      <component :is="fieldSlot" v-bind="data" />
    </template>
  </el-image>

  <!--显示链接 -->
  <el-link
    v-else-if="column.valueType === 'link'"
    type="primary"
    class="plus-display-item plus-display-item__link"
    v-bind="customFieldProps"
  >
    <template v-for="(fieldSlot, key) in column.fieldSlots" :key="key" #[key]="data">
      <component :is="fieldSlot" v-bind="data" />
    </template>
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
    <template v-for="(fieldSlot, key) in column.fieldSlots" :key="key" #[key]="data">
      <component :is="fieldSlot" v-bind="data" />
    </template>

    {{ displayValue }}
  </el-tag>

  <!-- 进度条 -->
  <el-progress
    v-else-if="column.valueType === 'progress'"
    class="plus-display-item"
    :percentage="displayValue"
    v-bind="customFieldProps"
  >
    <template v-for="(fieldSlot, key) in column.fieldSlots" :key="key" #[key]="data">
      <component :is="fieldSlot" v-bind="data" />
    </template>
  </el-progress>

  <!-- 复制 -->
  <span v-else-if="column.valueType === 'copy'" class="plus-display-item">
    {{ displayValue }}
    <el-icon
      size="16"
      class="plus-display-item__icon__copy"
      v-bind="customFieldProps"
      @click="handelClickCopy(column, subRow)"
    >
      <DocumentCopy v-if="!subRow.isCopy" />
      <Select v-else />
    </el-icon>
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
import { PlusForm } from '@plus-pro-components/components/form'
import {
  formatDate,
  formatMoney,
  isFunction,
  isArray,
  getCustomProps,
  getTableCellSlotName,
  getFieldSlotName,
  getExtraSlotName,
  getValue,
  setValue
} from '@plus-pro-components/components/utils'
import type { Ref } from 'vue'
import { ref, watch, computed } from 'vue'
import type {
  PlusColumn,
  RecordType,
  FieldValueType,
  FieldValues
} from '@plus-pro-components/types'
import { useGetOptions } from '@plus-pro-components/hooks'
import { PlusRender } from '@plus-pro-components/components/render'
import { ElImage, ElLink, ElTag, ElProgress, ElIcon } from 'element-plus'

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
const customFieldProps = ref<RecordType>({})
const formInstance = ref()
const options = useGetOptions(props.column)
const columns: Ref<PlusColumn[]> = ref([])
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

/**
 * 表单绑定值处理
 */
const modelValues = computed({
  get() {
    return { [props.column.prop]: displayValue.value }
  },
  set(values) {
    displayValue.value = values[props.column.prop]
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
  let option = options.value?.find(i => i.value === displayValue.value)
  if (props.column?.customGetStatus && isFunction(props.column?.customGetStatus)) {
    option = props.column?.customGetStatus({
      options: options.value,
      value: displayValue.value,
      row: subRow.value
    })
  }
  if (!option) {
    return { label: '', value: '' }
  }
  return option
})

watch(
  () => props.column,
  val => {
    if (val) {
      columns.value = [val as PlusColumn]
    }
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

const handleChange = (values: FieldValues) => {
  emit('change', { value: values[props.column.prop], prop: props.column.prop, row: subRow })
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
    formInstance: computed(() => formInstance.value?.formInstance)
  }
}

defineExpose({
  startCellEdit,
  stopCellEdit,
  getDisplayItemInstance
})
</script>
