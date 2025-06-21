<template>
  <section class="subreddit-rules">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">Error</div>
    <div v-else-if="!data">No data</div>
    <div v-else>
      <Accordion v-for="rule in data.rules" :key="rule.priority">
        <template #title>
          <div class="accordion__title">
            <div class="accordion__sn">{{ rule.priority + 1 }}</div>
            <div>{{ rule.short_name }}</div>
          </div>
        </template>
        <!-- Disable accordion if there is no description -->
        <template v-if="rule.description !== ''" #body>
          <div class="accordion__body">
            {{ rule.description }}
          </div>
        </template>
      </Accordion>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

import SubredditService from '@/services/subreddit.service'

import Accordion from '../ui/Accordion.vue'

const { subreddit } = defineProps<{ subreddit: string }>()

const { data, isLoading, isError } = useQuery({
  queryKey: ['subreddit-rules', subreddit],
  queryFn: () => SubredditService.getRules(subreddit),
})
</script>

<style lang="scss" scoped>
.subreddit-rules {
  margin-top: 1rem;
}

.accordion {
  word-break: break-word;

  &__title {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  &__sn {
    display: grid;
    place-items: center;
    width: 2rem;
    min-width: 2rem;
  }

  &__body {
    padding-inline: 3rem 1rem;
  }
}
</style>
