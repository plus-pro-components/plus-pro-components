<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { ref, onMounted } from 'vue'
import cookie from 'js-cookie'

const hasNotice = false

const { Layout } = DefaultTheme

const isCloseNotice = 'Plus-Pro-Components-Notice-Key'
const hasClose = ref(true)

const handleClose = () => {
  hasClose.value = true
  cookie.set(isCloseNotice, JSON.stringify(hasClose.value))
}

onMounted(() => {
  hasClose.value = !!cookie.get(isCloseNotice)
})
</script>

<template>
  <Layout>
    <template #home-hero-before v-if="hasNotice">
      <div class="home-notice">
        <el-alert effect="dark" @close="handleClose" v-if="!hasClose">
          <template #title>
            PlusProComponents@v0.0.1
            正式版本已发布，请使用公（内）测版本的用户尽快升级到最新正式版本！
          </template>
        </el-alert>
      </div>
    </template>
  </Layout>
</template>

<style lang="scss" scoped>
.home-notice {
  max-width: 768px;
  margin: 10px auto 0;
  .el-alert {
    background-color: rgba($color: #0072ff, $alpha: 0.8);
  }
}
</style>
