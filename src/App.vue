<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { RouterView, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

const { fullPath } = useRoute()
</script>

<template>
  <Navbar />
  <RouterView :key="fullPath" />
  <VueQueryDevtools />
</template>

<style></style>
