<template>
  <div>
    <span> {{ params.id }} - {{ params.subreddit }} - {{ params.title }}</span>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">Error</div>
    <div v-else-if="!data">No data</div>
    <div v-else>
      <pre> {{ JSON.stringify(data, null, 2) }} </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import PostService from '@/services/post.service'
import { computed, watch } from 'vue'

interface PostParams {
  subreddit: string
  id: string
  title: string
}

const router = useRoute()
const params = computed(() => router.params as unknown as PostParams)

const { data, isLoading, isError } = useQuery({
  queryKey: ['post', params.value.id],
  queryFn: () => PostService.getPost(params.value.id),
})

watch(data, () => {
  if (!data.value) {
    return
  }
  console.log(data.value)
})
</script>

<style scoped>
pre {
  max-width: 100%;
  white-space: pre-wrap;
}
</style>
