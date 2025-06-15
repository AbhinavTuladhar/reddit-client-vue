import type { SubredditRules, AboutSubreddit, Subreddit } from '@/types/subreddit'
import Api from './api'

class SubredditService {
  static async getPosts(subreddit: string) {
    const response = await Api.get<Subreddit>(`/r/${subreddit}`)
    return response.data
  }

  static async getAboutSubreddit(subreddit: string) {
    const response = await Api.get<AboutSubreddit>(`/r/${subreddit}/about`)
    return response.data
  }

  static async getRules(subreddit: string) {
    const response = await Api.get<SubredditRules>(`/r/${subreddit}/about/rules`)
    return response.data
  }
}

export default SubredditService
