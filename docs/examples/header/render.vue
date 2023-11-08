<template>
  <PlusHeader :render-header-left="renderHeaderLeft" :render-header-right="renderHeaderRight" />
</template>
<script lang="ts" setup>
import { h, Fragment, ref } from 'vue'
import { ElSwitch } from 'element-plus'

const switchValue = ref(true)

const renderHeaderLeft = ({ logo, title }: { logo: string; title: string }) => {
  return h(Fragment, null, [
    h(
      'h5',
      {
        style: {
          marginRight: '10px'
        }
      },
      title.slice(0, 4)
    ),
    h('img', {
      src: logo,
      style: {
        height: '30px'
      }
    })
  ])
}
const renderHeaderRight = data => {
  console.log(data)
  return h(ElSwitch, {
    modelValue: switchValue.value,
    inlinePrompt: true,
    activeText: '白色',
    inactiveText: '暗黑',
    style: {
      marginRight: '10px'
    },
    onChange: val => {
      switchValue.value = val as boolean
    }
  })
}
</script>
