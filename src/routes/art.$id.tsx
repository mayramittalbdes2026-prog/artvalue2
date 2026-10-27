import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { getArtwork, getArtist, worksBy, inr } from "@/lib/data";
import { saveRequest } from "@/lib/saved";
import { ArtworkCard, Availability, SavedArtworkButton } from "@/components/site";

export const Route = createFileRoute("/art/$id")({
  loader: ({ params }) => {
    const art = getArtwork(params.id);
    if (!art) throw notFound();
    return { art, artist: getArtist(art.artist)! };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.art.title} by ${loaderData.artist.name} — Artvalue` },
          { name: "description", content: `${loaderData.art.medium}, ${inr(loaderData.art.price)}. ${loaderData.art.description}` },
          { property: "og:title", content: `${loaderData.art.title} — Artvalue` },
          { property: "og:description", content: loaderData.art.description },
        ]
      : [{ title: "Artwork not found — Artvalue" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-24 text-center"><h1 className="text-5xl">Artwork not found</h1><Link to="/discover" className="btn btn-primary mt-6">Back to catalogue</Link></div>
  ),
  component: ArtPage,
});

function ArtPage() {
  const { art, artist } = Route.useLoaderData();
  const [mode, setMode] = useState<null | "enquiry" | "purchase">(null);
  const [done, setDone] = useState<string | null>(null);
  const more = worksBy(artist.slug).filter((a) => a.id !== art.id);
  const sold = art.availability === "sold";

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) { try { await navigator.share({ title: art.title, url }); } catch { /* cancelled */ } }
    else { await navigator.clipboard.writeText(url); toast("Link copied"); }
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const r = saveRequest({ type: mode!, artworkId: art.id, name: String(f.get("name")), contact: String(f.get("contact")), message: String(f.get("message") || "") });
    setDone(r.id); setMode(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <nav className="label-cat text-muted-foreground"><Link to="/discover" className="hover:text-terracotta">Catalogue</Link> / {art.category}</nav>
      <div className="mt-8 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="art-frame self-start"><img src={art.image} alt={`${art.title} by ${artist.name}`} width={art.w} height={art.h} className="w-full" /></div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Availability a={art.availability} />
          <h1 className="mt-3 font-serif text-5xl normal-case tracking-normal">{art.title}</h1>
          <Link to="/artists/$slug" params={{ slug: artist.slug }} className="mt-2 inline-block text-lg underline underline-offset-4 hover:text-terracotta">{artist.name}</Link>
          <p className="mt-6 font-display text-4xl">{sold ? <span className="stamp text-sindoor !text-2xl">Sold</span> : inr(art.price)}</p>
          <dl className="mt-6 grid grid-cols-[110px_1fr] gap-y-2 border-y border-border py-4 text-sm">
            <dt className="label-cat">Medium</dt><dd>{art.medium}</dd>
            <dt className="label-cat">Size</dt><dd>{art.dims}</dd>
            <dt className="label-cat">Year</dt><dd>{art.year}</dd>
          </dl>
          <p className="mt-6">{art.description}</p>
          {art.inspiration && <p className="hand mt-4 text-2xl text-terracotta">"{art.inspiration}"</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn btn-primary" disabled={sold} onClick={() => setMode("purchase")}>Request to buy</button>
            <button className="btn btn-ghost" onClick={() => setMode("enquiry")}>Ask the artist</button>
            <SavedArtworkButton id={art.id} />
            <button onClick={share} aria-label="Share" className="grid h-11 w-11 place-items-center border border-ink hover:bg-ink hover:text-background"><Share2 size={18} /></button>
          </div>
          {done && (
            <div role="status" className="mt-6 border border-leaf bg-card p-4 text-sm">
              <p className="font-semibold">Request {done} recorded.</p>
              <p className="text-muted-foreground">This is a demonstration — in the live version the artist would be notified and reply to you directly. No payment has been taken.</p>
            </div>
          )}
          {mode && (
            <form onSubmit={submit} className="mt-6 space-y-3 border border-ink bg-card p-5">
              <p className="font-display uppercase">{mode === "purchase" ? `Purchase request · ${inr(art.price)}` : "Enquiry"}</p>
              <input required name="name" className="field" placeholder="Your name" aria-label="Your name" />
              <input required name="contact" className="field" placeholder="Phone or email" aria-label="Phone or email" />
              <textarea name="message" className="field min-h-24" placeholder={mode === "purchase" ? "Delivery area, preferred pickup, questions…" : "What would you like to know?"} aria-label="Message" />
              <p className="text-xs text-muted-foreground">The artist confirms availability before any payment. Nothing is charged now.</p>
              <div className="flex gap-2"><button className="btn btn-primary">Send</button><button type="button" className="btn btn-ghost" onClick={() => setMode(null)}>Cancel</button></div>
            </form>
          )}
        </div>
      </div>
      {more.length > 0 && (
        <section className="mt-24 rule-ink pt-6">
          <h2 className="text-4xl">More by {artist.name}</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">{more.map((a) => <ArtworkCard key={a.id} art={a} />)}</div>
        </section>
      )}
    </div>
  );
}
