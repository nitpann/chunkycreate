"use client";

import { useRouter } from "next/navigation";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "./Button";

export default function AddToCartButtons({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="primary"
        onClick={() => {
          addItem(product);
          router.push("/cart");
        }}
      >
        Buy Now
      </Button>
      <Button variant="secondary" onClick={() => addItem(product)}>
        Add to Cart
      </Button>
    </div>
  );
}
