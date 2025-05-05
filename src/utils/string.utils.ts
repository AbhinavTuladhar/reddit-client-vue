export const sanitiseImageUrl = (url: string) => url?.replace(/&amp;/g, '&')

/**
 * Decodes HTML entities in a string.
 */
export const decodeHTML = (html: string) => {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}
