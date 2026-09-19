import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  emptyMessage = "Nothing here yet. New creations are coming soon.",
}: {
  products: Product[];
  emptyMessage?: string;
}) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded border border-dashed border-line py-24 text-center">
        <p className="text-graphite">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
