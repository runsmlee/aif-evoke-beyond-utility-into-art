import { useInView } from "../hooks/useInView";

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

const tiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "Free",
    period: "",
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
    price: "$19",
    period: "/month",
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
  },
  {
    id: "studio",
    name: "Studio",
    price: "$49",
    period: "/month",
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
}

function PricingCard({ tier, isInView, delay }: PricingCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
        tier.highlighted
          ? "bg-surface-900 text-white shadow-2xl shadow-surface-900/20 ring-1 ring-surface-800"
          : "bg-white border border-surface-200 hover:border-primary-300 hover:shadow-lg"
      } ${isInView ? "animate-slide-up" : "opacity-0"}`}
      style={{ animationDelay: delay }}
    >
      {tier.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-full shadow-md">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3
          className={`text-lg font-semibold ${
            tier.highlighted ? "text-white" : "text-surface-900"
          }`}
        >
          {tier.name}
        </h3>
        <div className="mt-3 flex items-baseline gap-1">
          <span
            className={`text-4xl font-extrabold tracking-tight ${
              tier.highlighted ? "text-white" : "text-surface-900"
            }`}
          >
            {tier.price}
          </span>
          {tier.period && (
            <span
              className={`text-sm font-medium ${
                tier.highlighted ? "text-surface-400" : "text-surface-500"
              }`}
            >
              {tier.period}
            </span>
          )}
        </div>
        <p
          className={`mt-2 text-sm leading-relaxed ${
            tier.highlighted ? "text-surface-400" : "text-surface-500"
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
                tier.highlighted ? "text-primary-400" : "text-primary-500"
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
                tier.highlighted ? "text-surface-300" : "text-surface-600"
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`block w-full text-center py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
          tier.highlighted
            ? "bg-white text-surface-900 hover:bg-surface-100 shadow-lg"
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
            className={`inline-block text-sm font-semibold text-primary-500 uppercase tracking-wider mb-3 ${
              isInView ? "animate-fade-in" : "opacity-0"
            }`}
          >
            Pricing
          </span>
          <h2
            id="pricing-heading"
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900 ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
          >
            Invest in your{" "}
            <span className="gradient-text">creative craft</span>
          </h2>
          <p
            className={`mt-4 text-lg text-surface-500 ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            Simple, transparent pricing. No hidden fees, no surprises.
            Start free and scale as you grow.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {tiers.map((tier, index) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              isInView={isInView}
              delay={`${index * 0.1}s`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
