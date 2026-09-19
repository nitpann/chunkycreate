import { Suspense } from "react";
import type { Metadata } from "next";
import ProductBrowser from "@/components/ProductBrowser";
import { getProductsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Apps",
  description: "Small, focused web apps built to solve specific problems.",
};

export default function AppsPage() {
  const products = getProductsByCategory("apps");

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl text-ink md:text-4xl">Apps</h1>
      <p className="mt-2 max-w-xl text-graphite">
        Small, focused web tools — no installs, no accounts, built to solve
        one problem well.
      </p>
      <div className="mt-10">
        <Suspense fallback={<p className="text-graphite">Loading…</p>}>
          <ProductBrowser products={products} lockedCategory="apps" />
        </Suspense>
      </div>
    </div>
  );
}
