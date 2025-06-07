<template>
  <aside class="sidebar">{{ subreddit }}</aside>
</template>

<script setup lang="ts">
const { subreddit } = defineProps<{ subreddit: string }>()
</script>

<style scoped lang="scss">
.sidebar {
  position: sticky;
  top: 0;
  padding: 1rem 2rem;
  min-height: calc(100dvh - 3.25rem);
  background: black;
}
</style>
