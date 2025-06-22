<template>
  <div class="link-grid">
    <div>
      <PostTitle> {{ title }} </PostTitle>
      <a :href="url" class="link-grid__link" target="_blank" v-if="isExternalLink">{{ url }}</a>
    </div>
    <!-- Open in another tab -->
    <a :href="url" class="link-grid__image-link" target="_blank">
      <img v-if="isExternalLink" :src="sanitiseImageUrl(imageSource)" :alt="title" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { sanitiseImageUrl } from '@/utils/string.utils'

import PostTitle from '../ui/PostTitle.vue'

defineProps<{
  isExternalLink: boolean
  title: string
  url: string
  imageSource: string
}>()
</script>

<style scoped lang="scss">
.link-grid {
  display: grid;
  grid-template-columns: 1fr 7rem;
  gap: 1rem;

  &__link {
    position: relative;
    color: var(--primary-blue);
    z-index: 100;

    &:hover {
      text-decoration: underline;
    }
  }

  &__image-link {
    position: relative;
    z-index: 100;
  }

  img {
    height: 6.25rem;
    width: 100%;
    object-fit: cover;
    border-radius: 0.25rem;
  }
}
</style>
