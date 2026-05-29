/**
 * Convert any YouTube URL format to an embeddable URL.
 *
 * Supported input formats:
 *   https://www.youtube.com/watch?v=ABC123
 *   https://youtu.be/ABC123
 *   https://www.youtube.com/embed/ABC123  (already correct, returned as-is)
 *   https://youtube.com/shorts/ABC123
 */
export function toYouTubeEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null

  try {
    const parsed = new URL(url)
    let videoId: string | null = null

    if (parsed.hostname === "youtu.be") {
      // https://youtu.be/ABC123
      videoId = parsed.pathname.slice(1)
    } else if (parsed.hostname === "www.youtube.com" || parsed.hostname === "youtube.com") {
      if (parsed.pathname === "/watch") {
        // https://www.youtube.com/watch?v=ABC123
        videoId = parsed.searchParams.get("v")
      } else if (parsed.pathname.startsWith("/embed/")) {
        // Already an embed URL
        return url
      } else if (parsed.pathname.startsWith("/shorts/")) {
        // https://www.youtube.com/shorts/ABC123
        videoId = parsed.pathname.replace("/shorts/", "")
      }
    }

    if (!videoId) return null
    return `https://www.youtube.com/embed/${videoId}`
  } catch {
    return null
  }
}
