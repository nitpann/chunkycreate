import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  categoryLabels,
} from "@/data/products";
import { formatPrice, discountPercent } from "@/lib/utils";
import AddToCartButtons from "@/components/AddToCartButtons";
import FAQ from "@/components/FAQ";
import ProductGrid from "@/components/ProductGrid";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const discount = discountPercent(product.price, product.originalPrice);
  const related = getRelatedProducts(product);

  return (
    <div className="container-page py-12">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-graphite">
        <a href="/products" className="hover:text-ink">
          Products
        </a>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-surface">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
          {discount && (
            <span className="absolute right-4 top-4 rounded-sm bg-mustard px-2 py-1 text-xs font-medium text-ink">
              {discount}% off
            </span>
          )}
        </div>

        <div>
          <span className="text-sm text-graphite">{categoryLabels[product.category]}</span>
          <h1 className="mt-1 font-display text-3xl text-ink md:text-4xl">{product.name}</h1>
          <p className="mt-3 text-graphite">{product.tagline}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-ink">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-graphite line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="mt-6">
            <AddToCartButtons product={product} />
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
            <div>
              <dt className="text-graphite">File format</dt>
              <dd className="text-ink">{product.fileType}</dd>
            </div>
            {product.compatibility && (
              <div>
                <dt className="text-graphite">Compatibility</dt>
                <dd className="text-ink">{product.compatibility}</dd>
              </div>
            )}
            {product.pages && (
              <div>
                <dt className="text-graphite">Pages</dt>
                <dd className="text-ink">{product.pages}</dd>
              </div>
            )}
            {product.platform && (
              <div>
                <dt className="text-graphite">Platform</dt>
                <dd className="text-ink">{product.platform}</dd>
              </div>
            )}
            {product.license && (
              <div>
                <dt className="text-graphite">License</dt>
                <dd className="text-ink">{product.license}</dd>
              </div>
            )}
            <div>
              <dt className="text-graphite">Delivery</dt>
              <dd className="text-ink">Instant, after checkout</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="font-display text-xl text-ink">About this product</h2>
          <p className="mt-3 text-graphite">{product.longDescription}</p>

          <h3 className="mt-8 text-sm font-medium text-ink">Features</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-graphite">
            {product.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden="true">•</span>
                {f}
              </li>
            ))}
          </ul>

          {product.faqs.length > 0 && (
            <>
              <h3 className="mt-10 text-sm font-medium text-ink">Frequently asked questions</h3>
              <div className="mt-3">
                <FAQ items={product.faqs} />
              </div>
            </>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-ink">What's included</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-graphite">
            {product.whatsIncluded.map((w) => (
              <li key={w} className="flex gap-2">
                <span aria-hidden="true">•</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16 border-t border-line pt-12">
          <h2 className="mb-6 font-display text-xl text-ink">You might also like</h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}
