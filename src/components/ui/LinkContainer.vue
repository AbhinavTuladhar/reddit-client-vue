<template>
  <a :href="link" class="link-container">
    <slot />
  </a>
</template>

<script setup lang="ts">
defineProps<{ link: string }>()
</script>

<style lang="scss" scoped>
.link-container {
  display: block;
  height: fit-content;
  padding: 0.25rem 1rem;
  border-radius: 0.5rem;
  transition: background 0.4s ease-out;

  &:hover {
    background: var(--reddit-card-hover-background);
  }
}
</style>
