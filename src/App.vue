<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

import Navbar from './components/layouts/Navbar.vue'

const { fullPath } = useRoute()
</script>

<template>
  <Navbar />
  <RouterView :key="fullPath" />
  <VueQueryDevtools />
</template>

<style></style>
