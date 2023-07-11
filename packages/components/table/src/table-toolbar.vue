<template>
  <div class="plus-table-header">
    <div class="plus-table-title">
      <slot name="title">
        {{ tableTitle }}
      </slot>
    </div>

    <div class="plus-table-toolbar">
      <slot name="toolbar" />
      <!-- 表格密度 -->
      <PlusPopover
        :has-filter-table-header="hasFilterTableHeader"
        placement="bottom"
        :width="150"
        trigger="click"
        title="密度"
      >
        <el-button
          v-for="item in buttonNameDensity"
          :key="item.id"
          :color="item.color"
          plain
          size="small"
          @click="handleClickDensity(item.size)"
        >
          {{ item.text }}
        </el-button>
        <template #icon>
          <el-icon :size="20" color="#919191" class="plus-table-popover">
            <Guide />
          </el-icon>
        </template>
      </PlusPopover>

      <!-- 筛选表格 -->
      <PlusPopover
        :has-filter-table-header="hasFilterTableHeader"
        placement="bottom"
        :width="100"
        trigger="click"
        title="筛选表格"
        :has-show-bottom-button="true"
        @confirm="handleFilterTableConfirm"
        @show="handleShow"
      >
        <el-checkbox
          v-model="state.checkAll"
          :indeterminate="state.isIndeterminate"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
        <el-checkbox-group v-model="state.checkList" @change="handleCheckGroupChange">
          <el-checkbox
            v-for="item in columns"
            :key="item.label"
            :label="item.label"
            :disabled="item.headerFilter"
            class="plus-table-toolbar__checkbox__item"
          >
            <el-tooltip
              v-if="item.label?.length > LabelLength"
              :content="item.label"
              placement="right-start"
            >
              {{ getLabel(item.label) }}
            </el-tooltip>
            <span v-else> {{ getLabel(item.label) }}</span>
          </el-checkbox>
        </el-checkbox-group>

        <template #icon>
          <el-icon :size="20" color="#919191" class="plus-table-popover">
            <Setting />
          </el-icon>
        </template>
      </PlusPopover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { cloneDeep } from 'lodash-es'
import type { PlusColumn } from '@plus-pro-components/types'
import { Setting, Guide } from '@element-plus/icons-vue'
import PlusPopover from '@plus-pro-components/components/popover'
import type { ComponentSize } from 'element-plus/es/constants'

export interface PlusTableToolbarProps {
  tableTitle: string
  columns: PlusColumn[]
  hasFilterTableHeader: boolean
}

export interface PlusTableToolbarEmits {
  (e: 'subFilterTable', columns: PlusColumn[]): void
  (e: 'subDensity', size: ComponentSize): void
}

export interface State {
  checkList: string[]
  checkAll: boolean
  isIndeterminate: boolean
}

export interface ButtonNameDensity {
  id: number
  color: string
  size: ComponentSize
  text: string
}

defineOptions({
  name: 'PlusTableToolbar'
})

const props = withDefaults(defineProps<PlusTableToolbarProps>(), {})

const emit = defineEmits<PlusTableToolbarEmits>()

const LabelLength = 6

const buttonNameDensity: ButtonNameDensity[] = [
  {
    id: 1,
    color: '#666',
    size: 'small',
    text: '紧凑'
  },
  {
    id: 2,
    color: '#666',
    size: 'default',
    text: '中等'
  },
  {
    id: 3,
    color: '#666',
    size: 'large',
    text: '默认'
  }
]
const state: State = reactive({
  checkAll: false,
  isIndeterminate: true,
  bigImageVisible: false,
  srcList: [],
  checkList: cloneDeep(props.columns).map(i => i.label)
})

const handleCheckAllChange = (val: boolean) => {
  state.checkList = val
    ? cloneDeep(props.columns).map(i => i.label)
    : cloneDeep(props.columns)
        .map(i => i.label)
        .slice(-1)
  state.isIndeterminate = false
}

const handleCheckGroupChange = (value: string[]) => {
  const checkedCount = value.length
  state.checkAll = checkedCount === props.columns.length
  state.isIndeterminate = checkedCount > 0 && checkedCount < props.columns.length
}

const handleShow = () => {
  const checkedCount = state.checkList.length
  state.checkAll = checkedCount === props.columns.length
  state.isIndeterminate = checkedCount > 0 && checkedCount < props.columns.length
}

// 密度
const handleClickDensity = (size: ComponentSize) => {
  emit('subDensity', size)
}

const getLabel = (label: string) => {
  if (label?.length <= LabelLength) {
    return label
  }
  return label?.slice(0, LabelLength) + '...'
}

const handleFilterTableConfirm = () => {
  const columns = cloneDeep(props.columns)
  const subColumns = columns.filter(item => state.checkList.includes(item.label))
  emit('subFilterTable', subColumns)
}
</script>

<style lang="scss">
.plus-table-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .plus-table-popover {
    margin-left: 10px;
    vertical-align: bottom;
    cursor: pointer;
  }
}
.plus-table-toolbar__checkbox__item {
  margin-left: 20px;
}
</style>
