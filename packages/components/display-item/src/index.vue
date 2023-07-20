<template>
  <!-- 自定义显示 -->
  <component
    :is="() => column.render && column.render(subRow[column.prop], subRow, column)"
    v-if="column.render && isFunction(column.render)"
    v-bind="customFieldProps"
  />

  <span
    v-else-if="column.renderHTML && isFunction(column.renderHTML)"
    v-html="column.renderHTML && column.renderHTML(subRow[column.prop], subRow, column)"
  />

  <PlusForm
    v-else-if="isForm"
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
      v-model="subRow[column.prop]"
      class="plus-display-item__form__item"
      v-bind="column"
      label=""
      @change="handleChange"
    />
  </PlusForm>

  <!--显示图片 -->
  <el-image
    v-else-if="column.valueType === 'img'"
    title="点击预览"
    class="plus-display-item__image__col"
    fit="cover"
    preview-teleported
    :src="getImageUrl().url"
    :preview-src-list="column.preview !== false ? getImageUrl().options : []"
    v-bind="customFieldProps"
  />

  <!--显示链接 -->
  <el-link
    v-else-if="column.valueType === 'link'"
    type="primary"
    class="plus-display-item__link"
    v-bind="customFieldProps"
  >
    {{ column.linkText || subRow[column.prop] }}
  </el-link>

  <!-- 格式化时间 -->
  <span
    v-else-if="column.valueType === 'date-picker' && subRow[column.prop]"
    v-bind="customFieldProps"
  >
    {{ dateFormat(subRow[column.prop]) }}
  </span>

  <!-- 格式化金钱 -->
  <span v-else-if="column.valueType === 'money'" v-bind="customFieldProps">
    {{ formatToCurrency(subRow[column.prop]) }}
  </span>

  <!-- 状态显示 -->
  <span
    v-else-if="
      column.valueType === 'select' ||
      column.valueType === 'radio' ||
      column.valueType === 'checkbox'
    "
    class="plus-display-item__badge--status"
    v-bind="customFieldProps"
  >
    <span
      v-if="getStatus().color"
      class="plus-display-item__badge--status__dot"
      :style="{ backgroundColor: getStatus().color }"
    />
    {{ getStatus().label }}
  </span>

  <!-- 标签 -->
  <el-tag v-else-if="column.valueType === 'tag'" v-bind="customFieldProps">
    {{ subRow[column.prop] }}
  </el-tag>

  <!-- 进度条 -->
  <el-progress
    v-else-if="column.valueType === 'progress'"
    :percentage="subRow[column.prop]"
    v-bind="customFieldProps"
  />

  <!-- 复制 -->
  <span v-else-if="column.valueType === 'copy'">
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
    {{ subRow[column.prop] }}
  </span>

  <!-- 代码块 -->
  <pre
    v-else-if="column.valueType === 'code'"
    class="plus-display-item__pre"
    v-bind="customFieldProps"
  >
      {{ subRow[column.prop] }}
  </pre>

  <!-- 没有format -->
  <span v-else v-bind="customFieldProps">{{ subRow[column.prop] }} </span>
</template>

<script lang="ts" setup>
import { DocumentCopy, Select } from '@element-plus/icons-vue'
import PlusFormItem from '@plus-pro-components/components/form-item'
import type { PlusFormInstance } from '@plus-pro-components/components/form'
import PlusForm from '@plus-pro-components/components/form'
import {
  dateFormat,
  formatToCurrency,
  isFunction,
  getCustomProps,
  isArray
} from '@plus-pro-components/utils'

import { ref, watch, computed } from 'vue'
import type { PlusColumn, RecordType } from '@plus-pro-components/types'
import { useGetOptions } from '@plus-pro-components/hooks'

export interface PlusDisplayItemProps {
  column?: PlusColumn
  row: RecordType
  index?: number
}

export interface PlusTableTableColumnEmits {
  (e: 'change', data: { value: any; prop: string; row: any }): void
}

defineOptions({
  name: 'PlusDisplayItem'
})

const props = withDefaults(defineProps<PlusDisplayItemProps>(), {
  column: () => ({ prop: '', label: '' }),
  row: () => ({}),
  index: 0
})

const isCellEdit = ref(false)

const isForm = computed(() => props.column.editable === true || isCellEdit.value === true)

const subRow = ref(props.row)
const currentStatus = ref({})
const customFieldProps = ref<any>({})
const formInstance = ref<PlusFormInstance>()
const formItemInstance = ref()

watch(
  () => props.column.fieldProps,
  val => {
    const value = subRow.value[props.column.prop]
    const row = subRow
    getCustomProps(val, value, row)
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

const options = useGetOptions(props.column)
watch(
  options,
  val => {
    const option = val?.find(i => i.value === subRow.value[props.column?.prop])
    currentStatus.value = option || {}
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

const emit = defineEmits<PlusTableTableColumnEmits>()

const getImageUrl = () => {
  const option = subRow.value[props.column.prop]
  if (option && typeof option === 'string') {
    return { options: [option], url: option }
  }
  if (isArray(option)) {
    return { options: option, url: option[0] }
  }
  return { options: [], url: '' }
}

const getStatus = () => {
  const option = options.value?.find(i => i.value === subRow.value[props.column?.prop])
  if (!option) {
    return { label: '', value: '' }
  }
  return option
}

const handelClickCopy = (item: PlusColumn, row: RecordType) => {
  copy(row[item.prop])
  row.isCopy = true
  setTimeout(() => {
    row.isCopy = false
  }, 3000)
}

const handleChange = (value: any) => {
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

<style lang="scss">
.plus-display-item__image__col {
  cursor: pointer;
  object-fit: cover;
  overflow: hidden;
  width: 30px;
}
.plus-display-item__icon__copy {
  cursor: pointer;
  color: #1677ff;
  text-decoration: none;
  outline: none;
  transition: color 0.3s;
  margin-inline-start: 4px;
  vertical-align: sub;
}
.plus-display-item__link {
  max-width: 100%;
  .el-link__inner {
    width: 100%;
    display: inline-block;
  }
}
.plus-display-item__badge--status {
  .plus-display-item__badge--status__dot {
    position: relative;
    top: -1px;
    display: inline-block;
    width: 6px;
    height: 6px;
    vertical-align: middle;
    border-radius: 50%;
  }
}
.plus-display-item__pre {
  padding: 0;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: rgb(246, 248, 250);
  border-radius: 3px;
  width: unset;
}
.plus-display-item__form {
  .plus-display-item__form__item {
    .el-form-item__label {
      padding: 0;
    }
  }
}
</style>
