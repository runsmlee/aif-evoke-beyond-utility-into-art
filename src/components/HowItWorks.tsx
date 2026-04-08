import { useInView } from "../hooks/useInView";

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Sign Up",
    description: "Create your free account in seconds. No credit card required to get started.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "Create",
    description: "Explore powerful creative tools designed to bring your artistic vision to life.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "Collaborate",
    description: "Share your work with a vibrant community. Get feedback, iterate, and grow together.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    number: 4,
    title: "Share",
    description: "Export your creations in any format and share them with the world, beautifully.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-20 sm:py-28"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span
            className={`inline-block text-sm font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-3 ${
              isInView ? "animate-fade-in" : "opacity-0"
            }`}
          >
            How It Works
          </span>
          <h2
            id="how-it-works-heading"
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900 dark:text-white ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
          >
            From idea to{" "}
            <span className="gradient-text">masterpiece</span>
          </h2>
          <p
            className={`mt-4 text-lg text-surface-500 dark:text-surface-400 ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            Four simple steps to transform your creative workflow.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div
            className={`hidden md:block absolute top-12 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-surface-200 dark:bg-surface-700 ${
              isInView ? "scale-x-100" : "scale-x-0"
            }`}
            style={{ transformOrigin: "left", transition: "transform 0.8s ease-out 0.3s" }}
            aria-hidden="true"
          />

          {/* Connecting line - mobile */}
          <div
            className={`md:hidden absolute top-6 bottom-6 left-6 w-0.5 bg-surface-200 dark:bg-surface-700 ${
              isInView ? "scale-y-100" : "scale-y-0"
            }`}
            style={{ transformOrigin: "top", transition: "transform 0.8s ease-out 0.3s" }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center ${
                  isInView ? "animate-slide-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.15 + index * 0.1}s` }}
              >
                {/* Step circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg shadow-primary-500/25">
                    <span className="text-sm font-bold">{step.number}</span>
                  </div>
                </div>

                <div className="md:mt-5">
                  <div className="w-10 h-10 text-primary-500 dark:text-primary-400 mx-auto mb-3 hidden md:block">
                    {step.icon}
                  </div>
                  <h3 className="text-base font-semibold text-surface-900 dark:text-white mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
