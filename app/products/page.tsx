import { Suspense } from "react";
import type { Metadata } from "next";
import ProductBrowser from "@/components/ProductBrowser";
import { getAllProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse every app, AI prompt, guide and digital art piece from ChunkyCreate.",
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl text-ink md:text-4xl">All Products</h1>
      <p className="mt-2 max-w-xl text-graphite">
        Every app, prompt, guide and artwork ChunkyCreate has made so far.
      </p>
      <div className="mt-10">
        <Suspense fallback={<p className="text-graphite">Loading products…</p>}>
          <ProductBrowser products={products} />
        </Suspense>
      </div>
    </div>
  );
}
