<template>
  <div class="page-grid">
    <slot name="sidebar" />
    <div class="page-grid__content">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.page-grid {
  display: grid;
  grid-template-columns: 17rem 1fr;

  &__content {
    width: 1120px;
    padding-inline: 1rem;
    margin-inline: auto;
  }
}
</style>
