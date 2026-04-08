import { useInView } from "../hooks/useInView";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  initials: string;
  bgColor: string;
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Evoke changed how I think about digital tools. Every interaction feels considered, almost poetic. It's not just software — it's a creative partner.",
    author: "Maya Rodriguez",
    role: "Art Director, Studio Volta",
    initials: "MR",
    bgColor: "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300",
  },
  {
    id: "t2",
    quote:
      "The attention to detail is extraordinary. From the micro-animations to the color palette, everything speaks to a deeper understanding of design craft.",
    author: "James Chen",
    role: "Senior Designer, Parallel",
    initials: "JC",
    bgColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  {
    id: "t3",
    quote:
      "I've tried dozens of creative platforms. Evoke is the first that makes me smile every time I open it. That's the hallmark of truly great design.",
    author: "Aria Nakamura",
    role: "Creative Lead, Bloom Co.",
    initials: "AN",
    bgColor: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  },
];

export function Testimonials() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-20 sm:py-28 bg-surface-900 dark:bg-surface-950 text-white relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span
            className={`inline-block text-sm font-semibold text-primary-400 uppercase tracking-wider mb-3 ${
              isInView ? "animate-fade-in" : "opacity-0"
            }`}
          >
            Testimonials
          </span>
          <h2
            id="testimonials-heading"
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
          >
            Voices from the{" "}
            <span className="text-primary-400">community</span>
          </h2>
          <p
            className={`mt-4 text-lg text-surface-400 ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            Creators and professionals who&apos;ve discovered a new standard for digital
            experiences.
          </p>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={testimonial.id}
              className={`bg-surface-800/80 dark:bg-surface-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-surface-700/50 dark:border-surface-700/30 hover:border-surface-600 dark:hover:border-surface-600 transition-all duration-300 hover:-translate-y-1 ${
                isInView ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-primary-400"
                    aria-hidden="true"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <p className="text-surface-300 dark:text-surface-400 leading-relaxed mb-6 text-[0.938rem]">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <footer className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ring-2 ring-surface-700/50 ${testimonial.bgColor}`}
                  aria-hidden="true"
                >
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-surface-400">
                    {testimonial.role}
                  </div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
