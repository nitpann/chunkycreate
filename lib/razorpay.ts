import Razorpay from "razorpay";

/**
 * Lazily builds a server-side Razorpay client from environment variables.
 * Never import this file from a "use client" component — RAZORPAY_KEY_SECRET
 * must only ever run on the server.
 */
export function getRazorpayInstance() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error(
      "Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your environment."
    );
  }

  return new Razorpay({ key_id, key_secret });
}
