import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/products", label: "All Products" },
      { href: "/apps", label: "Apps" },
      { href: "/prompts", label: "AI Prompts" },
      { href: "/guides", label: "PDFs & Guides" },
      { href: "/art", label: "Digital Art" },
    ],
  },
  {
    title: "ChunkyCreate",
    links: [
      { href: "/about", label: "About" },
      { href: "/pricing", label: "Pricing" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/refund", label: "Refund Policy" },
      { href: "/license", label: "Digital Product License" },
    ],
  },
];

const socials = [
  { href: "https://youtube.com", label: "YouTube" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://twitter.com", label: "Twitter / X" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-page grid grid-cols-2 gap-10 py-16 md:grid-cols-5">
        <div className="col-span-2">
          <span className="font-display text-lg font-semibold text-ink">ChunkyCreate</span>
          <p className="mt-3 max-w-xs text-sm text-graphite">
            Digital tools, prompts, guides and creative assets — made by one
            person, useful to many.
          </p>
          <div className="mt-5 flex gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-graphite hover:text-ink"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-medium text-ink">{col.title}</h4>
            <ul className="mt-4 flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-graphite hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-graphite sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} ChunkyCreate. All rights reserved.</span>
          <span>chunkycreate.in</span>
        </div>
      </div>
    </footer>
  );
}
