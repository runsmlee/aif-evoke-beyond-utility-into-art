import { useState, useCallback } from "react";
import { useInView } from "../hooks/useInView";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "What makes Evoke different from other design tools?",
    answer:
      "Evoke goes beyond utility to create emotional connections. Every interaction is crafted with intention — from micro-animations that delight to workflows that feel natural. We believe tools should inspire, not just function.",
  },
  {
    id: "faq-2",
    question: "Is there a free plan available?",
    answer:
      "Yes! Our Starter plan is completely free and includes 5 creative projects, basic design tools, community access, and 1GB of cloud storage. No credit card required to start creating.",
  },
  {
    id: "faq-3",
    question: "Can I collaborate with my team on Evoke?",
    answer:
      "Absolutely. Our Studio plan includes full team collaboration features, shared brand asset management, and real-time co-editing. Every team member gets access to the complete creative suite.",
  },
  {
    id: "faq-4",
    question: "What file formats does Evoke support for export?",
    answer:
      "Pro and Studio plans support exporting in all major formats including SVG, PNG, PDF, and high-resolution print-ready files. You can also export animations as GIF, MP4, or Lottie JSON.",
  },
  {
    id: "faq-5",
    question: "How does Evoke handle my creative data?",
    answer:
      "Your creations are stored securely with enterprise-grade encryption. We never use your artwork for training AI or any other purpose. You own 100% of what you create on Evoke.",
  },
];

function FaqItemComponent({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-surface-200 dark:border-surface-700 last:border-b-0">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between py-5 px-1 text-left text-base font-semibold text-surface-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-950 rounded-lg"
          aria-expanded={isOpen}
          aria-controls={`${item.id}-panel`}
          id={`${item.id}-button`}
        >
          <span className="pr-4">{item.question}</span>
          <svg
            className={`w-5 h-5 flex-shrink-0 text-surface-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </h3>
      <div
        id={`${item.id}-panel`}
        role="region"
        aria-labelledby={`${item.id}-button`}
        className={isOpen ? "block" : "hidden"}
      >
        <p className="pb-5 px-1 text-surface-500 dark:text-surface-400 leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export function Faq() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      id="faq"
      ref={ref}
      className="py-20 sm:py-28 bg-surface-50/80 dark:bg-surface-900/50"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block text-sm font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-3 ${
              isInView ? "animate-fade-in" : "opacity-0"
            }`}
          >
            FAQ
          </span>
          <h2
            id="faq-heading"
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900 dark:text-white ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
          >
            Common <span className="gradient-text">questions</span>
          </h2>
          <p
            className={`mt-4 text-lg text-surface-500 dark:text-surface-400 ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            Everything you need to know about Evoke.
          </p>
        </div>

        {/* FAQ List */}
        <div
          className={`bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 px-6 sm:px-8 ${
            isInView ? "animate-slide-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          {faqItems.map((item) => (
            <FaqItemComponent
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
