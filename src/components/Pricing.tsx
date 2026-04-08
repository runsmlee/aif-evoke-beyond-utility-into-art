import { useState, useCallback } from "react";
import { useInView } from "../hooks/useInView";

type Billing = "monthly" | "annual";

interface PricingTier {
  id: string;
  name: string;
  price: Record<Billing, string>;
  period: Record<Billing, string>;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}

const tiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: { monthly: "Free", annual: "Free" },
    period: { monthly: "", annual: "" },
    description: "Perfect for exploring your creative potential.",
    features: [
      "5 creative projects",
      "Basic design tools",
      "Community access",
      "1GB cloud storage",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: { monthly: "$19", annual: "$15" },
    period: { monthly: "/month", annual: "/mo, billed annually" },
    description: "For creators ready to push boundaries.",
    features: [
      "Unlimited projects",
      "Advanced creative suite",
      "Priority support",
      "50GB cloud storage",
      "Custom color palettes",
      "Export in all formats",
    ],
    cta: "Start Creating",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    id: "studio",
    name: "Studio",
    price: { monthly: "$49", annual: "$39" },
    period: { monthly: "/month", annual: "/mo, billed annually" },
    description: "For teams crafting at the highest level.",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Brand asset manager",
      "Unlimited storage",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

interface PricingCardProps {
  tier: PricingTier;
  isInView: boolean;
  delay: string;
  billing: Billing;
}

function PricingCard({ tier, isInView, delay, billing }: PricingCardProps) {
  const price = tier.price[billing];
  const period = tier.period[billing];
  const showSavings = billing === "annual" && tier.id === "pro";
  const showStudioSavings = billing === "annual" && tier.id === "studio";

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
        tier.highlighted
          ? "bg-surface-900 dark:bg-white text-white dark:text-surface-900 shadow-2xl shadow-surface-900/20 dark:shadow-black/20 ring-1 ring-surface-800 dark:ring-surface-200 scale-[1.02] lg:scale-105"
          : "bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg"
      } ${isInView ? "animate-slide-up" : "opacity-0"}`}
      style={{ animationDelay: delay }}
    >
      {tier.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-full shadow-md">
            {tier.badge}
          </span>
        </div>
      )}

      {(showSavings || showStudioSavings) && !tier.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-full">
            Save {tier.id === "pro" ? "20%" : "20%"}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3
          className={`text-lg font-semibold ${
            tier.highlighted ? "text-white dark:text-surface-900" : "text-surface-900 dark:text-white"
          }`}
        >
          {tier.name}
        </h3>
        <div className="mt-3 flex items-baseline gap-1">
          <span
            className={`text-4xl font-extrabold tracking-tight ${
              tier.highlighted ? "text-white dark:text-surface-900" : "text-surface-900 dark:text-white"
            }`}
          >
            {price}
          </span>
          {period && (
            <span
              className={`text-sm font-medium ${
                tier.highlighted ? "text-surface-400 dark:text-surface-500" : "text-surface-500 dark:text-surface-400"
              }`}
            >
              {period}
            </span>
          )}
        </div>
        <p
          className={`mt-2 text-sm leading-relaxed ${
            tier.highlighted ? "text-surface-400 dark:text-surface-500" : "text-surface-500 dark:text-surface-400"
          }`}
        >
          {tier.description}
        </p>
      </div>

      <ul className="space-y-3 mb-8 flex-grow">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <svg
              className={`w-5 h-5 shrink-0 mt-0.5 ${
                tier.highlighted ? "text-primary-400 dark:text-primary-500" : "text-primary-500 dark:text-primary-400"
              }`}
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
            <span
              className={`text-sm ${
                tier.highlighted ? "text-surface-300 dark:text-surface-600" : "text-surface-600 dark:text-surface-300"
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`block w-full text-center py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-900 ${
          tier.highlighted
            ? "bg-white dark:bg-surface-900 text-surface-900 dark:text-white hover:bg-surface-100 dark:hover:bg-surface-800 shadow-lg"
            : "bg-primary-500 text-white hover:bg-primary-600 shadow-md shadow-primary-500/20"
        }`}
      >
        {tier.cta}
      </a>
    </div>
  );
}

export function Pricing() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [billing, setBilling] = useState<Billing>("monthly");

  const toggleBilling = useCallback(() => {
    setBilling((prev) => (prev === "monthly" ? "annual" : "monthly"));
  }, []);

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-20 sm:py-28"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span
            className={`inline-block text-sm font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-3 ${
              isInView ? "animate-fade-in" : "opacity-0"
            }`}
          >
            Pricing
          </span>
          <h2
            id="pricing-heading"
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900 dark:text-white ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
          >
            Invest in your{" "}
            <span className="gradient-text">creative craft</span>
          </h2>
          <p
            className={`mt-4 text-lg text-surface-500 dark:text-surface-400 ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            Simple, transparent pricing. No hidden fees, no surprises.
            Start free and scale as you grow.
          </p>

          {/* Billing toggle */}
          <div
            className={`mt-8 flex items-center justify-center gap-3 ${
              isInView ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <span
              className={`text-sm font-medium ${
                billing === "monthly"
                  ? "text-surface-900 dark:text-white"
                  : "text-surface-400 dark:text-surface-500"
              }`}
            >
              Monthly
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={billing === "annual"}
              aria-label="Toggle annual billing"
              onClick={toggleBilling}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-950 ${
                billing === "annual" ? "bg-primary-500" : "bg-surface-300 dark:bg-surface-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${
                  billing === "annual" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                billing === "annual"
                  ? "text-surface-900 dark:text-white"
                  : "text-surface-400 dark:text-surface-500"
              }`}
            >
              Annual
            </span>
            {billing === "annual" && (
              <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {tiers.map((tier, index) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              isInView={isInView}
              delay={`${index * 0.1}s`}
              billing={billing}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
