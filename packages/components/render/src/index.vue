<template>
  <component
    :is="renderComponent"
    v-if="renderType === 'form'"
    v-model="state"
    v-bind="customFieldProps"
  />
  <component :is="renderComponent" v-else v-bind="customFieldProps" />
</template>

<script lang="ts" setup>
import { isVNode, h, watch, ref } from 'vue'
import type { VNode, Component } from 'vue'
import type { PlusColumn, FieldValueType } from '@plus-pro-components/types'
import { isString, isComponent } from '@plus-pro-components/utils'
import { handleSlots } from '@plus-pro-components/components/utils'

export interface PlusRenderProps {
  /**
   * 渲染的类型
   */
  renderType?: 'form'
  /**
   * 回调参数的第一个值
   */
  callbackValue?: FieldValueType
  customFieldProps?: PlusColumn['fieldProps'] | PlusColumn['formItemProps']
  // eslint-disable-next-line vue/require-default-prop
  render?: PlusColumn['renderField'] | ((...arg: any[]) => void)
  slots?: PlusColumn['slots']
  params?: Partial<PlusColumn>
  // eslint-disable-next-line vue/require-default-prop
  handleChange?: (...arg: any[]) => void
}
export interface PlusRenderEmits {
  (e: 'update:modelValue', data: FieldValueType): void
  (e: 'change', data: FieldValueType): void
}

defineOptions({
  name: 'PlusRender'
})

const props = withDefaults(defineProps<PlusRenderProps>(), {
  renderType: undefined,
  callbackValue: '',
  customFieldProps: () => ({}),
  params: () => ({}),
  slots: () => ({})
})

const state = ref()

watch(
  () => props.callbackValue,
  val => {
    state.value = val
  },
  {
    flush: 'post',
    immediate: true
  }
)

/**
 * 渲染自定义
 */
const renderComponent = () => {
  if (!props.render) return
  /** params 回调第一个参数值 */
  const value = state.value

  /** params 回调第二个参数值 */
  const params = { ...props.params } as PlusColumn

  /** dynamicComponent 组件 */
  const dynamicComponent =
    props.renderType === 'form'
      ? (props.render as Exclude<PlusColumn['renderField'], undefined>)(
          value,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          props.handleChange!,
          params as PlusColumn
        )
      : (props.render as any)(value, params)

  /** slots 插槽 */
  const slots = handleSlots(props.slots, value, params)

  /** string 标签字符串 */
  if (isString(dynamicComponent)) {
    return h(dynamicComponent as string, { ...props.customFieldProps }, slots)
  }

  /** Component 组件 */
  if (isComponent(dynamicComponent)) {
    const payload =
      props.renderType === 'form'
        ? { ...props.customFieldProps, modelValue: state.value, onChange: props.handleChange }
        : { ...props.customFieldProps }

    return h(dynamicComponent as Component, payload, slots)
  }

  /** VNode / J(T)SX  虚拟dom或者jsx */
  if (isVNode(dynamicComponent)) {
    const payload =
      props.renderType === 'form'
        ? {
            ...props.customFieldProps,
            ...dynamicComponent.props,
            modelValue: state.value
          }
        : {
            ...props.customFieldProps,
            ...dynamicComponent.props
          }

    return {
      ...dynamicComponent,
      props: payload
    } as VNode
  }
}
</script>
