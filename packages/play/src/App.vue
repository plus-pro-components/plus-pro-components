<template>
  <el-config-provider :locale="locales" namespace="el">
    <div class="nav-wrapper">
      <AppNav />
      <el-button class="switch-language" type="primary" @click="toggle">切换语言</el-button>
    </div>

    <div class="place" />

    <RouterView />
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
// import AppNav from './views/layout.vue'
import AppNav from './__nav.vue'

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
.nav-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
}

.place {
  height: 60px;
}
</style>
