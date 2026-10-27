import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getArtist, worksBy } from "@/lib/data";
import { ArtworkCard, QRCard } from "@/components/site";

export const Route = createFileRoute("/artists/$slug")({
  loader: ({ params }) => {
    const artist = getArtist(params.slug);
    if (!artist) throw notFound();
    return { artist };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.artist.name} — Artvalue catalogue` },
          { name: "description", content: loaderData.artist.bio },
          { property: "og:title", content: `${loaderData.artist.name} — Artvalue` },
          { property: "og:description", content: loaderData.artist.bio },
        ]
      : [{ title: "Artist not found — Artvalue" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-24 text-center"><h1 className="text-5xl">Artist not found</h1><Link to="/artists" className="btn btn-primary mt-6">All artists</Link></div>
  ),
  component: ArtistPage,
});

function ArtistPage() {
  const { artist } = Route.useLoaderData();
  const works = worksBy(artist.slug);
  return (
    <div>
      <section className="section-dark">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1fr_1.3fr_auto] md:items-end">
          <img src={artist.portrait} alt={`Portrait of ${artist.name}`} className="aspect-[4/5] w-full max-w-sm object-cover" />
          <div>
            <p className="label-cat text-haldi">{artist.location} · Demonstration profile</p>
            <h1 className="mt-3 font-serif text-6xl normal-case tracking-normal md:text-7xl">{artist.name}</h1>
            <p className="mt-2 opacity-75">{artist.medium}</p>
            <p className="mt-6 max-w-lg">{artist.bio}</p>
            <p className="hand mt-6 text-3xl text-haldi">"{artist.statement}"</p>
            <dl className="mt-6 grid grid-cols-[120px_1fr] gap-y-1 text-sm opacity-80">
              <dt className="label-cat">Find them</dt><dd>{artist.stall}</dd>
              <dt className="label-cat">Speaks</dt><dd>{artist.languages}</dd>
            </dl>
          </div>
          <div className="hidden lg:block"><QRCard slug={artist.slug} thumb={works[0]?.image} /></div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="text-5xl">The collection <span className="text-muted-foreground">({works.length})</span></h2>
        <div className="mt-10 columns-1 gap-8 sm:columns-2 lg:columns-3 [&>*]:mb-12 [&>*]:break-inside-avoid">
          {works.map((a, i) => <ArtworkCard key={a.id} art={a} index={i} />)}
        </div>
      </section>
    </div>
  );
}
