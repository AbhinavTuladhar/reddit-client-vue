<template>
  <!-- The same image is used twice: one for the blurred part, the other for the actual image -->
  <div
    class="container"
    :class="{ landscape: image.width > image.height, portrait: image.width < image.height }"
  >
    <img class="container__background" :src="sanitiseImageUrl(image.url)" alt="" />
    <img class="container__foreground" :src="sanitiseImageUrl(image.url)" alt="" />
  </div>
</template>

<script setup lang="ts">
import type { SingleImage } from '@/types/media'
import { sanitiseImageUrl } from '@/utils/string.utils'

defineProps<{ image: SingleImage }>()
</script>

<style lang="scss" scoped>
.container {
  &.portrait {
    --side-margin: 6rem;
  }

  &.landscape {
    --side-margin: 5rem;
  }

  position: relative;
  max-width: 37.5rem;
  max-height: min(100%, 33.75rem);
  border-radius: 24px;
  overflow: hidden;

  &__background {
    position: absolute;
    z-index: -1;
    filter: blur(24px);
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.3;
    transform: scale(1.2);
  }

  &__foreground {
    width: calc(100% - var(--side-margin) * 2);
    height: 100%;
    transform: translateX(var(--side-margin));
    object-fit: contain;
  }
}
</style>
