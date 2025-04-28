import { transformSubredditResponse } from '@/helpers/subreddit.helpers'
import type { Post } from './post'

export type SubredditTransformed = ReturnType<typeof transformSubredditResponse>

// export type PostTransformed = ReturnType<typeof transformPostResponse>

// ReturnType doesn't seem to work in Vue
export interface PostTransformed extends Post {
  image: string | undefined
  gallery_image_urls: string[] | undefined
  video: Post['secure_media']
}
