<template>
  <PlusForm
    ref="plusFormInstance"
    v-bind="$attrs"
    v-model="state.values"
    :inline="inline"
    :row-props="rowProps"
    :col-props="colProps"
    :columns="subColumns"
    class="plus-search"
    :has-footer="false"
    @change="handleChange"
  >
    <!--表单项label插槽 -->
    <template v-for="(_, key) in labelSlots" :key="key" #[key]="data">
      <slot :name="key" v-bind="data" />
    </template>

    <!--表单单项的插槽 -->
    <template v-for="(_, key) in fieldSlots" :key="key" #[key]="data">
      <slot :name="key" v-bind="data" />
    </template>

    <!--el-form-item 下一行额外的内容 的插槽 -->
    <template v-for="(_, key) in extraSlots" :key="key" #[key]="data">
      <slot :name="key" v-bind="data" />
    </template>

    <template #search-footer>
      <slot
        name="footer"
        :is-show-unfold="isShowUnfold"
        :handle-reset="handleReset"
        :handle-search="handleSearch"
        :handle-unfold="handleUnfold"
      >
        <el-form-item v-if="hasFooter" class="plus-search__button__wrapper">
          <el-button v-if="hasReset" :icon="RefreshRight" @click="handleReset">
            {{ resetText || t('plus.search.resetText') }}
          </el-button>
          <el-button type="primary" :loading="searchLoading" :icon="Search" @click="handleSearch">
            {{ searchText || t('plus.search.searchText') }}
          </el-button>

          <el-button
            v-if="hasUnfold && state.originData.length > showNumber"
            type="primary"
            link
            @click="handleUnfold"
          >
            {{ isShowUnfold ? t('plus.search.retract') : t('plus.search.expand') }}
            <el-icon>
              <ArrowUp v-if="isShowUnfold" />
              <ArrowDown v-else />
            </el-icon>
          </el-button>
        </el-form-item>
      </slot>
    </template>
  </PlusForm>
</template>

<script lang="ts" setup>
import type { PlusFormInstance } from '@plus-pro-components/components/form'
import { PlusForm } from '@plus-pro-components/components/form'
import type { Ref } from 'vue'
import { reactive, ref, toRefs, computed, watch, unref, useSlots } from 'vue'
import type { FormProps, RowProps, ColProps } from 'element-plus'
import { ArrowDown, ArrowUp, Search, RefreshRight } from '@element-plus/icons-vue'
import type { PlusColumn, FieldValues, Mutable } from '@plus-pro-components/types'
import { cloneDeep } from 'lodash-es'
import { useLocale } from '@plus-pro-components/hooks'
import { ElFormItem, ElButton, ElIcon } from 'element-plus'
import {
  getFieldSlotName,
  getLabelSlotName,
  getExtraSlotName,
  filterSlots
} from '@plus-pro-components/components/utils'

export interface PlusSearchProps extends /* @vue-ignore */ Partial<Mutable<FormProps>> {
  modelValue?: FieldValues
  defaultValues?: FieldValues
  columns?: PlusColumn[]
  hasFooter?: boolean
  hasReset?: boolean
  hasUnfold?: boolean
  searchText?: string
  resetText?: string
  searchLoading?: boolean
  inline?: boolean
  showNumber?: number
  rowProps?: Partial<Mutable<RowProps>>
  colProps?: Partial<Mutable<ColProps>>
}
export interface PlusSearchState {
  values: FieldValues
  isShowUnfold: boolean
  subColumns: any
  originData: any
}
export interface PlusSearchEmits {
  (e: 'update:modelValue', values: FieldValues): void
  (e: 'search', values: FieldValues): void
  (e: 'change', values: FieldValues, column: PlusColumn): void
  (e: 'reset', values: FieldValues): void
}

defineOptions({
  name: 'PlusSearch'
})

const props = withDefaults(defineProps<PlusSearchProps>(), {
  modelValue: () => ({}),
  defaultValues: () => ({}),
  hasFooter: true,
  hasReset: true,
  hasUnfold: true,
  searchLoading: false,
  searchText: '',
  resetText: '',
  inline: true,
  showNumber: 2,
  columns: () => [],
  rowProps: () => ({
    gutter: 20
  }),
  colProps: () => ({
    xs: 24,
    sm: 12,
    md: 8,
    lg: 8,
    xl: 6
  })
})
const emit = defineEmits<PlusSearchEmits>()

const { t } = useLocale()
const plusFormInstance = ref<any>()
const state = reactive<PlusSearchState>({
  values: {},
  subColumns: [],
  originData: [],
  isShowUnfold: false
})

const slots = useSlots()

/**
 * 表单label的插槽
 */
const labelSlots = filterSlots(slots, getLabelSlotName())

/*
 * 表单单项的插槽
 */
const fieldSlots = filterSlots(slots, getFieldSlotName())
/**
 * el-form-item 下一行额外的内容 的插槽
 */
const extraSlots = filterSlots(slots, getExtraSlotName())

state.originData = computed<any[]>(() => {
  return (
    props.columns
      .filter(item => unref(item.hideInSearch) !== true)
      // FIXME:  hideInForm 不应该传递
      .map(item => ({ ...item, hideInForm: false }))
  )
})

state.subColumns = computed<any[]>(() => {
  const data = cloneDeep(state.originData)
  if (props.hasUnfold && !state.isShowUnfold) {
    return data.slice(0, props.showNumber)
  } else {
    return data
  }
})

watch(
  () => props.modelValue,
  val => {
    state.values = val
  },
  {
    immediate: true
  }
)

const handleChange = async (values: FieldValues, column: PlusColumn) => {
  emit('change', values, column)
  emit('update:modelValue', values)
}

const handleSearch = async () => {
  emit('search', state.values)
}

const handleReset = (): void => {
  state.values = { ...props.defaultValues }
  emit('reset', state.values)
}

const handleUnfold = () => {
  state.isShowUnfold = !state.isShowUnfold
}

defineExpose({
  plusFormInstance: plusFormInstance as Ref<PlusFormInstance>,
  handleReset,
  handleSearch,
  handleUnfold
})

const { isShowUnfold, subColumns } = toRefs(state)
</script>
