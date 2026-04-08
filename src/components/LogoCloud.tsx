import { useInView } from "../hooks/useInView";

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
];

export function LogoCloud() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 border-y border-surface-200/60 dark:border-surface-800/60 bg-white dark:bg-surface-950"
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
        <div
          className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-6 ${
            isInView ? "animate-fade-in" : "opacity-0"
          }`}
          style={{ animationDelay: "0.15s" }}
        >
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="group flex items-center gap-2 text-surface-300 dark:text-surface-600 hover:text-surface-500 dark:hover:text-surface-400 transition-colors duration-300"
              aria-label={logo.name}
            >
              <div
                className="w-8 h-8 rounded-lg bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-xs font-bold text-surface-400 dark:text-surface-500 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300"
                aria-hidden="true"
              >
                {logo.abbr}
              </div>
              <span className="text-sm font-semibold tracking-wide uppercase">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
