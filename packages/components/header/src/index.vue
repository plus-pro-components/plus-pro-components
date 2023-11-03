<template>
  <el-header class="plus-header" :class="{ 'is-fixed': fixed }">
    <div class="plus-header__left">
      <slot name="header-left" :logo="logo" :title="title">
        <img v-if="logo" :src="logo" alt="" class="plus-header__logo" />
        <h2 v-if="title" class="plus-header__title">{{ title }}</h2>
      </slot>
    </div>

    <div class="plus-header__placeholder" />

    <div class="plus-header__right">
      <slot name="header-right" :user-info="userInfo" :title="title" />

      <el-dropdown v-if="hasUserInfo" placement="bottom-end" trigger="click">
        <span class="plus-header__dropdown-area">
          <!-- avatar -->
          <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="" class="plus-header__avatar" />
          <el-icon v-else :size="20" class="plus-header__avatar"><User /></el-icon>

          <!-- username -->
          <p class="plus-header__username">{{ userInfo.username || 'admin' }}</p>

          <el-icon class="el-icon-caret-bottom el-icon--right">
            <ArrowDown />
          </el-icon>
        </span>

        <template #dropdown>
          <el-dropdown-menu class="header-dropdown">
            <el-dropdown-item @click="handleClickItem(logoutItem)">
              {{ logoutText || t('plus.header.logout') }}
            </el-dropdown-item>
            <el-dropdown-item
              v-for="item in dropdownItemList"
              :key="item.value"
              @click="handleClickItem(item)"
            >
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>

  <div v-if="fixed" class="plus-header-placeholder" />
</template>

<script lang="ts" setup>
import { ArrowDown, User } from '@element-plus/icons-vue'
import { ElIcon, ElHeader, ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'
import { useLocale } from '@plus-pro-components/hooks'

export interface PlusHeaderProps {
  logo?: string
  fixed?: boolean
  title?: string
  logoutText?: string
  trigger?: 'click' | 'hover'
  userInfo?: {
    username?: string
    avatar?: string
  }
  hasUserInfo?: boolean
  dropdownItemList?: {
    label: string
    value: string
  }[]
}

export interface PlusHeaderEmits {
  (e: 'clickDropdownItem', item: { label: string; value: string }): void
}

defineOptions({
  name: 'PlusHeader'
})

const props = withDefaults(defineProps<PlusHeaderProps>(), {
  logo: 'https://plus-pro-components.com/logo.png',
  title: 'PlusProComponents',
  trigger: 'click',
  userInfo: () => ({}),
  dropdownItemList: () => [],
  logoutText: '',
  hasUserInfo: true,
  fixed: false
})

const emit = defineEmits<PlusHeaderEmits>()

const { t } = useLocale()

const logoutItem = {
  label: props.logoutText || t('plus.header.logout'),
  value: 'logout'
}

const handleClickItem = (item: { label: string; value: string }) => {
  emit('clickDropdownItem', item)
}
</script>
