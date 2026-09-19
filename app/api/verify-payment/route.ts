import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

interface VerifyPaymentBody {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
}

export async function POST(req: NextRequest) {
  let body: VerifyPaymentBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json(
      {
        error:
          "Missing razorpay_order_id, razorpay_payment_id, or razorpay_signature."
      },
      { status: 400 }
    );
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    console.error("RAZORPAY_KEY_SECRET is not set.");
    return NextResponse.json(
      { error: "Server misconfiguration." },
      { status: 500 }
    );
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  // Compare with a fixed-time check to avoid leaking timing info.
  // Length is checked first because timingSafeEqual throws on mismatched
  // buffer lengths rather than returning false.
  const isValid =
    expectedSignature.length === razorpay_signature.length &&
    crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(razorpay_signature)
    );

  if (!isValid) {
    return NextResponse.json(
      { success: false, error: "Signature verification failed." },
      { status: 400 }
    );
  }

  // Signature is valid — the payment is genuine and belongs to this order.
  // TODO: mark this order as paid in your data store and trigger digital
  // delivery (e.g. email a download link) here.

  return NextResponse.json({
    success: true,
    order_id: razorpay_order_id,
    payment_id: razorpay_payment_id
  });
}
