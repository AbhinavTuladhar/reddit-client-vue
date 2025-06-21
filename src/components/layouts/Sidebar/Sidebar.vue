<template>
  <aside class="sidebar">
    <SidebarRecents />
  </aside>
</template>

<script lang="ts" setup>
import SidebarRecents from './SidebarRecents.vue'
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  position: sticky;
  top: 0;
  width: 100%;
  border-right: 1px solid var(--border);
  padding: 1rem;
}
</style>
