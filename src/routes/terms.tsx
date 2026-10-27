import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms and conditions — Artvalue" }, { name: "description", content: "Terms for using Artvalue." }, { property: "og:title", content: "Terms and conditions — Artvalue" }, { property: "og:description", content: "Terms for using Artvalue." }] }),
  component: () => (
    <div className="mx-auto max-w-2xl px-5 py-14 space-y-4">
      <h1 className="text-6xl">Terms and conditions</h1>
      <p>Draft placeholder. Purchases are agreed directly between buyer and artist; Artvalue does not take payment in this preview.</p>
    </div>
  ),
});
