import type { Metadata } from "next";

export const metadata: Metadata = { title: "Digital Product License" };

export default function LicensePage() {
  return (
    <div className="container-page max-w-2xl py-16">
      <h1 className="font-display text-3xl text-ink">Digital Product License</h1>
      <p className="mt-4 text-sm text-graphite">
        Placeholder — replace before launch. Each product's detail page shows
        its specific license (e.g. "personal & commercial use, no resale of
        raw files"). This page should explain the license terms in more
        detail and what counts as prohibited use (e.g. reselling files
        as-is, claiming authorship).
      </p>
      <div className="mt-8 space-y-4 text-sm text-graphite">
        <p>Last updated: [add date before launch]</p>
        <p>
          [Placeholder] Unless stated otherwise on a product page, purchasing
          a ChunkyCreate product grants you a non-exclusive license to use it
          for personal or commercial projects. You may not resell, redistribute,
          or claim the raw files as your own work. [Customize this section.]
        </p>
      </div>
    </div>
  );
}
