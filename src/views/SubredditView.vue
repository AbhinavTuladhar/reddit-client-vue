<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">Error</div>
    <div v-else-if="!subredditData">No data</div>
    <div v-else class="post-card-container">
      <PostCard
        v-for="{
          data: { author, title, score, subreddit, url, ups, id, secure_media, created, preview },
        } in subredditData?.data.children"
        :key="id"
        :author="author"
        :title="title"
        :score="score"
        :subreddit="subreddit"
        :url="url"
        :ups="ups"
        :secure_media="secure_media"
        :created="created"
        :preview="preview"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import PostCard from '@/components/PostCard.vue'
import SubredditService from '@/services/subreddit.service'
import { watch } from 'vue'
import { transformSubredditResponse } from '../helpers/subreddit.helpers'

const route = useRoute()

const subreddit = computed(() => route.params.subreddit as string)

const {
  data: subredditData,
  isLoading,
  isError,
} = useQuery({
  queryKey: ['subreddit', subreddit],
  queryFn: () => SubredditService.getPosts(subreddit.value),
})

watch(subredditData, () => {
  if (!subredditData.value) {
    return
  }
  console.log('This is the transformed data')
  console.log(transformSubredditResponse(subredditData.value))
})
</script>

<style lang="scss" scoped>
.post-card-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
