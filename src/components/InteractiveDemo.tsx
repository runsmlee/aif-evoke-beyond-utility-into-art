import { useState, useCallback, useMemo, useRef } from "react";
import { useInView } from "../hooks/useInView";

interface ColorSwatch {
  hex: string;
  name: string;
}

interface SavedPalette {
  id: string;
  colors: ColorSwatch[];
  angle: number;
  savedAt: number;
}

const MAX_SAVED_PALETTES = 12;
const STORAGE_KEY = "evoke-saved-palettes";

const aestheticAngles = [15, 45, 90, 135, 180, 225, 270, 315];

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

function fisherYatesShuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i]!, shuffled[j]!] = [shuffled[j]!, shuffled[i]!];
  }
  return shuffled;
}

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

function loadSavedPalettes(): SavedPalette[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, MAX_SAVED_PALETTES);
  } catch {
    return [];
  }
}

function savePalettesToStorage(palettes: SavedPalette[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(palettes.slice(0, MAX_SAVED_PALETTES)));
  } catch {
    // Storage full or unavailable — silently fail
  }
}

function generateCssBlock(colors: ColorSwatch[], gradient: string): string {
  const roles = ["primary", "secondary", "accent", "highlight", "base"] as const;
  const lines = colors.map((c, i) => {
    const role = roles[i] ?? `color-${i + 1}`;
    return `  --evoke-${role}: ${c.hex.toUpperCase()};`;
  });
  lines.push(`  --evoke-gradient: ${gradient};`);
  return `:root {\n${lines.join("\n")}\n}`;
}

function generateTailwindConfig(colors: ColorSwatch[]): string {
  const roles = ["primary", "secondary", "accent", "highlight", "base"] as const;
  const entries = colors.map((c, i) => {
    const role = roles[i] ?? `color-${i + 1}`;
    return `  'evoke-${role}': '${c.hex.toUpperCase()}'`;
  });
  return `colors: {\n${entries.join(",\n")}\n}`;
}

const anglePresets = [90, 135, 180, 225, 270];

function InteractiveDemo() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [activeColors, setActiveColors] = useState<ColorSwatch[]>(basePalettes[0]!);
  const [gradientAngle, setGradientAngle] = useState(135);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [copiedCss, setCopiedCss] = useState(false);
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>(loadSavedPalettes);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Angle queue for cycling through aesthetic angles without repeats
  const angleQueueRef = useRef<number[]>(fisherYatesShuffle(aestheticAngles));

  function getNextAestheticAngle(): number {
    const queue = angleQueueRef.current;
    if (queue.length === 0) {
      angleQueueRef.current = fisherYatesShuffle(aestheticAngles);
    }
    const angle = angleQueueRef.current.shift()!;
    return angle;
  }

  const gradient = useMemo(
    () => generateGradient(activeColors.map((c) => c.hex), gradientAngle),
    [activeColors, gradientAngle],
  );

  const cssBlock = useMemo(
    () => generateCssBlock(activeColors, gradient),
    [activeColors, gradient],
  );

  const tailwindConfig = useMemo(
    () => generateTailwindConfig(activeColors),
    [activeColors],
  );

  // Auto-save palette to history
  const savePaletteToHistory = useCallback((colors: ColorSwatch[], angle: number) => {
    const palette: SavedPalette = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      colors: colors.map((c) => ({ ...c })),
      angle,
      savedAt: Date.now(),
    };
    setSavedPalettes((prev) => {
      const updated = [palette, ...prev].slice(0, MAX_SAVED_PALETTES);
      savePalettesToStorage(updated);
      return updated;
    });
    showToast("Palette saved to history");
  }, []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2000);
  }, []);

  const selectPalette = useCallback((index: number) => {
    setSelectedPalette(index);
    setActiveColors(basePalettes[index]!);
  }, []);

  const shuffleColors = useCallback(() => {
    const base = basePalettes[selectedPalette]!;
    const shuffled = fisherYatesShuffle(base);
    const newAngle = getNextAestheticAngle();
    setActiveColors(shuffled);
    setGradientAngle(newAngle);
    savePaletteToHistory(shuffled, newAngle);
  }, [selectedPalette, savePaletteToHistory]);

  const mixColors = useCallback(() => {
    const newAngle = getNextAestheticAngle();
    const newColors = activeColors.map((swatch) => {
      const rgb = hexToRgb(swatch.hex);
      const shift = () => Math.floor(Math.random() * 60) - 30;
      return {
        ...swatch,
        hex: rgbToHex(rgb.r + shift(), rgb.g + shift(), rgb.b + shift()),
      };
    });
    setActiveColors(newColors);
    setGradientAngle(newAngle);
    savePaletteToHistory(newColors, newAngle);
  }, [activeColors, savePaletteToHistory]);

  const copyColor = useCallback((hex: string) => {
    navigator.clipboard.writeText(hex).catch(() => {
      // Silently fail - clipboard API may not be available
    });
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  }, []);

  const copyCssBlock = useCallback(() => {
    navigator.clipboard.writeText(cssBlock).catch(() => {});
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 1500);
  }, [cssBlock]);

  const copyTailwindConfig = useCallback(() => {
    navigator.clipboard.writeText(tailwindConfig).catch(() => {});
  }, [tailwindConfig]);

  const restorePalette = useCallback((palette: SavedPalette) => {
    setActiveColors(palette.colors.map((c) => ({ ...c })));
    setGradientAngle(palette.angle);
  }, []);

  const deletePalette = useCallback((id: string) => {
    setSavedPalettes((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      savePalettesToStorage(updated);
      return updated;
    });
  }, []);

  return (
    <section
      id="demo"
      ref={ref}
      className="py-20 sm:py-28 bg-surface-50/80 dark:bg-surface-900/30 scroll-mt-20"
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
                <button
                  type="button"
                  onClick={() => {
                    savePaletteToHistory(activeColors, gradientAngle);
                  }}
                  className="px-4 py-2.5 text-sm font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-xl border border-primary-200 dark:border-primary-800 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-800"
                  aria-label="Save current palette"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
              </div>

              {/* CSS Output Section */}
              <div className="relative bg-surface-50 dark:bg-surface-900 rounded-xl p-4 border border-surface-200 dark:border-surface-700">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                    CSS
                  </p>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={copyTailwindConfig}
                      className="px-2 py-1 text-xs font-medium rounded-lg transition-all duration-200 text-surface-500 hover:text-primary-500 dark:text-surface-400 dark:hover:text-primary-400 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1"
                      aria-label="Copy as Tailwind config"
                    >
                      Tailwind
                    </button>
                  </div>
                </div>
                <pre className="text-xs sm:text-sm font-mono text-surface-700 dark:text-surface-300 overflow-x-auto whitespace-pre-wrap">{cssBlock}</pre>
                <button
                  type="button"
                  onClick={copyCssBlock}
                  className="absolute top-3 right-3 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1"
                  aria-label="Copy CSS to clipboard"
                >
                  {copiedCss ? (
                    <span className="text-primary-600 dark:text-primary-400 flex items-center gap-1 animate-fade-in">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied!
                    </span>
                  ) : (
                    <span className="text-surface-500 hover:text-primary-500 dark:text-surface-400 dark:hover:text-primary-400">
                      Copy
                    </span>
                  )}
                </button>
              </div>

              {/* Saved Palettes Drawer */}
              <div className="border-t border-surface-200 dark:border-surface-700 pt-4">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider"
                  aria-expanded={isDrawerOpen}
                  aria-controls="saved-palettes-drawer"
                >
                  <span>Saved Palettes ({savedPalettes.length}/{MAX_SAVED_PALETTES})</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${isDrawerOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {isDrawerOpen && (
                  <div
                    id="saved-palettes-drawer"
                    className="mt-3 animate-slide-down"
                  >
                    {savedPalettes.length === 0 ? (
                      <p className="text-xs text-surface-400 dark:text-surface-500 text-center py-4">
                        No saved palettes yet. Shuffle or Mix to auto-save.
                      </p>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {savedPalettes.map((palette) => {
                          const miniGradient = generateGradient(
                            palette.colors.map((c) => c.hex),
                            palette.angle,
                          );
                          return (
                            <div
                              key={palette.id}
                              className="group relative rounded-lg overflow-hidden border border-surface-200 dark:border-surface-700 cursor-pointer hover:ring-2 hover:ring-primary-400 transition-all duration-200"
                              role="button"
                              tabIndex={0}
                              aria-label={`Restore saved palette from ${new Date(palette.savedAt).toLocaleTimeString()}`}
                              onClick={() => restorePalette(palette)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  restorePalette(palette);
                                }
                              }}
                            >
                              <div
                                className="h-10 w-full"
                                style={{ background: miniGradient }}
                                aria-hidden="true"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deletePalette(palette.id);
                                }}
                                className="absolute top-0.5 right-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-black/40 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500 focus-visible:opacity-100"
                                aria-label={`Delete palette saved at ${new Date(palette.savedAt).toLocaleTimeString()}`}
                              >
                                ×
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toastMessage && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-surface-900 dark:bg-surface-100 text-white dark:text-surface-900 text-sm font-medium rounded-lg shadow-lg animate-fade-in z-50"
          role="status"
          aria-live="polite"
        >
          {toastMessage}
        </div>
      )}
    </section>
  );
}

export { InteractiveDemo, fisherYatesShuffle };
