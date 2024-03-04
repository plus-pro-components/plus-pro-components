<template>
  <PlusDescriptions :column="2" :columns="columns" :data="descriptionsData" />
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
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
      tag: ['success', 'info', 'warning', 'danger'],
      render: 'render',
      renderHTML: `<div >
          <h3 style="color:red">标题</h3>
          <p style="color:#333">
            富文本内容富文本内容富文本内容富文本内容富文本内容富文本内容富文本内容富文本内容富文本内容富文本内容富文本内容富文本内容富文本内容富文本内容
          </p>
        </div>`
    }
    return { data }
  }
}

const columns: PlusColumn[] = [
  {
    label: '名称',
    width: 120,
    prop: 'name',
    renderDescriptionsItem: ({ value }) => h(ElTag, { type: 'success' }, () => value)
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
    ],
    renderDescriptionsItem: ({ value }) => h(ElButton, { type: 'success' }, () => value)
  },
  {
    label: '图片',
    width: 120,
    prop: 'image',
    renderDescriptionsItem: ({ value }) => h(ElImage, { src: value, style: { width: '140px' } })
  },
  {
    label: '视频',
    width: 120,
    prop: 'video',
    renderDescriptionsItem: ({ value }) =>
      h('video', { src: value, controls: true, style: { width: '200px' } })
  },

  {
    label: '标签',
    width: 120,
    prop: 'tag',
    renderDescriptionsItem: ({ value }) =>
      value?.map(item =>
        h(
          ElTag,
          {
            type: item,
            style: {
              marginLeft: '5px'
            }
          },
          () => item
        )
      )
  },
  {
    label: 'render',
    width: 120,
    prop: 'render',
    render: value => h(ElTag, null, () => value)
  },
  {
    label: 'renderHTML',
    width: 120,
    prop: 'renderHTML',
    renderHTML: value => value as string
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
