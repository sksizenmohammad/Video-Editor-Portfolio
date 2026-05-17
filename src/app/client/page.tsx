import { Navigation } from "@/components/Navigation";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import { ClientPortal } from "@/components/ClientPortal";

export const metadata = {
  title: "Client Portal | SIZEN",
  description: "Private client area for reviewing your video edits.",
};

export default function ClientPage() {
  return (
    <>
      <AnimatedBackground />
      <Navigation />
      <main className="min-h-screen pt-24">
        <ClientPortal />
      </main>
      <Footer />
    </>
  );
}
