<template>
  <div>
    <span class="sub-icon">r/</span>
    <RouterLink class="subreddit" :to="subredditLink"> {{ `r/${subreddit}` }}</RouterLink>
    <span class="dot"> . </span>
    <span class="date"> {{ calculateDateString(new Date(created * 1000)) }}</span>
  </div>
</template>

<script setup lang="ts">
import { calculateDateString } from '@/utils/date.utils'

defineProps<{
  subreddit: string
  created: number
  subredditLink: string
}>()
</script>

<style scoped lang="scss">
.sub-icon {
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

.subreddit {
  position: relative;
  z-index: 10;
}
</style>
