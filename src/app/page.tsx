import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { StatsBar } from "@/components/StatsBar";
import { FeaturedWork } from "@/components/FeaturedWork";
import { LatestUploads } from "@/components/LatestUploads";
import { CategorySections } from "@/components/CategorySections";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import {
  getFeaturedVideos,
  getLatestVideos,
  getPublicVideos,
} from "@/lib/videos";
import type { VideoCategory } from "@/types/video";

export default function HomePage() {
  const featured = getFeaturedVideos();
  const latest = getLatestVideos();
  const publicVideos = getPublicVideos();

  const videosByCategory = publicVideos.reduce(
    (acc, video) => {
      if (!acc[video.category]) acc[video.category] = [];
      acc[video.category].push(video);
      return acc;
    },
    {} as Record<VideoCategory, typeof publicVideos>
  );

  return (
    <>
      <AnimatedBackground />
      <Navigation />
      <main>
        <Hero />
        <StatsBar />
        <FeaturedWork videos={featured} />
        <LatestUploads videos={latest.filter((v) => v.audience === "public")} />
        <CategorySections videosByCategory={videosByCategory} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
