<template>
  <div class="plus-table-title-bar">
    <div class="plus-table-title-bar__title">
      <slot name="title">
        {{ titleBarConfig.title }}
      </slot>
    </div>

    <div class="plus-table-title-bar__toolbar">
      <slot name="toolbar" />

      <span
        v-if="titleBarConfig?.refresh === true"
        class="plus-table-title-bar__toolbar__refresh"
        @click="handleRefresh"
      >
        <el-tooltip effect="dark" :content="t('plus.table.refresh')" placement="top">
          <el-icon :size="iconSize" :color="iconColor" class="plus-table-title-bar__toolbar__icon">
            <RefreshRight />
          </el-icon>
        </el-tooltip>
      </span>

      <!-- 表格密度 -->
      <PlusPopover
        v-if="titleBarConfig?.density !== false"
        placement="bottom"
        :width="150"
        trigger="click"
        :title="t('plus.table.density')"
      >
        <div class="plus-table-title-bar__toolbar__density">
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
            <el-icon
              :size="iconSize"
              :color="iconColor"
              class="plus-table-title-bar__toolbar__icon"
            >
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
        v-if="titleBarConfig?.columnSetting !== false"
        placement="bottom"
        :width="100"
        trigger="click"
        :title="t('plus.table.columnSettings')"
      >
        <el-checkbox
          v-model="state.checkAll"
          :indeterminate="state.isIndeterminate"
          @change="handleCheckAllChange"
        >
          {{ t('plus.table.selectAll') }}
        </el-checkbox>
        <el-checkbox-group v-model="state.checkList" @change="handleCheckGroupChange">
          <div ref="checkboxGroupInstance" class="plus-checkbox-sortable-list">
            <el-checkbox
              v-for="item in subColumns"
              :key="item.label"
              :label="getTableKey(item)"
              :disabled="item.headerFilter"
              class="plus-table-title-bar__toolbar__checkbox__item plus-handle"
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
          </div>
        </el-checkbox-group>

        <template #reference>
          <el-tooltip effect="dark" :content="t('plus.table.columnSettings')" placement="top">
            <el-icon
              :size="iconSize"
              :color="iconColor"
              class="plus-table-title-bar__toolbar__icon"
            >
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
import { reactive, computed, unref, onMounted, ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import type { PlusColumn } from '@plus-pro-components/types'
import { Setting, RefreshRight } from '@element-plus/icons-vue'
import { PlusPopover } from '@plus-pro-components/components/popover'
import type { ComponentSize } from 'element-plus/es/constants'
import type { CheckboxValueType } from 'element-plus'
import { useLocale } from '@plus-pro-components/hooks'
import { getTableKey, isPlainObject } from '@plus-pro-components/components/utils'
import { ElCheckbox, ElCheckboxGroup, ElTooltip, ElIcon, ElButton } from 'element-plus'
import type { SortableEvent, Options as SortableOptions } from 'sortablejs'
import Sortable from 'sortablejs'

import type { TitleBar } from './type'

export interface PlusTableToolbarProps {
  columns?: PlusColumn[]
  titleBar?: boolean | TitleBar
  filterTableHeaderOverflowLabelLength?: number
  defaultSize?: ComponentSize
  changeColumns?: PlusColumn[]
}
export interface PlusTableToolbarEmits {
  (e: 'filterTable', columns: PlusColumn[]): void
  (e: 'clickDensity', size: ComponentSize): void
  (e: 'refresh'): void
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
  titleBar: true,
  filterTableHeaderOverflowLabelLength: 6,
  defaultSize: 'default',
  changeColumns: () => []
})
const emit = defineEmits<PlusTableToolbarEmits>()
const checkboxGroupInstance = ref(null)
const titleBarConfig = computed<TitleBar>(() => props.titleBar as any)

const iconSize = computed(() => titleBarConfig.value.icon?.size || 18)
const iconColor = computed(() => titleBarConfig.value.icon?.color)

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

const subColumns = computed(() => props.columns.filter(item => unref(item.hideInTable) !== true))

const state: State = reactive({
  checkAll: true,
  isIndeterminate: false,
  bigImageVisible: false,
  srcList: [],
  checkList: cloneDeep(subColumns.value).map(item => getTableKey(item))
})

const handleCheckAllChange = (val: CheckboxValueType) => {
  state.checkList = val ? cloneDeep(subColumns.value).map(item => getTableKey(item)) : []
  state.isIndeterminate = false
}

const handleFilterTableConfirm = () => {
  const columns = cloneDeep(subColumns.value)
  const filterColumns = columns.filter(item => state.checkList.includes(getTableKey(item)))
  emit('filterTable', filterColumns)
}

const handleCheckGroupChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length
  state.checkAll = checkedCount === subColumns.value.length
  state.isIndeterminate = checkedCount > 0 && checkedCount < subColumns.value.length

  handleFilterTableConfirm()
}

// 密度
const handleClickDensity = (size: ComponentSize) => {
  emit('clickDensity', size)
}
// 刷新
const handleRefresh = () => {
  emit('refresh')
}

const getLabel = (label: string) => {
  if (label?.length <= props.filterTableHeaderOverflowLabelLength) {
    return label
  }
  return label?.slice(0, props.filterTableHeaderOverflowLabelLength) + '...'
}

// checkbox列拖拽
const handleDrop = () => {
  const checkbox = checkboxGroupInstance.value // 获取容器元素
  if (!checkbox) return
  let config: SortableOptions = {
    onEnd: handleDragEnd
  }
  const dragSort = (
    (props.titleBar as any)?.columnSetting as { dragSort?: boolean | Partial<SortableOptions> }
  )?.dragSort
  if (isPlainObject(dragSort)) {
    config = { ...config, ...(dragSort as SortableOptions), handle: '.plus-handle' }
  }
  new Sortable(checkbox as HTMLElement, config)
}
const handleDragEnd = (event: SortableEvent) => {
  const subDragCheckboxList = cloneDeep(props.changeColumns)
  const draggedCheckbox = props.changeColumns[event.oldIndex as number]
  subDragCheckboxList.splice(event.oldIndex as number, 1)
  subDragCheckboxList.splice(event.newIndex as number, 0, draggedCheckbox)
  emit('filterTable', subDragCheckboxList)
}

onMounted(() => {
  const dragSort = (
    (props.titleBar as any)?.columnSetting as { dragSort?: boolean | Partial<SortableOptions> }
  )?.dragSort
  if (dragSort !== false) {
    if (checkboxGroupInstance.value) {
      handleDrop()
    }
  }
})
</script>
