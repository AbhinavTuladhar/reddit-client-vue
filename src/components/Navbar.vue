<template>
  <header class="header">
    <div class="header__icon">
      <div class="circle"></div>
      <h2>Reddit</h2>
    </div>
    <div class="header__searchbar">
      <input type="text" placeholder="Search on Reddit" v-model="searchString" />
    </div>
    <div class="header__links">
      <RouterLink v-for="{ link, text } in menuItems" :key="link" :to="link">{{ text }}</RouterLink>
      <span>{{ searchString }}</span>
    </div>
  </header>
</template>

<script setup lang="ts">
const searchString = defineModel('')

const menuItems = [
  { text: 'All', link: '/r/all' },
  { text: 'Popular', link: '/r/popular' },
]
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 1rem;
  border-bottom: 1px solid hsl(195, 3%, 25%);

  &__icon {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    .circle {
      width: 2rem;
      height: 2rem;
      background: hsl(16, 100%, 50%);
      border-radius: 50%;
    }
  }

  &__searchbar {
    width: 100%;
    max-width: 34.375rem;
    padding-block: 0.125rem;

    input {
      padding: 0.5rem 1rem;
      border-radius: 100vw;
      background: hsl(200, 12%, 19%);
      width: 100%;
    }
  }

  &__links {
    display: flex;
    gap: 1rem;
  }
}
</style>
