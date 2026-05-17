import { Navigation } from "@/components/Navigation";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Footer } from "@/components/Footer";
import { getFeaturedVideos, getPublicVideos } from "@/lib/videos";

export const metadata = {
  title: "Work | SmiloGraph - Professional Video Editor Portfolio",
  description:
    "Explore featured video editing projects - documentary, gaming montage, wedding films, teasers & more.",
};

export default function WorkPage() {
  const featured = getFeaturedVideos();
  const publicVideos = getPublicVideos();

  // Combine featured with all public videos for a comprehensive work page
  const allWork = [...featured, ...publicVideos.filter((v) => !featured.some((f) => f.id === v.id))];

  return (
    <>
      <AnimatedBackground />
      <Navigation />
      <main className="pt-20">
        <FeaturedWork videos={allWork} />
      </main>
      <Footer />
    </>
  );
}
