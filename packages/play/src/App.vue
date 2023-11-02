<template>
  <el-config-provider :locale="locales" namespace="el">
    <div class="nav">
      <el-button class="switch-language" type="primary" @click="toggle">切换语言</el-button>
    </div>

    <el-container>
      <el-aside>
        <!-- 侧边栏竖模式 -->
        <AppNav />
      </el-aside>

      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment*/
import { ref, computed } from 'vue'
import { RouterView } from 'vue-router'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn'
// @ts-ignore
import en from 'element-plus/dist/locale/en'
// @ts-ignore
import { zhCn as plusZhCn, en as plusEn } from '../../locale'
import AppNav from './views/sidebar.vue'

const zhCnLocales = {
  ...zhCn,
  ...plusZhCn
}
const enLocales = {
  ...en,
  ...plusEn
}

const language = ref('zh-cn')
const locales = computed(() => (language.value === 'zh-cn' ? zhCnLocales : enLocales))

const toggle = () => {
  language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn'
}
</script>

<style lang="scss" scoped>
.nav {
  padding-bottom: 20px;
  position: fixed;
  top: 0;
  right: 0;
}
</style>
