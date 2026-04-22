import { useState, useCallback } from "react";
import { EMAIL_REGEX } from "../utils/validation";
import { subscribeEmail } from "../utils/api";

interface FooterLink {
  label: string;
  href: string;
  samePage?: boolean;
}

const footerLinks: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features", samePage: true },
      { label: "Gallery", href: "#gallery", samePage: true },
      { label: "Pricing", href: "#pricing", samePage: true },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Help Center", href: "/help" },
      { label: "Community", href: "/community" },
      { label: "Status", href: "/status" },
    ],
  },
];

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

const socialLinks = [
  {
    label: "Evoke on Twitter",
    href: "https://x.com/evokeapp",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Evoke on GitHub",
    href: "https://github.com/evokeapp",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "Evoke on LinkedIn",
    href: "https://linkedin.com/company/evokeapp",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerEmail, setFooterEmail] = useState("");
  const [footerSubmitted, setFooterSubmitted] = useState(false);
  const [footerLoading, setFooterLoading] = useState(false);
  const [footerError, setFooterError] = useState<string | null>(null);

  const handleFooterSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!EMAIL_REGEX.test(footerEmail)) return;

      setFooterLoading(true);
      setFooterError(null);
      try {
        await subscribeEmail(footerEmail, "footer-newsletter");
        setFooterSubmitted(true);
        setFooterEmail("");
      } catch {
        setFooterError("Something went wrong. Please try again.");
      } finally {
        setFooterLoading(false);
      }
    },
    [footerEmail],
  );

  return (
    <footer className="bg-surface-50 dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800" aria-label="Site footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 sm:py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2.5" aria-label="Evoke — Home">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-lg font-bold text-surface-900 dark:text-white">Evoke</span>
            </a>
            <p className="mt-3 text-sm text-surface-500 dark:text-surface-400 leading-relaxed max-w-xs">
              Beyond utility, into art. Crafting digital experiences that inspire
              and delight.
            </p>
            {/* Visually hidden heading for screen reader landmark */}
            <h2 className="sr-only">Evoke brand and newsletter</h2>
            {/* Social icons */}
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-lg text-surface-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">Stay inspired</p>
              {footerSubmitted ? (
                <p className="text-sm text-primary-600 dark:text-primary-400 flex items-center gap-1.5 animate-fade-in" role="status" aria-live="polite">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  You&apos;re subscribed!
                </p>
              ) : (
                <form onSubmit={handleFooterSubmit}>
                  <div className="flex gap-2">
                    <label htmlFor="footer-email" className="sr-only">Email address for newsletter</label>
                    <input
                      id="footer-email"
                      type="email"
                      value={footerEmail}
                      onChange={(e) => { setFooterEmail(e.target.value); setFooterError(null); }}
                      placeholder="Your email"
                      required
                      disabled={footerLoading}
                      aria-invalid={footerError ? "true" : undefined}
                      aria-describedby={footerError ? "footer-email-error" : undefined}
                      className="flex-1 min-w-0 px-3 py-2 text-sm bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors duration-200"
                    />
                    <button
                      type="submit"
                      disabled={footerLoading}
                      className="px-3 py-2 text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Subscribe to newsletter"
                    >
                      {footerLoading ? "Subscribing..." : "Subscribe"}
                    </button>
                  </div>
                  {footerError && (
                    <p id="footer-email-error" className="mt-1.5 text-xs text-primary-600 dark:text-primary-400 animate-fade-in flex items-center gap-1" role="alert">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      {footerError}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h3 className="text-sm font-semibold text-surface-900 dark:text-white mb-3">
                {group.heading}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.samePage
                        ? {
                            onClick: (e: React.MouseEvent) => {
                              e.preventDefault();
                              scrollToSection(link.href);
                            },
                          }
                        : {
                            target: "_self",
                          })}
                      className="text-sm text-surface-500 dark:text-surface-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-400 dark:text-surface-500">
            &copy; {currentYear} Evoke. All rights reserved.
          </p>
          <nav aria-label="Legal links" className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-sm text-surface-400 dark:text-surface-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
            >
              Privacy
            </a>
            <span className="text-surface-300 dark:text-surface-600" aria-hidden="true">·</span>
            <a
              href="/terms"
              className="text-sm text-surface-400 dark:text-surface-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
            >
              Terms
            </a>
            <span className="text-surface-300 dark:text-surface-600" aria-hidden="true">·</span>
            <a
              href="/cookies"
              className="text-sm text-surface-400 dark:text-surface-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
            >
              Cookies
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
