import { Navigation } from "@/components/Navigation";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import { ClientPortal } from "@/components/ClientPortal";
import { getClientVideos } from "@/lib/videos";

export const metadata = {
  title: "Client Portal | Smilographer",
  description: "Private client area for reviewing your video edits.",
};

export default function ClientPage() {
  const clientVideos = getClientVideos();

  return (
    <>
      <AnimatedBackground />
      <Navigation />
      <main className="min-h-screen pt-24">
        <ClientPortal videos={clientVideos} />
      </main>
      <Footer />
    </>
  );
}
