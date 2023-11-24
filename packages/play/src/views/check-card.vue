<template>
  <PlusCheckCard
    v-model="checked"
    title="名称"
    :description="description"
    :extra="extra"
    avatar="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    @extra="handleExtra"
  />
</template>

<script lang="ts" setup>
const checked = true
const description = (data: any) => {
  console.log(data, 'data')
  return 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription'
}

const extra = () => '...'

const handleExtra = () => {
  console.log('handleExtra')
}
</script>
