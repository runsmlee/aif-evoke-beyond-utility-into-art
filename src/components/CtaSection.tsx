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
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-8 sm:p-12 lg:p-16 noise-overlay ${
            isInView ? "animate-scale-in" : "opacity-0"
          }`}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-white/5 rounded-full blur-xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-2xl mx-auto text-center z-10">
            <h2
              id="cta-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
            >
              Ready to create something extraordinary?
            </h2>
            <p className="mt-4 text-lg text-primary-100 leading-relaxed">
              Join thousands of creators who&apos;ve elevated their craft with Evoke.
              Start your journey today — no credit card required.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="group inline-flex items-center px-7 py-3.5 text-base font-semibold text-primary-600 bg-white rounded-xl hover:bg-surface-50 transition-all duration-200 shadow-lg shadow-primary-900/30 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
              >
                Start Creating Free
                <svg
                  className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center px-7 py-3.5 text-base font-semibold text-white border border-white/25 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
              >
                Schedule a Demo
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-primary-200/80">
              <span className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Free forever plan
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
