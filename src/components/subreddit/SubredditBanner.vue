<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">Error</div>
    <div v-else-if="!data">No data</div>
    <div v-else class="banner-container">
      <img v-if="bannerImage" class="sub-banner" :src="sanitiseImageUrl(bannerImage)" />
      <div v-else class="sub-banner sub-banner--fallback"></div>
      <img class="sub-icon" :src="sanitiseImageUrl(subredditIcon)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'

import SubredditService from '@/services/subreddit.service'
import { sanitiseImageUrl } from '@/utils/string.utils'
import { watch } from 'vue'

const { subreddit } = defineProps<{ subreddit: string }>()

const { data, isLoading, isError } = useQuery({
  queryKey: ['subreddit-about', subreddit],
  queryFn: () => SubredditService.getAboutSubreddit(subreddit),
})

const bannerImage = computed(() => data.value?.data.banner_background_image ?? '')
const subredditIcon = computed(() => {
  const firstIcon = data.value?.data.icon_img
  const secondIcon = data.value?.data.community_icon

  return firstIcon || secondIcon || ''
})

watch(data, () => {
  if (data.value) {
    console.log(data.value)
  }
})
</script>

<style scoped lang="scss">
.sub-banner {
  width: 100%;
  height: 8rem;
  object-fit: cover;

  &--fallback {
    height: 5rem;
    background: var(--reddit-gray);
  }
}

.sub-icon {
  border-radius: 100%;
  width: 5rem;
  height: 5rem;
  margin-top: -2.5rem;
}
</style>
