import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { StatsBar } from "@/components/StatsBar";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <AnimatedBackground />
      <Navigation />
      <main>
        <Hero />
        <StatsBar />
      </main>
      <Footer />
    </>
  );
}
