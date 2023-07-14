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
    v-bind="formProps"
  >
    <slot>
      <PlusFormItem
        v-for="item in subColumns"
        :key="item.prop"
        v-model="state.values[item.prop]"
        v-bind="item"
      />
    </slot>

    <el-form-item v-if="hasFooter" class="plus-search-footer">
      <slot name="footer">
        <el-button v-if="hasReset" @click="handleReset">
          {{ resetText }}
        </el-button>
        <el-button type="primary" :loading="searchLoading" @click="handleSearch">
          {{ searchText }}
        </el-button>

        <el-button v-if="hasUnfold" type="primary" link @click="handleUnfold">
          {{ isShowUnfold ? '展开' : '收起' }}
          <el-icon class="el-icon--right">
            <ArrowDown v-if="isShowUnfold" />
            <ArrowUp v-else />
          </el-icon>
        </el-button>
      </slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, toRefs, computed } from 'vue'
import type { FormInstance, FormRules, FormProps } from 'element-plus'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import PlusFormItem from '@plus-pro-components/components/form-item'
import type { PlusColumn, RecordType } from '@plus-pro-components/types'
import { cloneDeep } from 'lodash-es'

export interface PlusSearchProps {
  modelValue: RecordType
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
  formProps?: Partial<FormProps>
  showNumber?: number
}

export interface PlusSearchState {
  values: any
  isShowUnfold: boolean
  subColumns: any
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
  searchText: '查询',
  resetText: '重置',
  inline: true,
  showNumber: 2,
  formProps: () => ({}),
  rules: () => ({}),
  columns: () => []
})

const emit = defineEmits<PlusSearchEmits>()

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

state.originData = computed<any>(() => {
  return props.columns.filter(data => data.hideInSearch !== true)
})

state.subColumns = cloneDeep(state.originData).slice(0, props.showNumber)

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

<style lang="scss">
.plus-search {
  .plus-form-item {
    width: unset;
  }
  .plus-search-footer {
    float: right;
  }
}
</style>
