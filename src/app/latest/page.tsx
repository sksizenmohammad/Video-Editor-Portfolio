import { Navigation } from "@/components/Navigation";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { LatestUploads } from "@/components/LatestUploads";
import { Footer } from "@/components/Footer";
import { getLatestVideos } from "@/lib/videos";

export const metadata = {
  title: "Latest | SmiloGraph - Professional Video Editor Portfolio",
  description:
    "Check out the latest video editing uploads - fresh cuts updated regularly.",
};

export default function LatestPage() {
  const latest = getLatestVideos();

  return (
    <>
      <AnimatedBackground />
      <Navigation />
      <main className="pt-20">
        <LatestUploads videos={latest.filter((v) => v.audience === "public")} />
      </main>
      <Footer />
    </>
  );
}
