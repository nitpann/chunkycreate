import { Suspense } from "react";
import type { Metadata } from "next";
import ProductBrowser from "@/components/ProductBrowser";
import { getProductsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "AI Prompts",
  description: "Tested prompts for ChatGPT, Claude, Gemini and image generation tools.",
};

export default function PromptsPage() {
  const products = getProductsByCategory("prompts");

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl text-ink md:text-4xl">AI Prompts</h1>
      <p className="mt-2 max-w-xl text-graphite">
        Ready-to-use prompts for ChatGPT, Claude, Gemini, and image and video
        generation tools — tested, not just generated.
      </p>
      <div className="mt-10">
        <Suspense fallback={<p className="text-graphite">Loading…</p>}>
          <ProductBrowser products={products} lockedCategory="prompts" />
        </Suspense>
      </div>
    </div>
  );
}
