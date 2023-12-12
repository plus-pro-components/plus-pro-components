<template>
  <el-config-provider :locale="locales" namespace="el">
    <AppNav>
      <el-button size="small" class="switch-language" type="primary" @click="toggle">
        {{ language }}
      </el-button>

      <el-switch
        v-model="dark"
        :active-action-icon="Moon"
        :inactive-action-icon="Sunny"
        style="--el-switch-on-color: #2c2c2c; --el-switch-off-color: #f2f2f2"
        @change="handleChange"
      />
    </AppNav>
  </el-config-provider>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment*/
import { ref, computed } from 'vue'
import { Moon, Sunny } from '@element-plus/icons-vue'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn'
// @ts-ignore
import en from 'element-plus/dist/locale/en'
// @ts-ignore
import { zhCn as plusZhCn, en as plusEn } from '../../locale'
import AppNav from './views/layout.vue'
// import AppNav from './__nav.vue' <el-icon><Sunny /></el-icon>

const zhCnLocales = {
  ...zhCn,
  ...plusZhCn
}
const enLocales = {
  ...en,
  ...plusEn
}

const dark = ref(false)
const language = ref('zh-cn')
const locales = computed(() => (language.value === 'zh-cn' ? zhCnLocales : enLocales))

const toggle = () => {
  language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn'
}

const handleChange = (val: any) => {
  if (val) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
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

.switch-language {
  margin-right: 10px;
}
</style>
