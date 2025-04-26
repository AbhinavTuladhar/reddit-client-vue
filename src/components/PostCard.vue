<template>
  <article class="post">
    <div class="first-row">
      <span> {{ `r/${subreddit}` }}</span>
      <span> . </span>
      <span> {{ new Date(created * 1000).toISOString() }}</span>
    </div>
    <img v-if="preview" class="post__image" :src="sanitiseImageUrl(preview.images[0].source.url)" />
  </article>

  <div class="hidden">
    <div>Subreddit: {{ subreddit }}</div>
    <div>Author: {{ author }}</div>
    <div>Title: {{ title }}</div>
    <div>Score: {{ score }}</div>
    <div>Upvotes: {{ ups }}</div>
    <div>Url: {{ url }}</div>
    <div>Created at: {{ new Date(created * 1000) }}</div>
    <pre v-if="secure_media">
      {{ JSON.stringify(secure_media, null, 2) }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@/types/post'
import { sanitiseImageUrl } from '@/utils/string.utils'

type PostCardProps = Pick<
  Post,
  | 'author'
  | 'title'
  | 'score'
  | 'subreddit'
  | 'url'
  | 'ups'
  | 'secure_media'
  | 'created'
  | 'preview'
>

const { author, title, score, subreddit, url, ups, preview } = defineProps<PostCardProps>()

console.log(preview)
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}

.post {
  &__image {
    max-width: 27.5rem;
  }
}
</style>
