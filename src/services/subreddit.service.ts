import Api from './api'

class SubredditService {
  static async getPosts(subreddit: string) {
    const response = await Api.get(`/r/${subreddit}`)
    return response
  }
}

export default SubredditService
