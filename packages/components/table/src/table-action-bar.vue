<template>
  <el-table-column
    key="actionBar"
    class-name="plus-table-action-bar"
    align="center"
    :label="label || t('plus.table.action')"
    :fixed="fixed || 'right'"
    :width="width || 200"
    v-bind="props.actionBarTableColumnProps"
  >
    <template #default="{ row, $index }">
      <!-- 显示出来的按钮 -->
      <template v-for="buttonRow in getSubButtons(row, $index).preButtons" :key="buttonRow.text">
        <component :is="() => render(row, buttonRow, $index)" />
      </template>

      <!-- 隐藏的按钮 -->
      <el-dropdown
        v-if="getSubButtons(row, $index).showMore"
        trigger="click"
        class="plus-table-action-bar__dropdown"
      >
        <span class="plus-table-action-bar__dropdown__link">
          {{ t('plus.table.more') }}
          <el-icon>
            <ArrowDownBold />
          </el-icon>
        </span>

        <!-- 下拉按钮 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="buttonRow in getSubButtons(row, $index).nextButtons"
              :key="buttonRow.text"
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
import { h, unref } from 'vue'
import { ArrowDownBold } from '@element-plus/icons-vue'
import type { TableColumnCtx } from 'element-plus'
import {
  ElButton,
  ElIcon,
  ElLink,
  ElTooltip,
  ElMessageBox,
  ElTableColumn,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu
} from 'element-plus'
import type { RecordType } from '@plus-pro-components/types'
import { isFunction } from '@plus-pro-components/utils'
import { cloneDeep } from 'lodash-es'
import { useLocale } from '@plus-pro-components/hooks'

import type { ButtonsCallBackParams, ActionBarButtonsRow } from './type'

export interface ActionBarProps {
  /**
   * 操作栏名称  默认值为 `'操作栏'`
   *
   */
  label?: string
  /**
   * 操作栏固定   默认值为 `'right'`
   */
  fixed?: string
  /**
   * 显示出来的按钮个数  默认值为 `3`
   */
  showNumber?: number
  /**
   * 操作按钮的类型   默认值为 `'link'`
   */
  type?: 'icon' | 'button' | 'link'
  /**
   * 操作按钮集合   默认值为 `[]`
   */
  buttons?: ActionBarButtonsRow[]
  /**
   * 表格操作栏 el-table-column 的其width   默认值为 `200`
   */
  width?: string | number
  /**
   * 表格操作栏 el-table-column 的其他props   默认值为 `{}`
   */
  actionBarTableColumnProps?: Partial<TableColumnCtx<any>>
}
export interface PlusTableActionBarEmits {
  (e: 'clickAction', data: ButtonsCallBackParams): void
  (e: 'clickActionConfirmCancel', data: ButtonsCallBackParams): void
}

defineOptions({
  name: 'PlusTableActionBar'
})

const props = withDefaults(defineProps<ActionBarProps>(), {
  label: '',
  fixed: 'right',
  type: 'link',
  buttons: () => [],
  width: 200,
  showNumber: 3,
  actionBarTableColumnProps: () => ({})
})
const emit = defineEmits<PlusTableActionBarEmits>()

const { t } = useLocale()

const getSubButtons = (row: any, index: number) => {
  const data = cloneDeep(props.buttons).filter(item => {
    if (isFunction(item.show)) {
      const tempFunction = item.show as (
        row: any,
        index: number,
        button: ActionBarButtonsRow
      ) => boolean
      const isShow = tempFunction(row, index, item)
      return unref(isShow) !== false
    }
    return unref(item.show) !== false
  })
  // 获取'更多'之前的按钮组
  const preButtons = data.slice(0, props.showNumber)
  // 获取'更多'之后的按钮组
  const nextButtons = data.slice(props.showNumber)
  //  显示更多
  const showMore = data.length > props.showNumber
  return {
    showMore,
    preButtons,
    nextButtons
  }
}

// 渲染
const render = (row: any, buttonRow: ActionBarButtonsRow, index: number): VNode => {
  if (props.type === 'icon') {
    return h(
      ElTooltip,
      { placement: 'top', content: buttonRow.text, ...buttonRow.tooltipProps },
      () =>
        h(
          ElIcon,
          {
            size: 16,
            ...buttonRow.props,
            onClick: (event: MouseEvent) => handleClickAction(row, buttonRow, index, event)
          },
          () => (buttonRow.icon ? h(buttonRow.icon) : '')
        )
    )
  } else {
    const Tag = props.type === 'button' ? ElButton : ElLink
    return h(
      Tag as any,
      {
        size: 'small',
        // icon: buttonRow.icon,
        ...buttonRow.props,
        onClick: (event: MouseEvent) => handleClickAction(row, buttonRow, index, event)
      },
      () => buttonRow.text
    )
  }
}

// 分发按钮事件
const handleClickAction = (
  row: RecordType,
  buttonRow: ActionBarButtonsRow,
  index: number,
  e: MouseEvent
) => {
  const data: ButtonsCallBackParams = { row, buttonRow, index, e }
  if (buttonRow.confirm) {
    const title = isFunction(buttonRow.confirm.title)
      ? (buttonRow.confirm.title as any)(data)
      : buttonRow.confirm.title

    const message = isFunction(buttonRow.confirm.message)
      ? (buttonRow.confirm.message as any)(data)
      : buttonRow.confirm.message

    ElMessageBox.confirm(
      message || t('plus.table.confirmToPerformThisOperation'),
      title || t('plus.table.prompt'),
      buttonRow.confirm.options
    )
      .then(() => {
        emit('clickAction', data)
      })
      .catch(() => {
        emit('clickActionConfirmCancel', data)
      })
  } else {
    emit('clickAction', data)
  }
}
</script>
