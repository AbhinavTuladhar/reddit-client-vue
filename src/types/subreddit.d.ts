import type { Post } from './post'

export interface Subreddit {
  kind: string
  data: {
    after: string
    dist: number
    children: {
      kind: string
      data: Post
    }[]
  }
}

export interface AboutSubreddit {
  kind: string
  data: AboutSubredditDetail
}

export interface AboutSubredditDetail {
  submit_text_html: string
  wiki_enabled: boolean
  display_name: string
  header_img: string
  title: string
  allow_galleries: boolean
  icon_size: number[]
  primary_color: string
  active_user_count: number
  icon_img: string
  display_name_prefixed: string
  accounts_active: number
  public_traffic: boolean
  subscribers: number
  name: string
  public_description: string
  comment_score_hide_mins: number
  community_icon: string
  banner_background_image: string
  original_content_tag_enabled: boolean
  submit_text: string
  description_html: string
  spoilers_enabled: boolean
  comment_contribution_settings: Commentcontributionsettings
  header_size: number[]
  all_original_content: boolean
  created: number
  wls: number
  show_media_preview: boolean
  submission_type: string
  user_is_subscriber: null
  allowed_media_in_comments: string[]
  allow_videogifs: boolean
  should_archive_posts: boolean
  user_flair_type: string
  allow_polls: boolean
  public_description_html: string
  submit_text_label: string
  subreddit_type: string
  banner_img: string
  banner_background_color: string
  show_media: boolean
  id: string
  over18: boolean
  header_title: string
  description: string
  allow_images: boolean
  lang: string
  url: string
  created_utc: number
  banner_size: number[]
  mobile_banner_image: string
  user_is_contributor: null
}

interface Commentcontributionsettings {
  allowed_media_types: null
}
