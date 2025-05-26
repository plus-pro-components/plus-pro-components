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
          <slot name="refresh-icon">
            <el-icon
              :size="iconSize"
              :color="iconColor"
              class="plus-table-title-bar__toolbar__icon"
            >
              <RefreshRight />
            </el-icon>
          </slot>
        </el-tooltip>
      </span>

      <!-- 表格密度 -->
      <PlusPopover
        v-if="titleBarConfig?.density !== false"
        placement="bottom"
        :width="200"
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
            <slot name="density-icon">
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
            </slot>
          </el-tooltip>
        </template>
      </PlusPopover>

      <!-- 列设置 -->
      <PlusPopover
        v-if="titleBarConfig?.columnSetting !== false"
        placement="bottom"
        :width="columnSettingPopoverWidth"
        trigger="click"
        :title="t('plus.table.columnSettings')"
      >
        <div class="plus-table-checkbox-checkAll">
          <el-checkbox
            v-model="state.checkAll"
            :indeterminate="state.isIndeterminate"
            @change="handleCheckAllChange"
          >
            {{ t('plus.table.selectAll') }}
          </el-checkbox>

          <el-link
            v-if="columnSetting?.reset !== false"
            type="primary"
            :underline="(versionIsLessThan299 ? false : 'never') as any"
            href="javaScript:;"
            v-bind="isPlainObject(columnSetting?.reset) ? columnSetting?.reset : {}"
            @click.stop.prevent="resetCheckBoxList"
          >
            {{ t('plus.table.resetText') }}
          </el-link>
        </div>

        <el-checkbox-group v-model="state.checkList" @change="handleCheckGroupChange">
          <div ref="checkboxGroupInstance" class="plus-table-checkbox-sortable-list">
            <div v-for="item in columns" :key="item.prop" class="plus-table-checkbox-item">
              <div v-if="columnSetting?.dragSort !== false" class="plus-table-checkbox-handle">
                <slot name="drag-sort-icon">☷</slot>
              </div>

              <!-- element-plus 版本号小于2.6.0 -->
              <template v-if="versionIsLessThan260">
                <el-checkbox
                  :label="getTableKey(item)"
                  :disabled="item.disabledHeaderFilter"
                  class="plus-table-title-bar__toolbar__checkbox__item"
                >
                  <el-tooltip
                    v-if="getLabel(item.label).length > overflowLabelLength"
                    :content="getLabel(item.label)"
                    placement="right-start"
                  >
                    {{ getLabelValue(item.label) }}
                  </el-tooltip>
                  <span v-else> {{ item.label ? getLabelValue(item.label) : '' }}</span>
                </el-checkbox>
              </template>
              <!-- element-plus 版本号大于等于2.6.0 -->
              <template v-else>
                <el-checkbox
                  :value="getTableKey(item)"
                  :disabled="item.disabledHeaderFilter"
                  class="plus-table-title-bar__toolbar__checkbox__item"
                >
                  <el-tooltip
                    v-if="getLabel(item.label).length > overflowLabelLength"
                    :content="getLabel(item.label)"
                    placement="right-start"
                  >
                    {{ getLabelValue(item.label) }}
                  </el-tooltip>
                  <span v-else> {{ item.label ? getLabelValue(item.label) : '' }}</span>
                </el-checkbox>
              </template>
            </div>
          </div>
        </el-checkbox-group>

        <template #reference>
          <el-tooltip effect="dark" :content="t('plus.table.columnSettings')" placement="top">
            <slot name="column-settings-icon">
              <el-icon
                :size="iconSize"
                :color="iconColor"
                class="plus-table-title-bar__toolbar__icon"
              >
                <Setting />
              </el-icon>
            </slot>
          </el-tooltip>
        </template>
      </PlusPopover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { reactive, computed, unref, onMounted, ref, watch } from 'vue'
import { cloneDeep } from 'lodash-es'
import type { PlusColumn } from '@plus-pro-components/types'
import { Setting, RefreshRight } from '@element-plus/icons-vue'
import { PlusPopover } from '@plus-pro-components/components/popover'
import type { ComponentSize } from 'element-plus/es/constants'
import type { CheckboxValueType } from 'element-plus'
import { useLocale } from '@plus-pro-components/hooks'
import {
  getTableKey,
  isPlainObject,
  versionIsLessThan260,
  versionIsLessThan299,
  getLabel
} from '@plus-pro-components/components/utils'
import { ElCheckbox, ElCheckboxGroup, ElTooltip, ElIcon, ElButton, ElLink } from 'element-plus'
import type { SortableEvent, Options as SortableOptions } from 'sortablejs'
import Sortable from 'sortablejs'
import type { TitleBar, ColumnSetting, FilterTableHeaderEventType } from './type'

export interface PlusTableToolbarProps {
  columns?: PlusColumn[]
  titleBar?: boolean | Partial<TitleBar>
  defaultSize?: ComponentSize
  columnsIsChange?: boolean
}
export interface PlusTableToolbarEmits {
  (e: 'filterTableHeader', columns: PlusColumn[], eventType: FilterTableHeaderEventType): void
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
  defaultSize: 'default',
  columnsIsChange: false
})
const emit = defineEmits<PlusTableToolbarEmits>()

const originColumns: PlusColumn[] = cloneDeep(props.columns)

const { t } = useLocale()

const checkboxGroupInstance = ref<HTMLElement | null>(null)
const titleBarConfig = computed(() => props.titleBar as TitleBar)
const iconSize = computed(() => titleBarConfig.value?.icon?.size || 18)
const iconColor = computed(() => titleBarConfig.value?.icon?.color || '')
const columnSetting = computed(() => titleBarConfig.value?.columnSetting as ColumnSetting)
const columnSettingPopoverWidth = computed(() => columnSetting.value?.popoverWidth || 100)
const overflowLabelLength = computed(() => columnSetting.value?.overflowLabelLength || 6)
const sortable = ref<Sortable | null>(null)

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

const getCheckList = (hasDisabled = false) => {
  if (hasDisabled) {
    return props.columns
      .filter(item => item.disabledHeaderFilter === true)
      .filter(item => unref(item.headerIsChecked) !== false)
      .map(item => getTableKey(item))
  }
  return props.columns
    .filter(item => unref(item.headerIsChecked) !== false)
    .map(item => getTableKey(item))
}

const state: State = reactive({
  checkAll: true,
  isIndeterminate: false,
  bigImageVisible: false,
  srcList: [],
  checkList: []
})

const setCheckAllState = (value: any[]) => {
  const checkedCount = value.length
  state.checkAll = checkedCount === props.columns.length
  state.isIndeterminate = checkedCount > 0 && checkedCount < props.columns.length
}

watch(
  () => props.columnsIsChange,
  () => {
    state.checkList = getCheckList()
    setCheckAllState(state.checkList)
  },
  {
    immediate: true
  }
)

// 全选/取消全选
const handleCheckAllChange = (val: CheckboxValueType) => {
  state.checkList = val
    ? props.columns.map(item => getTableKey(item))
    : props.columns
        .filter(item => item.disabledHeaderFilter === true)
        .map(item => getTableKey(item))

  setCheckAllState(state.checkList)
  handleFilterTableConfirm('allCheck')
}

const handleFilterTableConfirm = (type: 'check' | 'allCheck' | 'drag') => {
  const filterColumns = props.columns.map(item => {
    if (state.checkList.includes(getTableKey(item))) {
      return { ...item, headerIsChecked: true }
    }

    return { ...item, headerIsChecked: false }
  })
  emit('filterTableHeader', filterColumns, type)
}

const handleCheckGroupChange = (value: CheckboxValueType[]) => {
  setCheckAllState(value)
  handleFilterTableConfirm('check')
}

// 密度
const handleClickDensity = (size: ComponentSize) => {
  emit('clickDensity', size)
}
// 刷新
const handleRefresh = () => {
  emit('refresh')
}

const getLabelValue = (label?: PlusColumn['label']) => {
  const tempLabel = getLabel(label)
  if (tempLabel && tempLabel?.length <= overflowLabelLength.value) {
    return tempLabel
  }
  return tempLabel?.slice(0, overflowLabelLength.value) + '...'
}

// checkbox列拖拽
const handleDrop = () => {
  if (!checkboxGroupInstance.value) return

  let config: SortableOptions = {
    onEnd: handleDragEnd,
    ghostClass: 'plus-table-ghost-class'
  }
  const dragSort = columnSetting.value?.dragSort
  if (isPlainObject(dragSort)) {
    config = { ...config, ...(dragSort as SortableOptions), handle: '.plus-table-checkbox-handle' }
  }
  sortable.value = new Sortable(checkboxGroupInstance.value as HTMLElement, config)
}
const handleDragEnd = (event: SortableEvent) => {
  const subDragCheckboxList = cloneDeep(props.columns)
  const draggedCheckbox = props.columns[event.oldIndex as number]
  subDragCheckboxList.splice(event.oldIndex as number, 1)
  subDragCheckboxList.splice(event.newIndex as number, 0, draggedCheckbox)

  /**
   * FIXME:
   * filter item is undefined
   */
  const list = subDragCheckboxList.filter(item => item)
  emit('filterTableHeader', list, 'drag')
}

// 重置
const resetCheckBoxList = () => {
  state.checkList = originColumns
    .filter(item => unref(item.headerIsChecked) !== false)
    .map(item => getTableKey(item))
  setCheckAllState(state.checkList)
  const filterColumns = originColumns.map(item => ({ ...item }))
  emit('filterTableHeader', filterColumns, 'reset')
}

onMounted(() => {
  const dragSort = columnSetting.value?.dragSort
  if (dragSort !== false) {
    if (checkboxGroupInstance.value) {
      handleDrop()
    }
  }
})
</script>
