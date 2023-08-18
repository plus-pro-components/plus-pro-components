<template>
  <PlusForm
    ref="plusFormInstance"
    v-model="state.values"
    :inline="inline"
    :row-props="rowProps"
    :col-props="colProps"
    :columns="subColumns"
    :has-footer="false"
    class="plus-search"
    v-bind="$attrs"
    @change="handleChange"
  >
    <template #searchFooter>
      <el-form-item v-if="hasFooter" class="plus-search__button__wrapper">
        <el-button v-if="hasReset" :icon="RefreshRight" @click="handleReset">
          {{ resetText || t('plus.search.resetText') }}
        </el-button>
        <el-button type="primary" :loading="searchLoading" :icon="Search" @click="handleSearch">
          {{ searchText || t('plus.search.searchText') }}
        </el-button>

        <el-button v-if="hasUnfold" type="primary" link @click="handleUnfold">
          {{ isShowUnfold ? t('plus.search.expand') : t('plus.search.retract') }}
          <el-icon>
            <ArrowDown v-if="isShowUnfold" />
            <ArrowUp v-else />
          </el-icon>
        </el-button>
      </el-form-item>
    </template>
  </PlusForm>
</template>

<script lang="ts" setup>
import type { PlusFormInstance } from '@plus-pro-components/components/form'
import { PlusForm } from '@plus-pro-components/components/form'
import { reactive, ref, toRefs, computed, watch } from 'vue'
import type { FormProps, RowProps, ColProps } from 'element-plus'
import { ArrowDown, ArrowUp, Search, RefreshRight } from '@element-plus/icons-vue'
import type { PlusColumn, FieldValues, Mutable } from '@plus-pro-components/types'
import { cloneDeep } from 'lodash-es'
import { useLocale } from '@plus-pro-components/hooks'

export interface PlusSearchProps extends /* @vue-ignore */ Partial<Mutable<FormProps>> {
  modelValue: FieldValues
  columns: PlusColumn[]
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
  subColumns: any[]
  originData: any
}
export interface PlusSearchEmits {
  (e: 'update:modelValue', values: FieldValues): void
  (e: 'search', values: FieldValues): void
  (e: 'change', values: FieldValues, column: PlusColumn): void
  (e: 'reset'): void
}

defineOptions({
  name: 'PlusSearch'
})

const props = withDefaults(defineProps<PlusSearchProps>(), {
  modelValue: () => ({}),
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
const plusFormInstance = ref<PlusFormInstance>()
const state = reactive<PlusSearchState>({
  values: {},
  subColumns: [],
  originData: [],
  isShowUnfold: true
})

watch(
  () => props.modelValue,
  val => {
    state.values = val
  },
  {
    deep: true,
    immediate: true
  }
)

state.originData = computed<any[]>(() => {
  return props.columns.filter(item => item.hideInSearch !== true)
})

if (props.hasUnfold) {
  state.subColumns = cloneDeep(state.originData).slice(0, props.showNumber)
} else {
  state.subColumns = cloneDeep(state.originData)
}

const handleChange = async (values: FieldValues, column: PlusColumn) => {
  emit('change', values, column)
  emit('update:modelValue', values)
}

const handleSearch = async () => {
  emit('search', cloneDeep(state.values))
}

const handleReset = (): void => {
  state.values = {}
  emit('reset')
}

const handleUnfold = () => {
  state.isShowUnfold = !state.isShowUnfold
  if (state.subColumns.length > props.showNumber) {
    state.subColumns = state.subColumns.slice(0, props.showNumber)
  } else {
    state.subColumns = cloneDeep(state.originData)
  }
}

defineExpose({
  plusFormInstance
})

const { isShowUnfold, subColumns } = toRefs(state)
</script>
