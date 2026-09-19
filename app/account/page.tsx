import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <div className="container-page flex flex-col items-center gap-3 py-24 text-center">
      <h1 className="font-display text-2xl text-ink">Accounts are coming soon.</h1>
      <p className="max-w-sm text-graphite">
        Order history and saved downloads will live here once accounts and
        checkout are connected to a backend.
      </p>
    </div>
  );
}
