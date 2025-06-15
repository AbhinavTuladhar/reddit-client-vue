import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SubredditView from '@/views/SubredditView.vue'
import PostView from '@/views/PostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/r/:subreddit',
      name: 'subreddit-detail',
      component: SubredditView,
    },
    {
      path: '/r/:subreddit/comments/:id/:title',
      name: 'post-detail',
      component: PostView,
    },
  ],
})

export default router
