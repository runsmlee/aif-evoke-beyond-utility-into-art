import { useState, useCallback } from "react";
import { useInView } from "../hooks/useInView";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email: string): string | null {
  if (!email.trim()) return "Email address is required";
  if (!EMAIL_REGEX.test(email)) return "Please enter a valid email address";
  return null;
}

export function CtaSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      if (touched) {
        // Clear error as user fixes it
        const validationError = validateEmail(value);
        setError(validationError);
      }
    },
    [touched],
  );

  const handleBlur = useCallback(() => {
    setTouched(true);
    if (email.trim()) {
      setError(validateEmail(email));
    }
  }, [email]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setTouched(true);
      const validationError = validateEmail(email);
      if (validationError) {
        setError(validationError);
        return;
      }
      setSubmitted(true);
      setEmail("");
      setError(null);
    },
    [email],
  );

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
          style={{ boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.25)" }}
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

            {/* Email signup form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 max-w-md mx-auto"
              noValidate
            >
              {submitted ? (
                <div
                  className="flex items-center justify-center gap-2 py-3.5 px-6 bg-white/20 backdrop-blur-sm rounded-xl text-white font-semibold animate-fade-in"
                  role="status"
                  aria-live="polite"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Welcome aboard! Check your inbox.
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label htmlFor="cta-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      onBlur={handleBlur}
                      placeholder="Enter your email"
                      required
                      aria-invalid={error ? "true" : undefined}
                      aria-describedby={error ? "cta-email-error" : undefined}
                      className={`w-full px-4 py-3.5 text-surface-900 placeholder-surface-400 bg-white rounded-xl border-0 focus:ring-2 focus:outline-none text-sm sm:text-base transition-colors duration-200 ${
                        error
                          ? "focus:ring-red-300 ring-2 ring-red-400"
                          : "focus:ring-white"
                      }`}
                      aria-label="Email address for signup"
                    />
                    {error && (
                      <p
                        id="cta-email-error"
                        className="mt-1.5 text-xs text-red-200 text-left pl-1"
                        role="alert"
                      >
                        {error}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 text-sm sm:text-base font-semibold text-primary-600 bg-white rounded-xl hover:bg-surface-50 transition-all duration-200 shadow-lg shadow-primary-900/30 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600 whitespace-nowrap"
                  >
                    Get Started Free
                  </button>
                </div>
              )}
            </form>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-primary-200/80">
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
