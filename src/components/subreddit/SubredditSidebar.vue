<template>
  <aside class="sidebar">
    <div>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="isError">Error</div>
      <div v-else-if="!data">No data</div>
      <div v-else>
        <h2 class="sidebar__title">{{ title }}</h2>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import SubredditService from '@/services/subreddit.service'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

const { subreddit } = defineProps<{ subreddit: string }>()

const { data, isLoading, isError } = useQuery({
  queryKey: ['subreddit-about', subreddit],
  queryFn: () => SubredditService.getAboutSubreddit(subreddit),
})

const title = computed(() => data.value?.data.title ?? '')
</script>

<style scoped lang="scss">
.sidebar {
  position: sticky;
  top: 0;
  padding: 1rem 2rem;
  // height: calc(100dvh - 3.25rem);
  height: 100dvh;
  background: black;
  overflow: auto;

  &__title {
    font-size: 1.125rem;
    font-weight: bold;
  }
}
</style>
