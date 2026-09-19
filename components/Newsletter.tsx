"use client";

import { FormEvent, useState } from "react";
import { Button } from "./Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO(backend): connect to an email service (e.g. Resend, Mailchimp,
    // ConvertKit, Buttondown). This currently only confirms on the frontend.
    setSubmitted(true);
  }

  return (
    <section className="border-t border-line bg-surface">
      <div className="container-page flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-2xl text-ink md:text-3xl">
            Get new creations in your inbox.
          </h2>
          <p className="mt-2 max-w-md text-graphite">
            One email when something new launches. No spam, unsubscribe anytime.
          </p>
        </div>
        {submitted ? (
          <p className="rounded border border-line bg-white px-4 py-3 text-sm text-ink">
            Thanks — you're on the list.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full rounded-sm border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-graphite"
            />
            <Button type="submit" variant="primary" className="whitespace-nowrap">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
