<template>
  <!-- The same image is used twice: one for the blurred part, the other for the actual image -->
  <div class="container">
    <img class="container__background" :src="sanitiseImageUrl(image as string)" alt="" />
    <img class="container__foreground" :src="sanitiseImageUrl(image as string)" alt="" />
  </div>
</template>

<script setup lang="ts">
import { sanitiseImageUrl } from '@/utils/string.utils'

defineProps<{ image: string }>()
</script>

<style lang="scss" scoped>
.container {
  $side-margin: 4rem;

  position: relative;
  max-width: 640px;
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
    width: calc(100% - $side-margin * 2);
    height: 100%;
    transform: translateX($side-margin);
    object-fit: contain;
  }
}
</style>
