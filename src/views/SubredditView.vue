<template>
  <PageLayout>
    <template #sidebar>
      <Sidebar />
    </template>
    <template #content>
      <SubredditBanner v-if="!bannerAndSidebarFlag" :subreddit="subreddit" />
      <div class="subreddit-grid">
        <div class="left-column">
          <div v-if="isLoadingPosts">Loading...</div>
          <div v-else-if="isPostsError">Error</div>
          <div v-else-if="!subredditData">No data</div>
          <div v-else class="post-card-container">
            <PostCard
              v-for="post in transformSubredditResponse(subredditData).posts"
              :key="post.id"
              :post="post"
            />
          </div>
        </div>
        <div v-if="!bannerAndSidebarFlag" class="right-column">
          <SubredditSidebar :subreddit="subreddit" />
        </div>
      </div>
    </template>
  </PageLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import PostCard from '@/components/post/PostCard.vue'
import SubredditSidebar from '@/components/subreddit/SubredditSidebar.vue'
import SubredditService from '@/services/subreddit.service'
import { transformSubredditResponse } from '../helpers/subreddit.helpers'
import SubredditBanner from '@/components/subreddit/SubredditBanner.vue'
import { subredditsWithoutBanner } from '@/data/subreddit.data'
import PageLayout from '@/layouts/PageLayout.vue'
import Sidebar from '@/components/layouts/Sidebar/Sidebar.vue'

const route = useRoute()

const subreddit = computed(() => route.params.subreddit as string)

const bannerAndSidebarFlag = computed(() => subredditsWithoutBanner.includes(subreddit.value))

const {
  data: subredditData,
  isLoading: isLoadingPosts,
  isError: isPostsError,
} = useQuery({
  queryKey: ['subreddit', subreddit],
  queryFn: () => SubredditService.getPosts(subreddit.value),
})
</script>

<style lang="scss" scoped>
.subreddit-grid {
  display: grid;
  grid-template-columns: 1fr 20rem;
  gap: 2rem;
}

.post-card-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
