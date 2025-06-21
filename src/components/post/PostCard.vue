<template>
  <article class="post">
    <a class="post__link" :href="permalink"></a>
    <div class="first-row">
      <span class="post__sub-icon">r/</span>
      <RouterLink class="post__subreddit" :to="subredditLink"> {{ `r/${subreddit}` }}</RouterLink>
      <span class="post__dot"> . </span>
      <span class="post__date"> {{ calculateDateString(new Date(created * 1000)) }}</span>
    </div>
    <h2 class="post__title">{{ title }}</h2>
    <!-- When interacting with a text-only post, take it to the single post page. -->
    <div v-if="selftext && !image && !gallery_images && !video">
      {{ selftext }}
    </div>
    <div class="post__interactive-media">
      <SingleImage v-if="image" :image="image" />
      <ImageGallery v-else-if="gallery_images" :images="gallery_images" />
      <Video v-else-if="video" :video="video" />
    </div>
    <PostCardFooter :upvotes="ups" :comments="num_comments" :permalink="permalink" />
  </article>
  <hr />
</template>

<script setup lang="ts">
import { transformPostResponse } from '@/helpers/post.helpers'
import type { Post } from '@/types/post'
import { calculateDateString } from '@/utils/date.utils'

import ImageGallery from '../media/ImageGallery.vue'
import SingleImage from '../media/SingleImage.vue'
import Video from '../media/Video.vue'
import PostCardFooter from '../post/PostCardFooter.vue'

const { post } = defineProps<{ post: Post }>()
const {
  title,
  subreddit,
  ups,
  created,
  image,
  gallery_images,
  video,
  selftext,
  permalink,
  num_comments,
} = transformPostResponse(post)

const subredditLink = `/r/${subreddit}`
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}

.post {
  position: relative;
  padding: 0.25rem 1rem;
  max-width: 45.75rem;
  border-radius: 0.75rem;
  transition: background 0.4s ease-out;
  isolation: isolate;

  &:hover {
    background: var(--reddit-card-hover-background);
  }

  img {
    max-width: 320px;
  }

  &__link {
    position: absolute;
    inset: 0;
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

  &__subreddit {
    position: relative;
    z-index: 10;
  }

  &__title {
    margin-block: 0.5rem 1rem;
    font-size: 1.25rem;
    font-weight: bold;
  }

  &__description {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    line-clamp: 4;
  }

  &__post-interactive-media {
    position: relative;
    z-index: 10;
  }
}

hr {
  border: 1px solid var(--reddit-card-hover-background);
}
</style>
