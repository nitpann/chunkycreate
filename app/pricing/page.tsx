import type { Metadata } from "next";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "Pricing",
  description: "How pricing works at ChunkyCreate — individual products and future bundles.",
};

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "For browsing and trying free resources.",
    features: ["Access to free downloads", "Browse the full catalog", "Newsletter updates"],
    cta: "Browse for free",
    href: "/products",
    comingSoon: false,
  },
  {
    name: "Creator",
    price: "₹299/month",
    description: "Unlimited access to prompts, guides and templates.",
    features: [
      "Every prompt & guide, unlimited",
      "Early access to new releases",
      "Member-only discounts on apps",
    ],
    cta: "Coming Soon",
    href: "#",
    comingSoon: true,
  },
  {
    name: "Pro",
    price: "₹599/month",
    description: "Everything in Creator, plus apps and art.",
    features: [
      "Everything in Creator",
      "Unlimited access to apps",
      "Unlimited access to digital art",
    ],
    cta: "Coming Soon",
    href: "#",
    comingSoon: true,
  },
];

export default function PricingPage() {
  return (
    <div className="container-page py-16">
      <h1 className="font-display text-3xl text-ink md:text-4xl">Pricing</h1>
      <p className="mt-3 max-w-2xl text-graphite">
        Most ChunkyCreate products are sold individually — buy only what you
        need, priced between ₹49 and ₹499. A subscription bundle is planned
        for people who want everything, shown below for reference.
      </p>

      <div className="mt-12 grid gap-6 border-y border-line py-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl text-ink">Individual Products</h2>
          <p className="mt-2 text-graphite">
            Buy only what you need — a single app, prompt pack, guide or
            artwork, at a fixed one-time price. This is how ChunkyCreate
            works today.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-ink">Creator Bundle</h2>
          <p className="mt-2 text-graphite">
            A future subscription option for unlimited access across the
            catalog. Not live yet — the plans below are a preview of what's
            coming.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="flex flex-col rounded-lg border border-line bg-white p-8"
          >
            {plan.comingSoon && (
              <span className="mb-4 inline-block w-fit rounded-sm bg-surface px-2 py-1 text-xs font-medium text-graphite">
                Coming Soon
              </span>
            )}
            <h3 className="font-display text-xl text-ink">{plan.name}</h3>
            <p className="mt-1 text-2xl font-semibold text-ink">{plan.price}</p>
            <p className="mt-3 text-sm text-graphite">{plan.description}</p>
            <ul className="mt-6 flex flex-1 flex-col gap-2 text-sm text-graphite">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  {f}
                </li>
              ))}
            </ul>
            {plan.comingSoon ? (
              <button
                disabled
                className="mt-8 cursor-not-allowed rounded-sm border border-line px-6 py-3 text-sm font-medium text-graphite"
              >
                {plan.cta}
              </button>
            ) : (
              <LinkButton href={plan.href} variant="primary" className="mt-8">
                {plan.cta}
              </LinkButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
