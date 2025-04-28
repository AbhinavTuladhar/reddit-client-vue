import type { Subreddit } from '@/types/subreddit'
import { sanitiseImageUrl } from '@/utils/string.utils'

export const transformSubredditResponse = (data: Subreddit) => {
  const actualData = data.data.children.map((post) => post.data)
  const {
    data: { after },
  } = data

  /**
   * Depending on the type of the post, certain keys are present or absent
   * Singular image -> preview
   * Image gallery -> media_metadata
   * Video -> secure_media
   * Text-only -> selftext is not empty
   */

  return actualData.map((post) => {
    const { preview, media_metadata, secure_media, ...rest } = post

    if (preview) {
      // Images with different resolutions
      const imagesList = preview.images[preview.images.length - 1].resolutions
      const targetImage = imagesList[imagesList.length - 1]
      return {
        ...rest,
        image: sanitiseImageUrl(targetImage.url),
      }
    }

    // Image gallery
    if (media_metadata) {
      const imagesList = Object.values(media_metadata)
      const targetImageList = imagesList.map((image) => image.s)
      const galleryImageUrls = targetImageList.map((image) => image.u)

      return {
        ...rest,
        gallery_image_urls: galleryImageUrls.map(sanitiseImageUrl),
      }
    }

    // For the case of video
    return {
      ...rest,
      after,
      preview,
      media_metadata,
      secure_media,
    }
  })
}
