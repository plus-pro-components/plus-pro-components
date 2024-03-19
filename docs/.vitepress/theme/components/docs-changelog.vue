<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

interface Release {
  id: number
  name: string
}

const loading = ref(true)
const releases = ref<Release[]>([])
const currentRelease = ref()

const onVersionChange = (val: string) => {
  const _releases = releases.value
  currentRelease.value = _releases[_releases.findIndex(r => r.name === val)]
}

onMounted(async () => {
  try {
    const { data } = await axios.get<Release[]>(
      'https://api.github.com/repos/plus-pro-components/plus-pro-components/releases'
    )
    releases.value = data
    currentRelease.value = data[0]
  } catch {
    releases.value = []
    currentRelease.value = undefined
    // do something
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="docs-changelog">
    <ClientOnly>
      <el-skeleton :loading="loading">
        <div class="docs-changelog-versions">
          <p class="docs-changelog-text">请选择版本:</p>
          <el-select
            :model-value="currentRelease.name"
            placeholder="请选择版本"
            style="min-width: 200px"
            @change="onVersionChange"
          >
            <el-option v-for="release in releases" :key="release.id" :value="release.name">
              {{ release.name }}
            </el-option>
          </el-select>
        </div>
        <el-card v-if="currentRelease">
          <template #header>
            <div class="docs-changelog-header">
              <div class="docs-changelog-meta">
                <p class="docs-changelog-by">
                  发布者
                  <strong>{{ currentRelease.author.login }}</strong>
                </p>
                <p class="docs-changelog-date">
                  {{ new Date(currentRelease.published_at).toLocaleString() }}
                </p>
              </div>
              <div class="docs-operators">
                <a :href="currentRelease.html_url" style="color: #409eff"> 链接 </a>
              </div>
            </div>
          </template>
          <div>
            <DocsMarkdown :content="currentRelease.body" />
          </div>
        </el-card>
      </el-skeleton>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.docs-changelog-versions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  .docs-changelog-text {
    margin-right: 10px;
    flex: 0 0 86px;
  }
}
.docs-changelog-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .docs-changelog-meta {
    display: flex;
    flex: 1;
    flex-direction: column;
    p {
      margin: 0;
    }
  }
}
</style>
