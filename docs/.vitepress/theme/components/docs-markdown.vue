<template>
  <div class="docs-markdown-wrapper" v-html="parsed" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

const props = defineProps({
  content: { type: String, required: true }
})

const parsed = computed(() => {
  return md.render(props.content).replace(/<a/g, `<a target="_blank"`)
})
</script>

<style>
.docs-markdown-wrapper h3 {
  margin-top: 1rem;
}
</style>
