import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProductsByCategory } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Digital Art",
  description: "Original digital artwork, textures and design assets from ChunkyCreate.",
};

export default function ArtPage() {
  const artworks = getProductsByCategory("art");

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl text-ink md:text-4xl">Digital Art</h1>
      <p className="mt-2 max-w-xl text-graphite">
        Original textures, illustrations and design assets — licensed for
        personal or commercial use, no resale of raw files.
      </p>

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {artworks.map((art) => (
          <Link
            key={art.id}
            href={`/products/${art.slug}`}
            className="group block break-inside-avoid overflow-hidden rounded-lg border border-line bg-white"
          >
            <div className="relative w-full overflow-hidden bg-surface" style={{ aspectRatio: "4 / 5" }}>
              <Image
                src={art.image}
                alt={art.name}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-4">
              <span className="text-xs text-graphite">{art.collection}</span>
              <h3 className="mt-1 font-medium text-ink">{art.name}</h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">{formatPrice(art.price)}</span>
                <span className="text-xs text-graphite">{art.license}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
