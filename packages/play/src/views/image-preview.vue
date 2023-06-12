<template>
  <el-button @click="handleOpen">打开预览</el-button>

  <PlusImagePreview v-model="show" :src-list="srcList" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const srcList = ref([
  {
    url: 'https://ts1.cn.mm.bing.net/th/id/R-C.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0',
    name: ''
  },
  {
    url: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.8olSEek1RZjSQDgPizhxEAHaJ3?pid=ImgDet&rs=1',
    name: ''
  }
])
const handleOpen = () => {
  show.value = true
}
</script>
