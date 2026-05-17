import videosData from "../../data/videos.json";
import type { VideoEdit, VideoCategory } from "@/types/video";

export function getAllVideos(): VideoEdit[] {
  return [...(videosData as VideoEdit[])].sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );
}

export function getPublicVideos(): VideoEdit[] {
  return getAllVideos().filter((v) => v.audience === "public");
}

export function getClientVideos(): VideoEdit[] {
  return getAllVideos().filter((v) => v.audience === "client");
}

export function getLatestVideos(limit = 6): VideoEdit[] {
  return getAllVideos()
    .filter((v) => v.isLatest)
    .slice(0, limit);
}

export function getVideosByCategory(category: VideoCategory): VideoEdit[] {
  return getPublicVideos().filter((v) => v.category === category);
}

export function getFeaturedVideos(): VideoEdit[] {
  return getPublicVideos().filter((v) => v.featured);
}

export function getYoutubeThumbnail(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}
