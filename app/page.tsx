import Image from "next/image";
import { LinkButton } from "@/components/Button";
import CategoryCard from "@/components/CategoryCard";
import ProductGrid from "@/components/ProductGrid";
import Newsletter from "@/components/Newsletter";
import { getFeaturedProducts } from "@/data/products";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <h1 className="text-balance font-display text-4xl leading-[1.1] text-ink sm:text-5xl md:text-6xl">
              Digital tools, ideas & creations — made to be useful.
            </h1>
            <p className="mt-6 max-w-md text-lg text-graphite">
              Explore apps, AI prompts, guides, digital artwork and other
              creations from ChunkyCreate.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/products" variant="primary">
                Explore Products
              </LinkButton>
              <LinkButton href="/about" variant="secondary">
                About ChunkyCreate
              </LinkButton>
            </div>
          </div>
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-surface md:aspect-[4/5]">
            <Image
              src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=900&q=80"
              alt="A creator's desk with a laptop, notebook and coffee"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="container-page py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl text-ink md:text-3xl">Featured</h2>
          <a href="/products" className="text-sm font-medium text-ink underline">
            View all
          </a>
        </div>
        <ProductGrid products={featured} />
      </section>

      {/* Categories */}
      <section className="border-y border-line bg-surface">
        <div className="container-page py-16">
          <h2 className="mb-8 font-display text-2xl text-ink md:text-3xl">Browse by category</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <CategoryCard
              href="/apps"
              title="Apps"
              description="Useful digital tools built to solve specific problems."
            />
            <CategoryCard
              href="/prompts"
              title="AI Prompts"
              description="Ready-to-use prompts for AI tools and workflows."
            />
            <CategoryCard
              href="/guides"
              title="PDFs & Guides"
              description="Practical guides, ebooks and resources."
            />
            <CategoryCard
              href="/art"
              title="Digital Art"
              description="Original digital artwork and creative assets."
            />
          </div>
        </div>
      </section>

      {/* Why ChunkyCreate */}
      <section className="container-page py-16">
        <h2 className="font-display text-2xl text-ink md:text-3xl">Created with purpose.</h2>
        <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { title: "Practical", body: "Built to solve one problem well, not to impress." },
            { title: "Affordable", body: "Priced so trying something new isn't a big decision." },
            { title: "Instant access", body: "No waiting — get what you paid for right away." },
            { title: "Continuously updated", body: "New creations added regularly, not a one-time drop." },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-medium text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-graphite">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Creator section */}
      <section className="border-t border-line bg-white">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:items-center">
          <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-lg bg-surface">
            <Image
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=700&q=80"
              alt="Portrait placeholder for the ChunkyCreate creator"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">Hi, I'm Nitish.</h2>
            <p className="mt-4 max-w-md text-graphite">
              I create digital tools, resources and experiments designed to
              make technology and creativity more useful and accessible.
              ChunkyCreate is where those experiments become things you can
              actually use.
            </p>
            <a href="/about" className="mt-6 inline-block text-sm font-medium text-ink underline">
              More About Me →
            </a>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
