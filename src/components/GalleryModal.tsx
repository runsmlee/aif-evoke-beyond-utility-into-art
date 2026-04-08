import { useEffect, useCallback, useRef } from "react";

interface GalleryModalItem {
  id: string;
  title: string;
  category: string;
  gradient: string;
  pattern: "circles" | "lines" | "dots" | "rings" | "grid" | "waves";
  description: string;
}

interface GalleryModalProps {
  item: GalleryModalItem;
  onClose: () => void;
}

export type { GalleryModalItem };

export function GalleryModal({ item, onClose }: GalleryModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  // Focus management and body scroll lock
  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    };
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    },
    [onClose],
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} artwork details`}
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-surface-800 rounded-2xl overflow-hidden shadow-2xl animate-fade-scale">
        {/* Artwork preview */}
        <div
          className={`aspect-[16/9] bg-gradient-to-br ${item.gradient} relative`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="white"
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
            </div>
          </div>

          {/* Close button */}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close modal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Details */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-block px-2.5 py-1 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-full">
              {item.category}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-3">
            {item.title}
          </h3>
          <p className="text-surface-500 dark:text-surface-400 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
