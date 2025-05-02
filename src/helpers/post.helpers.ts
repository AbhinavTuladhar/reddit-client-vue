import type { SingleImage } from '@/types/media'
import type { Post } from '@/types/post'
import { sanitiseImageUrl } from '@/utils/string.utils'

export const transformPostResponse = (post: Post) => {
  const { preview, media_metadata, secure_media, url, ...rest } = post

  /**
   * Depending on the type of the post, certain keys are present or absent
   * Singular image -> preview
   * Image gallery -> media_metadata
   * Video -> secure_media
   * Text-only -> selftext is not empty
   */

  let image: SingleImage | undefined = undefined
  let gallery_image_urls: string[] | undefined = undefined
  let video: typeof secure_media = undefined

  if (preview && !secure_media) {
    // Images with different resolutions
    const imagesList = preview.images[preview.images.length - 1].resolutions
    const targetImage = imagesList[imagesList.length - 1]
    image = {
      width: targetImage.width,
      height: targetImage.height,
      url: targetImage.url,
    }
  } else if (media_metadata) {
    const imagesList = Object.values(media_metadata)
    const targetImageList = imagesList.map((image) => image.s)
    const galleryImageUrls = targetImageList.map((image) => image.u)
    gallery_image_urls = galleryImageUrls.map(sanitiseImageUrl)
  } else {
    video = secure_media
  }

  const isRedditLink = url.includes('reddit.com')
  const isTextOnlyPost = !image && !gallery_image_urls && !video

  // For the case of video
  return {
    ...rest,
    image,
    gallery_image_urls,
    video,
    secure_media,
    url,
    is_reddit_link: isRedditLink,
    is_text_only_post: isTextOnlyPost,
  }
}
