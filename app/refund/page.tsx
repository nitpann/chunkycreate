import type { Metadata } from "next";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundPage() {
  return (
    <div className="container-page max-w-2xl py-16">
      <h1 className="font-display text-3xl text-ink">Refund Policy</h1>
      <p className="mt-4 text-sm text-graphite">
        Placeholder — replace before launch. Digital products are usually
        non-refundable once downloaded, but decide your own policy (e.g. a
        refund window before download, or case-by-case support) and state it
        clearly here.
      </p>
      <div className="mt-8 space-y-4 text-sm text-graphite">
        <p>Last updated: [add date before launch]</p>
        <p>
          [Placeholder] Because our products are delivered instantly and
          digitally, all sales are final once a download link has been
          accessed, except where required by law. [Customize this section.]
        </p>
        <p>
          [Placeholder] If a product is faulty or significantly different
          from its description, contact [your email] within [X] days of
          purchase. [Customize this section.]
        </p>
      </div>
    </div>
  );
}
