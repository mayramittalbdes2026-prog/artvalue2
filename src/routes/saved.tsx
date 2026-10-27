import { createFileRoute, Link } from "@tanstack/react-router";
import { artworks } from "@/lib/data";
import { useSaved } from "@/lib/saved";
import { ArtworkCard } from "@/components/site";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved art — Artvalue" },
      { name: "description", content: "The artworks you saved to revisit later." },
      { property: "og:title", content: "Saved art — Artvalue" },
      { property: "og:description", content: "Come back when you're ready." },
    ],
  }),
  component: Saved,
});

function Saved() {
  const { saved } = useSaved();
  const list = saved.map((id) => artworks.find((a) => a.id === id)).filter(Boolean) as typeof artworks;
  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <p className="label-cat text-terracotta">Your collection · saved on this device</p>
      <h1 className="mt-3 text-6xl md:text-8xl">Saved art</h1>
      {list.length ? (
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{list.map((a) => <ArtworkCard key={a.id} art={a} />)}</div>
      ) : (
        <div className="mt-12 border border-dashed border-ink p-12 text-center">
          <p className="hand text-3xl text-terracotta">Nothing saved yet.</p>
          <p className="mt-2 text-muted-foreground">Tap the heart on any artwork to keep it here for later.</p>
          <Link to="/discover" className="btn btn-primary mt-6">Explore art</Link>
        </div>
      )}
    </div>
  );
}
