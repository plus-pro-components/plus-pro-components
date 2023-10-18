<template>
  <ClientOnly>
    <div class="docs-example-showcase">
      <AppAsyncComponent />
    </div>
    <div class="docs-example-btns">
      <el-tooltip content="在 Playground 中编辑">
        <el-icon :size="size" @click="handleEditPlayground">
          <svg
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
            data-v-5d9e4641=""
          >
            <path
              d="M16 2v2h-1v3.243c0 1.158.251 2.301.736 3.352l4.282 9.276A1.5 1.5 0 0 1 18.656 22H5.344a1.5 1.5 0 0 1-1.362-2.129l4.282-9.276A7.994 7.994 0 0 0 9 7.243V4H8V2h8zm-2.612 8.001h-2.776c-.104.363-.23.721-.374 1.071l-.158.361L6.125 20h11.749l-3.954-8.567a9.978 9.978 0 0 1-.532-1.432zM11 7.243c0 .253-.01.506-.029.758h2.058a8.777 8.777 0 0 1-.021-.364L13 7.243V4h-2v3.243z"
            ></path>
          </svg>
        </el-icon>
      </el-tooltip>
      <el-tooltip content="在 GitHub 中编辑">
        <el-icon :size="size" @click="handleEdit"><EditPen /></el-icon>
      </el-tooltip>
      <el-tooltip content="复制代码">
        <el-icon :size="size"><DocumentCopy v-copy="content" /></el-icon>
      </el-tooltip>
      <el-tooltip :content="show ? '收起源代码' : '查看源代码'">
        <el-icon :size="size" @click="handleToggle">
          <ArrowUp v-if="show" />
          <ArrowDown v-else />
        </el-icon>
      </el-tooltip>
    </div>
    <div
      :style="{
        display: show ? 'block' : 'none'
      }"
      class="docs-example-language-vue language-vue"
    >
      <div class="content" v-html="decoded"></div>
      <div class="line-numbers-wrapper">
        <template v-for="item in total" :key="item">
          <span class="line-number">
            {{ item }}
          </span>
          <br />
        </template>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { DocumentCopy, ArrowDown, ArrowUp, EditPen, Position } from '@element-plus/icons-vue'
import { getComponent } from '../../utils/getComponent'
import { getPlaygroundEncoded } from '../../utils'

// 编辑地址
const editUrl = 'https://github.com/plus-pro-components/plus-pro-components/edit/dev/docs/examples'
const editPlaygroundUrl = 'https://playground.plus-pro-components.com'
// const editPlaygroundUrl = 'http://127.0.0.1:3002'

// 自动加载 asyncRouter 文件夹下所有的异步路由
const moduleFiles = import.meta.glob('../../../examples/**/*.vue', {
  eager: true
})

const props = defineProps<{
  source: string
  path: string
  rawSource: string
}>()

const show = ref(false)
const total = ref(0)
const size = 18

const AppAsyncComponent = getComponent(moduleFiles, props.path)

const handleToggle = () => {
  show.value = !show.value
}

const decoded = computed(() => decodeURIComponent(props.source))
const content = computed(() => decodeURIComponent(props.rawSource))

// add line-number
const tem = content.value.split('\r\n')
total.value = tem.length

// 去github编辑
const handleEdit = () => {
  const url = `${editUrl}/${props.path}.vue`
  window.open(url, '_blank')
}

// 去Playground编辑
const handleEditPlayground = () => {
  const encoded = getPlaygroundEncoded(props.rawSource)
  const url = `${editPlaygroundUrl}/#${encoded}`
  window.open(url, '_blank')
}
</script>

<style lang="scss" scoped>
.docs-example-showcase {
  border: 1px solid #dcdfe6;
  border-radius: 4px 4px 0 0;
  padding: 20px;
  overflow: auto;
}
.docs-example-btns {
  border: 1px solid #dcdfe6;
  border-top: 0;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 0 0 4px 4px;
  .el-icon {
    cursor: pointer;
    margin-left: 20px;
    color: #747578;
  }
}
.content {
  padding-left: 32px;
}

.line-numbers-wrapper {
  border-color: #dcdfe6;
  line-height: 1.4;
  padding-top: 11px;
  user-select: none;
  .line-number {
    color: #dcdfe6;
    line-height: 1.4;
  }
}
</style>
