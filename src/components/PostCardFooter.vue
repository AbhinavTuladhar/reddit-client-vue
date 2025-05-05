<template>
  <div class="post__footer">
    <span> Testing</span>
    <UpvoteArrow />
  </div>
</template>

<script setup lang="ts">
import UpvoteArrow from '../assets/icons/arrow.svg?component'

defineProps<{ upvotes: number; comments: number }>()
</script>

<style lang="scss" scoped>
.post__footer {
  font-size: 1rem;
}
</style>
