import Image from "next/image";
import Link from "next/link";
import { Product, categoryLabels } from "@/data/products";
import { formatPrice, discountPercent } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const discount = discountPercent(product.price, product.originalPrice);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded border border-line bg-white transition-shadow duration-150 hover:shadow-[0_2px_24px_rgba(22,22,15,0.08)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-sm bg-ink px-2 py-1 text-xs font-medium text-paper">
            New
          </span>
        )}
        {discount && (
          <span className="absolute right-3 top-3 rounded-sm bg-mustard px-2 py-1 text-xs font-medium text-ink">
            {discount}% off
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-xs text-graphite">{categoryLabels[product.category]}</span>
        <h3 className="text-base font-medium text-ink">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-graphite">{product.description}</p>
        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <span className="text-base font-semibold text-ink">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-graphite line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
