<template>
  <div class="plus-table-toolbar">
    <span class="plus-table-toolbar__title">
      <slot name="title">
        {{ title || t('plus.table.title') }}
      </slot>
    </span>

    <div class="plus-table-toolbar__content">
      <slot name="toolbar" />
      <!-- 表格密度 -->
      <PlusPopover placement="bottom" :width="150" trigger="click" :title="t('plus.table.density')">
        <div class="plus-table-toolbar__density">
          <el-button
            v-for="item in buttonNameDensity"
            :key="item.size"
            :plain="defaultSize !== item.size"
            type="primary"
            size="small"
            @click="handleClickDensity(item.size)"
          >
            {{ unref(item.text) }}
          </el-button>
        </div>

        <template #reference>
          <el-tooltip effect="dark" :content="t('plus.table.density')" placement="top">
            <el-icon :size="18" color="#919191" class="plus-table-toolbar__icon">
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
        placement="bottom"
        :width="100"
        trigger="click"
        :title="t('plus.table.columnSettings')"
        :has-show-bottom-button="true"
        @confirm="handleFilterTableConfirm"
        @show="handleShow"
      >
        <el-checkbox
          v-model="state.checkAll"
          :indeterminate="state.isIndeterminate"
          @change="handleCheckAllChange"
        >
          {{ t('plus.table.selectAll') }}
        </el-checkbox>
        <el-checkbox-group v-model="state.checkList" @change="handleCheckGroupChange">
          <el-checkbox
            v-for="item in columns"
            :key="item.label"
            :label="getTableKey(item)"
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

        <template #reference>
          <el-tooltip effect="dark" :content="t('plus.table.columnSettings')" placement="top">
            <el-icon :size="20" color="#919191" class="plus-table-toolbar__icon">
              <Setting />
            </el-icon>
          </el-tooltip>
        </template>
      </PlusPopover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { reactive, computed, unref } from 'vue'
import { cloneDeep } from 'lodash-es'
import type { PlusColumn } from '@plus-pro-components/types'
import { Setting } from '@element-plus/icons-vue'
import { PlusPopover } from '@plus-pro-components/components/popover'
import type { ComponentSize } from 'element-plus/es/constants'
import { useLocale } from '@plus-pro-components/hooks'
import { getTableKey } from '@plus-pro-components/components/utils'

export interface PlusTableToolbarProps {
  columns?: PlusColumn[]
  subColumns?: any
  title?: string
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
  text: string | ComputedRef<string>
}

defineOptions({
  name: 'PlusTableToolbar'
})

const props = withDefaults(defineProps<PlusTableToolbarProps>(), {
  columns: () => [],
  subColumns: () => [],
  title: '',
  hasToolbar: true,
  filterTableHeaderOverflowLabelLength: 6,
  defaultSize: 'default'
})
const emit = defineEmits<PlusTableToolbarEmits>()

const { t } = useLocale()
const buttonNameDensity: ButtonNameDensity[] = [
  {
    size: 'default',
    text: computed(() => t('plus.table.default'))
  },
  {
    size: 'large',
    text: computed(() => t('plus.table.loose'))
  },
  {
    size: 'small',
    text: computed(() => t('plus.table.compact'))
  }
]
const state: State = reactive({
  checkAll: false,
  isIndeterminate: true,
  bigImageVisible: false,
  srcList: [],
  checkList: cloneDeep(props.columns).map(item => getTableKey(item))
})

const handleCheckAllChange = (val: boolean) => {
  state.checkList = val ? cloneDeep(props.columns).map(item => getTableKey(item)) : []
  state.isIndeterminate = false
}

const handleCheckGroupChange = (value: string[]) => {
  const checkedCount = value.length
  state.checkAll = checkedCount === props.columns.length
  state.isIndeterminate = checkedCount > 0 && checkedCount < props.columns.length
}

const handleShow = () => {
  state.checkList = cloneDeep(props.subColumns).map((item: PlusColumn) => getTableKey(item))
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
  const subColumns = columns.filter(item => state.checkList.includes(getTableKey(item)))
  emit('filterTable', subColumns)
}
</script>
