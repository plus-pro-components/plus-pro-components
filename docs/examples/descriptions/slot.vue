<template>
  <PlusDescriptions :column="2" :columns="columns" :data="descriptionsData">
    <template #plus-desc-name="{ value }">
      <el-tag type="success"> {{ value }} </el-tag>
    </template>

    <template #plus-desc-status="{ value }">
      <el-button type="success"> {{ value }} </el-button>
    </template>

    <template #plus-desc-image="{ value }">
      <el-image :src="value" style="width: 140px" />
    </template>

    <template #plus-desc-video="{ value }">
      <video controls :src="value" style="width: 200px" />
    </template>

    <template #plus-desc-tag="{ value }">
      <el-tag v-for="item in value" :key="item" controls :type="item" style="margin-left: 5px">
        {{ item }}
      </el-tag>
    </template>
  </PlusDescriptions>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn, RecordType } from 'plus-pro-components'
import { ElTag, ElButton, ElImage } from 'element-plus'

const TestServe = {
  getList: async () => {
    const index = Math.random() * 10
    const data = {
      index,
      status: '1',
      name: '序号' + (index + 1),
      image: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
      tag: ['success', 'info', 'warning', 'danger']
    }
    return { data }
  }
}

const columns: PlusColumn[] = [
  {
    label: '名称',
    width: 120,
    prop: 'name'
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
    label: '图片',
    width: 120,
    prop: 'image'
  },
  {
    label: '视频',
    width: 120,
    prop: 'video'
  },
  {
    label: '标签',
    width: 120,
    prop: 'tag'
  }
]
const descriptionsData = ref<RecordType>({})
const getList = async () => {
  try {
    const { data } = await TestServe.getList()
    descriptionsData.value = data || {}
  } catch (error) {}
}
getList()
</script>
