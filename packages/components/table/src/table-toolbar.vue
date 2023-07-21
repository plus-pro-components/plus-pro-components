<template>
  <div class="plus-table-header">
    <div class="plus-table-title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>

    <div class="plus-table-toolbar">
      <slot name="toolbar" />
      <!-- 表格密度 -->
      <PlusPopover
        :has-table-header="hasTableHeader"
        placement="bottom"
        :width="150"
        trigger="click"
        title="密度"
      >
        <div class="plus-table-toolbar__density">
          <el-button
            v-for="item in buttonNameDensity"
            :key="item.size"
            :plain="defaultSize !== item.size"
            type="primary"
            size="small"
            @click="handleClickDensity(item.size)"
          >
            {{ item.text }}
          </el-button>
        </div>

        <template #icon>
          <el-tooltip effect="dark" content="密度" placement="top">
            <el-icon :size="18" color="#919191" class="plus-table-popover">
              <svg
                viewBox="0 0 1024 1024"
                focusable="false"
                data-icon="column-height"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M840 836H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm0-724H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zM610.8 378c6 0 9.4-7 5.7-11.7L515.7 238.7a7.14 7.14 0 00-11.3 0L403.6 366.3a7.23 7.23 0 005.7 11.7H476v268h-62.8c-6 0-9.4 7-5.7 11.7l100.8 127.5c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7.4-11.7-5.7-11.7H548V378h62.8z"
                />
              </svg>
            </el-icon>
          </el-tooltip>
        </template>
      </PlusPopover>

      <!-- 列设置 -->
      <PlusPopover
        :has-table-header="hasTableHeader"
        placement="bottom"
        :width="100"
        trigger="click"
        title="列设置"
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
            :label="item.label + item.prop"
            :disabled="item.headerFilter"
            class="plus-table-toolbar__checkbox__item"
          >
            <el-tooltip
              v-if="item.label?.length > filterTableHeaderOverflowLabelLength"
              :content="item.label"
              placement="right-start"
            >
              {{ getLabel(item.label) }}
            </el-tooltip>
            <span v-else> {{ getLabel(item.label) }}</span>
          </el-checkbox>
        </el-checkbox-group>

        <template #icon>
          <el-tooltip effect="dark" content="列设置" placement="top">
            <el-icon :size="20" color="#919191" class="plus-table-popover">
              <Setting />
            </el-icon>
          </el-tooltip>
        </template>
      </PlusPopover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { cloneDeep } from 'lodash-es'
import type { PlusColumn } from '@plus-pro-components/types'
import { Setting } from '@element-plus/icons-vue'
import PlusPopover from '@plus-pro-components/components/popover'
import type { ComponentSize } from 'element-plus/es/constants'

export interface PlusTableToolbarProps {
  columns?: PlusColumn[]
  title?: string
  hasTableHeader?: boolean
  filterTableHeaderOverflowLabelLength?: number
  defaultSize?: ComponentSize
}

export interface PlusTableToolbarEmits {
  (e: 'filterTable', columns: PlusColumn[]): void
  (e: 'clickDensity', size: ComponentSize): void
}

export interface State {
  checkList: string[]
  checkAll: boolean
  isIndeterminate: boolean
}

export interface ButtonNameDensity {
  size: ComponentSize
  text: string
}

defineOptions({
  name: 'PlusTableToolbar'
})

const props = withDefaults(defineProps<PlusTableToolbarProps>(), {
  columns: () => [],
  title: '',
  hasTableHeader: true,
  filterTableHeaderOverflowLabelLength: 6,
  defaultSize: 'default'
})

const emit = defineEmits<PlusTableToolbarEmits>()

const buttonNameDensity: ButtonNameDensity[] = [
  {
    size: 'default',
    text: '默认'
  },
  {
    size: 'large',
    text: '宽松'
  },
  {
    size: 'small',
    text: '紧凑'
  }
]
const state: State = reactive({
  checkAll: false,
  isIndeterminate: true,
  bigImageVisible: false,
  srcList: [],
  checkList: cloneDeep(props.columns).map(item => item.label + item.prop)
})

const handleCheckAllChange = (val: boolean) => {
  state.checkList = val ? cloneDeep(props.columns).map(item => item.label + item.prop) : []
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
  emit('clickDensity', size)
}

const getLabel = (label: string) => {
  if (label?.length <= props.filterTableHeaderOverflowLabelLength) {
    return label
  }
  return label?.slice(0, props.filterTableHeaderOverflowLabelLength) + '...'
}

const handleFilterTableConfirm = () => {
  const columns = cloneDeep(props.columns)
  const subColumns = columns.filter(item => state.checkList.includes(item.label + item.prop))
  emit('filterTable', subColumns)
}
</script>

<style lang="scss">
.plus-table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .plus-table-popover {
    margin-left: 10px;
    vertical-align: middle;
    cursor: pointer;
  }
}
.plus-table-toolbar__density {
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-button {
    margin-top: 10px;
    width: 80px;
  }
  .el-button + .el-button {
    margin-left: 0;
  }
}

.plus-table-toolbar__checkbox__item {
  margin-left: 20px;
}
</style>
