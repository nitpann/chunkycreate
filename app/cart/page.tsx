"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { LinkButton } from "@/components/Button";
import RazorpayCheckoutButton from "@/components/RazorpayCheckoutButton";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  if (checkedOut) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="font-display text-2xl text-ink">Payment successful!</h1>
        <p className="max-w-md text-graphite">
          Thanks for your order — a confirmation has been recorded. Digital
          delivery/download links go here once that's wired up.
        </p>
        <LinkButton href="/products" variant="primary">
          Continue browsing
        </LinkButton>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="font-display text-2xl text-ink">Your cart is empty.</h1>
        <LinkButton href="/products" variant="primary">
          Browse products
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="container-page grid gap-10 py-12 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="font-display text-3xl text-ink">Your Cart</h1>
        <ul className="mt-8 flex flex-col divide-y divide-line border-y border-line">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="flex gap-4 py-5">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-surface">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <Link href={`/products/${product.slug}`} className="font-medium text-ink hover:underline">
                  {product.name}
                </Link>
                <span className="text-sm text-graphite">{formatPrice(product.price)} each</span>
                <div className="mt-2 flex items-center gap-4">
                  <label htmlFor={`cart-qty-${product.id}`} className="text-sm text-graphite">
                    Qty
                  </label>
                  <select
                    id={`cart-qty-${product.id}`}
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
                    className="text-sm text-graphite underline hover:text-ink"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <span className="font-medium text-ink">{formatPrice(product.price * quantity)}</span>
            </li>
          ))}
        </ul>
        <button onClick={clearCart} className="mt-4 text-sm text-graphite underline hover:text-ink">
          Clear cart
        </button>
      </div>

      <div className="h-fit rounded-lg border border-line bg-surface p-6">
        <h2 className="font-display text-lg text-ink">Order summary</h2>
        <div className="mt-4 flex justify-between text-sm">
          <span className="text-graphite">Subtotal</span>
          <span className="text-ink">{formatPrice(totalPrice)}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span className="text-graphite">Delivery</span>
          <span className="text-ink">Instant, digital</span>
        </div>
        <div className="mt-4 flex justify-between border-t border-line pt-4 text-base font-semibold">
          <span className="text-ink">Total</span>
          <span className="text-ink">{formatPrice(totalPrice)}</span>
        </div>
        <div className="mt-6">
          <RazorpayCheckoutButton
            amount={totalPrice}
            productName={`ChunkyCreate order (${items.length} item${items.length === 1 ? "" : "s"})`}
            receipt={`order_${Date.now()}`}
            onSuccess={() => {
              clearCart();
              setCheckedOut(true);
            }}
            onFailure={(message) => setCheckoutError(message)}
          >
            Checkout — Pay {formatPrice(totalPrice)}
          </RazorpayCheckoutButton>
        </div>
        {checkoutError && (
          <p className="mt-3 text-xs text-red-600">{checkoutError}</p>
        )}
      </div>
    </div>
  );
}
