<template>
  <ClientOnly>
    <div class="docs-example-showcase">
      <AppAsyncComponent />
    </div>
    <div class="docs-example-btns">
      <el-tooltip content="复制代码">
        <el-icon :size="18"><DocumentCopy v-copy="content" /></el-icon>
      </el-tooltip>
      <el-tooltip :content="show ? '收起' : '展开'">
        <el-icon :size="18" @click="handleToggle">
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
import { DocumentCopy, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { getComponent } from '../../utils/getComponent'

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

const AppAsyncComponent = getComponent(moduleFiles, props.path)

const handleToggle = () => {
  show.value = !show.value
}

const decoded = computed(() => decodeURIComponent(props.source))
const content = computed(() => decodeURIComponent(props.rawSource))

// add line-number
const tem = content.value.split('\r\n')
total.value = tem.length
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
  }
}
.content {
  padding-left: 32px;
}

.line-numbers-wrapper {
  border-color: #dcdfe6;
  line-height: 1.4;
  padding-top: 17px;
  user-select: none;
  .line-number {
    color: #dcdfe6;
    line-height: 1.4;
  }
}
</style>
