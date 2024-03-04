<template>
  <el-descriptions :title="title" :column="column" class="plus-description" border v-bind="$attrs">
    <slot>
      <template v-for="item in subColumns" :key="item.label">
        <el-descriptions-item
          :label="item.label"
          :class-name="(item.descriptionsItemProps?.className || '') + ' plus-description__name'"
          :label-class-name="
            (item.descriptionsItemProps?.labelClassName || '') + ' plus-description__label'
          "
          v-bind="item.descriptionsItemProps"
        >
          <template #label>
            <component
              :is="item.renderDescriptionsLabel"
              v-if="item.renderDescriptionsLabel && isFunction(item.renderDescriptionsLabel)"
              :label="item.label"
              :column="item"
              :row="data"
            />

            <!-- plus-desc-label-* -->
            <template v-else-if="$slots[getDescLabelSlotName(item.prop)]">
              <slot
                :name="getDescLabelSlotName(item.prop)"
                :column="item"
                :row="data"
                :label="item.label"
              />
            </template>

            <!-- normal -->
            <template v-else>{{ item.label }}</template>
          </template>

          <!-- renderDescriptionsItem -->
          <component
            :is="item.renderDescriptionsItem"
            v-if="item.renderDescriptionsItem && isFunction(item.renderDescriptionsItem)"
            :value="getDisplayValue(item.prop)"
            :column="item"
            :row="data"
          />

          <!-- plus-desc-* -->
          <template v-else-if="$slots[getDescSlotName(item.prop)]">
            <slot
              :name="getDescSlotName(item.prop)"
              :column="item"
              :row="data"
              :value="getDisplayValue(item.prop)"
            />
          </template>

          <!-- normal -->
          <template v-else>
            <PlusDisplayItem :column="item" :row="data" />
          </template>
        </el-descriptions-item>
      </template>
    </slot>

    <template #title>
      <slot name="title" />
    </template>

    <template #extra>
      <slot name="extra" />
    </template>
  </el-descriptions>
</template>

<script lang="ts" setup>
import type { ExtractPropTypes } from 'vue'
import { computed, unref } from 'vue'
import type { descriptionProps } from 'element-plus'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import type { PlusColumn, RecordType, Mutable } from '@plus-pro-components/types'
import { PlusDisplayItem } from '@plus-pro-components/components/display-item'
import {
  isFunction,
  getDescSlotName,
  getDescLabelSlotName,
  getValue
} from '@plus-pro-components/components/utils'

export type DescriptionProps = Partial<Mutable<ExtractPropTypes<typeof descriptionProps>>>
export interface PlusDescriptionsProps extends /* @vue-ignore */ Partial<DescriptionProps> {
  data: RecordType
  columns?: PlusColumn[]
  column?: number
  title?: string
}
export interface PlusTableTableColumnStatus {
  text: string
  color: string
}

defineOptions({
  name: 'PlusDescriptions'
})

const props = withDefaults(defineProps<PlusDescriptionsProps>(), {
  data: () => ({}),
  columns: () => [],
  title: '',
  column: 3
})

const subColumns = computed(() =>
  props.columns.filter(item => unref(item.hideInDescriptions) !== true)
)

const getDisplayValue = (prop: string) => getValue(props.data, prop)
</script>
