import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <div className="container-page max-w-2xl py-16">
      <h1 className="font-display text-3xl text-ink">Terms & Conditions</h1>
      <p className="mt-4 text-sm text-graphite">
        Placeholder — replace before launch. Cover: acceptance of terms,
        description of the digital products sold, pricing and currency
        (INR), account responsibilities (once accounts exist), acceptable
        use, and limitation of liability.
      </p>
      <div className="mt-8 space-y-4 text-sm text-graphite">
        <p>Last updated: [add date before launch]</p>
        <p>
          [Placeholder] By purchasing a product from ChunkyCreate, you agree
          to these terms. [Customize this section.]
        </p>
        <p>
          [Placeholder] All prices are listed in Indian Rupees (INR) unless
          stated otherwise. [Customize this section.]
        </p>
      </div>
    </div>
  );
}
