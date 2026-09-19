import { Suspense } from "react";
import type { Metadata } from "next";
import ProductBrowser from "@/components/ProductBrowser";
import { getProductsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "PDFs & Guides",
  description: "Practical guides and ebooks on Python, AI tools, business and productivity.",
};

export default function GuidesPage() {
  const products = getProductsByCategory("guides");

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl text-ink md:text-4xl">PDFs & Guides</h1>
      <p className="mt-2 max-w-xl text-graphite">
        Practical guides written to be read once and used for months.
      </p>
      <div className="mt-10">
        <Suspense fallback={<p className="text-graphite">Loading…</p>}>
          <ProductBrowser products={products} lockedCategory="guides" />
        </Suspense>
      </div>
    </div>
  );
}
