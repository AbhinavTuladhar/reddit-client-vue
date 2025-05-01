<template>
  <article class="post">
    <div class="first-row">
      <span> {{ `r/${subreddit}` }}</span>
      <span> . </span>
      <span> {{ calculateDateString(new Date(created * 1000)) }}</span>
    </div>
    <img v-if="image" :src="image" alt="title" />
    <div v-if="gallery_image_urls" class="image-gallery">
      <h2>Image gallery</h2>
      <img v-for="image in gallery_image_urls" :src="image" alt="image" :key="image" />
    </div>
    <div v-if="video">
      <!-- If it is a reddit video -->
      <video
        v-if="video.reddit_video"
        controls
        :width="video.reddit_video.width"
        :height="video.reddit_video.height"
      >
        <source :src="sanitiseImageUrl(video.reddit_video.fallback_url)" />
      </video>

      <!-- If it is an embedded video -->
      <div v-if="video.oembed" v-html="video.oembed.html"></div>
    </div>
    <div v-if="selftext">
      {{ selftext }}
    </div>
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
import type { PostTransformed } from '@/types/computed'
import { sanitiseImageUrl } from '@/utils/string.utils'
import { calculateDateString } from '../utils/date.utils'

type PostCardProps = Pick<
  PostTransformed,
  | 'author'
  | 'title'
  | 'score'
  | 'subreddit'
  | 'url'
  | 'ups'
  | 'secure_media'
  | 'created'
  | 'image'
  | 'gallery_image_urls'
  | 'video'
  | 'selftext'
>

const { author, title, score, subreddit, url, ups, image, gallery_image_urls, video, selftext } =
  defineProps<PostCardProps>()

if (video) {
  console.log(video)
}
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}

.post {
  img {
    max-width: 320px;
  }
}
</style>
