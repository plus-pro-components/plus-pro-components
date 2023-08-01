<template>
  <el-form
    ref="formInstance"
    :model="state.values"
    :rules="rules"
    :label-width="labelWidth"
    :inline="inline"
    class="plus-search"
    :label-position="labelPosition"
    :validate-on-rule-change="false"
    :label-suffix="labelSuffix"
    v-bind="$attrs"
  >
    <el-row v-bind="rowProps">
      <el-col v-for="item in subColumns" :key="item.prop" v-bind="colProps">
        <PlusFormItem v-model="state.values[item.prop]" v-bind="item" />
      </el-col>
      <el-col v-bind="colProps">
        <el-form-item v-if="hasFooter" class="plus-search__button__wrapper">
          <slot name="footer">
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
          </slot>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, toRefs, computed } from 'vue'
import type { FormInstance, FormRules, FormProps, RowProps, ColProps } from 'element-plus'
import { ArrowDown, ArrowUp, Search, RefreshRight } from '@element-plus/icons-vue'
import { PlusFormItem } from '@plus-pro-components/components/form-item'
import type { PlusColumn, FieldValues, Mutable } from '@plus-pro-components/types'
import { cloneDeep } from 'lodash-es'
import { useLocale } from '@plus-pro-components/hooks'

export interface PlusSearchProps extends /* @vue-ignore */ Partial<Mutable<FormProps>> {
  modelValue: FieldValues
  columns: PlusColumn[]
  labelWidth?: string
  labelPosition?: 'left' | 'right' | 'top'
  labelSuffix?: string
  hasFooter?: boolean
  hasReset?: boolean
  hasUnfold?: boolean
  searchText?: string
  resetText?: string
  searchLoading?: boolean
  inline?: boolean
  rules?: FormRules
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
  (e: 'update:modelValue', values: any): void
  (e: 'search', values: any): void
  (e: 'change', values: any): void
  (e: 'reset'): void
}

defineOptions({
  name: 'PlusSearch'
})

const props = withDefaults(defineProps<PlusSearchProps>(), {
  modelValue: () => ({}),
  labelWidth: '80px',
  labelPosition: 'left',
  labelSuffix: ':',
  hasFooter: true,
  hasReset: true,
  hasUnfold: true,
  searchLoading: false,
  searchText: '',
  resetText: '',
  inline: true,
  showNumber: 2,
  formProps: () => ({}),
  rules: () => ({}),
  columns: () => [],
  rowProps: () => ({
    gutter: 20
  }),
  colProps: () => ({
    xs: 24,
    sm: 12,
    md: 8,
    lg: 6,
    xl: 4
  })
})

const emit = defineEmits<PlusSearchEmits>()
const { t } = useLocale()

const formInstance = ref<FormInstance>()

const state = reactive<PlusSearchState>({
  values: { ...props.modelValue },
  subColumns: [],
  originData: [],
  isShowUnfold: true
})

watch(
  () => state.values,
  val => {
    emit('change', val)
    emit('update:modelValue', val)
  },
  {
    deep: true
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

const handleSearch = async () => {
  emit('search', state.values)
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
  formInstance
})

const { isShowUnfold, subColumns } = toRefs(state)
</script>
