import { useInView } from "../hooks/useInView";

export function Hero() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-44 lg:pb-36 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50 animate-pulse-slow" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-60 animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 mb-8 ${
              isInView ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" aria-hidden="true" />
            <span className="text-xs font-medium text-primary-700 tracking-wide uppercase">
              Where Design Meets Art
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-surface-900 leading-[1.1] ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
          >
            Beyond Utility,{" "}
            <span className="text-primary-500">Into Art</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`mt-6 text-lg sm:text-xl text-surface-500 leading-relaxed max-w-2xl mx-auto ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.15s" }}
          >
            Evoke transforms everyday interactions into meaningful experiences.
            We craft digital tools that don&apos;t just work — they inspire.
          </p>

          {/* CTA Buttons */}
          <div
            className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href="#features"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-primary-500 rounded-xl hover:bg-primary-600 transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Explore Evoke
              <svg
                className="ml-2 w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-surface-700 bg-white border border-surface-300 rounded-xl hover:border-surface-400 hover:bg-surface-50 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              View Gallery
            </a>
          </div>

          {/* Stats bar */}
          <div
            className={`mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto ${
              isInView ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.5s" }}
          >
            {[
              { value: "10K+", label: "Creators" },
              { value: "50K+", label: "Artworks" },
              { value: "99%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-surface-900">
                  {stat.value}
                </div>
                <div className="text-sm text-surface-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
