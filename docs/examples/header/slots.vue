<template>
  <PlusHeader>
    <template #header-left="{ title, logo }">
      <h5 style="margin-right: 10px">{{ title }}</h5>

      <img :src="logo" style="height: 30px" alt="" />
    </template>

    <template #header-right>
      <el-dropdown trigger="click" class="set-language-dropdown">
        <!-- 切换语言 -->
        <span class="el-dropdown-link">
          <span class="text">
            {{ currentLanguage.languageName }}
          </span>

          <el-icon class="el-icon-caret-bottom language-icon">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in languageList"
              :key="item.key"
              @click="handleSwitchLanguage(item)"
            >
              <div class="item" :class="{ active: item.key === currentLanguage.key }">
                {{ item.languageName }}
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </PlusHeader>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

const languageList = ref([
  {
    languageName: '中文',
    key: 'zh-CN'
  },
  {
    languageName: 'English',
    key: 'en'
  }
])

const currentLanguage = ref(languageList.value[0])

const handleSwitchLanguage = item => {
  currentLanguage.value = item
}
</script>

<style lang="scss">
.set-language-dropdown {
  .active {
    color: var(--el-color-primary);
  }
  .el-dropdown-link {
    margin-right: 10px;
    cursor: pointer;
    user-select: none;
    color: var(--el-text-color-regular);
    display: flex;
    align-items: center;
    .text {
      font-size: 14px;
      margin-right: 2px;
    }
  }
}
</style>
