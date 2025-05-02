<template>
  <article class="post">
    <div class="first-row">
      <span class="post__sub-icon">r/</span>
      <RouterLink class="post__subreddit" :to="subredditLink"> {{ `r/${subreddit}` }}</RouterLink>
      <span class="post__dot"> . </span>
      <span class="post__date"> {{ calculateDateString(new Date(created * 1000)) }}</span>
    </div>
    <h2 class="post__title">{{ title }}</h2>
    <SingleImage v-if="image" :image="image" />
    <!-- <img v-if="image" :src="image" /> -->
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
import type { Post } from '@/types/post'
import { sanitiseImageUrl } from '@/utils/string.utils'
import { toRefs } from 'vue'
import { transformPostResponse } from '../helpers/post.helpers'
import { calculateDateString } from '../utils/date.utils'
import SingleImage from './SingleImage.vue'

const { post } = defineProps<{ post: Post }>()
const {
  author,
  title,
  score,
  subreddit,
  url,
  ups,
  secure_media,
  created,
  image,
  gallery_image_urls,
  video,
  selftext,
} = toRefs(transformPostResponse(post))

const subredditLink = `/r/${subreddit.value}`
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}

.post {
  img {
    max-width: 320px;
  }

  &__sub-icon {
    display: grid;
    display: inline-block;
    padding-inline: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 1px solid white;
    place-items: center;
    min-width: 1.5rem;
    margin-right: 1rem;
  }

  &__title {
    margin-block: 0.5rem 1rem;
    font-size: 1.25rem;
    font-weight: bold;
  }
}
</style>
