import type { MediaPreview } from './media'

export interface Post {
  subreddit: string
  selftext: string
  gilded: number
  title: string
  subreddit_name_prefixed: string
  downs: number
  name: string
  link_flair_text_color: string
  ups: number
  total_awards_received: number
  secure_media: unknown
  score: number
  edited: boolean
  created: number
  pinned: boolean
  over_18: boolean
  spoiler: boolean
  locked: boolean
  subreddit_id: string
  id: string
  author: string
  num_comments: number
  permalink: string
  url: string
  subreddit_subscribers: number
  created_utc: number
  media: unknown
  preview: {
    images: MediaPreview[]
  }
  upvote_ratio
}

export interface PostDetail {
  kind: string
  data: {
    after: null | string
    before: null | string
    children: Post[]
  }
}
