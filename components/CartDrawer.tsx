"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-ink/40 transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-paper shadow-xl transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-lg text-ink">Your cart</h2>
          <button aria-label="Close cart" onClick={closeCart} className="p-1 text-ink">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 text-center">
            <p className="text-graphite">Your cart is empty.</p>
            <Link href="/products" onClick={closeCart} className="text-sm font-medium text-ink underline">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="flex flex-col gap-5">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-surface">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="text-sm font-medium text-ink">{product.name}</span>
                    <span className="text-sm text-graphite">{formatPrice(product.price)}</span>
                    <div className="mt-1 flex items-center gap-3">
                      <label className="sr-only" htmlFor={`qty-${product.id}`}>
                        Quantity
                      </label>
                      <select
                        id={`qty-${product.id}`}
                        value={quantity}
                        onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                        className="rounded-sm border border-line bg-white px-2 py-1 text-sm"
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-xs text-graphite underline hover:text-ink"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {items.length > 0 && (
          <div className="border-t border-line px-5 py-4">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-graphite">Total</span>
              <span className="text-lg font-semibold text-ink">{formatPrice(totalPrice)}</span>
            </div>
            <Link
              href="/cart"
              onClick={closeCart}
              className="flex w-full items-center justify-center rounded-sm bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-mustard hover:text-ink"
            >
              View cart & checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
