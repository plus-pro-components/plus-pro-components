<template>
  <el-card>
    <PlusForm
      v-model="state"
      label-width="100px"
      :columns="columns"
      :rules="rules"
      @submit="mySubmit"
    >
      <!--这里的plus-extra-content 插槽没有生效，因为它的优先级低于renderExtra函数 -->
      <template #plus-extra-content>
        <el-input v-model="state.name" placeholder="自定义下一行内容" />
      </template>

      <template #plus-extra-status="column">
        <div style="display: flex">
          <label style="width: 100px; color: #606266; margin-right: 12px">
            没有的{{ column.label }}：</label
          >
          <el-input v-model="state.extra" placeholder="自定义下一行内容" />
        </div>
      </template>
    </PlusForm>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn, FieldValues } from 'plus-pro-components'

const state = ref<FieldValues>({
  status: '0',
  content: '',
  extra: ''
})

const columns: PlusColumn[] = [
  {
    label: '请假原因',
    width: 120,
    prop: 'content',
    valueType: 'textarea',
    renderExtra: () => `请假原因示例：1.隔壁着火; 2.喝喜酒; 3.漏水；`
  },
  {
    label: '状态',
    width: 120,
    prop: 'status',
    valueType: 'select',
    options: [
      {
        label: '未解决',
        value: '0',
        color: 'red'
      },
      {
        label: '已解决',
        value: '1',
        color: 'blue'
      },
      {
        label: '解决中',
        value: '2',
        color: 'yellow'
      }
    ]
  }
]

const rules = {
  content: [
    {
      required: true,
      message: '请输入原因'
    }
  ]
}

const mySubmit = () => {
  console.log(state.value)
}
</script>
