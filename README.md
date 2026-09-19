# ChunkyCreate

A multi-page Next.js storefront for ChunkyCreate — apps, AI prompts, PDF
guides and digital art, sold as individual digital products.

Built with **Next.js 14 (App Router) + React + TypeScript + Tailwind CSS**.

> All products in `data/products.ts` are sample/demo data, clearly marked
> with `isDemo: true`. Replace them with your real products before launch.

---

## 1. Project structure

```
/app
  page.tsx                Home
  products/page.tsx       Product catalog (search, filter, sort)
  products/[slug]/page.tsx  Product detail page (dynamic route)
  apps/page.tsx            Apps category
  prompts/page.tsx         AI Prompts category
  guides/page.tsx          PDFs & Guides category
  art/page.tsx              Digital Art gallery
  about/page.tsx
  pricing/page.tsx
  contact/page.tsx
  cart/page.tsx
  account/page.tsx          Placeholder — accounts not yet built
  privacy/, terms/, refund/, license/   Legal placeholders
  not-found.tsx              Custom 404
  sitemap.ts / robots.ts     Auto-generated SEO files
  layout.tsx                 Global shell: fonts, Navbar, Footer, Cart
  globals.css

/components                 Reusable UI: Navbar, Footer, ProductCard,
                             ProductGrid, ProductBrowser (search/filter/sort),
                             CartDrawer, Newsletter, ContactForm, FAQ, Button

/context/CartContext.tsx    Cart state, persisted to localStorage

/data/products.ts           THE product catalog — single source of truth

/lib/utils.ts                formatPrice, discountPercent helpers
```

**Design tokens** (colors, fonts) live in `tailwind.config.ts` — change the
`mustard`, `ink`, `paper`, `graphite` values there to re-theme the whole
site from one place.

---

## 2. Run it locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

To verify a production build compiles cleanly:

```bash
npm run build
npm run start
```

> Note: this project was written in a sandboxed environment without
> network access, so `npm install` / `npm run build` could not be executed
> here to double-check output. Run both locally before deploying — the code
> follows standard Next.js 14 App Router conventions throughout, but please
> treat the first local build as your verification step.

---

## 3. How to add a product (no code changes needed elsewhere)

1. Add a product image (a URL, or a file under `/public/products/`).
2. Open `data/products.ts` and copy an existing object in the `products`
   array that matches the category you want (`apps`, `prompts`, `guides`,
   `art`).
3. Give it a unique `id` and `slug`, and fill in the fields.
4. Save, commit, and push — the homepage, category pages, `/products`, and
   the product's own detail page all pick it up automatically.

No admin dashboard is required for this. When the catalog grows past
~50–100 products, or you want a non-technical way to edit products without
opening code, see the upgrade path below.

---

## 4. Deploy to Vercel

1. Push this project to a GitHub (or GitLab/Bitbucket) repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: Vercel auto-detects **Next.js** — no config needed.
4. Click **Deploy**.

## 5. Deploy to Netlify

1. Push the project to a Git repository.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** →
   **Import an existing project**.
3. Build command: `npm run build`. Publish directory: leave as detected
   (Netlify's Next.js runtime plugin handles this automatically) —
   Netlify will install `@netlify/plugin-nextjs` for you.
4. Click **Deploy site**.

## 6. Connect chunkycreate.in

**On Vercel:** Project → Settings → Domains → add `chunkycreate.in` and
`www.chunkycreate.in`. Vercel gives you an A record (or ALIAS/CNAME) to add
at your domain registrar (GoDaddy, Namecheap, etc.) — add it there and wait
for DNS to propagate (usually under an hour).

**On Netlify:** Site settings → Domain management → Add a domain →
`chunkycreate.in`. Netlify shows the same kind of DNS record to add at your
registrar.

Either way, don't change registrars — you only add/edit DNS records
pointing your existing domain at the new host.

---

## 7. Adding a real backend later

The whole site currently reads from `data/products.ts` and uses
`localStorage` for the cart. Nothing here requires a backend to work as a
browsable, shareable catalog — but you'll want one for payments, product
management, and order delivery. Suggested order:

### a) Payments (to replace the "Checkout isn't live yet" screen in `/app/cart/page.tsx`)
For an Indian audience, **Razorpay** is the natural first choice (UPI
support, easy onboarding for individuals). Stripe, Lemon Squeezy, or
Gumroad are alternatives if you want the payment processor to also handle
file delivery for you (Gumroad and Lemon Squeezy both host and deliver
the file after payment, which removes the next step entirely).

### b) Product catalog as a database/CMS (to replace `data/products.ts`)
Keep the same `Product` type — only change how `getAllProducts()` fetches
its data. In order of simplest to set up for a solo creator:
1. **Supabase** (recommended) — a Postgres database with a spreadsheet-like
   table editor in its dashboard; free tier is generous.
2. **Sanity.io** — a proper content CMS with a nicer editing UI, still a
   quick setup.
3. **Firebase Firestore** — good if you're already in the Firebase
   ecosystem.

### c) Digital file delivery
Once payment succeeds, the backend needs to email a download link or grant
access. Razorpay/Stripe fire a webhook on successful payment — a small
serverless function (a Vercel/Netlify function) can catch that webhook,
generate a signed, time-limited download URL (e.g. via Supabase Storage or
S3), and email it with a service like Resend.

### d) Admin dashboard
Once products live in Supabase or Sanity, both platforms give you a usable
admin UI out of the box — you likely won't need to build a custom one
until much later.

---

## 8. What's intentionally not implemented yet

- Real payment processing (checkout shows the flow, not a live charge)
- Accounts/login (placeholder page only)
- Newsletter and contact form submissions (frontend-only, marked with
  `TODO(backend)` comments in `components/Newsletter.tsx` and
  `components/ContactForm.tsx`)
- A favicon.ico file — add your own to `/public/favicon.ico`

Everything else — navigation, product browsing, search, filtering, sorting,
cart, product detail pages, SEO metadata, and the legal page placeholders —
is fully functional today.
