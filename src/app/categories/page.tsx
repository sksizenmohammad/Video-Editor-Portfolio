import { Navigation } from "@/components/Navigation";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { CategorySections } from "@/components/CategorySections";
import { Footer } from "@/components/Footer";
import { getPublicVideos } from "@/lib/videos";
import type { VideoCategory } from "@/types/video";

export const metadata = {
  title: "Categories | SmiloGraph - Professional Video Editor Portfolio",
  description:
    "Browse video editing work by category - documentary, gaming montage, wedding films, teasers, commercials & more.",
};

export default function CategoriesPage() {
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
      <main className="pt-20">
        <CategorySections videosByCategory={videosByCategory} />
      </main>
      <Footer />
    </>
  );
}
