import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-2xl py-16">
      <h1 className="font-display text-3xl text-ink">Privacy Policy</h1>
      <p className="mt-4 text-sm text-graphite">
        Placeholder — replace before launch. This should describe what data
        ChunkyCreate collects (e.g. email addresses from checkout and the
        newsletter), how it's stored, whether it's shared with third-party
        services (payment processor, email provider, analytics), and how
        customers can request deletion. Consider using a generator such as
        Termly or a template reviewed by a professional once payments go
        live.
      </p>
      <div className="mt-8 space-y-4 text-sm text-graphite">
        <p>Last updated: [add date before launch]</p>
        <p>
          [Placeholder] ChunkyCreate collects the information you provide
          directly, such as your name and email when you make a purchase or
          subscribe to the newsletter. [Customize this section.]
        </p>
        <p>
          [Placeholder] We use third-party services for payment processing
          and email delivery. Once those are connected, list them here by
          name. [Customize this section.]
        </p>
        <p>
          [Placeholder] Contact [your email] for any privacy-related
          requests. [Customize this section.]
        </p>
      </div>
    </div>
  );
}
