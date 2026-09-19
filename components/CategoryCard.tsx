import Link from "next/link";

export default function CategoryCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between rounded border border-line bg-white p-6 transition-colors duration-150 hover:border-ink"
    >
      <div>
        <h3 className="font-display text-xl text-ink">{title}</h3>
        <p className="mt-2 text-sm text-graphite">{description}</p>
      </div>
      <span className="mt-6 text-sm font-medium text-ink underline decoration-mustard decoration-2 underline-offset-4 group-hover:decoration-ink">
        Browse {title.toLowerCase()}
      </span>
    </Link>
  );
}
