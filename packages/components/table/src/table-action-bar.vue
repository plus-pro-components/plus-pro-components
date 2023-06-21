<template>
  <el-table-column
    v-if="show"
    key="actionBar"
    class-name="plus-table-action-bar"
    align="center"
    label="操作"
    :width="optionColumnWidth + 'px'"
  >
    <template #default="{ row, $index }">
      <!-- 显示出来的按钮 -->
      <template v-for="buttonRow in getPreButtonOptions(row)" :key="buttonRow.text">
        <component :is="() => render(row, buttonRow, $index)" />
      </template>

      <!-- 隐藏的按钮 -->
      <el-dropdown v-if="isShowMore(row)" trigger="click" class="dropdown">
        <span class="dropdown-link">
          更多
          <el-icon class="el-icon-caret-bottom language-icon">
            <MoreFilled />
          </el-icon>
        </span>
        <!-- 下拉按钮 -->
        <template #dropdown>
          <el-dropdown-menu class="custom-dropdown-menu">
            <el-dropdown-item
              v-for="buttonRow in getNextButtonOptions(row)"
              :key="buttonRow.text"
              class="custom-dropdown-menu-item"
            >
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
import { MoreFilled } from '@element-plus/icons-vue'
import { ElButton, ElLink } from 'element-plus'
import type { ButtonsCallBackParams, ButtonsNameKeyRow, ButtonsNameRow } from './type'

export interface PlusTableActionBarProps {
  show?: boolean
  buttonCount?: number
  buttonType?: 'icon' | 'button' | 'link'
  buttonsName?: Partial<ButtonsNameRow>
  optionColumnWidth?: number
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
        class: 'action-bar-column-link',
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
<style lang="scss" scoped>
.action-bar-column-link {
  margin-right: 10px;
}
.el-dropdown {
  vertical-align: baseline;
  cursor: pointer;
  margin-left: 5px;
}
</style>
