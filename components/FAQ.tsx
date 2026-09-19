"use client";

import { useState } from "react";

export default function FAQ({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question}>
            <button
              className="flex w-full items-center justify-between py-4 text-left"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
            >
              <span className="font-medium text-ink">{item.question}</span>
              <span className="ml-4 shrink-0 text-graphite">{open ? "–" : "+"}</span>
            </button>
            {open && <p className="pb-4 text-sm text-graphite">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
