<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">Error</div>
    <div v-else-if="!subredditData">No data</div>
    <div v-else class="post-card-container">
      <PostCard
        v-for="post in transformSubredditResponse(subredditData).posts"
        :key="post.id"
        :post="post"
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
  console.log(transformSubredditResponse(subredditData.value))
  // console.log(subredditData.value)
})
</script>

<style lang="scss" scoped>
.post-card-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
