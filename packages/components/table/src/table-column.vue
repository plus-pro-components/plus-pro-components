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
      <span v-if="item.format === 'img'">
        <img
          v-if="row[item.prop] && row[item.prop].url"
          class="plus-table-column-image-col"
          fit="cover"
          :src="row[item.prop].url"
          @click="handelClickToEnlargeImage(row.srcList)"
        />
      </span>

      <!--显示链接 -->
      <el-link
        v-else-if="item.format === 'link'"
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
      <span v-else-if="item.format === 'date' && row[item.prop]">
        {{ dateFormat(row[item.prop]) }}
      </span>

      <!-- 格式化金钱 -->
      <span v-else-if="item.format === 'money'">
        {{ formatToCurrency(row[item.prop]) }}
      </span>

      <!-- 输入框 -->
      <span v-else-if="item.format === 'input'">
        <el-input
          v-model="row[item.prop]"
          placeholder="请输入"
          :disabled="(item.disabled as any)"
          v-bind="item.formatProps"
          @blur="item.change && item.change(row[item.prop], row)"
        />
      </span>

      <!-- 自定义格式化 -->
      <span v-else-if="item.format === 'formatter'">
        {{ item.formatter && item.formatter(row[item.prop], row) }}
      </span>

      <!-- 状态显示 -->
      <span v-else-if="item.format === 'status'">
        <span
          class="plus-table-column-status-cell"
          :style="{ color: row[item.statusColorField as string] || row?.statusColor }"
        >
          <i
            class="plus-table-column-status-dot"
            :style="{ backgroundColor: row[item.statusColorField as string] || row?.statusColor }"
          />
          {{ row[item.prop] }}
        </span>
      </span>

      <!--是否显示 -->
      <span v-else-if="item.format === 'is'">
        {{ row[item.prop] === 0 ? '是' : row[item.prop] === 1 ? '否' : '' }}
      </span>

      <!-- 自定义显示节点 -->
      <slot
        v-else-if="item.format === 'custom'"
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

  .plus-table-column-status-cell {
    font-size: 13px;
    align-items: center;
    display: flex;
    .plus-table-column-status-cell-dot {
      border-radius: 50%;
      display: inline-block;
      height: 4px;
      margin-right: 4px;
      width: 4px;
    }
  }
}
</style>
