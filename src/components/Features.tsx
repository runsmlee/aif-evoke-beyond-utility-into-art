import { useInView } from "../hooks/useInView";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
  isInView: boolean;
}

function FeatureCard({ icon, title, description, delay, isInView }: FeatureCardProps) {
  return (
    <div
      className={`group relative p-6 sm:p-8 bg-white dark:bg-surface-800 rounded-2xl border border-surface-200/80 dark:border-surface-700/80 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-surface-900 ${
        isInView ? "animate-slide-up" : "opacity-0"
      }`}
      style={{ animationDelay: delay }}
    >
      {/* Subtle gradient on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-50/0 to-primary-50/0 group-hover:from-primary-50/50 dark:group-hover:from-primary-900/20 group-hover:to-transparent transition-all duration-300 pointer-events-none" aria-hidden="true" />

      <div className="relative">
        <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-500 dark:text-primary-400 mb-5 group-hover:bg-primary-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">{title}</h3>
        <p className="text-surface-500 dark:text-surface-400 leading-relaxed text-[0.938rem]">{description}</p>
      </div>
    </div>
  );
}

export function Features() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const features: Omit<FeatureCardProps, "isInView" | "delay">[] = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      title: "Intentional Design",
      description:
        "Every pixel is placed with purpose. Our design language balances form and function, creating interfaces that feel both effortless and profound.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
      title: "Emotional Resonance",
      description:
        "Tools that understand the human behind the screen. We build experiences that spark joy, foster creativity, and create genuine connection.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      title: "Craftsmanship",
      description:
        "Meticulous attention to detail in every interaction. Smooth animations, responsive layouts, and thoughtful micro-interactions that elevate the ordinary.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
          <polyline points="7.5 19.79 7.5 14.6 3 12" />
          <polyline points="21 12 16.5 14.6 16.5 19.79" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      title: "Creative Tools",
      description:
        "Powerful yet intuitive creative suite that adapts to your workflow. From concept to completion, Evoke empowers your artistic vision.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      title: "Seamless Flow",
      description:
        "Work that flows naturally from one task to the next. Intelligent context awareness keeps you focused without getting in the way.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Community",
      description:
        "Join a vibrant community of creators who share your passion. Collaborate, learn, and grow together in a space built for artistic expression.",
    },
  ];

  return (
    <section
      id="features"
      ref={ref}
      className="py-20 sm:py-28 bg-surface-50/80 dark:bg-surface-900/50 scroll-mt-20"
      aria-labelledby="features-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span
            className={`inline-block text-sm font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-3 ${
              isInView ? "animate-fade-in" : "opacity-0"
            }`}
          >
            Features
          </span>
          <h2
            id="features-heading"
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900 dark:text-white ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
          >
            Designed for the{" "}
            <span className="gradient-text">discerning creator</span>
          </h2>
          <p
            className={`mt-4 text-lg text-surface-500 dark:text-surface-400 ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            Every feature is crafted to transform routine tasks into moments of
            creative possibility.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={`${index * 0.08}s`}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
