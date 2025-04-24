export interface Video {
  fallback_url: string
  has_audio: string
  duration: string
  is_gif: boolean
}

export interface MediaPreview {
  source: {
    url: string
    width: number
    height: number
  }
  variants: unknown
  id: string
}
