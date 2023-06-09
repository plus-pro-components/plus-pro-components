<template>
  <ClientOnly>
    <div class="example-showcase">
      <AppAsyncComponent />
    </div>
    <div class="example-btns">
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
      class="example-language-vue language-vue"
      v-html="decoded"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import { DocumentCopy, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { getComponent } from '../../utils/getComponent'

// 自动加载 asyncRouter 文件夹下所有的异步路由
const moduleFiles = import.meta.glob('../../../examples/**/*.vue', {
  eager: true
})

const props = defineProps<{
  demos: object
  source: string
  path: string
  rawSource: string
  description?: string
}>()

const state = reactive({ decoded: '', show: false, content: '' })

const AppAsyncComponent = getComponent(moduleFiles, props.path)

console.log(AppAsyncComponent)

const handleToggle = () => {
  state.show = !state.show
}

onMounted(() => {
  state.decoded = decodeURIComponent(props.source)
  state.content = decodeURIComponent(props.rawSource)
})

const { decoded, show, content } = toRefs(state)
</script>

<style lang="scss" scoped>
.example-showcase {
  border: 1px solid #dcdfe6;
  border-radius: 4px 4px 0 0;
  padding: 20px;
}
.example-btns {
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
</style>
