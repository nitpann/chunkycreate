import { NextRequest, NextResponse } from "next/server";
import { getRazorpayInstance } from "@/lib/razorpay";

// Always run this on the server at request time — never statically cache it.
export const dynamic = "force-dynamic";

interface CreateOrderBody {
  /** Amount in rupees (e.g. 199 for ₹199). This route converts to paise. */
  amount: number;
  receipt?: string;
  notes?: Record<string, string>;
}

export async function POST(req: NextRequest) {
  let body: CreateOrderBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { amount, receipt, notes } = body;

  if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json(
      { error: "A valid positive `amount` (in rupees) is required." },
      { status: 400 }
    );
  }

  const amountInPaise = Math.round(amount * 100);

  if (amountInPaise < 100) {
    return NextResponse.json(
      { error: "Amount must be at least ₹1 (100 paise)." },
      { status: 400 }
    );
  }

  try {
    const razorpay = getRazorpayInstance();

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: receipt ?? `receipt_${Date.now()}`,
      notes
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (err: any) {
    console.error("Razorpay create-order error:", err);

    // Razorpay's SDK surfaces bad-key/auth failures as statusCode 401.
    const statusCode = err?.statusCode === 401 ? 401 : 500;

    return NextResponse.json(
      { error: "Could not create Razorpay order." },
      { status: statusCode }
    );
  }
}
