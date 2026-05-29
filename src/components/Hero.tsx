import { useState, useCallback, useMemo, Suspense, lazy } from "react";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface ColorSwatch {
  hex: string;
  name: string;
}

interface CapabilityItem {
  title: string;
  subtitle: string;
  icon: JSX.Element;
}

const CURATED_PALETTES: ColorSwatch[][] = [
  [
    { hex: "#EF4444", name: "Ember" },
    { hex: "#F97316", name: "Tangerine" },
    { hex: "#FBBF24", name: "Honey" },
    { hex: "#34D399", name: "Sage" },
    { hex: "#60A5FA", name: "Sky" },
  ],
  [
    { hex: "#8B5CF6", name: "Violet" },
    { hex: "#EC4899", name: "Rose" },
    { hex: "#F43F5E", name: "Crimson" },
    { hex: "#14B8A6", name: "Teal" },
    { hex: "#A78BFA", name: "Lavender" },
  ],
  [
    { hex: "#0EA5E9", name: "Ocean" },
    { hex: "#22D3EE", name: "Cyan" },
    { hex: "#A3E635", name: "Lime" },
    { hex: "#FB923C", name: "Tangerine" },
    { hex: "#E879F9", name: "Fuchsia" },
  ],
  [
    { hex: "#059669", name: "Emerald" },
    { hex: "#0891B2", name: "Cerulean" },
    { hex: "#7C3AED", name: "Iris" },
    { hex: "#DB2777", name: "Magenta" },
    { hex: "#EA580C", name: "Rust" },
  ],
];

const capabilities: CapabilityItem[] = [
  {
    title: "Infinite Combinations",
    subtitle: "Any hex color, any angle",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    title: "Zero Setup",
    subtitle: "Open it, create it, copy it",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2L3 14h8l-1 8 11-14h-8l1-6z" />
      </svg>
    ),
  },
  {
    title: "Open Source",
    subtitle: "No accounts, no tracking",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
      </svg>
    ),
  },
];

const ParticleCanvas = lazy(() =>
  import("./ParticleCanvas").then((m) => ({ default: m.ParticleCanvas }))
);

function fisherYatesShuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i]!, shuffled[j]!] = [shuffled[j]!, shuffled[i]!];
  }
  return shuffled;
}

function generateGradient(colors: string[], angle: number): string {
  const stops = colors
    .map((c, i) => `${c} ${Math.round((i / Math.max(colors.length - 1, 1)) * 100)}%`)
    .join(", ");
  return `linear-gradient(${angle}deg, ${stops})`;
}

export function Hero() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const [paletteIndex, setPaletteIndex] = useState(0);
  const [activeColors, setActiveColors] = useState<ColorSwatch[]>(
    CURATED_PALETTES[0]!
  );
  const [gradientAngle] = useState(135);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const gradient = useMemo(
    () => generateGradient(activeColors.map((c) => c.hex), gradientAngle),
    [activeColors, gradientAngle]
  );

  const handleShuffle = useCallback(() => {
    const nextIndex = (paletteIndex + 1) % CURATED_PALETTES.length;
    setPaletteIndex(nextIndex);
    const base = CURATED_PALETTES[nextIndex]!;
    const shuffled = fisherYatesShuffle(base);
    setActiveColors(shuffled);
  }, [paletteIndex]);

  const handleCopyColor = useCallback((hex: string) => {
    navigator.clipboard.writeText(hex).catch(() => {
      // Clipboard API may not be available
    });
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  }, []);

  return (
    <section
      ref={ref}
      className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-44 lg:pb-36 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Canvas particle background — lazy loaded for smaller initial bundle */}
      {!prefersReducedMotion && (
        <Suspense fallback={null}>
          <ParticleCanvas />
        </Suspense>
      )}

      {/* Decorative gradient blobs — instant visual before canvas loads */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary-100/60 dark:bg-primary-900/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary-50/80 dark:bg-primary-900/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary-200/20 dark:from-primary-800/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200/80 dark:border-primary-800/50 mb-8 shadow-sm ${
              isInView ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" aria-hidden="true" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold text-primary-700 dark:text-primary-300 tracking-wide uppercase">
              Beyond Utility, Into Art
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-surface-900 dark:text-white leading-[1.08] ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
          >
            Color Palette Generator
            <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-500 dark:text-surface-400">
              Create Palettes That Feel{" "}
              <span className="gradient-text font-extrabold">Intentional</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`mt-6 text-lg sm:text-xl text-surface-500 dark:text-surface-400 leading-relaxed max-w-2xl mx-auto ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.15s" }}
          >
            Free, open-source tools to craft color palettes and gradients
            that go beyond utility into art. No signup required — start designing in seconds.
          </p>

          {/* Live Palette Preview — curated default, never empty */}
          <div
            className={`mt-10 max-w-xl mx-auto ${
              isInView ? "animate-scale-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-2xl border border-surface-200/80 dark:border-surface-700/80 overflow-hidden shadow-xl shadow-surface-900/8 dark:shadow-black/20">
              {/* Gradient bar */}
              <div
                className="h-32 sm:h-40 relative transition-all duration-500"
                style={{ background: gradient }}
                role="img"
                aria-label={`Gradient preview: ${activeColors.map((c) => c.name).join(", ")}`}
              >
                {/* Color stop indicators */}
                <div className="absolute bottom-3 left-3 right-3 flex gap-1.5">
                  {activeColors.map((color) => (
                    <div
                      key={color.hex}
                      className="flex-1 h-1.5 rounded-full backdrop-blur-sm"
                      style={{ backgroundColor: color.hex }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              {/* Color swatches + shuffle */}
              <div className="p-4 flex items-center gap-3">
                <div className="flex gap-2 flex-1" role="group" aria-label="Color swatches — click to copy">
                  {activeColors.map((swatch) => (
                    <button
                      key={swatch.hex + swatch.name}
                      type="button"
                      onClick={() => handleCopyColor(swatch.hex)}
                      className={`group relative flex-1 min-w-0 flex flex-col items-center gap-1 px-1 py-2 rounded-lg transition-all duration-200 ${
                        copiedColor === swatch.hex
                          ? "bg-primary-50 dark:bg-primary-900/30 ring-1 ring-primary-400"
                          : "hover:bg-surface-50 dark:hover:bg-surface-700/50"
                      }`}
                      aria-label={`Copy ${swatch.name} ${swatch.hex}`}
                    >
                      <span
                        className="w-8 h-8 rounded-lg shadow-sm ring-1 ring-black/5"
                        style={{ backgroundColor: swatch.hex }}
                        aria-hidden="true"
                      />
                      <span className="text-[10px] sm:text-xs font-mono text-surface-500 dark:text-surface-400 truncate w-full text-center">
                        {swatch.hex.toUpperCase()}
                      </span>
                      {copiedColor === swatch.hex && (
                        <span className="absolute -top-1 -right-1 text-[9px] font-bold text-primary-600 dark:text-primary-400 animate-fade-in">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleShuffle}
                  className="flex-shrink-0 px-4 py-2.5 text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition-all duration-200 shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-800"
                  aria-label="Shuffle color palette"
                >
                  <span className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="16 3 21 3 21 8" />
                      <line x1="4" y1="20" x2="21" y2="3" />
                      <polyline points="21 16 21 21 16 21" />
                      <line x1="15" y1="15" x2="21" y2="21" />
                      <line x1="4" y1="4" x2="9" y2="9" />
                    </svg>
                    Shuffle
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Capability cards — honest descriptions instead of fake stats */}
          <div
            className={`mt-16 pt-10 border-t border-surface-200/60 dark:border-surface-700/60 ${
              isInView ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {capabilities.map((cap) => (
                <div key={cap.title} className="text-center px-4 max-w-[160px]">
                  <div className="text-primary-500 dark:text-primary-400 flex justify-center mb-2">
                    {cap.icon}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-surface-900 dark:text-white">
                    {cap.title}
                  </div>
                  <div className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 mt-0.5">
                    {cap.subtitle}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className={`mt-16 flex flex-col items-center gap-2 ${
              isInView ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.7s" }}
            aria-hidden="true"
          >
            <span className="text-xs font-medium text-surface-400 dark:text-surface-500 uppercase tracking-widest">
              Scroll
            </span>
            <div className="w-5 h-8 rounded-full border-2 border-surface-300 dark:border-surface-600 flex items-start justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-surface-400 dark:bg-surface-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
