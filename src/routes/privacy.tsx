import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy policy — Artvalue" }, { name: "description", content: "How Artvalue handles your information." }, { property: "og:title", content: "Privacy policy — Artvalue" }, { property: "og:description", content: "How Artvalue handles your information." }] }),
  component: () => (
    <div className="mx-auto max-w-2xl px-5 py-14 space-y-4">
      <h1 className="text-6xl">Privacy policy</h1>
      <p>Draft placeholder. Saved artworks and demo requests are kept only in your browser on this device. A full policy will be published before launch.</p>
    </div>
  ),
});
