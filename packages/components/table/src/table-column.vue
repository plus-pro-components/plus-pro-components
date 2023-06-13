<template>
  <el-table-column
    v-for="item in config"
    :key="item.prop"
    class-name="plus-table-column"
    :prop="item.prop"
    :label="item.label"
    :width="(item.width as any)"
    :min-width="item.minWidth"
    :fixed="item.fixed"
    :sortable="item.sortable ?? sortable"
    :show-overflow-tooltip="item.showOverflowTooltip !== false"
  >
    <template #default="{ row }">
      <!--显示图片 -->
      <span v-if="item.valueType === 'img'">
        <img
          v-if="row[item.prop] && row[item.prop].img"
          class="plus-table-column-image-col"
          fit="cover"
          :src="row[item.prop].url"
          @click="handelClickToEnlargeImage(row.srcList)"
        />
      </span>

      <!--显示链接 -->
      <el-link
        v-else-if="item.valueType === 'link'"
        v-permission.link="item.perms"
        type="primary"
        class="plus-table-column-link"
        @click="item.click && !item.disabled && item.click(row)"
      >
        <span class="plus-table-column-link-content">
          {{
            (item.linkText || row[item.prop]) +
            (row[item.linkLoadingField as string] ? '中...' : '')
          }}
          <el-icon
            v-if="row[item.linkLoadingField as string]"
            class="plus-table-column-link-loading is-loading"
            :size="20"
          >
            <Loading />
          </el-icon>
        </span>
      </el-link>

      <!-- 格式化时间 -->
      <span v-else-if="item.valueType === 'date' && row[item.prop]">
        {{ dateFormat(row[item.prop]) }}
      </span>

      <!-- 格式化金钱 -->
      <span v-else-if="item.valueType === 'money'">
        {{ formatToCurrency(row[item.prop]) }}
      </span>

      <!-- 输入框 -->
      <span v-else-if="item.valueType === 'input'">
        <el-input
          v-model="row[item.prop]"
          placeholder="请输入"
          :disabled="(item.disabled as any)"
          v-bind="item.formatProps"
          @blur="item.change && item.change(row[item.prop], row)"
        />
      </span>

      <!-- 自定义格式化 -->
      <span v-else-if="item.valueType === 'formatter'">
        {{ item.formatter && item.formatter(row[item.prop], row) }}
      </span>

      <!-- 状态显示 -->
      <span v-else-if="item.valueType === 'status'" class="plus-table-column-badge-status">
        <span
          class="plus-table-column-badge-status-dot"
          :style="{ backgroundColor: plusStatus(item, row).color }"
        />
        {{ plusStatus(item, row).text }}
      </span>

      <!--是否显示 -->
      <span v-else-if="item.valueType === 'is'">
        {{ row[item.prop] === 0 ? '是' : row[item.prop] === 1 ? '否' : '' }}
      </span>
      <!-- switch -->
      <span v-else-if="item.valueType === 'switch'">
        <el-switch
          v-model="row[item.prop]"
          class="ml-2"
          disabled
          :style="`--el-switch-on-color: ${item?.elSwitchOnColor}; --el-switch-off-color: ${item?.elSwitchOffColor}`"
        />
      </span>
      <!-- 标签 -->
      <span v-else-if="item.valueType === 'tag'">
        <el-tag class="ml-2" :type="plusStatus(item, row).color">{{
          plusStatus(item, row).text
        }}</el-tag>
      </span>
      <!-- 进度条 -->
      <span v-else-if="item.valueType === 'progress'">
        <el-progress
          :percentage="row[item.prop].progress"
          :format="formatProgress"
          :status="row[item.prop]?.status"
        />
      </span>
      <!-- 评分 -->
      <span v-else-if="item.valueType === 'rate'">
        <el-rate
          v-model="row[item.prop]"
          disabled
          allow-half
          text-color="#ff9900"
          score-template="{row[item.prop]} points"
        />
      </span>
      <!-- 自定义显示节点 -->
      <slot
        v-else-if="item.valueType === 'custom'"
        name="custom-cell"
        :data="{ row, data: row[item.prop] }"
      />

      <!-- 没有format -->
      <span v-else>{{ row[item.prop] }} </span>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
import { Loading } from '@element-plus/icons-vue'
import type { PlusImagePreviewRow } from '@plus-pro-components/components/image-preview'
import { dateFormat, formatToCurrency } from '@plus-pro-components/utils'
import type { TableConfigRow } from './type'

export interface PlusTableTableColumnProps {
  config?: TableConfigRow[]
  sortable?: string | boolean
}

export interface PlusTableTableColumnEmits {
  (e: 'clickToEnlargeImage', data: PlusImagePreviewRow[]): void
}
export interface PlusTableTableColumnStatus {
  text: string
  color: string
}
defineOptions({
  name: 'PlusTableTableColumn'
})

withDefaults(defineProps<PlusTableTableColumnProps>(), {
  sortable: false,
  config: () => []
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
</script>

<style lang="scss">
.plus-table-column {
  .plus-table-column-image-col {
    cursor: pointer;
    object-fit: cover;
    overflow: hidden;
    width: 30px;
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
}
</style>
