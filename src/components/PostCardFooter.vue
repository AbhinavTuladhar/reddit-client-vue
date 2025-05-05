<template>
  <div class="post__footer">
    <div class="score">
      <UpvoteArrow class="score__upvote" />
      <span class="score__value"> {{ formattedScore }}</span>
      <UpvoteArrow class="score__downvote" />
    </div>
  </div>
</template>

<script setup lang="ts">
import UpvoteArrow from '../assets/icons/arrow.svg?component'

const { upvotes } = defineProps<{ upvotes: number; comments: number }>()

const formattedScore = Intl.NumberFormat('en', { notation: 'compact' }).format(upvotes)
</script>

<style lang="scss" scoped>
.post__footer {
  font-size: 1rem;

  .score {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: hsl(200, 12%, 19%);
    border-radius: 100vw;
    width: fit-content;

    &__value {
      font-size: 0.75rem;
    }

    &__downvote {
      rotate: 180deg;
    }
  }
}
</style>
