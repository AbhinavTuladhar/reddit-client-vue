import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SubredditView from '@/views/SubredditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
  ],
})

export default router
