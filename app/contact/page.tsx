import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with ChunkyCreate — questions, ideas or collaboration proposals.",
};

export default function ContactPage() {
  return (
    <div className="container-page grid gap-12 py-16 md:grid-cols-2">
      <div>
        <h1 className="font-display text-3xl text-ink md:text-4xl">Get in touch</h1>
        <p className="mt-4 max-w-md text-graphite">
          Have a question, idea or collaboration proposal? I'd love to hear
          from you.
        </p>
        <div className="mt-8 flex flex-col gap-2 text-sm text-graphite">
          <a href="https://youtube.com" className="w-fit text-ink underline">
            YouTube
          </a>
          <a href="https://instagram.com" className="w-fit text-ink underline">
            Instagram
          </a>
          <a href="https://twitter.com" className="w-fit text-ink underline">
            Twitter / X
          </a>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
