<template>
  <div>
    <span> {{ id }} - {{ subreddit }} - {{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

interface PostParams {
  subreddit: string
  id: string
  title: string
}

const router = useRoute()
const { id, subreddit, title } = router.params as unknown as PostParams
</script>

<style scoped></style>
