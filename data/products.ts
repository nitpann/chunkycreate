// ---------------------------------------------------------------------------
// ChunkyCreate product catalog.
//
// This file is the ONLY place product data lives. Every page (home, /products,
// /apps, /prompts, /guides, /art, product detail pages) reads from here.
//
// TO ADD A NEW PRODUCT:
//   1. Add an image to /public/products/ (or use a hosted URL).
//   2. Copy one of the objects below and change the fields.
//   3. Give it a unique `id` and `slug`.
//   4. Deploy. That's it — no other file needs to change.
//
// WHEN YOU OUTGROW THIS FILE (50-100+ products, need a UI to edit products
// without touching code): swap this file for a fetch from a headless CMS or
// database. For a solo creator, the simplest upgrade path, in order of
// least-to-most setup, is:
//   1. Supabase (Postgres + free tier + simple table editor UI) — recommended
//   2. Sanity.io (purpose-built content CMS, generous free tier)
//   3. Firebase Firestore
// Whichever you pick, keep the same `Product` shape below so the rest of the
// app (ProductCard, ProductGrid, filters, product detail page) needs no
// changes — you'd only replace how `getAllProducts()` fetches its data.
// ---------------------------------------------------------------------------

export type ProductCategory = "apps" | "prompts" | "guides" | "art";

export type AiPlatform =
  | "ChatGPT"
  | "Claude"
  | "Gemini"
  | "Image Generation"
  | "Video Generation";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  longDescription: string;
  price: number; // in INR, 0 = free
  originalPrice?: number;
  image: string;
  gallery?: string[];
  fileType: string;
  compatibility?: string;
  features: string[];
  whatsIncluded: string[];
  tags: string[];
  featured?: boolean;
  isNew?: boolean;
  isDemo: true; // every product here is sample/demo data — see README
  faqs: { question: string; answer: string }[];
  // Prompt-specific
  platform?: AiPlatform;
  // Guide-specific
  pages?: number;
  // Art-specific
  collection?: string;
  license?: string;
}

const img = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=800&q=80`;

export const products: Product[] = [
  // ---------------------------------------------------------------- APPS
  {
    id: "app-1",
    slug: "chunky-resume-builder",
    name: "Chunky Resume Builder",
    category: "apps",
    tagline: "Build a clean, ATS-friendly resume in your browser.",
    description:
      "A no-login web app that turns a short form into a print-ready resume PDF.",
    longDescription:
      "Chunky Resume Builder is a lightweight tool for building a resume without wrestling with Word templates. Fill in your details once, pick a layout, and export a clean PDF that passes applicant tracking systems. No account, no ads, your data stays in your browser.",
    price: 149,
    originalPrice: 249,
    image: img("photo-1586281380349-632531db7ed4"),
    fileType: "Web app (browser access)",
    compatibility: "Any modern browser, desktop or mobile",
    features: [
      "3 clean, ATS-friendly layouts",
      "Live preview as you type",
      "One-click PDF export",
      "No sign-up required",
    ],
    whatsIncluded: ["Lifetime access to the app", "All future layout updates"],
    tags: ["resume", "career", "productivity"],
    featured: true,
    isDemo: true,
    faqs: [
      {
        question: "Do I need to install anything?",
        answer: "No — it runs entirely in your browser at the link you receive after purchase.",
      },
      {
        question: "Is my data stored anywhere?",
        answer: "No. Everything you type stays on your device until you export the PDF.",
      },
    ],
  },
  {
    id: "app-2",
    slug: "chunky-calculator",
    name: "Chunky Calculator",
    category: "apps",
    tagline: "A focused calculator for freelancers pricing their work.",
    description:
      "Work out an hourly rate, project quote, or GST-inclusive price in seconds.",
    longDescription:
      "Built for the freelancers and creators in the ChunkyCreate audience. Enter your monthly target income and hours available, and Chunky Calculator works backward to a fair hourly rate — with GST and platform-fee adjustments built in for the Indian market.",
    price: 99,
    image: img("photo-1554224155-6726b3ff858f"),
    fileType: "Web app (browser access)",
    compatibility: "Any modern browser, desktop or mobile",
    features: [
      "Hourly-rate calculator",
      "GST-inclusive project quoting",
      "Platform-fee adjustment (Fiverr, Upwork, etc.)",
      "Save your defaults locally",
    ],
    whatsIncluded: ["Lifetime access to the app"],
    tags: ["freelance", "pricing", "tools"],
    isNew: true,
    isDemo: true,
    faqs: [
      {
        question: "Is this specific to India?",
        answer: "The GST calculations are, but the core rate calculator works for anyone.",
      },
    ],
  },
  {
    id: "app-3",
    slug: "ai-prompt-generator",
    name: "AI Prompt Generator",
    category: "apps",
    tagline: "Turn a rough idea into a structured, reusable prompt.",
    description:
      "Answer four short questions and get back a prompt template you can reuse.",
    longDescription:
      "A small tool for people who are tired of rewriting the same kind of prompt from scratch. Describe your goal, tone, and constraints once, and the generator assembles a structured prompt template you can save and adapt.",
    price: 199,
    image: img("photo-1677442136019-21780ecad995"),
    fileType: "Web app (browser access)",
    compatibility: "Any modern browser, desktop or mobile",
    features: [
      "Guided 4-question builder",
      "Works for ChatGPT, Claude, or Gemini",
      "Copy or export your templates",
    ],
    whatsIncluded: ["Lifetime access to the app"],
    tags: ["ai", "prompts", "tools"],
    featured: true,
    isDemo: true,
    faqs: [
      {
        question: "Does this send my prompts anywhere?",
        answer: "No — the generator runs client-side and doesn't store or transmit your inputs.",
      },
    ],
  },

  // ------------------------------------------------------------- PROMPTS
  {
    id: "prompt-1",
    slug: "ai-prompt-master-pack",
    name: "AI Prompt Master Pack",
    category: "prompts",
    tagline: "100+ prompts for everyday work, organised by task.",
    description:
      "A tested collection of prompts for writing, research, planning and coding.",
    longDescription:
      "The AI Prompt Master Pack is a PDF and prompt-template bundle covering the situations that come up most often: drafting emails, summarising documents, planning content, debugging code, and more. Every prompt has been used and refined, not generated on the spot.",
    price: 99,
    originalPrice: 199,
    image: img("photo-1620712943543-bcc4688e7485"),
    fileType: "PDF + text templates (.txt)",
    features: ["100+ prompts", "Organised by task and platform", "Lifetime access to updates"],
    whatsIncluded: ["PDF guide", "Prompt templates", "Lifetime access"],
    tags: ["prompts", "productivity"],
    platform: "ChatGPT",
    featured: true,
    isDemo: true,
    faqs: [
      { question: "Which AI tools does this work with?", answer: "Primarily ChatGPT and Claude, with notes on adapting for Gemini." },
    ],
  },
  {
    id: "prompt-2",
    slug: "claude-coding-prompts",
    name: "Claude Coding Prompt Kit",
    category: "prompts",
    tagline: "Prompts for debugging, refactoring and code review with Claude.",
    description: "A focused set of prompts for working with Claude on real codebases.",
    longDescription:
      "Fifteen prompt templates built specifically around how Claude handles code: reviewing a diff, explaining an unfamiliar file, writing tests, and refactoring safely. Each one includes notes on when to use it and what to expect back.",
    price: 149,
    image: img("photo-1555066931-4365d14bab8c"),
    fileType: "PDF + text templates (.txt)",
    features: ["15 coding-focused prompts", "Usage notes for each", "Works with Claude.ai and API"],
    whatsIncluded: ["PDF guide", "Prompt templates"],
    tags: ["prompts", "coding"],
    platform: "Claude",
    isDemo: true,
    faqs: [{ question: "Do I need API access?", answer: "No — these work in the regular Claude.ai chat interface." }],
  },
  {
    id: "prompt-3",
    slug: "midjourney-style-pack",
    name: "Midjourney Style Prompt Pack",
    category: "prompts",
    tagline: "40 style prompts for consistent, polished image generations.",
    description: "Ready-to-use style modifiers for portraits, products and landscapes.",
    longDescription:
      "A set of 40 style prompts tested in Midjourney, grouped by use case: product photography, portraits, and landscape art. Each entry includes the exact wording and a sample output description so you know what to expect.",
    price: 129,
    image: img("photo-1541701494587-cb58502866ab"),
    fileType: "PDF",
    features: ["40 style prompts", "Grouped by use case", "Notes on parameters"],
    whatsIncluded: ["PDF guide"],
    tags: ["prompts", "image generation"],
    platform: "Image Generation",
    isDemo: true,
    faqs: [{ question: "Does this work with other image tools?", answer: "Most prompts adapt well to other image generators with minor tweaks." }],
  },
  {
    id: "prompt-4",
    slug: "marketing-copy-prompts",
    name: "Marketing Copy Prompt Set",
    category: "prompts",
    tagline: "Prompts for ad copy, product descriptions and email campaigns.",
    description: "Fill-in-the-blank prompts for common marketing writing tasks.",
    longDescription:
      "Built for small business owners and creators who need marketing copy without hiring a copywriter. Each prompt is a fill-in-the-blank template covering ads, product pages, and email sequences.",
    price: 99,
    image: img("photo-1460925895917-afdab827c52f"),
    fileType: "PDF",
    features: ["25 marketing prompts", "Fill-in-the-blank format", "Examples included"],
    whatsIncluded: ["PDF guide"],
    tags: ["prompts", "marketing", "business"],
    platform: "ChatGPT",
    isDemo: true,
    faqs: [],
  },
  {
    id: "prompt-5",
    slug: "video-script-prompts",
    name: "YouTube Script Prompt Kit",
    category: "prompts",
    tagline: "Structure a video script from a one-line topic idea.",
    description: "The exact prompts used to outline and script ChunkyCreate videos.",
    longDescription:
      "A behind-the-scenes look at the prompts used to plan ChunkyCreate's own YouTube videos — from hook to outline to full script draft.",
    price: 149,
    image: img("photo-1611162617213-7d7a39e9b1d7"),
    fileType: "PDF",
    features: ["Hook, outline and script prompts", "Real examples from ChunkyCreate videos"],
    whatsIncluded: ["PDF guide"],
    tags: ["prompts", "content creation", "youtube"],
    platform: "Video Generation",
    isNew: true,
    isDemo: true,
    faqs: [],
  },
  {
    id: "prompt-6",
    slug: "gemini-research-prompts",
    name: "Gemini Research Prompt Pack",
    category: "prompts",
    tagline: "Prompts for fast, structured research summaries.",
    description: "Turn a broad research question into a well-organised summary.",
    longDescription:
      "A set of prompts for using Gemini to research a topic and return a structured summary with sources, counterpoints and open questions — useful for students and content researchers.",
    price: 99,
    image: img("photo-1526378722484-bd91ca387e72"),
    fileType: "PDF",
    features: ["12 research prompts", "Built for structured output"],
    whatsIncluded: ["PDF guide"],
    tags: ["prompts", "research"],
    platform: "Gemini",
    isDemo: true,
    faqs: [],
  },

  // -------------------------------------------------------- PDFs & GUIDES
  {
    id: "guide-1",
    slug: "python-for-beginners",
    name: "Python for Beginners",
    category: "guides",
    tagline: "A practical first course in Python, no prior experience needed.",
    description: "A 60-page guide that gets you writing real scripts fast.",
    longDescription:
      "Python for Beginners skips the theory-heavy start most courses open with and gets you writing working scripts in the first chapter. Written for people who learn by doing, with small projects throughout.",
    price: 199,
    originalPrice: 299,
    image: img("photo-1526379095098-d400fd0bf935"),
    fileType: "PDF",
    pages: 62,
    features: ["62 pages", "5 mini projects", "Beginner-friendly pacing"],
    whatsIncluded: ["PDF guide", "Project source files"],
    tags: ["guide", "python", "coding"],
    featured: true,
    isDemo: true,
    faqs: [{ question: "Do I need to install anything to follow along?", answer: "Yes — the guide walks you through installing Python in chapter one." }],
  },
  {
    id: "guide-2",
    slug: "ai-tools-for-creators",
    name: "AI Tools for Creators",
    category: "guides",
    tagline: "A curated map of AI tools worth your time in 2026.",
    description: "40 tools across writing, design, video and audio, tested and rated.",
    longDescription:
      "Rather than listing every AI tool that exists, this guide covers 40 tools actually worth learning, organised by what you're trying to make, with honest notes on where each one falls short.",
    price: 149,
    image: img("photo-1519389950473-47ba0277781c"),
    fileType: "PDF",
    pages: 48,
    features: ["48 pages", "40 tools reviewed", "Updated periodically"],
    whatsIncluded: ["PDF guide", "Free updates for 1 year"],
    tags: ["guide", "ai", "tools"],
    isDemo: true,
    faqs: [],
  },
  {
    id: "guide-3",
    slug: "digital-business-starter-guide",
    name: "Digital Business Starter Guide",
    category: "guides",
    tagline: "How to package and sell your first digital product.",
    description: "A step-by-step guide to going from idea to your first sale.",
    longDescription:
      "Written from ChunkyCreate's own experience: how to pick a first product, price it, and get your first ten sales without a large audience or a big budget.",
    price: 249,
    image: img("photo-1553729459-efe14ef6055d"),
    fileType: "PDF",
    pages: 55,
    features: ["55 pages", "Pricing worksheets included", "India-specific payment notes"],
    whatsIncluded: ["PDF guide", "Pricing worksheet (spreadsheet)"],
    tags: ["guide", "business"],
    isNew: true,
    isDemo: true,
    faqs: [],
  },
  {
    id: "guide-4",
    slug: "productivity-systems-guide",
    name: "Simple Productivity Systems",
    category: "guides",
    tagline: "Three systems that don't require a 40-tab dashboard.",
    description: "Practical planning systems for people who don't want to manage a system.",
    longDescription:
      "A short guide covering three lightweight productivity systems, so you can pick the one that fits how you actually work instead of forcing yourself into someone else's method.",
    price: 99,
    image: img("photo-1484480974693-6ca0a78fb36b"),
    fileType: "PDF",
    pages: 30,
    features: ["30 pages", "3 complete systems", "Printable templates"],
    whatsIncluded: ["PDF guide", "Printable templates"],
    tags: ["guide", "productivity"],
    isDemo: true,
    faqs: [],
  },

  // ---------------------------------------------------------- DIGITAL ART
  {
    id: "art-1",
    slug: "gradient-textures-vol-1",
    name: "Gradient Textures Vol. 1",
    category: "art",
    tagline: "12 hand-tuned gradient textures for thumbnails and slides.",
    description: "High-resolution gradient backgrounds for design work.",
    longDescription:
      "A set of 12 gradient textures built for YouTube thumbnails, presentation backgrounds, and social posts. Each file is delivered at high resolution in PNG and layered PSD.",
    price: 49,
    image: img("photo-1541701494587-cb58502866ab"),
    fileType: "PNG + PSD",
    features: ["12 textures", "4K resolution", "Layered PSD included"],
    whatsIncluded: ["12 PNG files", "1 layered PSD"],
    tags: ["art", "backgrounds"],
    collection: "Gradient Textures",
    license: "Personal & commercial use, no resale of raw files",
    featured: true,
    isDemo: true,
    faqs: [],
  },
  {
    id: "art-2",
    slug: "isometric-icon-set",
    name: "Isometric Icon Set",
    category: "art",
    tagline: "60 isometric icons for tech and productivity themes.",
    description: "A consistent icon set for apps, decks and social graphics.",
    longDescription:
      "60 isometric icons covering common tech and productivity concepts, delivered as SVG and PNG so they scale cleanly in any project.",
    price: 99,
    image: img("photo-1618004912476-29818d81ae2e"),
    fileType: "SVG + PNG",
    features: ["60 icons", "SVG and PNG formats", "Consistent style"],
    whatsIncluded: ["SVG pack", "PNG pack (2x, 4x)"],
    tags: ["art", "icons"],
    collection: "Isometric Set",
    license: "Personal & commercial use, no resale of raw files",
    isDemo: true,
    faqs: [],
  },
  {
    id: "art-3",
    slug: "abstract-poster-pack",
    name: "Abstract Poster Pack",
    category: "art",
    tagline: "8 printable abstract posters, minimal and modern.",
    description: "Print-ready poster art for home or studio walls.",
    longDescription:
      "Eight abstract compositions designed to print cleanly at poster size, in a restrained palette that fits a modern studio or living space.",
    price: 149,
    image: img("photo-1549490349-8643362247b5"),
    fileType: "High-res PNG (print-ready)",
    features: ["8 posters", "Print-ready resolution", "A3 and A2 sizing guides"],
    whatsIncluded: ["8 PNG files", "Sizing guide PDF"],
    tags: ["art", "posters"],
    collection: "Abstract Poster Pack",
    license: "Personal use only",
    isDemo: true,
    faqs: [],
  },
  {
    id: "art-4",
    slug: "hand-drawn-doodles",
    name: "Hand-Drawn Doodle Pack",
    category: "art",
    tagline: "80 playful doodles for slides, notes and social content.",
    description: "A friendly, hand-drawn illustration set.",
    longDescription:
      "80 hand-drawn doodle illustrations covering everyday objects, icons and expressions — useful for adding a personal touch to slides or social posts.",
    price: 79,
    image: img("photo-1513364776144-60967b0f800f"),
    fileType: "PNG (transparent background)",
    features: ["80 doodles", "Transparent PNGs", "Consistent hand-drawn style"],
    whatsIncluded: ["80 PNG files"],
    tags: ["art", "illustration"],
    collection: "Doodle Pack",
    license: "Personal & commercial use, no resale of raw files",
    isNew: true,
    isDemo: true,
    faqs: [],
  },
  {
    id: "art-5",
    slug: "minimal-ui-mockups",
    name: "Minimal UI Mockup Kit",
    category: "art",
    tagline: "Clean device mockups for showcasing app screens.",
    description: "Phone and laptop mockups for presenting your work.",
    longDescription:
      "A set of clean, minimal device mockups (phone and laptop) for presenting app screens or website designs in portfolios and social posts.",
    price: 99,
    image: img("photo-1517430816045-df4b7de11d1d"),
    fileType: "PSD + Figma file",
    features: ["6 device mockups", "PSD and Figma formats", "Easy smart-object swaps"],
    whatsIncluded: ["PSD file", "Figma file"],
    tags: ["art", "mockups", "ui"],
    collection: "UI Mockups",
    license: "Personal & commercial use, no resale of raw files",
    isDemo: true,
    faqs: [],
  },
  {
    id: "art-6",
    slug: "texture-paper-pack",
    name: "Paper Texture Pack",
    category: "art",
    tagline: "20 scanned paper textures for a tactile, analog look.",
    description: "Real scanned textures for adding warmth to digital design.",
    longDescription:
      "20 high-resolution scanned paper and cardboard textures, useful for adding a tactile, analog feel to otherwise digital designs.",
    price: 59,
    image: img("photo-1568205612837-017257d2310a"),
    fileType: "High-res JPG",
    features: ["20 textures", "4K resolution", "Seamless tiling on 6 of them"],
    whatsIncluded: ["20 JPG files"],
    tags: ["art", "textures"],
    collection: "Paper Textures",
    license: "Personal & commercial use, no resale of raw files",
    isDemo: true,
    faqs: [],
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export const categoryLabels: Record<ProductCategory, string> = {
  apps: "Apps",
  prompts: "AI Prompts",
  guides: "PDFs & Guides",
  art: "Digital Art",
};
