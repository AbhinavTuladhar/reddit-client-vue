<template>
  <div class="post__footer">
    <div class="badge no-hover score">
      <UpvoteArrow class="score__upvote" />
      <span class="value"> {{ formattedScore }}</span>
      <UpvoteArrow class="score__downvote" />
    </div>
    <RouterLink :to="permalink" class="badge comments">
      <Comment />
      <span class="value"> {{ formattedComments }} </span>
    </RouterLink>
    <div class="badge share">
      <Share />
      <span class="value"> Share </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import UpvoteArrow from '@/assets/icons/arrow.svg?component'
import Comment from '@/assets/icons/comment.svg?component'
import Share from '@/assets/icons/share.svg?component'
import { numberFormatter } from '@/utils/number.utils'

const { upvotes, comments } = defineProps<{
  upvotes: number
  comments: number
  permalink: string
}>()

const formattedScore = computed(() => numberFormatter.format(upvotes))

const formattedComments = computed(() => numberFormatter.format(comments))
</script>

<style lang="scss" scoped>
.post__footer {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  .badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: var(--reddit-gray);
    border-radius: 100vw;
    width: fit-content;
    transition: background 0.2s ease-out;

    &:not(.no-hover) {
      cursor: pointer;

      &:hover {
        background: var(--reddit-gray-hover);
      }
    }

    .value {
      font-size: 0.75rem;
      font-weight: 700;
    }
  }

  .score {
    &__downvote {
      rotate: 180deg;
    }
  }
}
</style>
