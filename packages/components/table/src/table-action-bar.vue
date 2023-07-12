<template>
  <el-table-column
    v-if="show"
    key="actionBar"
    class-name="plus-table-action-bar"
    align="center"
    label="操作"
    fixed="right"
    :width="optionColumnWidth + 'px'"
    v-bind="actionBarProps"
  >
    <template #default="{ row, $index }">
      <!-- 显示出来的按钮 -->
      <template v-for="buttonRow in getPreButtonOptions(row)" :key="buttonRow.text">
        <component :is="() => render(row, buttonRow, $index)" />
      </template>

      <!-- 隐藏的按钮 -->
      <el-dropdown v-if="isShowMore(row)" trigger="click" class="plus-table-action-bar__dropdown">
        <span class="plus-table-action-bar__dropdown__link">
          更多
          <el-icon>
            <ArrowDownBold />
          </el-icon>
        </span>

        <!-- 下拉按钮 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="buttonRow in getNextButtonOptions(row)" :key="buttonRow.text">
              <component :is="() => render(row, buttonRow, $index)" />
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
import type { VNode } from 'vue'
import { h } from 'vue'
import { ArrowDownBold } from '@element-plus/icons-vue'
import { ElButton, ElLink } from 'element-plus'
import type { RecordType } from '@plus-pro-components/types'
import type { ButtonsCallBackParams, ButtonsNameKeyRow, ButtonsNameRow } from './type'

/**
 * 表格操作栏数据类型
 */
export interface PlusTableActionBarProps {
  show?: boolean
  buttonCount?: number
  buttonType?: 'icon' | 'button' | 'link'
  buttonsName?: Partial<ButtonsNameRow>
  optionColumnWidth?: number
  /**
   * 表格操作栏 el-table-column 的其他props
   */
  actionBarProps?: RecordType
}

export interface PlusTableActionBarEmits {
  (e: 'subClickButton', data: ButtonsCallBackParams): void
}

defineOptions({
  name: 'PlusTableActionBar'
})

const props = withDefaults(defineProps<PlusTableActionBarProps>(), {
  show: true,
  buttonCount: 3,
  buttonType: 'link',
  buttonsName: () => ({}),
  actionBarProps: () => ({}),
  optionColumnWidth: 300
})
const emit = defineEmits<PlusTableActionBarEmits>()
const render = (row: any, buttonRow: ButtonsNameKeyRow, index: number): VNode => {
  if (props.buttonType === 'button') {
    return h(
      ElButton,
      {
        type: buttonRow?.type,
        title: buttonRow?.text,
        size: buttonRow?.size || 'small',
        onClick: (event: MouseEvent) => handleClickOption(row, buttonRow, index, event)
      },
      () => buttonRow?.text
    )
  } else {
    return h(
      ElLink,
      {
        class: 'plus-table-action-bar__column__link',
        type: buttonRow?.type,
        title: buttonRow?.text,
        size: buttonRow?.size || 'small',
        onClick: (event: MouseEvent) => handleClickOption(row, buttonRow, index, event)
      },
      () => buttonRow?.text
    )
  }
}
// 获取当前操作的按钮组
const getOptionsName = (buttonKey: string): ButtonsNameKeyRow[] =>
  props.buttonsName[buttonKey] || []

// 获取'更多'之前的按钮组
const getPreButtonOptions = (row: any) => getOptionsName(row.buttonKey).slice(0, props.buttonCount)

// 获取'更多'之后的按钮组
const getNextButtonOptions = (row: any) => getOptionsName(row.buttonKey).slice(props.buttonCount)

// 是否显示'更多'之后的按钮组
const isShowMore = (row: any) => {
  const showMore = getOptionsName(row.buttonKey).length > props.buttonCount
  return showMore
}
// 分发按钮事件
const handleClickOption = (
  row: RecordType,
  buttonRow: ButtonsNameKeyRow,
  index: number,
  e: MouseEvent
) => {
  if (buttonRow.disabled !== true) {
    const data: ButtonsCallBackParams = { row, buttonRow, index, e }
    emit('subClickButton', data)
  }
}
</script>

<style lang="scss">
.plus-table-action-bar {
  .cell {
    display: flex;
    align-items: center;
  }
  .plus-table-action-bar__dropdown__link {
    cursor: pointer;
  }
  .plus-table-action-bar__column__link {
    margin-right: 10px;
  }
  .plus-table-action-bar__dropdown {
    vertical-align: baseline;
    cursor: pointer;
    margin-left: 5px;
  }
}
</style>
