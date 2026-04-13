import { Suspense, lazy } from "react";
import { Hero } from "./components/Hero";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ScrollProgress } from "./components/ScrollProgress";
import { BackToTop } from "./components/BackToTop";
import { useTheme } from "./hooks/useTheme";

const Header = lazy(() =>
  import("./components/Header").then((m) => ({ default: m.Header }))
);
const LogoCloud = lazy(() =>
  import("./components/LogoCloud").then((m) => ({ default: m.LogoCloud }))
);
const Features = lazy(() =>
  import("./components/Features").then((m) => ({ default: m.Features }))
);
const Philosophy = lazy(() =>
  import("./components/Philosophy").then((m) => ({ default: m.Philosophy }))
);
const HowItWorks = lazy(() =>
  import("./components/HowItWorks").then((m) => ({ default: m.HowItWorks }))
);
const Gallery = lazy(() =>
  import("./components/Gallery").then((m) => ({ default: m.Gallery }))
);
const InteractiveDemo = lazy(() =>
  import("./components/InteractiveDemo").then((m) => ({ default: m.InteractiveDemo }))
);
const Testimonials = lazy(() =>
  import("./components/Testimonials").then((m) => ({
    default: m.Testimonials,
  }))
);
const Pricing = lazy(() =>
  import("./components/Pricing").then((m) => ({ default: m.Pricing }))
);
const Faq = lazy(() =>
  import("./components/Faq").then((m) => ({ default: m.Faq }))
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
      <div className="w-full max-w-4xl mx-auto px-4 space-y-6">
        <div className="h-4 w-32 rounded-full bg-surface-200/60 dark:bg-surface-700/60 animate-shimmer" style={{ backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.15) 50%, transparent 75%)" }} />
        <div className="h-8 w-2/3 rounded-lg bg-surface-200/60 dark:bg-surface-700/60 animate-shimmer" style={{ backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.15) 50%, transparent 75%)" }} />
        <div className="h-4 w-1/2 rounded-full bg-surface-200/40 dark:bg-surface-700/40 animate-shimmer" style={{ backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)" }} />
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="h-40 rounded-2xl bg-surface-200/40 dark:bg-surface-700/40 animate-shimmer" style={{ backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)" }} />
          <div className="h-40 rounded-2xl bg-surface-200/40 dark:bg-surface-700/40 animate-shimmer" style={{ animationDelay: "0.15s", backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)" }} />
          <div className="h-40 rounded-2xl bg-surface-200/40 dark:bg-surface-700/40 animate-shimmer" style={{ animationDelay: "0.3s", backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)" }} />
        </div>
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
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <LogoCloud />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Features />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Philosophy />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <HowItWorks />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Gallery />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <InteractiveDemo />
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
            <Faq />
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
