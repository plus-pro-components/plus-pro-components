<template>
  <!--显示图片 -->
  <span v-if="configItem.valueType === 'img'">
    <img
      v-if="subRow[configItem.prop] && subRow[configItem.prop].img"
      class="plus-table-column-image-col"
      fit="cover"
      :src="subRow[configItem.prop].url"
      @click="handelClickToEnlargeImage(subRow.srcList)"
    />
  </span>

  <!--显示链接 -->
  <el-link
    v-else-if="configItem.valueType === 'link'"
    type="primary"
    class="plus-table-column-link"
    @click="configItem.click && !configItem.disabled && configItem.click(subRow)"
  >
    <span class="plus-table-column-link-content">
      {{ configItem.linkText || subRow[configItem.prop] }}
    </span>
  </el-link>

  <!-- 格式化时间 -->
  <span v-else-if="configItem.valueType === 'date' && subRow[configItem.prop]">
    {{ dateFormat(subRow[configItem.prop]) }}
  </span>

  <!-- 格式化金钱 -->
  <span v-else-if="configItem.valueType === 'money'">
    {{ formatToCurrency(subRow[configItem.prop]) }}
  </span>

  <!-- 输入框 -->
  <span v-else-if="configItem.valueType === 'input'">
    <el-input
      v-model="subRow[configItem.prop]"
      placeholder="请输入"
      :disabled="(configItem.disabled as any)"
      v-bind="configItem.formatProps"
      @blur="configItem.change && configItem.change(subRow[configItem.prop], subRow)"
    />
  </span>

  <!-- 自定义格式化 -->
  <span v-else-if="configItem.valueType === 'formatter'">
    {{ configItem.formatter && configItem.formatter(subRow[configItem.prop], subRow) }}
  </span>

  <!-- 状态显示 -->
  <span v-else-if="configItem.valueType === 'status'" class="plus-table-column-badge-status">
    <span
      class="plus-table-column-badge-status-dot"
      :style="{ backgroundColor: plusStatus(configItem, subRow).color }"
    />
    {{ plusStatus(configItem, subRow).text }}
  </span>

  <!-- switch -->
  <span v-else-if="configItem.valueType === 'switch'">
    <el-switch
      v-model="subRow[configItem.prop]"
      class="ml-2"
      disabled
      :style="`--el-switch-on-color: ${configItem?.attrs?.activeColor}; --el-switch-off-color: ${configItem?.attrs?.inactiveColor}`"
    />
  </span>

  <!-- 标签 -->
  <span v-else-if="configItem.valueType === 'tag'">
    <el-tag class="ml-2" :type="plusStatus(configItem, subRow).color">{{
      plusStatus(configItem, subRow).text
    }}</el-tag>
  </span>

  <!-- 进度条 -->
  <span v-else-if="configItem.valueType === 'progress'">
    <el-progress
      :percentage="subRow[configItem.prop].progress"
      :format="formatProgress"
      :status="subRow[configItem.prop]?.status"
    />
  </span>

  <!-- 评分 -->
  <span v-else-if="configItem.valueType === 'rate'">
    <el-rate
      v-model="subRow[configItem.prop]"
      disabled
      allow-half
      text-color="#ff9900"
      score-template="{subRow[configItem.prop]} points"
    />
  </span>

  <!-- 复制 -->
  <span v-else-if="configItem.valueType === 'copy'">
    <el-icon
      size="16"
      color="var(--el-color-primary)"
      class="plus-table-icon-copy"
      @click="handelClickCopy(configItem, subRow)"
    >
      <DocumentCopy v-if="!subRow.isCopy" />
      <Select v-else />
    </el-icon>
    {{ subRow[configItem.prop] }}
  </span>

  <!-- 代码块 -->
  <pre v-else-if="configItem.valueType === 'code'" class="plus-table-pre">
      {{ subRow[configItem.prop] }}
  </pre>

  <!-- 自定义显示节点 -->
  <slot
    v-else-if="configItem.valueType === 'custom'"
    name="custom-cell"
    :data="{ subRow, data: subRow[configItem.prop] }"
  />

  <!-- 没有format -->
  <span v-else>{{ subRow[configItem.prop] }} </span>
</template>

<script lang="ts" setup>
import { DocumentCopy, Select } from '@element-plus/icons-vue'
import type { PlusImagePreviewRow } from '@plus-pro-components/components/image-preview'
import { dateFormat, formatToCurrency } from '@plus-pro-components/utils'
import { reactive, toRefs, watch } from 'vue'
import type { TableConfigRow } from '@plus-pro-components/components/table'

export interface PlusDisplayItemProps {
  configItem?: TableConfigRow
  row: Record<string, any>
}
export interface PlusTableTableColumnEmits {
  (e: 'clickToEnlargeImage', data: PlusImagePreviewRow[]): void
}
export interface PlusDisplayItemStatus {
  text: string
  color: string
}

defineOptions({
  name: 'PlusDisplayItem'
})

const props = withDefaults(defineProps<PlusDisplayItemProps>(), {
  configItem: () => ({ prop: '', label: '' }),
  row: () => ({})
})
const state = reactive<{ subRow: Record<string, any> }>({
  subRow: props.row
})

watch(
  () => props.row,
  val => {
    state.subRow = { ...val }
  }
)

const emit = defineEmits<PlusTableTableColumnEmits>()
// 点击放大图片
const handelClickToEnlargeImage = (srcList: PlusImagePreviewRow[]) => {
  emit('clickToEnlargeImage', srcList)
}
const plusStatus = (item: TableConfigRow, row: any): PlusDisplayItemStatus => {
  if (!item?.valueEnum) return { text: '', color: '' }
  const PlusDisplayItemStatusObj: PlusDisplayItemStatus = {
    text: '',
    color: ''
  }
  return item?.valueEnum[row[item?.prop]]
    ? item?.valueEnum[row[item?.prop]]
    : PlusDisplayItemStatusObj
}
const formatProgress = (percentage: number) => (percentage === 100 ? 'Full' : `${percentage}%`)
const handelClickCopy = (item: TableConfigRow, row: any) => {
  copy(row[item.prop])
  row.isCopy = true
  setTimeout(() => {
    row.isCopy = false
  }, 3000)
}
const copy = (data: string) => {
  const url = data
  const oInput = document.createElement('input')
  oInput.value = url
  document.body.appendChild(oInput)
  oInput.select() // 选择对象;
  document.execCommand('Copy') // 执行浏览器复制命令
  oInput.remove()
}
const { subRow } = toRefs(state)
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
