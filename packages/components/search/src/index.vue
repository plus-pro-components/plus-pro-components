<template>
  <PlusForm
    ref="plusFormInstance"
    v-bind="$attrs"
    v-model="values"
    :inline="inline"
    :rules="rules"
    :label-position="labelPosition"
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

    <!--表单tooltip插槽 -->
    <template v-if="$slots['tooltip-icon']" #tooltip-icon>
      <slot name="tooltip-icon" />
    </template>

    <template #search-footer>
      <el-form-item
        v-if="hasFooter"
        class="plus-search__button__wrapper"
        :label="labelPosition === 'top' ? 'placeholder' : ''"
      >
        <slot
          name="footer"
          :is-show-unfold="isShowUnfold"
          :handle-reset="handleReset"
          :handle-search="handleSearch"
          :handle-unfold="handleUnfold"
          :search-loading="searchLoading"
        >
          <el-button v-if="hasReset" :icon="RefreshRight" @click="handleReset">
            {{ resetText || t('plus.search.resetText') }}
          </el-button>
          <el-button type="primary" :loading="searchLoading" :icon="Search" @click="handleSearch">
            {{ searchText || t('plus.search.searchText') }}
          </el-button>

          <el-link
            v-if="hasUnfold && originData.length > showNumber"
            class="plus-search__unfold"
            type="primary"
            :underline="false"
            href="javaScript:;"
            @click="handleUnfold"
          >
            {{
              isShowUnfold
                ? retractText || t('plus.search.retract')
                : expandText || t('plus.search.expand')
            }}
            <el-icon>
              <ArrowUp v-if="isShowUnfold" />
              <ArrowDown v-else />
            </el-icon>
          </el-link>
        </slot>
      </el-form-item>
    </template>
  </PlusForm>
</template>

<script lang="ts" setup>
import type { PlusFormInstance } from '@plus-pro-components/components/form'
import { PlusForm } from '@plus-pro-components/components/form'
import type { ComputedRef } from 'vue'
import { ref, computed, watch, unref, useSlots, useAttrs } from 'vue'
import { ArrowDown, ArrowUp, Search, RefreshRight } from '@element-plus/icons-vue'
import type { PlusColumn, FieldValues } from '@plus-pro-components/types'
import { useLocale } from '@plus-pro-components/hooks'
import { ElFormItem, ElButton, ElIcon, ElLink } from 'element-plus'
import { orderBy } from 'lodash-es'
import {
  getFieldSlotName,
  getLabelSlotName,
  getExtraSlotName,
  filterSlots
} from '@plus-pro-components/components/utils'
import type { FormRules } from 'element-plus'
import type { PlusSearchSelfProps as PlusSearchProps, PlusSearchEmits } from './type'

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
  retractText: '',
  expandText: '',
  inline: true,
  showNumber: 2,
  labelPosition: undefined,
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
  }),
  needValidate: false
})
const emit = defineEmits<PlusSearchEmits>()

const { t } = useLocale()
const plusFormInstance = ref<PlusFormInstance | null>()

const isShowUnfold = ref<boolean>(false)
const values = ref<FieldValues>({})
const slots = useSlots()
const attrs = useAttrs()
const rules: ComputedRef<FormRules | undefined> = computed(() =>
  props.needValidate ? (attrs.rules as FormRules) : undefined
)

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

const originData = computed<PlusColumn[]>(() => {
  const filterData = props.columns
    .filter(item => unref(item.hideInSearch) !== true)
    // FIXME:  hideInForm 不应该传递
    .map(item => ({ ...item, hideInForm: false }))
    // set order default value
    .map(item => ({ ...item, order: item?.order ? unref(item.order) : 0 }))
  return orderBy(filterData, ['order'], ['desc'])
})

const subColumns = computed<PlusColumn[]>(() => {
  if (props.hasUnfold && !isShowUnfold.value) {
    return originData.value.slice(0, props.showNumber)
  } else {
    return originData.value
  }
})

watch(
  () => props.modelValue,
  val => {
    values.value = val
  },
  {
    immediate: true
  }
)

const handleChange = async (values: FieldValues, column: PlusColumn) => {
  emit('update:modelValue', values)
  emit('change', values, column)
}

const handleSearchDefault = () => {
  emit('search', values.value)
}

const handleSearchValidate = async () => {
  const isValid = await plusFormInstance.value?.handleSubmit()
  if (isValid) {
    emit('search', values.value)
  }
}

const handleSearch = computed(() =>
  props.needValidate ? handleSearchValidate : handleSearchDefault
)

const handleReset = (): void => {
  values.value = { ...props.defaultValues }
  emit('update:modelValue', values.value)
  emit('reset', values.value)
}

const handleUnfold = (e: MouseEvent) => {
  e.preventDefault()
  isShowUnfold.value = !isShowUnfold.value
  emit('collapse', isShowUnfold.value)
}

defineExpose({
  plusFormInstance,
  handleReset,
  handleSearch: handleSearch.value,
  handleUnfold
})
</script>
