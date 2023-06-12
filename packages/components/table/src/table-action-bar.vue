<template>
  <el-table-column
    v-if="show"
    key="actionBar"
    class-name="plus-table-action-bar"
    align="center"
    label="操作"
  >
    <template #default="{ row, $index }">
      <!-- 显示出来的按钮 -->
      <template v-for="buttonRow in getPreButtonOptions(row)" :key="buttonRow.text">
        <el-link
          class="action-bar-column-button"
          :title="buttonRow.text"
          :class="{
            disabled: buttonRow.disabled
          }"
          :type="buttonRow.type"
          :size="buttonRow.size || 'small'"
          @click.stop="handleClickOption(row, buttonRow, $index, $event)"
        >
          {{ buttonRow.text }}
        </el-link>
      </template>

      <!-- 隐藏的按钮 -->
      <el-dropdown v-if="isShowMore(row)" trigger="click" class="dropdown">
        <span class="dropdown-link">
          更多
          <el-icon class="el-icon-caret-bottom language-icon">
            <ArrowDown />
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
              <el-link
                class="action-bar-column-button link"
                :title="buttonRow.text"
                :class="{
                  disabled: buttonRow.disabled
                }"
                :type="buttonRow.type"
                :size="buttonRow.size || 'small'"
                @click.stop="handleClickOption(row, buttonRow, $index, $event)"
              >
                {{ buttonRow.text }}
              </el-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
import type { ButtonsCallBackParams, ButtonsNameKeyRow, ButtonsNameRow } from './type'

export interface PlusTableActionBarProps {
  show?: boolean
  buttonCount?: number
  buttonType?: 'icon' | 'button' | 'link'
  buttonsName?: Partial<ButtonsNameRow>
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
  buttonsName: () => ({})
})
const emit = defineEmits<PlusTableActionBarEmits>()

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
