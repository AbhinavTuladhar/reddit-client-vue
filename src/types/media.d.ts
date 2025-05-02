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

export interface ImagePreview {
  images: Image[]
  enabled: boolean
}

interface Image {
  source: Source
  resolutions: Source[]
  variants: unknown
  id: string
}

interface Source {
  url: string
  width: number
  height: number
}

/**
 * For image gallery
 */
export interface Gallery {
  status: string
  e: string
  m: string
  p: GalleryImage[]
  s: GalleryImage
  id: string
}
interface GalleryImage {
  x: number
  y: number
  u: string
}

export interface SingleImage {
  url: string
  width: number
  height: number
}
