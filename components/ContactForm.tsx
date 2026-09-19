"use client";

import { FormEvent, useState } from "react";
import { Button } from "./Button";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO(backend): wire this up to an email/form service such as
    // Formspree, Resend, or a simple serverless function that emails you.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-line bg-surface p-8">
        <p className="text-ink">
          Thanks for reaching out — I'll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-sm border border-line bg-white px-4 py-3 text-sm"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-sm border border-line bg-white px-4 py-3 text-sm"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-sm border border-line bg-white px-4 py-3 text-sm"
        />
      </div>
      <Button type="submit" variant="primary" className="w-fit">
        Send message
      </Button>
    </form>
  );
}
