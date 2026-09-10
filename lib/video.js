export function getEmbedUrl(url) {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (yt) {
    return { type: "youtube", src: `https://www.youtube.com/embed/${yt[1]}?rel=0&modestbranding=1` };
  }
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) {
    return { type: "vimeo", src: `https://player.vimeo.com/video/${vm[1]}` };
  }
  return { type: "file", src: url };
}
