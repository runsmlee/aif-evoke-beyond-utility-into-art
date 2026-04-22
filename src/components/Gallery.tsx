import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useInView } from "../hooks/useInView";
import { GalleryModal, type GalleryModalItem } from "./GalleryModal";
import { PatternOverlay } from "./PatternOverlay";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  gradient: string;
  pattern: "circles" | "lines" | "dots" | "rings" | "grid" | "waves";
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "composition-1",
    title: "Harmonic Resonance",
    category: "Composition",
    gradient: "from-primary-400 to-rose-300",
    pattern: "circles",
    description: "An exploration of visual harmony through layered circular forms. Each element resonates with its neighbors, creating a composition that feels both balanced and alive.",
  },
  {
    id: "motion-1",
    title: "Fluid Dynamics",
    category: "Motion",
    gradient: "from-amber-400 to-primary-400",
    pattern: "lines",
    description: "Capturing the essence of movement through parallel lines that shift and flow. This piece explores how directional energy creates a sense of perpetual motion.",
  },
  {
    id: "color-1",
    title: "Chromatic Shift",
    category: "Color Theory",
    gradient: "from-violet-400 to-primary-400",
    pattern: "dots",
    description: "A study in color relationships and their emotional impact. The dot matrix creates a rhythmic pattern that shifts perception as the viewer's eye moves across the work.",
  },
  {
    id: "texture-1",
    title: "Woven Light",
    category: "Texture",
    gradient: "from-primary-300 to-pink-300",
    pattern: "rings",
    description: "Concentric rings of light create a tapestry of warmth and depth. This piece examines how simple geometric forms can generate rich, tactile visual experiences.",
  },
  {
    id: "space-1",
    title: "Negative Space",
    category: "Space",
    gradient: "from-surface-300 to-surface-400",
    pattern: "grid",
    description: "The power of emptiness. A precise grid reveals how the absence of content can be as expressive as its presence, inviting contemplation and quiet reflection.",
  },
  {
    id: "rhythm-1",
    title: "Visual Cadence",
    category: "Rhythm",
    gradient: "from-primary-500 to-red-700",
    pattern: "waves",
    description: "Flowing waveforms create a visual beat that pulses with energy. This piece translates musical rhythm into visual language, creating a synesthetic experience.",
  },
];

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryModalItem | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const categories = useMemo(() => ["All", ...new Set(galleryItems.map((item) => item.category))], []);
  const filteredItems =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  // Animate transition when filter changes using requestAnimationFrame for reliability
  useEffect(() => {
    setIsTransitioning(true);
    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsTransitioning(false);
      });
    });
    return () => cancelAnimationFrame(frameId);
  }, [activeFilter]);

  const handleFilter = useCallback((category: string) => {
    setActiveFilter(category);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      let nextIndex = index;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        nextIndex = (index + 1) % categories.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        nextIndex = (index - 1 + categories.length) % categories.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = categories.length - 1;
      }

      if (nextIndex !== index) {
        const nextCategory = categories[nextIndex];
        if (nextCategory !== undefined) {
          setActiveFilter(nextCategory);
          tabRefs.current[nextIndex]?.focus();
        }
      }
    },
    [categories],
  );

  const openModal = useCallback((item: GalleryItem) => {
    setSelectedItem({
      id: item.id,
      title: item.title,
      category: item.category,
      gradient: item.gradient,
      pattern: item.pattern,
      description: item.description,
    });
  }, []);

  const closeModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-20 sm:py-28 bg-surface-50/80 dark:bg-surface-900/30 scroll-mt-20"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span
            className={`inline-block text-sm font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-3 ${
              isInView ? "animate-fade-in" : "opacity-0"
            }`}
          >
            Showcase
          </span>
          <h2
            id="gallery-heading"
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900 dark:text-white ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
          >
            The <span className="gradient-text">Gallery</span>
          </h2>
          <p
            className={`mt-4 text-lg text-surface-500 dark:text-surface-400 ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            A curated showcase of digital artistry — where utility transcends into
            visual poetry.
          </p>
        </div>

        {/* Filter Tabs with arrow key navigation */}
        <div
          className={`flex flex-wrap items-center justify-center gap-2 mb-10 ${
            isInView ? "animate-fade-in" : "opacity-0"
          }`}
          style={{ animationDelay: "0.2s" }}
          role="tablist"
          aria-label="Filter gallery by category"
          aria-orientation="horizontal"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              tabIndex={activeFilter === category ? 0 : -1}
              aria-selected={activeFilter === category}
              onClick={() => handleFilter(category)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                activeFilter === category
                  ? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
                  : "bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 border border-surface-200 dark:border-surface-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${
            isTransitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
          }`}
          role="tabpanel"
          aria-labelledby="gallery-heading"
          aria-label="Gallery items"
        >
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-16">
              <p className="text-surface-400 dark:text-surface-500 text-lg">No items in this category yet.</p>
            </div>
          )}
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 gallery-item-enter focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] hover:-translate-y-1 ${
                isInView ? "animate-scale-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.08 * index}s` }}
              onClick={() => openModal(item)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(item); } }}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${item.title}`}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-700 group-hover:scale-110`}
                aria-hidden="true"
              />

              {/* Pattern overlay */}
              <PatternOverlay pattern={item.pattern} />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="inline-block px-2.5 py-1 text-xs font-semibold text-white/95 bg-white/20 rounded-full backdrop-blur-sm mb-2">
                  {item.category}
                </span>
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
              </div>

              {/* Center icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="white"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                </div>
              </div>

              {/* Screen reader text */}
              <span className="sr-only">
                {item.title} — {item.category} artwork
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Modal */}
      {selectedItem && (
        <GalleryModal item={selectedItem} onClose={closeModal} />
      )}
    </section>
  );
}
