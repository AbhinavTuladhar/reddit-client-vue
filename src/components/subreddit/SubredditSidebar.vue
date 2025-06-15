<template>
  <aside class="sidebar">
    <div>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="isError">Error</div>
      <div v-else-if="!data || !information">No data</div>
      <div v-else>
        <h2 class="sidebar__title">{{ information.title }}</h2>
        <div class="sidebar__description">
          {{ information.description }}
        </div>
        <div class="sidebar__icon-text-row">
          <Cake />
          <span> {{ information.creationDate }} </span>
        </div>
        <div class="sidebar__icon-text-row">
          <Cake />
          <span> {{ information.subscribers.toLocaleString() }} </span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'

import Cake from '@/assets/icons/cake.svg?component'
import { transformSubredditAboutResponse } from '@/helpers/subreddit.helpers'
import SubredditService from '@/services/subreddit.service'
import { numberFormatter } from '@/utils/number.utils'

const { subreddit } = defineProps<{ subreddit: string }>()

const { data, isLoading, isError } = useQuery({
  queryKey: ['subreddit-about', subreddit],
  queryFn: () => SubredditService.getAboutSubreddit(subreddit),
  select: (data) => transformSubredditAboutResponse(data),
})

const information = computed(() => {
  if (!data.value) return

  const { title, public_description, created_utc, subscribers } = data.value || {}

  const creationDate = new Date(created_utc * 1000).toLocaleDateString('fr-CA')

  return {
    title,
    description: public_description,
    creationDate,
    subscribers: numberFormatter.format(subscribers),
  }
})
</script>

<style scoped lang="scss">
.sidebar {
  position: sticky;
  top: 0;
  padding: 1rem;
  height: 100dvh;
  background: black;
  overflow: auto;
  color: var(--reddit-weak-text);

  &__title {
    font-size: 1.125rem;
    font-weight: bold;
    color: white;
  }

  &__icon-text-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
}
</style>
