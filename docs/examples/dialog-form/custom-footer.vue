<template>
  <el-button @click="handleOpen">打开弹窗（自定义弹窗底部插槽）</el-button>
  <PlusDialogForm v-model:visible="visible" v-model="values" :form="{ columns }">
    <template #dialog-footer="{ handleConfirm, handleCancel }">
      <el-button type="primary" @click="handleConfirm">确定</el-button>
      <el-button type="warning" @click="handleCancel">取消</el-button>
      <el-button type="danger"> 返回</el-button>
    </template>
  </PlusDialogForm>

  <el-button style="margin-top: 20rpx" @click="handleOpen1"
    >打开弹窗（自定义表单底部插槽）</el-button
  >
  <PlusDialogForm
    v-model:visible="visible1"
    v-model="values"
    :form="{ columns, hasFooter: true, rules }"
    :dialog="{
      hasFooter: false
    }"
  >
    <template #form-footer="{ handleSubmit, handleReset }">
      <el-button type="primary" @click="handleAllConfirm(handleSubmit)">提交</el-button>
      <el-button type="warning" @click="handleReset">重置</el-button>
      <el-button type="danger"> 返回</el-button>
    </template>
  </PlusDialogForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn, FieldValues } from 'plus-pro-components'

const columns: PlusColumn[] = [
  {
    label: '名称',
    width: 120,
    prop: 'name',
    valueType: 'copy',
    tooltip: '名称最多显示6个字符'
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
      },
      {
        label: '失败',
        value: '3',
        color: 'red'
      }
    ]
  },
  {
    label: '是否显示',
    width: 100,
    prop: 'switch',
    valueType: 'switch'
  }
]
const rules = {
  name: [
    {
      required: true,
      message: '请输入名称'
    }
  ]
}

const visible = ref(false)
const visible1 = ref(false)
const values = ref<FieldValues>({})

const handleOpen = () => {
  visible.value = true
}
const handleOpen1 = () => {
  visible1.value = true
}

const handleAllConfirm = async (handleSubmit: () => Promise<boolean>) => {
  const isPass = await handleSubmit()
  console.log(isPass, 'isPass')
  isPass && (visible1.value = false)
}
</script>
