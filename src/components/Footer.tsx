export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      heading: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Gallery", href: "#gallery" },
        { label: "Pricing", href: "#" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
      ],
    },
    {
      heading: "Support",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Help Center", href: "#" },
        { label: "Community", href: "#" },
        { label: "Status", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-surface-50 border-t border-surface-200" aria-label="Site footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 sm:py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2" aria-label="Evoke — Home">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
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
              <span className="text-lg font-semibold text-surface-900">Evoke</span>
            </a>
            <p className="mt-3 text-sm text-surface-500 leading-relaxed max-w-xs">
              Beyond utility, into art. Crafting digital experiences that inspire
              and delight.
            </p>
          </div>

          {/* Link Columns */}
          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h3 className="text-sm font-semibold text-surface-900 mb-3">
                {group.heading}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-surface-500 hover:text-primary-500 transition-colors duration-200"
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
        <div className="py-6 border-t border-surface-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-400">
            &copy; {currentYear} Evoke. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-sm text-surface-400 hover:text-primary-500 transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-surface-400 hover:text-primary-500 transition-colors duration-200"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-surface-400 hover:text-primary-500 transition-colors duration-200"
              aria-label="Evoke on Twitter"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-sm text-surface-400 hover:text-primary-500 transition-colors duration-200"
              aria-label="Evoke on GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
