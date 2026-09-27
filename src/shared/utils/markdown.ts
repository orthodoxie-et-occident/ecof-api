import { applyFrenchTypography } from "./typography"

export function mdToHtml(text: string | null | undefined): string | null {
  if (!text) return null

  const html = Bun.markdown.html(text)
  const withDimensions = addImageDimensions(html)
  const withCaptions = addFigcaptions(withDimensions)
  const unwrapped = unwrapFigureFromParagraph(withCaptions)
  return applyTypographyOutsideTags(unwrapped)
}

function addImageDimensions(html: string): string {
  return html.replace(/<img([^>]*?)\s*\/?>/g, (_match, attrs) => {
    const srcMatch = attrs.match(/src="([^"]*)"/)
    if (!srcMatch) return `<img${attrs}>`
    const dimMatch = srcMatch[1].match(/-(\d+)x(\d+)\.webp$/)
    if (!dimMatch) return `<img${attrs}>`
    const [, width, height] = dimMatch
    return `<img${attrs} width="${width}" height="${height}" loading="lazy">`
  })
}

function addFigcaptions(html: string): string {
  return html.replace(
    /<img([^>]*?)\stitle="([^"]*)"([^>]*)>/g,
    (_match, before, title, after) =>
      `<figure><img${before}${after}><figcaption>${title}</figcaption></figure>`,
  )
}

function unwrapFigureFromParagraph(html: string): string {
  return html.replace(/<p>(<figure>.*?<\/figure>)<\/p>/g, "$1")
}

function applyTypographyOutsideTags(html: string): string {
  return html
    .split(/(<[^>]+>)/g)
    .map((segment) =>
      segment.startsWith("<") ? segment : (applyFrenchTypography(segment) ?? segment),
    )
    .join("")
}
