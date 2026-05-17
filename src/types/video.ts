export type VideoCategory =
  | "documentary"
  | "gaming"
  | "wedding"
  | "teaser"
  | "commercial"
  | "music"
  | "other";

export type VideoAudience = "public" | "client";

export interface VideoEdit {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  audience: VideoAudience;
  youtubeId?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  clientId?: string;
  clientName?: string;
  featured: boolean;
  isLatest: boolean;
  uploadedAt: string;
}

export const CATEGORY_LABELS: Record<VideoCategory, string> = {
  documentary: "Documentary Style",
  gaming: "Gaming Montage",
  wedding: "Wedding Edits",
  teaser: "Teasers & Trailers",
  commercial: "Commercial",
  music: "Music Videos",
  other: "Other Edits",
};

export const CATEGORY_DESCRIPTIONS: Record<VideoCategory, string> = {
  documentary:
    "Cinematic storytelling with raw emotion, narrative pacing, and authentic visuals.",
  gaming:
    "High-energy montages, sync edits, kill cams, and hype-driven gameplay highlights.",
  wedding:
    "Timeless wedding films — romantic tones, golden hours, and unforgettable moments.",
  teaser:
    "Short, punchy promos that hook viewers in seconds and leave them wanting more.",
  commercial:
    "Brand-focused edits built for ads, product launches, and social campaigns.",
  music:
    "Beat-synced cuts, lyric overlays, and rhythm-driven visual experiences.",
  other: "Experimental and custom projects outside standard categories.",
};
