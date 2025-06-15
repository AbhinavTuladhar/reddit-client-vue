<template>
  <aside class="sidebar">
    <div>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="isError">Error</div>
      <div v-else-if="!data">No data</div>
      <div v-else>
        <h2 class="sidebar__title">{{ title }}</h2>
        <div class="sidebar__description">
          {{ description }}
        </div>
        <div class="sidebar__icon-text-row">
          <Cake />
          <span> {{ creationDate }} </span>
        </div>
        <div class="sidebar__icon-text-row">
          <Cake />
          <span> {{ subscribers.toLocaleString() }} </span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import SubredditService from '@/services/subreddit.service'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { transformSubredditAboutResponse } from '../../helpers/subreddit.helpers'

import Cake from '@/assets/icons/cake.svg?component'

const { subreddit } = defineProps<{ subreddit: string }>()

const { data, isLoading, isError } = useQuery({
  queryKey: ['subreddit-about', subreddit],
  queryFn: () => SubredditService.getAboutSubreddit(subreddit),
  select: (data) => transformSubredditAboutResponse(data),
})

const numberFormatter = Intl.NumberFormat('en', { notation: 'compact' })

const title = computed(() => data.value?.title ?? '')
const description = computed(() => data.value?.public_description ?? '')
const creationDate = computed(() => {
  const unixTime = data.value?.created_utc

  if (unixTime) {
    const convertedData = new Date(unixTime * 1000)
    // return Intl.DateTimeFormat('en-GB').format(convertedData)
    return convertedData.toLocaleDateString('fr-CA')
  }

  return null
})

const subscribers = computed(() => numberFormatter.format(data.value?.subscribers ?? 0))
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
