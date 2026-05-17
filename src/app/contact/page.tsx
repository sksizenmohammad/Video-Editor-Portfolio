import { Navigation } from "@/components/Navigation";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Contact | SmiloGraph - Professional Video Editor Portfolio",
  description:
    "Get in touch for your next video editing project - documentary, gaming montage, wedding films, teasers & more.",
};

export default function ContactPage() {
  return (
    <>
      <AnimatedBackground />
      <Navigation />
      <main className="pt-20">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
