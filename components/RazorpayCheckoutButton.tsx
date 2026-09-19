"use client";

import Script from "next/script";
import { useState } from "react";
import { Button } from "@/components/Button";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayCheckoutButtonProps {
  /** Amount in rupees, e.g. 199 for ₹199. */
  amount: number;
  productName: string;
  receipt?: string;
  onSuccess?: (paymentId: string, orderId: string) => void;
  onFailure?: (error: string) => void;
  className?: string;
  children?: React.ReactNode;
}

export default function RazorpayCheckoutButton({
  amount,
  productName,
  receipt,
  onSuccess,
  onFailure,
  className,
  children
}: RazorpayCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handlePay() {
    setErrorMsg(null);

    if (!scriptReady || typeof window.Razorpay === "undefined") {
      setErrorMsg("Payment script is still loading — please try again in a moment.");
      return;
    }

    setLoading(true);

    try {
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, receipt })
      });

      if (!orderRes.ok) {
        const data = await orderRes.json().catch(() => ({}));
        throw new Error(data?.error || "Could not start checkout. Please try again.");
      }

      const order = await orderRes.json();
      const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

      if (!razorpayKeyId) {
        throw new Error("Payment is not configured (missing NEXT_PUBLIC_RAZORPAY_KEY_ID).");
      }

      const rzp = new window.Razorpay({
        key: razorpayKeyId,
        amount: order.amount,
        currency: order.currency,
        name: "Chunky Create",
        description: productName,
        order_id: order.order_id,
        theme: { color: "#D9A234" },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              onSuccess?.(response.razorpay_payment_id, response.razorpay_order_id);
            } else {
              const msg = verifyData?.error || "Payment verification failed.";
              setErrorMsg(msg);
              onFailure?.(msg);
            }
          } catch {
            const msg = "Could not verify payment. If money was deducted, please contact support.";
            setErrorMsg(msg);
            onFailure?.(msg);
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            // User closed the modal without paying.
            setLoading(false);
          }
        }
      });

      rzp.on("payment.failed", function (response: any) {
        const msg = response?.error?.description || "Payment failed. Please try again.";
        setErrorMsg(msg);
        onFailure?.(msg);
        setLoading(false);
      });

      rzp.open();
    } catch (err: any) {
      const msg = err?.message || "Something went wrong starting checkout.";
      setErrorMsg(msg);
      onFailure?.(msg);
      setLoading(false);
    }
  }

  return (
    <div>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <Button
        variant="primary"
        onClick={handlePay}
        disabled={loading}
        className={className ?? "w-full"}
      >
        {loading ? "Processing…" : children || `Pay ₹${amount}`}
      </Button>
      {errorMsg && <p className="mt-3 text-sm text-red-600">{errorMsg}</p>}
    </div>
  );
}
