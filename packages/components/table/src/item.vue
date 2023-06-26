<template>
  <!--显示图片 -->
  <span v-if="commonItems.valueType === 'img'">
    <img
      v-if="commonRows[commonItems.prop] && commonRows[commonItems.prop].img"
      class="plus-table-column-image-col"
      fit="cover"
      :src="commonRows[commonItems.prop].url"
      @click="handelClickToEnlargeImage(commonRows.srcList)"
    />
  </span>

  <!--显示链接 -->
  <el-link
    v-else-if="commonItems.valueType === 'link'"
    type="primary"
    class="plus-table-column-link"
    @click="commonItems.click && !commonItems.disabled && commonItems.click(commonRows)"
  >
    <span class="plus-table-column-link-content">
      {{
        (commonItems.linkText || commonRows[commonItems.prop]) +
        (commonRows[commonItems.linkLoadingField as string] ? '中...' : '')
      }}
      <el-icon
        v-if="commonRows[commonItems.linkLoadingField as string]"
        class="plus-table-column-link-loading is-loading"
        :size="20"
      >
        <Loading />
      </el-icon>
    </span>
  </el-link>

  <!-- 格式化时间 -->
  <span v-else-if="commonItems.valueType === 'date' && commonRows[commonItems.prop]">
    {{ dateFormat(commonRows[commonItems.prop]) }}
  </span>

  <!-- 格式化金钱 -->
  <span v-else-if="commonItems.valueType === 'money'">
    {{ formatToCurrency(commonRows[commonItems.prop]) }}
  </span>

  <!-- 输入框 -->
  <span v-else-if="commonItems.valueType === 'input'">
    <el-input
      v-model="commonRows[commonItems.prop]"
      placeholder="请输入"
      :disabled="(commonItems.disabled as any)"
      v-bind="commonItems.formatProps"
      @blur="commonItems.change && commonItems.change(commonRows[commonItems.prop], commonRows)"
    />
  </span>

  <!-- 自定义格式化 -->
  <span v-else-if="commonItems.valueType === 'formatter'">
    {{ commonItems.formatter && commonItems.formatter(commonRows[commonItems.prop], commonRows) }}
  </span>

  <!-- 状态显示 -->
  <span v-else-if="commonItems.valueType === 'status'" class="plus-table-column-badge-status">
    <span
      class="plus-table-column-badge-status-dot"
      :style="{ backgroundColor: plusStatus(commonItems, commonRows).color }"
    />
    {{ plusStatus(commonItems, commonRows).text }}
  </span>

  <!--是否显示 -->
  <span v-else-if="commonItems.valueType === 'is'">
    {{ commonRows[commonItems.prop] === 0 ? '是' : commonRows[commonItems.prop] === 1 ? '否' : '' }}
  </span>
  <!-- switch -->
  <span v-else-if="commonItems.valueType === 'switch'">
    <el-switch
      v-model="commonRows[commonItems.prop]"
      class="ml-2"
      disabled
      :style="`--el-switch-on-color: ${commonItems?.elSwitchOnColor}; --el-switch-off-color: ${commonItems?.elSwitchOffColor}`"
    />
  </span>
  <!-- 标签 -->
  <span v-else-if="commonItems.valueType === 'tag'">
    <el-tag class="ml-2" :type="plusStatus(commonItems, commonRows).color">{{
      plusStatus(commonItems, commonRows).text
    }}</el-tag>
  </span>
  <!-- 进度条 -->
  <span v-else-if="commonItems.valueType === 'progress'">
    <el-progress
      :percentage="commonRows[commonItems.prop].progress"
      :format="formatProgress"
      :status="commonRows[commonItems.prop]?.status"
    />
  </span>
  <!-- 评分 -->
  <span v-else-if="commonItems.valueType === 'rate'">
    <el-rate
      v-model="commonRows[commonItems.prop]"
      disabled
      allow-half
      text-color="#ff9900"
      score-template="{commonRows[commonItems.prop]} points"
    />
  </span>
  <!-- 复制 -->
  <span v-else-if="commonItems.valueType === 'copy'">
    <el-icon
      size="16"
      color="var(--el-color-primary)"
      class="plus-table-icon-copy"
      @click="handelClickCopy(commonItems, commonRows)"
    >
      <DocumentCopy v-if="!commonRows.isCopy" />
      <Select v-else />
    </el-icon>
    {{ commonRows[commonItems.prop] }}
  </span>
  <!-- 代码块 -->
  <pre v-else-if="commonItems.valueType === 'code'" class="plus-table-pre">
          {{ commonRows[commonItems.prop] }}
      </pre
  >
  <!-- 自定义显示节点 -->
  <slot
    v-else-if="commonItems.valueType === 'custom'"
    name="custom-cell"
    :data="{ commonRows, data: commonRows[commonItems.prop] }"
  />

  <!-- 没有format -->
  <span v-else>{{ commonRows[commonItems.prop] }} </span>
</template>
<script lang="ts" setup>
import { Loading, DocumentCopy, Select } from '@element-plus/icons-vue'
import type { PlusImagePreviewRow } from '@plus-pro-components/components/image-preview'
import { dateFormat, formatToCurrency } from '@plus-pro-components/utils'
import { reactive, toRefs } from 'vue'
import type { TableConfigRow } from './type'

export interface PlusCommonItemsProps {
  commonItems?: TableConfigRow
  rows: Record<string, any>
}
export interface PlusTableTableColumnStatus {
  text: string
  color: string
}
export interface PlusTableTableColumnEmits {
  (e: 'clickToEnlargeImage', data: PlusImagePreviewRow[]): void
}
defineOptions({
  name: 'PlusCommonItems'
})

const props = withDefaults(defineProps<PlusCommonItemsProps>(), {
  commonItems: () => ({
    prop: '',
    label: ''
  }),
  rows: () => ({})
})
const state = reactive<{ commonRows: Record<string, any> }>({
  commonRows: props.rows
})
const emit = defineEmits<PlusTableTableColumnEmits>()
// 点击放大图片
const handelClickToEnlargeImage = (srcList: PlusImagePreviewRow[]) => {
  emit('clickToEnlargeImage', srcList)
}
const plusStatus = (item: TableConfigRow, row: any): PlusTableTableColumnStatus => {
  if (!item?.valueEnum) return { text: '', color: '' }
  const PlusTableTableColumnStatusObj: PlusTableTableColumnStatus = {
    text: '',
    color: ''
  }
  return item?.valueEnum[row[item?.prop]]
    ? item?.valueEnum[row[item?.prop]]
    : PlusTableTableColumnStatusObj
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
const { commonRows } = toRefs(state)
</script>
<style lang="scss" scoped>
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
  width: min-content;
}
</style>
