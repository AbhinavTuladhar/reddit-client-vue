<template>
  <article class="post">
    <a class="post__link" :href="permalink"></a>
    <PostMeta :subreddit="subreddit" :created="created" :subreddit-link="subredditLink" />

    <!-- Show the post title here only if it is not an external link -->
    <PostTitle v-if="!isExternalLink"> {{ title }} </PostTitle>

    <!-- in the case that it is an external link. -->
    <ExternalLinkGrid
      v-if="isExternalLink && image"
      :is-external-link="isExternalLink"
      :title="title"
      :url="url"
      :image-source="image?.url"
    />

    <!-- When interacting with a text-only post, take it to the single post page. -->
    <div v-if="selftext && !image && !gallery_images && !video">
      {{ selftext }}
    </div>

    <div class="post__interactive-media">
      <SingleImage v-if="image && !isExternalLink" :image="image" />
      <ImageGallery v-else-if="gallery_images" :images="gallery_images" />
      <Video v-else-if="video" :video="video" />
    </div>
    <PostCardFooter :upvotes="ups" :comments="num_comments" :permalink="permalink" />
  </article>
  <hr />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { transformPostResponse } from '@/helpers/post.helpers'
import type { Post } from '@/types/post'

import ImageGallery from '../media/ImageGallery.vue'
import SingleImage from '../media/SingleImage.vue'
import Video from '../media/Video.vue'
import PostCardFooter from '../post/PostCardFooter.vue'
import PostTitle from '../ui/PostTitle.vue'

import ExternalLinkGrid from './ExternalLinkGrid.vue'
import PostMeta from './PostMeta.vue'

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
  post_hint,
  url,
} = transformPostResponse(post)

const subredditLink = `/r/${subreddit}`

const isExternalLink = computed(() => post_hint === 'link')
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

  &__description {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    line-clamp: 4;
  }

  &__interactive-media {
    position: relative;
    z-index: 10;
  }
}

hr {
  border: 1px solid var(--reddit-card-hover-background);
}
</style>
