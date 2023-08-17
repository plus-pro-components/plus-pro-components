<template>
  <PlusPopover placement="bottom" :width="150" trigger="click">
    <div class="plus-table-toolbar__density">
      <el-button
        v-for="item in buttonNameDensity"
        :key="item.size"
        :plain="defaultSize !== item.size"
        type="primary"
        size="small"
      >
        {{ item.text }}
      </el-button>
    </div>

    <template #reference>
      <el-button>密度</el-button>
    </template>
  </PlusPopover>

  <PlusPopover placement="right" :width="400" trigger="click">
    <template #reference>
      <el-button style="margin-left: 20px">Click to activate</el-button>
    </template>
    <el-table :data="gridData">
      <el-table-column width="150" property="date" label="date" />
      <el-table-column width="100" property="name" label="name" />
      <el-table-column width="300" property="address" label="address" />
    </el-table>
  </PlusPopover>
</template>
<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { ref } from 'vue'
import type { ComponentSize } from 'element-plus/es/constants'

export interface ButtonNameDensity {
  size: ComponentSize
  text: string | ComputedRef<string>
}

const defaultSize = ref('default')

const buttonNameDensity: ButtonNameDensity[] = [
  {
    size: 'default',
    text: '默认'
  },
  {
    size: 'large',
    text: '宽松'
  },
  {
    size: 'small',
    text: '紧凑'
  }
]

const gridData = [
  {
    date: '2016-05-02',
    name: 'Jack',
    address: 'New York City'
  },
  {
    date: '2016-05-04',
    name: 'Jack',
    address: 'New York City'
  },
  {
    date: '2016-05-01',
    name: 'Jack',
    address: 'New York City'
  },
  {
    date: '2016-05-03',
    name: 'Jack',
    address: 'New York City'
  }
]
</script>
