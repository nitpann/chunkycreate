"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product, ProductCategory, categoryLabels } from "@/data/products";
import ProductGrid from "./ProductGrid";

type SortOption = "newest" | "price-asc" | "price-desc" | "popular";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular", label: "Popular" },
];

export default function ProductBrowser({
  products,
  lockedCategory,
  emptyMessage,
}: {
  products: Product[];
  lockedCategory?: ProductCategory;
  emptyMessage?: string;
}) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState<ProductCategory | "all">(lockedCategory ?? "all");
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [sort, setSort] = useState<SortOption>("newest");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    result = result.filter((p) => p.price <= maxPrice);

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
      case "newest":
      default:
        result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
    }

    return result;
  }, [products, query, category, maxPrice, sort]);

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <aside className="flex shrink-0 flex-col gap-6 lg:w-56">
        <div>
          <label htmlFor="pb-search" className="mb-2 block text-sm font-medium text-ink">
            Search
          </label>
          <input
            id="pb-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-sm border border-line bg-white px-3 py-2 text-sm"
          />
        </div>

        {!lockedCategory && (
          <div>
            <span className="mb-2 block text-sm font-medium text-ink">Category</span>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm text-graphite">
                <input
                  type="radio"
                  name="category"
                  checked={category === "all"}
                  onChange={() => setCategory("all")}
                />
                All
              </label>
              {categories.map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm text-graphite">
                  <input
                    type="radio"
                    name="category"
                    checked={category === c}
                    onChange={() => setCategory(c)}
                  />
                  {categoryLabels[c]}
                </label>
              ))}
            </div>
          </div>
        )}

        <div>
          <label htmlFor="pb-price" className="mb-2 block text-sm font-medium text-ink">
            Max price: ₹{maxPrice}
          </label>
          <input
            id="pb-price"
            type="range"
            min={0}
            max={500}
            step={10}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-mustard"
          />
        </div>

        <div>
          <label htmlFor="pb-sort" className="mb-2 block text-sm font-medium text-ink">
            Sort by
          </label>
          <select
            id="pb-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="w-full rounded-sm border border-line bg-white px-3 py-2 text-sm"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </aside>

      <div className="flex-1">
        <p className="mb-4 text-sm text-graphite">
          {filtered.length} product{filtered.length === 1 ? "" : "s"}
        </p>
        <ProductGrid
          products={filtered}
          emptyMessage={emptyMessage ?? "No products found. Try another search."}
        />
      </div>
    </div>
  );
}
