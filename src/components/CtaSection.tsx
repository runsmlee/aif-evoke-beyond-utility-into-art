import { useInView } from "../hooks/useInView";

export function CtaSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 sm:py-28"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 p-8 sm:p-12 lg:p-16 ${
            isInView ? "animate-slide-up" : "opacity-0"
          }`}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full blur-xl" />
          </div>

          <div className="relative max-w-2xl mx-auto text-center">
            <h2
              id="cta-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
            >
              Ready to create something extraordinary?
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Join thousands of creators who&apos;ve elevated their craft with Evoke.
              Start your journey today — no credit card required.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-primary-600 bg-white rounded-xl hover:bg-surface-50 transition-all duration-200 shadow-lg shadow-primary-900/30 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
              >
                Start Creating Free
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
                href="#"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white border border-white/30 rounded-xl hover:bg-white/10 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
              >
                Schedule a Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
