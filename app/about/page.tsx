import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "The person behind ChunkyCreate — who I am and why this exists.",
};

const timeline = [
  { year: "2022", text: "Started making tutorial videos about AI and productivity tools." },
  { year: "2024", text: "Kept getting asked for the templates and prompts used in the videos." },
  { year: "2025", text: "Built the first app for the channel's audience." },
  { year: "2026", text: "Launched ChunkyCreate to bring all of it under one roof." },
];

export default function AboutPage() {
  return (
    <div className="container-page py-16">
      <h1 className="max-w-2xl text-balance font-display text-4xl text-ink md:text-5xl">
        The person behind ChunkyCreate.
      </h1>

      <div className="mt-12 grid gap-10 md:grid-cols-3">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-surface md:col-span-1">
          <Image
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80"
            alt="Creator photo placeholder"
            fill
            className="object-cover"
          />
        </div>

        <div className="md:col-span-2">
          <p className="text-lg text-graphite">
            I'm Nitish — "Chunky" to most people who've known me a while,
            which is where the name comes from. I make videos about AI,
            productivity and building things on the internet, and
            ChunkyCreate is where the tools, prompts and guides from those
            videos live.
          </p>
          <p className="mt-4 text-graphite">
            I started because people kept asking for the exact prompt, the
            exact template, the exact spreadsheet I used in a video. Instead
            of sending files over email one at a time, I built a place to
            put all of it — priced low, delivered instantly, no account
            required.
          </p>
          <p className="mt-4 text-graphite">
            What I make sits at the intersection of technology, AI and
            everyday creative work: things that save someone an afternoon,
            not things that need a manual.
          </p>

          <h2 className="mt-10 text-sm font-medium text-ink">Interested in</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {["AI tools", "Web development", "Productivity systems", "Digital design", "Teaching"].map(
              (skill) => (
                <li
                  key={skill}
                  className="rounded-sm border border-line px-3 py-1 text-sm text-graphite"
                >
                  {skill}
                </li>
              )
            )}
          </ul>

          <h2 className="mt-10 text-sm font-medium text-ink">Timeline</h2>
          <ol className="mt-4 flex flex-col gap-4 border-l border-line pl-5">
            {timeline.map((item) => (
              <li key={item.year}>
                <span className="text-sm font-medium text-ink">{item.year}</span>
                <p className="text-sm text-graphite">{item.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex gap-4">
            <a href="https://youtube.com" className="text-sm font-medium text-ink underline">
              YouTube
            </a>
            <a href="https://instagram.com" className="text-sm font-medium text-ink underline">
              Instagram
            </a>
            <a href="https://twitter.com" className="text-sm font-medium text-ink underline">
              Twitter / X
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
