// Extracts the 11-char YouTube video ID from common URL formats:
// watch?v=, youtu.be/, embed/, shorts/, live/
export function getYoutubeVideoId(url) {
  if (!url) return "";
  const match = String(url).match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : "";
}

export function getYoutubeThumbnail(url) {
  const id = getYoutubeVideoId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

export function getYoutubeWatchUrl(url) {
  const id = getYoutubeVideoId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : "";
}
