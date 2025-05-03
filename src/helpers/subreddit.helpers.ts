import type { Post } from '@/types/post'
import type { Subreddit } from '@/types/subreddit'

export const transformSubredditResponse = (data: Subreddit) => {
  const actualData = data.data.children.map((post) => post.data)
  const {
    data: { after },
  } = data

  return {
    after,
    posts: actualData as Post[],
  }
}
