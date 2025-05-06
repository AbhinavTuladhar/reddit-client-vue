<template>
  <div class="post__footer">
    <div class="badge no-hover score">
      <UpvoteArrow class="score__upvote" />
      <span class="value"> {{ formattedScore }}</span>
      <UpvoteArrow class="score__downvote" />
    </div>
    <div class="badge comments">
      <Comment />
      <span class="value"> {{ comments }} </span>
    </div>
    <div class="badge share">
      <Share />
      <span class="value"> Share </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Comment from '@/assets/icons/comment.svg?component'
import Share from '@/assets/icons/share.svg?component'
import UpvoteArrow from '@/assets/icons/arrow.svg?component'

const { upvotes } = defineProps<{ upvotes: number; comments: number }>()

const formattedScore = Intl.NumberFormat('en', { notation: 'compact' }).format(upvotes)
</script>

<style lang="scss" scoped>
.post__footer {
  display: flex;
  gap: 1rem;

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
