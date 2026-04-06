import { useState, useCallback } from "react";
import { useInView } from "../hooks/useInView";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  gradient: string;
  accent: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "composition-1",
    title: "Harmonic Resonance",
    category: "Composition",
    gradient: "from-primary-400 to-rose-300",
    accent: "bg-primary-500",
  },
  {
    id: "motion-1",
    title: "Fluid Dynamics",
    category: "Motion",
    gradient: "from-amber-400 to-primary-400",
    accent: "bg-amber-500",
  },
  {
    id: "color-1",
    title: "Chromatic Shift",
    category: "Color Theory",
    gradient: "from-violet-400 to-primary-400",
    accent: "bg-violet-500",
  },
  {
    id: "texture-1",
    title: "Woven Light",
    category: "Texture",
    gradient: "from-primary-300 to-pink-300",
    accent: "bg-pink-500",
  },
  {
    id: "space-1",
    title: "Negative Space",
    category: "Space",
    gradient: "from-surface-300 to-surface-400",
    accent: "bg-surface-500",
  },
  {
    id: "rhythm-1",
    title: "Visual Cadence",
    category: "Rhythm",
    gradient: "from-primary-500 to-red-700",
    accent: "bg-red-600",
  },
];

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { ref, isInView } = useInView({ threshold: 0.05 });

  const categories = ["All", ...new Set(galleryItems.map((item) => item.category))];
  const filteredItems =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const handleFilter = useCallback((category: string) => {
    setActiveFilter(category);
  }, []);

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-20 sm:py-28"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2
            id="gallery-heading"
            className={`text-3xl sm:text-4xl font-bold tracking-tight text-surface-900 ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
          >
            The <span className="text-primary-500">Gallery</span>
          </h2>
          <p
            className={`mt-4 text-lg text-surface-500 ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            A curated showcase of digital artistry — where utility transcends into
            visual poetry.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className={`flex flex-wrap items-center justify-center gap-2 mb-10 ${
            isInView ? "animate-fade-in" : "opacity-0"
          }`}
          style={{ animationDelay: "0.2s" }}
          role="tablist"
          aria-label="Filter gallery by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeFilter === category}
              onClick={() => handleFilter(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                activeFilter === category
                  ? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
                  : "bg-surface-100 text-surface-600 hover:bg-surface-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="tabpanel"
          aria-label="Gallery items"
        >
          {filteredItems.map((item, index) => (
            <article
              key={item.id}
              className={`group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer ${
                isInView ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-110`}
                aria-hidden="true"
              />

              {/* Decorative shapes */}
              <div className="absolute inset-0 opacity-20" aria-hidden="true">
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-white/40 rounded-full" />
                <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-white/30 rounded-full animate-float" />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="inline-block px-2 py-0.5 text-xs font-medium text-white/90 bg-white/20 rounded-full backdrop-blur-sm mb-2">
                  {item.category}
                </span>
                <h3 className="text-white font-semibold text-lg">{item.title}</h3>
              </div>

              {/* Center play icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
