import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "evoke-cookie-consent";
type ConsentStatus = "accepted" | "declined" | null;

function getStoredConsent(): ConsentStatus {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "declined") return stored;
    return null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>(getStoredConsent);

  useEffect(() => {
    if (consent) {
      localStorage.setItem(STORAGE_KEY, consent);
    }
  }, [consent]);

  const handleAccept = useCallback(() => {
    setConsent("accepted");
  }, []);

  const handleDecline = useCallback(() => {
    setConsent("declined");
  }, []);

  if (consent !== null) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up"
      role="region"
      aria-label="Cookie consent"
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl shadow-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-surface-600 dark:text-surface-300 text-center sm:text-left flex-1">
          We use cookies to enhance your experience. By continuing to visit this
          site you agree to our use of cookies.{" "}
          <a
            href="/privacy"
            className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline underline-offset-2"
          >
            Privacy Policy
          </a>
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-800"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="px-5 py-2 text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors duration-200 shadow-md shadow-primary-500/20 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-800"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
