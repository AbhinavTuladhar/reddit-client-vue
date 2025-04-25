<template>
  <div>
    <div>The subreddit name is {{ subreddit }}</div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">Error</div>
    <pre v-else>
      {{ JSON.stringify(subredditData, null, 2) }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import SubredditService from '@/services/subreddit.service'
import { computed } from 'vue'

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
</script>

<style lang="scss" scoped></style>
