import type { Subreddit } from '@/types/subreddit'
import { transformPostResponse } from './post.helpers'

export const transformSubredditResponse = (data: Subreddit) => {
  const actualData = data.data.children.map((post) => post.data)
  const {
    data: { after },
  } = data

  return {
    after,
    posts: actualData.map(transformPostResponse),
  }
}
