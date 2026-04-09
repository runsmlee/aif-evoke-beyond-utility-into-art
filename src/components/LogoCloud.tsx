import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface LogoItem {
  name: string;
  abbr: string;
}

const logos: LogoItem[] = [
  { name: "Adobe", abbr: "Ad" },
  { name: "Figma", abbr: "Fi" },
  { name: "Spotify", abbr: "Sp" },
  { name: "Stripe", abbr: "St" },
  { name: "Notion", abbr: "No" },
  { name: "Vercel", abbr: "Ve" },
  { name: "Linear", abbr: "Li" },
  { name: "Framer", abbr: "Fr" },
];

function LogoCloud() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 border-y border-surface-200/60 dark:border-surface-800/60 bg-white dark:bg-surface-950 overflow-hidden"
      aria-label="Trusted by leading companies"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className={`text-center text-sm font-medium text-surface-400 dark:text-surface-500 mb-8 ${
            isInView ? "animate-fade-in" : "opacity-0"
          }`}
        >
          Trusted by teams at forward-thinking companies
        </p>
      </div>

      {/* Infinite scroll track */}
      <div
        className={`relative ${
          isInView ? "animate-fade-in" : "opacity-0"
        }`}
        style={{ animationDelay: "0.15s" }}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-surface-950 to-transparent z-10 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-surface-950 to-transparent z-10 pointer-events-none" aria-hidden="true" />

        <div
          className={`flex gap-10 ${
            prefersReducedMotion ? "" : "animate-scroll-logos"
          }`}
          aria-hidden="true"
        >
          {/* Double the logos for seamless loop */}
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex-shrink-0 group flex items-center gap-2 text-surface-300 dark:text-surface-600 hover:text-surface-500 dark:hover:text-surface-400 transition-colors duration-300"
            >
              <div
                className="w-8 h-8 rounded-lg bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-xs font-bold text-surface-400 dark:text-surface-500 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300"
              >
                {logo.abbr}
              </div>
              <span className="text-sm font-semibold tracking-wide uppercase whitespace-nowrap">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible list for screen readers */}
      <ul className="sr-only">
        {logos.map((logo) => (
          <li key={logo.name}>{logo.name}</li>
        ))}
      </ul>
    </section>
  );
}

export { LogoCloud };
