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

  <PlusFormFieldItem
    v-else-if="FormFieldType.includes(column.valueType as string) && column.editable === true"
    v-model="subRow[column.prop]"
    v-bind="column"
    @change="handleChange"
  />

  <!--显示图片 -->
  <img
    v-else-if="column.valueType === 'img'"
    title="点击预览"
    class="plus-table-column-image-col"
    fit="cover"
    :src="getImageUrl().url"
    v-bind="customFieldProps"
    @click="handelClickToEnlargeImage"
  />

  <!--显示链接 -->
  <el-link
    v-else-if="column.valueType === 'link'"
    type="primary"
    class="plus-table-column-link"
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
    class="plus-table-column-badge-status"
    v-bind="customFieldProps"
  >
    <span
      v-if="getStatus().color"
      class="plus-table-column-badge-status-dot"
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
      class="plus-table-icon-copy"
      v-bind="customFieldProps"
      @click="handelClickCopy(column, subRow)"
    >
      <DocumentCopy v-if="!subRow.isCopy" />
      <Select v-else />
    </el-icon>
    {{ subRow[column.prop] }}
  </span>

  <!-- 代码块 -->
  <pre v-else-if="column.valueType === 'code'" class="plus-table-pre" v-bind="customFieldProps">
      {{ subRow[column.prop] }}
  </pre>

  <!-- 没有format -->
  <span v-else v-bind="customFieldProps">{{ subRow[column.prop] }} </span>
</template>

<script lang="ts" setup>
import { DocumentCopy, Select } from '@element-plus/icons-vue'
import type { PlusImagePreviewRow } from '@plus-pro-components/components/image-preview'
import { PlusFormFieldItem } from '@plus-pro-components/components/form-item'
import {
  dateFormat,
  formatToCurrency,
  isFunction,
  getCustomProps
} from '@plus-pro-components/utils'
import { ref, watch } from 'vue'
import type { PlusColumn, RecordType } from '@plus-pro-components/types'
import { useGetOptions } from '@plus-pro-components/hooks'
import { FormFieldType } from '@plus-pro-components/constants'

export interface PlusDisplayItemProps {
  column?: PlusColumn
  row: RecordType
}

export interface PlusTableTableColumnEmits {
  (e: 'clickToEnlargeImage', data: PlusImagePreviewRow[]): void
  (e: 'change', data: { value: any; prop: string; row: any }): void
}

defineOptions({
  name: 'PlusDisplayItem'
})

const props = withDefaults(defineProps<PlusDisplayItemProps>(), {
  column: () => ({ prop: '', label: '' }),
  row: () => ({})
})

const subRow = ref(props.row)
const currentStatus = ref({})

const customFieldProps = ref<any>({})

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
  if (typeof option === 'string' && option) {
    return {
      options: [{ url: option, name: option }],
      url: option
    }
  }
  if (Array.isArray(option)) {
    return {
      options: option,
      url: option[0]?.url
    }
  }
  return {
    options: [],
    url: ''
  }
}

// 点击放大图片
const handelClickToEnlargeImage = () => {
  if (props.column.preview !== false) {
    const { options } = getImageUrl()
    emit('clickToEnlargeImage', options)
  }
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
</script>

<style lang="scss">
.plus-table-column-image-col {
  cursor: pointer;
  object-fit: cover;
  overflow: hidden;
  width: 30px;
}
.plus-table-icon-copy {
  cursor: pointer;
  color: #1677ff;
  text-decoration: none;
  outline: none;
  transition: color 0.3s;
  margin-inline-start: 4px;
  vertical-align: sub;
}
.plus-table-column-link {
  font-size: 13px;
  max-width: 100%;
  .plus-table-column-link-content {
    width: 100%;
    display: inline-block;
  }
  .plus-table-column-link-loading {
    margin-left: 5px;
  }
  .el-link__inner {
    width: 100%;
    display: inline-block;
  }
}
.plus-table-column-badge-status {
  .plus-table-column-badge-status-dot {
    position: relative;
    top: -1px;
    display: inline-block;
    width: 6px;
    height: 6px;
    vertical-align: middle;
    border-radius: 50%;
  }
}
.plus-table-pre {
  padding: 0;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: rgb(246, 248, 250);
  border-radius: 3px;
  width: unset;
}
</style>
