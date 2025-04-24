import type { Post } from './post'

export interface Subreddit {
  kind: string
  data: {
    after: string
    dist: number
    children: {
      kind: string
      data: Post
    }
  }
}
