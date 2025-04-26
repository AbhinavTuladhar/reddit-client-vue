import type { Subreddit } from '@/types/subreddit'
import Api from './api'

class SubredditService {
  static async getPosts(subreddit: string) {
    const response = await Api.get<Subreddit>(`/r/${subreddit}`)
    return response.data
  }
}

export default SubredditService
