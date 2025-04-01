<template>
  <el-table-column
    key="actionBar"
    class-name="plus-table-action-bar"
    :label="unref(label) || t('plus.table.action')"
    :fixed="fixed || 'right'"
    :width="width || 200"
    v-bind="actionBarTableColumnProps"
  >
    <template #default="{ row, $index, ...rest }">
      <!-- 显示出来的按钮 -->
      <template v-for="buttonRow in getSubButtons(row, $index).preButtons" :key="buttonRow.text">
        <component :is="render(row, buttonRow, $index, rest)" />
      </template>

      <!-- 隐藏的按钮 -->
      <el-dropdown
        v-if="getSubButtons(row, $index).showMore"
        trigger="click"
        class="plus-table-action-bar__dropdown"
        :hide-on-click="hideOnClick"
      >
        <span class="plus-table-action-bar__dropdown__link">
          <span class="plus-table-action-bar__more-text"> {{ t('plus.table.more') }}</span>
          <slot name="action-bar-more-icon">
            <el-icon>
              <ArrowDownBold />
            </el-icon>
          </slot>
        </span>

        <!-- 下拉按钮 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="buttonRow in getSubButtons(row, $index).nextButtons"
              :key="(unref(buttonRow.text) as string)"
            >
              <component :is="render(row, buttonRow, $index, rest)" />
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
import type { VNode, AppContext, Ref, ComputedRef, Component } from 'vue'
import { h, unref, withDirectives, inject, ref } from 'vue'
import { ArrowDownBold } from '@element-plus/icons-vue'
import type { ElMessageBoxOptions } from 'element-plus'
import {
  ElButton,
  ElIcon,
  ElLink,
  ElTooltip,
  ElMessageBox,
  ElTableColumn,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElPopconfirm
} from 'element-plus'
import type { RecordType } from '@plus-pro-components/types'
import { isFunction, isPlainObject } from '@plus-pro-components/components/utils'
import { useLocale } from '@plus-pro-components/hooks'
import { TableFormRefInjectionKey } from '@plus-pro-components/constants'
import type {
  ButtonsCallBackParams,
  ActionBarButtonsRow,
  TableFormRefRow,
  ActionBarProps
} from './type'

export interface PlusTableActionBarEmits {
  (e: 'clickAction', data: ButtonsCallBackParams): void
  (e: 'clickActionConfirmCancel', data: ButtonsCallBackParams): void
}

type Params = {
  text: string
  row: RecordType
  buttonRow: ActionBarButtonsRow
  index: number
  rest: RecordType
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
  actionBarTableColumnProps: () => ({}),
  confirmType: 'messageBox',
  showLimitIncludeMore: false
})
const emit = defineEmits<PlusTableActionBarEmits>()

const { t } = useLocale()

// 控制下拉不隐藏，防止气泡定位异常
const hideOnClick = ref(true)

const formRefs = inject(TableFormRefInjectionKey) as Ref<Record<string | number, TableFormRefRow[]>>

const getSubButtons = (row: RecordType, index: number) => {
  const data = props.buttons.filter(item => {
    if (isFunction(item.show)) {
      const tempFunction = item.show as (
        row: RecordType,
        index: number,
        button: ActionBarButtonsRow
      ) => boolean | Ref<boolean> | ComputedRef<boolean>
      const isShow = tempFunction(row, index, item)
      return unref(isShow) !== false
    }
    return unref(item.show) !== false
  })
  //  显示更多
  const showMore = data.length > props.showNumber
  if (!showMore) {
    return {
      showMore,
      preButtons: data,
      nextButtons: []
    }
  }
  if (props.showLimitIncludeMore) {
    return {
      showMore,
      preButtons: data.slice(0, props.showNumber - 1),
      nextButtons: data.slice(props.showNumber - 1)
    }
  }
  return {
    showMore,
    preButtons: data.slice(0, props.showNumber),
    nextButtons: data.slice(props.showNumber)
  }
}

/**
 * 获取确认按钮参数
 * @param buttonRow
 * @param callbackParams
 */
const getConfirmParams = (params: Params, e?: MouseEvent) => {
  const { row, buttonRow, index, rest, text } = params
  const callbackParams = {
    /**
     * 解析后的按钮数据中的text
     * @version v0.1.17
     */
    text,
    row,
    buttonRow,
    index,
    rowIndex: index,
    e,
    formRefs: formRefs.value[index],
    ...rest
  } as ButtonsCallBackParams

  let message = t('plus.table.confirmToPerformThisOperation')
  let title = t('plus.table.prompt')
  let options: ElMessageBoxOptions | undefined = undefined
  let appContext: AppContext | undefined | null = null

  if (isPlainObject(buttonRow.confirm)) {
    const tempTitle = isFunction(buttonRow.confirm.title)
      ? buttonRow.confirm.title(callbackParams)
      : (buttonRow.confirm.title as string)

    if (tempTitle) {
      title = tempTitle
    }

    const tempMessage = isFunction(buttonRow.confirm.message)
      ? buttonRow.confirm.message(callbackParams)
      : (buttonRow.confirm.message as string)

    if (tempMessage) {
      message = tempMessage
    }

    options = buttonRow.confirm?.options
    appContext = buttonRow.confirm?.appContext
  }

  return { msg: { message, title, options, appContext }, callbackParams }
}

// 渲染
const render = (
  row: RecordType,
  buttonRow: ActionBarButtonsRow,
  index: number,
  rest: RecordType
): VNode => {
  /**
   *button props新增计算属性和函数类型支持
   */
  const buttonRowProps = isFunction(buttonRow.props)
    ? buttonRow.props(row, index, buttonRow)
    : unref(buttonRow.props)

  const text = isFunction(buttonRow.text)
    ? unref(buttonRow.text(row, index, buttonRow))
    : unref(buttonRow.text)

  const params: Params = {
    text,
    row,
    buttonRow,
    index,
    rest
  }

  const { msg, callbackParams } = getConfirmParams(params)

  if (props.type === 'icon') {
    return h(
      ElTooltip,
      { placement: 'top', content: text as string, ...buttonRow.tooltipProps },
      () =>
        props.confirmType === 'popconfirm' && buttonRow.confirm
          ? h(
              'span',
              {
                class: 'el-icon'
              },
              h(
                ElPopconfirm,
                {
                  trigger: 'click',
                  ...(isPlainObject(buttonRow.confirm) ? buttonRow.confirm?.popconfirmProps : {}),
                  title: msg.message,
                  onConfirm: (event: MouseEvent) => handleConfirm({ ...callbackParams, e: event }),
                  onCancel: (event: MouseEvent) => handleCancel({ ...callbackParams, e: event })
                },
                {
                  reference: () =>
                    withDirectives(
                      h(
                        ElIcon,
                        {
                          size: 16,
                          style: { margin: 0 },
                          ...buttonRowProps,
                          onClick: () => {
                            // 控制下拉不隐藏，防止气泡定位异常
                            hideOnClick.value = false

                            if (isFunction(buttonRow.onClick)) {
                              buttonRow.onClick(callbackParams)
                            }
                          }
                        },
                        () => (buttonRow.icon ? h(buttonRow.icon) : '')
                      ),
                      buttonRow.directives || []
                    )
                }
              )
            )
          : withDirectives(
              h(
                ElIcon,
                {
                  size: 16,
                  ...buttonRowProps,
                  onClick: (event: MouseEvent) =>
                    handleClickAction({ ...callbackParams, e: event }, msg)
                },
                () => (buttonRow.icon ? h(buttonRow.icon) : '')
              ),
              buttonRow.directives || []
            )
    )
  } else {
    const Tag: Component = props.type === 'button' ? ElButton : ElLink

    // FIXME: fix SSR click it auto scrollTo page top
    const defaultProps = props.type === 'link' ? { href: 'javaScript:;' } : {}

    return props.confirmType === 'popconfirm' && buttonRow.confirm
      ? h(
          ElPopconfirm,
          {
            trigger: 'click',
            ...(isPlainObject(buttonRow.confirm) ? buttonRow.confirm?.popconfirmProps : {}),
            title: msg.message,
            onConfirm: (event: MouseEvent) => handleConfirm({ ...callbackParams, e: event }),
            onCancel: (event: MouseEvent) => handleCancel({ ...callbackParams, e: event })
          },
          {
            reference: () =>
              withDirectives(
                h(
                  Tag,
                  {
                    size: 'small',
                    ...defaultProps,
                    ...buttonRowProps,
                    onClick: () => {
                      // 控制下拉不隐藏，防止气泡定位异常
                      hideOnClick.value = false

                      if (isFunction(buttonRow.onClick)) {
                        buttonRow.onClick(callbackParams)
                      }
                    }
                  },
                  () => text
                ),
                buttonRow.directives || []
              )
          }
        )
      : withDirectives(
          h(
            Tag,
            {
              size: 'small',
              ...defaultProps,
              ...buttonRowProps,
              onClick: (event: MouseEvent) =>
                handleClickAction({ ...callbackParams, e: event }, msg)
            },
            () => text
          ),
          buttonRow.directives || []
        )
  }
}

// 气泡确认
const handleConfirm = (callbackParams: ButtonsCallBackParams) => {
  if (isFunction(callbackParams.buttonRow.onConfirm)) {
    callbackParams.buttonRow.onConfirm(callbackParams)
  }
  emit('clickAction', callbackParams)
}

// 气泡取消
const handleCancel = (callbackParams: ButtonsCallBackParams) => {
  if (isFunction(callbackParams.buttonRow.onCancel)) {
    callbackParams.buttonRow.onCancel(callbackParams)
  }
  emit('clickActionConfirmCancel', callbackParams)
}

// 分发按钮事件
const handleClickAction = (callbackParams: ButtonsCallBackParams, msg: RecordType) => {
  hideOnClick.value = true
  const { buttonRow } = callbackParams

  /**
   * add self onClick event support
   * @version v0.1.8
   */
  if (isFunction(buttonRow.onClick)) {
    buttonRow.onClick(callbackParams)
  }

  if (buttonRow.confirm) {
    // 二次确认类型是 messageBox
    if (props.confirmType === 'messageBox') {
      const { message, title, options, appContext } = msg

      ElMessageBox.confirm(message, title, options, appContext)
        .then(() => {
          /**
           * add self onConfirm event support
           * @version v0.1.8
           */
          if (isFunction(buttonRow.onConfirm)) {
            buttonRow.onConfirm(callbackParams)
          }

          emit('clickAction', callbackParams)
        })
        .catch(() => {
          /**
           * add self onCancel event support
           * @version v0.1.8
           */
          if (isFunction(buttonRow.onCancel)) {
            buttonRow.onCancel(callbackParams)
          }

          emit('clickActionConfirmCancel', callbackParams)
        })
    }
  } else {
    emit('clickAction', callbackParams)
  }
}
</script>
