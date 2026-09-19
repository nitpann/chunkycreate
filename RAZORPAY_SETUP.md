# Razorpay — what changed and what's left for you

## New/changed files
- `lib/razorpay.ts` — server-side Razorpay client
- `app/api/create-order/route.ts` — creates a Razorpay order
- `app/api/verify-payment/route.ts` — verifies the payment signature
- `components/RazorpayCheckoutButton.tsx` — the real Pay button
- `app/cart/page.tsx` — now uses the real button instead of the placeholder
- `package.json` — added the `razorpay` dependency
- `.env.local.example` — template for your keys

## What you need to do

1. **Rotate your Razorpay key.** The test key pasted earlier in chat is
   exposed — regenerate it in your Razorpay dashboard first.
2. **Upload this whole folder to GitHub**, replacing everything in your
   `chunkycreate` repo (delete the old loose files there first, so nothing
   stray is left over).
3. **Set environment variables in Netlify** (Site settings → Environment
   variables) — don't just rely on `.env.local`, that file never leaves
   your computer:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` (same value as `RAZORPAY_KEY_ID`)
4. Netlify will rebuild automatically after you push. Give it 1–3 minutes,
   then test on `chunkycreate.in/cart` with a
   [Razorpay test card](https://razorpay.com/docs/payments/payments/test-card-upi-details/)
   (e.g. `4111 1111 1111 1111`, any future expiry/CVV) while your keys are
   in test mode.

## Still not done (marked with TODO in the code)
Verifying the payment confirms it's genuine, but nothing yet:
- Marks the order "paid" anywhere permanent (there's no database yet)
- Delivers the actual digital file / download link
- Sends a confirmation email

Until those exist, treat a successful payment as your cue to manually
follow up and send the file yourself.
