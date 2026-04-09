import { useState, useCallback, useMemo } from "react";
import { useInView } from "../hooks/useInView";

interface ColorSwatch {
  hex: string;
  name: string;
}

const basePalettes: ColorSwatch[][] = [
  [
    { hex: "#EF4444", name: "Primary" },
    { hex: "#F97316", name: "Ember" },
    { hex: "#FBBF24", name: "Honey" },
    { hex: "#34D399", name: "Mint" },
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
];

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(result[1] ?? "0", 16),
    g: parseInt(result[2] ?? "0", 16),
    b: parseInt(result[3] ?? "0", 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${clamp(r).toString(16).padStart(2, "0")}${clamp(g).toString(16).padStart(2, "0")}${clamp(b).toString(16).padStart(2, "0")}`;
}

function generateGradient(colors: string[], angle: number): string {
  if (colors.length === 0) return "linear-gradient(135deg, #EF4444, #F97316)";
  const stops = colors.map((c, i) => `${c} ${Math.round((i / Math.max(colors.length - 1, 1)) * 100)}%`).join(", ");
  return `linear-gradient(${angle}deg, ${stops})`;
}

function InteractiveDemo() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [activeColors, setActiveColors] = useState<ColorSwatch[]>(basePalettes[0]!);
  const [gradientAngle, setGradientAngle] = useState(135);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const gradient = useMemo(
    () => generateGradient(activeColors.map((c) => c.hex), gradientAngle),
    [activeColors, gradientAngle],
  );

  const selectPalette = useCallback((index: number) => {
    setSelectedPalette(index);
    setActiveColors(basePalettes[index]!);
  }, []);

  const shuffleColors = useCallback(() => {
    const base = basePalettes[selectedPalette]!;
    const shuffled = [...base].sort(() => Math.random() - 0.5);
    setActiveColors(shuffled);
    setGradientAngle(Math.floor(Math.random() * 360));
  }, [selectedPalette]);

  const mixColors = useCallback(() => {
    setActiveColors((prev) => {
      return prev.map((swatch) => {
        const rgb = hexToRgb(swatch.hex);
        const shift = () => Math.floor(Math.random() * 60) - 30;
        return {
          ...swatch,
          hex: rgbToHex(rgb.r + shift(), rgb.g + shift(), rgb.b + shift()),
        };
      });
    });
    setGradientAngle(Math.floor(Math.random() * 360));
  }, []);

  const copyColor = useCallback((hex: string) => {
    navigator.clipboard.writeText(hex).catch(() => {
      // Silently fail - clipboard API may not be available
    });
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  }, []);

  const anglePresets = [90, 135, 180, 225, 270];

  return (
    <section
      id="demo"
      ref={ref}
      className="py-20 sm:py-28 bg-surface-50/80 dark:bg-surface-900/30"
      aria-labelledby="demo-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span
            className={`inline-block text-sm font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-3 ${
              isInView ? "animate-fade-in" : "opacity-0"
            }`}
          >
            Try It
          </span>
          <h2
            id="demo-heading"
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900 dark:text-white ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
          >
            Create your <span className="gradient-text">palette</span>
          </h2>
          <p
            className={`mt-4 text-lg text-surface-500 dark:text-surface-400 ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            Mix, match, and explore color combinations. Click any swatch to copy its hex code.
          </p>
        </div>

        {/* Interactive Panel */}
        <div
          className={`max-w-3xl mx-auto ${
            isInView ? "animate-scale-in" : "opacity-0"
          }`}
        >
          <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 overflow-hidden shadow-xl shadow-surface-900/5 dark:shadow-black/20">
            {/* Preview Area */}
            <div
              className="h-48 sm:h-64 relative transition-all duration-500"
              style={{ background: gradient }}
              role="img"
              aria-label={`Gradient preview using ${activeColors.length} colors at ${gradientAngle} degrees`}
            >
              {/* Angle indicator */}
              <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white text-xs font-mono">
                {gradientAngle}°
              </div>

              {/* Color stops indicator */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                {activeColors.map((color) => (
                  <div
                    key={color.hex + color.name}
                    className="flex-1 h-2 rounded-full backdrop-blur-sm"
                    style={{ backgroundColor: color.hex }}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="p-5 sm:p-6 space-y-5">
              {/* Palette Selector */}
              <div>
                <p className="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-2">
                  Base Palette
                </p>
                <div className="flex gap-2" role="radiogroup" aria-label="Select base color palette">
                  {basePalettes.map((palette, i) => (
                    <button
                      key={i}
                      type="button"
                      role="radio"
                      aria-checked={selectedPalette === i}
                      aria-label={`Palette ${i + 1}`}
                      onClick={() => selectPalette(i)}
                      className={`flex gap-1 px-3 py-2 rounded-lg border transition-all duration-200 ${
                        selectedPalette === i
                          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-500"
                          : "border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600"
                      }`}
                    >
                      {palette.slice(0, 3).map((color) => (
                        <span
                          key={color.hex}
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color.hex }}
                          aria-hidden="true"
                        />
                      ))}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Swatches */}
              <div>
                <p className="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-2">
                  Colors — Click to copy
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeColors.map((swatch) => (
                    <button
                      key={swatch.hex + swatch.name}
                      type="button"
                      onClick={() => copyColor(swatch.hex)}
                      className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                        copiedColor === swatch.hex
                          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                          : "border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600 hover:shadow-sm"
                      }`}
                      aria-label={`Copy ${swatch.name} color ${swatch.hex}`}
                    >
                      <span
                        className="w-5 h-5 rounded-md shadow-inner"
                        style={{ backgroundColor: swatch.hex }}
                        aria-hidden="true"
                      />
                      <span className="text-xs font-mono text-surface-600 dark:text-surface-300">
                        {swatch.hex.toUpperCase()}
                      </span>
                      {copiedColor === swatch.hex && (
                        <span className="text-xs text-primary-600 dark:text-primary-400 font-semibold animate-fade-in">
                          Copied!
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Angle Slider */}
              <div>
                <p className="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-2">
                  Angle
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={gradientAngle}
                    onChange={(e) => setGradientAngle(Number(e.target.value))}
                    className="flex-1 h-2 bg-surface-200 dark:bg-surface-700 rounded-full appearance-none cursor-pointer accent-primary-500"
                    aria-label="Gradient angle"
                  />
                  <div className="flex gap-1">
                    {anglePresets.map((angle) => (
                      <button
                        key={angle}
                        type="button"
                        onClick={() => setGradientAngle(angle)}
                        className={`px-2 py-1 text-xs font-mono rounded transition-colors duration-200 ${
                          gradientAngle === angle
                            ? "bg-primary-500 text-white"
                            : "bg-surface-100 dark:bg-surface-700 text-surface-500 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600"
                        }`}
                        aria-label={`Set angle to ${angle} degrees`}
                      >
                        {angle}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={shuffleColors}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition-colors duration-200 shadow-md shadow-primary-500/20 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-800"
                  aria-label="Shuffle color order"
                >
                  <span className="flex items-center justify-center gap-2">
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
                <button
                  type="button"
                  onClick={mixColors}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-surface-700 dark:text-surface-200 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-xl border border-surface-200 dark:border-surface-600 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-800"
                  aria-label="Generate random color variations"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="1" y="1" width="22" height="22" rx="3" />
                      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                      <circle cx="16" cy="8" r="1.5" fill="currentColor" />
                      <circle cx="8" cy="16" r="1.5" fill="currentColor" />
                      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
                      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                    </svg>
                    Mix
                  </span>
                </button>
              </div>

              {/* Generated CSS output */}
              <div className="relative bg-surface-50 dark:bg-surface-900 rounded-xl p-4 border border-surface-200 dark:border-surface-700">
                <p className="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-2">
                  CSS
                </p>
                <code className="text-xs sm:text-sm font-mono text-surface-700 dark:text-surface-300 break-all">
                  background: {gradient};
                </code>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(`background: ${gradient};`).catch(() => {});
                  }}
                  className="absolute top-3 right-3 px-2 py-1 text-xs font-medium text-surface-500 hover:text-primary-500 dark:text-surface-400 dark:hover:text-primary-400 transition-colors duration-200"
                  aria-label="Copy CSS to clipboard"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { InteractiveDemo };
