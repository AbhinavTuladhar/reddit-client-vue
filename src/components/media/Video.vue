<template>
  <div v-if="video" class="video-container">
    <video
      v-if="video.reddit_video"
      controls
      :width="video.reddit_video.width"
      :height="video.reddit_video.height"
    >
      <source :src="sanitiseImageUrl(video.reddit_video.fallback_url)" />
    </video>

    <!-- If it is an embedded video, store the HTML and load the iframe only once in view. -->
    <div ref="iframeContainer" v-else-if="video.oembed" :data-html="video.oembed.html">
      <p>Loading iframe...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Post } from '@/types/post'
import { decodeHTML, sanitiseImageUrl } from '@/utils/string.utils'
import { onMounted } from 'vue'

const { video } = defineProps<{ video: Post['secure_media'] }>()
const iframeContainer = ref<HTMLElement | null>()

/**
 * For loading the iframe only once it comes into view.
 */
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || !iframeContainer.value) return
      const decodedHTML = decodeHTML(iframeContainer.value.getAttribute('data-html') || '')
      iframeContainer.value.innerHTML = decodedHTML
      observer.unobserve(iframeContainer.value)
    })
  })

  if (iframeContainer.value) {
    observer.observe(iframeContainer.value)
  }
})
</script>

<style lang="scss">
.video-container {
  width: min(100%, 38.75rem);

  iframe {
    width: 100%;
    min-height: 13.75rem !important;
    aspect-ratio: 1.78;
  }
}
</style>
