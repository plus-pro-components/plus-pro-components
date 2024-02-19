<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { ref } from 'vue'
import cookie from 'js-cookie'

const { Layout } = DefaultTheme

const isCloseNotice = 'Plus-Pro-Components-Notice-Key'
const hasClose = ref(!!cookie.get(isCloseNotice))

const handleClose = () => {
  hasClose.value = true
  cookie.set(isCloseNotice, JSON.stringify(hasClose.value))
}
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <div class="home-notice" v-if="!hasClose">
        <el-alert effect="dark" @close="handleClose">
          <template #title>
            PlusProComponents@v0.0.1 正式版本已发布，请使用公（内）测版本的用户尽快升级到正式版本！
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
