<template>
  <aside class="sidebar">
    <div>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="isError">Error</div>
      <div v-else-if="!data || !information">No data</div>
      <div v-else>
        <section class="sidebar__intro">
          <h2 class="sidebar__title">{{ information.title }}</h2>
          <div class="sidebar__description">
            {{ information.description }}
          </div>
          <div class="sidebar__icon-text-row">
            <Cake />
            <span> Created on {{ information.creationDate }} </span>
          </div>
          <div class="sidebar__members-grid">
            <div>
              <div class="sidebar__member-count">
                {{ information.subscribers }}
              </div>

              <div class="sidebar__member-text">Members</div>
            </div>

            <div>
              <div class="sidebar__member-count">
                {{ information.online }}
              </div>

              <div class="sidebar__online-row">
                <div class="sidebar__green-circle"></div>
                <div class="sidebar__member-text">Online</div>
              </div>
            </div>
          </div>
        </section>

        <SubredditRules :subreddit="subreddit" />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'

import Cake from '@/assets/icons/cake.svg?component'
import { transformSubredditAboutResponse } from '@/helpers/subreddit.helpers'
import SubredditService from '@/services/subreddit.service'
import { numberFormatter } from '@/utils/number.utils'
import SubredditRules from './SubredditRules.vue'

const { subreddit } = defineProps<{ subreddit: string }>()

const { data, isLoading, isError } = useQuery({
  queryKey: ['subreddit-about', subreddit],
  queryFn: () => SubredditService.getAboutSubreddit(subreddit),
  select: (data) => transformSubredditAboutResponse(data),
})

const information = computed(() => {
  if (!data.value) return

  const { title, public_description, created_utc, subscribers, active_user_count } =
    data.value || {}

  const creationDate = new Date(created_utc * 1000).toLocaleDateString('fr-CA')

  return {
    title,
    description: public_description,
    creationDate,
    subscribers: numberFormatter.format(subscribers),
    online: numberFormatter.format(active_user_count),
  }
})
</script>

<style scoped lang="scss">
.sidebar {
  position: sticky;
  top: 0;
  padding-block: 1rem;
  height: 100dvh;
  background: black;
  overflow: scroll;
  color: var(--reddit-weak-text);
  font-size: 0.875rem;

  &__intro {
    padding-inline: 1rem;
  }

  &__title {
    font-weight: bold;
    color: white;
    font-size: inherit;
  }

  &__icon-text-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-top: 0.25rem;
  }

  &__members-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 0.75rem;
  }

  &__member-count {
    color: white;
    font-weight: bold;
  }

  &__member-text {
    font-size: 0.875rem;
  }

  &__online-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  &__green-circle {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 100%;
    background: green;
  }
}
</style>
