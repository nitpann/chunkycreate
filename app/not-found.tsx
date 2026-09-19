import { LinkButton } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center justify-center gap-4 py-32 text-center">
      <span className="font-display text-6xl text-mustard">404</span>
      <h1 className="font-display text-3xl text-ink">Looks like you've wandered off.</h1>
      <p className="max-w-sm text-graphite">
        The page you're looking for doesn't exist, or has moved.
      </p>
      <LinkButton href="/" variant="primary">
        Back to ChunkyCreate
      </LinkButton>
    </div>
  );
}
