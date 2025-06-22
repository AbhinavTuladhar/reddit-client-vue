<template>
  <h2 class="post-title">
    <slot />
  </h2>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.post-title {
  margin-block: 0.5rem 1rem;
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
