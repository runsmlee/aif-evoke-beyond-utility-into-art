import { Suspense, lazy } from "react";
import { Hero } from "./components/Hero";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ScrollProgress } from "./components/ScrollProgress";
import { BackToTop } from "./components/BackToTop";
import { useTheme } from "./hooks/useTheme";

const Header = lazy(() =>
  import("./components/Header").then((m) => ({ default: m.Header }))
);
const Features = lazy(() =>
  import("./components/Features").then((m) => ({ default: m.Features }))
);
const Gallery = lazy(() =>
  import("./components/Gallery").then((m) => ({ default: m.Gallery }))
);
const Testimonials = lazy(() =>
  import("./components/Testimonials").then((m) => ({
    default: m.Testimonials,
  }))
);
const Pricing = lazy(() =>
  import("./components/Pricing").then((m) => ({ default: m.Pricing }))
);
const CtaSection = lazy(() =>
  import("./components/CtaSection").then((m) => ({ default: m.CtaSection }))
);
const Footer = lazy(() =>
  import("./components/Footer").then((m) => ({ default: m.Footer }))
);

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-20" aria-hidden="true">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

export function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-surface-950 transition-colors duration-300">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <ErrorBoundary>
        <Suspense fallback={<header className="h-16" aria-hidden="true" />}>
          <Header theme={theme} toggleTheme={toggleTheme} />
        </Suspense>
      </ErrorBoundary>
      <main id="main-content">
        <Hero />
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Features />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Gallery />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Pricing />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <CtaSection />
          </Suspense>
        </ErrorBoundary>
      </main>
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
      <BackToTop />
    </div>
  );
}
