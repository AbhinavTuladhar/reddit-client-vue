export interface Comment {
  subreddit: string
  subreddit_id: string
  replies: Comment[]
  id: string
  author: string
  parent_id: string
  score: number
  author_fullname: string
  body: string
  edited: boolean
  name: string
  is_submitter: boolean
  score_hidden: boolean
  permalink: string
  locked: boolean
  created: number
  link_id: string
  depth: number
  ups: number
}
