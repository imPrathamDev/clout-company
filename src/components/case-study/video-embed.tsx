import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match ? match[1] : null;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 sm:size-6">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// Custom poster + play-button card that links out to the original YouTube
// or Instagram post, instead of embedding either platform's own player UI.
function VideoEmbed({
  url,
  caption,
  thumbnail,
  thumbnailLqip,
}: {
  url: string;
  caption?: string;
  thumbnail?: SanityImageSource;
  thumbnailLqip?: string;
}) {
  const isYouTube = /youtube\.com|youtu\.be/.test(url);
  const isInstagram = /instagram\.com/.test(url);

  if (!isYouTube && !isInstagram) return null;

  // YouTube always has a public thumbnail; Instagram relies on the
  // editor-supplied thumbnail since no public one is available. The crop
  // ratio matches the card below it: portrait for reels, landscape for YouTube.
  const youtubeId = isYouTube ? getYouTubeId(url) : null;
  const posterUrl = thumbnail
    ? urlFor(thumbnail)
        .width(isInstagram ? 640 : 800)
        .height(isInstagram ? 1138 : 450)
        .fit("crop")
        .url()
    : youtubeId
      ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
      : null;

  return (
    <span className="block my-8 sm:my-14">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative block w-full overflow-hidden rounded-lg md:rounded-2xl bg-[#f8f9f5] border border-[#e8ece0] ${
          isInstagram ? "aspect-[9/16] max-w-sm mx-auto" : "aspect-video"
        }`}
      >
        {posterUrl && (
          <Image
            src={posterUrl}
            alt={caption || "Video thumbnail"}
            fill
            sizes="(min-width: 1024px) 23rem, 100vw"
            placeholder={thumbnailLqip ? "blur" : "empty"}
            blurDataURL={thumbnailLqip}
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        )}

        <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-200 group-hover:bg-black/20">
          <span className="flex items-center justify-center size-12 sm:size-14 rounded-full bg-white/95 text-foreground shadow-md transition-transform duration-200 group-hover:scale-110">
            <PlayIcon />
          </span>
        </span>
      </a>

      {caption && (
        <span className="block text-center text-[0.8125rem] text-foreground/60 mt-3">
          {caption}
        </span>
      )}
    </span>
  );
}

export default VideoEmbed;
