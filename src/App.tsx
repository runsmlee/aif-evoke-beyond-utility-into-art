import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Gallery } from "./components/Gallery";
import { Testimonials } from "./components/Testimonials";
import { CtaSection } from "./components/CtaSection";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Features />
        <Gallery />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
