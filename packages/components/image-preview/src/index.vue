<template>
  <PlusDialog
    v-model="subShow"
    width="780px"
    :header="title"
    :close-on-click-modal="true"
    :has-footer="false"
    @cancel="handleCancel"
  >
    <div class="plus-image-preview">
      <div class="plus-image-preview-body">
        <img class="plus-image-preview-body__image" :src="subSrc" />
      </div>

      <div v-if="srcListLength" class="plus-image-preview-footer">
        <div class="plus-image-preview-footer__indicator">
          {{ currentIndex + 1 }} / {{ srcListLength }}
        </div>
        <el-icon
          class="plus-image-preview-footer__icon plus-image-preview-footer__icon--left"
          @click="handleLeft"
        >
          <ArrowLeft />
        </el-icon>
        <el-icon
          class="plus-image-preview-footer__icon plus-image-preview-footer__icon--right"
          @click="handleRight"
        >
          <ArrowRight />
        </el-icon>
      </div>
    </div>
  </PlusDialog>
</template>

<script lang="ts" setup>
import { computed, reactive, watch, toRefs } from 'vue'
import { ArrowRight, ArrowLeft } from '@element-plus/icons-vue'
import PlusDialog from '@plus-pro-components/components/dialog'
import type { PlusImagePreviewRow, State } from './type'

export interface PlusImagePreviewProps {
  srcList?: PlusImagePreviewRow[]
  modelValue?: boolean
  title?: string
}

export interface PlusImagePreviewEmits {
  (e: 'update:modelValue', show: boolean): void
}

defineOptions({
  name: 'PlusImagePreview'
})

const props = withDefaults(defineProps<PlusImagePreviewProps>(), {
  modelValue: false,
  title: '图片预览',
  srcList: () => []
})

const emit = defineEmits<PlusImagePreviewEmits>()

const state = reactive<State>({
  currentIndex: 0,
  subSrc: '',
  subName: '',
  subSrcList: [],
  subShow: false
})
const srcListLength = computed(() => state.subSrcList.length)

watch(
  () => props.modelValue,
  val => {
    state.subShow = val
  },
  {
    immediate: true,
    deep: true
  }
)
watch(
  () => props.srcList,
  val => {
    state.subSrcList = val as PlusImagePreviewRow[]
    state.subSrc = val[0]?.url
    state.subName = val[0]?.name || ''
  },
  {
    immediate: true,
    deep: true
  }
)
const handleCancel = () => emit('update:modelValue', false)
// 左移
const handleLeft = () => {
  state.currentIndex--
  if (state.currentIndex <= 0) {
    state.currentIndex = 0
  }
  state.subSrc = state.subSrcList[state.currentIndex]?.url
  state.subName = state.subSrcList[state.currentIndex]?.name || ''
}
// 右移
const handleRight = () => {
  state.currentIndex++
  if (state.currentIndex >= srcListLength.value - 1) {
    state.currentIndex = srcListLength.value - 1
  }
  state.subSrc = state.subSrcList[state.currentIndex]?.url
  state.subName = state.subSrcList[state.currentIndex]?.name || ''
}

const { subShow, subSrc, currentIndex } = toRefs(state)
</script>

<style lang="scss">
.plus-image-preview {
  padding: 0 10px;
  .plus-image-preview-body {
    background-color: #e4e4e4;
    box-sizing: border-box;
    height: auto;
    min-height: 60px;
    padding: 20px;
    width: 100%;
    .plus-image-preview-body__image {
      width: 100%;
      display: block;
      height: auto;
      margin: auto;
      object-fit: contain;
    }
  }

  .plus-image-preview-footer {
    position: relative;

    .plus-image-preview-footer__indicator {
      color: #212121;
      font-size: 14px;
      margin-top: 14px;
      text-align: center;
    }
    .plus-image-preview-footer__icon {
      color: #999;
      cursor: pointer;
      font-size: 18px;
      padding: 10px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      user-select: none;
    }

    .plus-image-preview-footer__icon--left {
      left: 0;
    }
    .plus-image-preview-footer__icon--right {
      right: 0;
    }
  }
}
</style>
