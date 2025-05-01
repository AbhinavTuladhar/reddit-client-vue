import type { Gallery, ImagePreview } from './media'

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
  secure_media?: SecureMedia | null | undefined
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
  preview?: ImagePreview
  upvote_ratio: number
  media_metadata?: Record<string, Gallery>
}

export interface SecureMedia {
  reddit_video?: {
    height: number
    width: number
    dash_url: number
    duration: number
    is_gif: boolean
    scrubber_media_url: string
    dash_url: string
    hls_url: string
    fallback_url: string
  }
  oembed?: {
    description: 'string'
    height: number
    html: string
    provider_name: string
    thumbnail_height: number
    thumbnail_url: string
    thumbnail_width: number
    title: string
    type: string
    version: string
    width: number
  }
}

export interface PostDetail {
  kind: string
  data: {
    after: null | string
    before: null | string
    children: Post[]
  }
}
