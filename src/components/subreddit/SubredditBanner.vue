<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">Error</div>
    <div v-else-if="!information">No data</div>
    <div v-else class="banner-container">
      <img
        v-if="information.bannerImage"
        class="sub-banner"
        :src="sanitiseImageUrl(information.bannerImage)"
      />
      <div v-else class="sub-banner sub-banner--fallback"></div>

      <div class="sub-banner__icon-title-container">
        <img class="sub-icon" :src="sanitiseImageUrl(information.subredditIcon)" />
        <h2>r/{{ subreddit }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'

import SubredditService from '@/services/subreddit.service'
import { sanitiseImageUrl } from '@/utils/string.utils'
import { watch } from 'vue'
import { transformSubredditAboutResponse } from '@/helpers/subreddit.helpers'

const { subreddit } = defineProps<{ subreddit: string }>()

const { data, isLoading, isError } = useQuery({
  queryKey: ['subreddit-about', subreddit],
  queryFn: () => SubredditService.getAboutSubreddit(subreddit),
  select: (data) => transformSubredditAboutResponse(data),
})

const information = computed(() => {
  if (!data.value) return

  const { icon_img, community_icon, banner_background_image } = data.value || {}

  return {
    subredditIcon: icon_img || community_icon || '',
    bannerImage: banner_background_image,
  }
})

watch(data, () => {
  if (!data.value) return

  // Set the title of the page dynamically
  document.title = data.value.title
})
</script>

<style scoped lang="scss">
.sub-banner {
  width: 100%;
  height: 8rem;
  object-fit: cover;

  &--fallback {
    height: 8rem;
    background: var(--reddit-gray);
  }

  &__icon-title-container {
    display: flex;
    margin-top: -1.5rem;
    gap: 0.5rem;
    align-items: flex-end;

    .sub-icon {
      border-radius: 100%;
      width: 5rem;
      height: 5rem;
    }

    h2 {
      font-size: 2rem;
    }
  }
}
</style>
