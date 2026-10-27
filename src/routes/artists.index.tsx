import { createFileRoute, Link } from "@tanstack/react-router";
import { artists, worksBy } from "@/lib/data";

export const Route = createFileRoute("/artists/")({
  head: () => ({
    meta: [
      { title: "Artists of Kala Ghoda — Artvalue" },
      { name: "description", content: "Meet the independent painters, illustrators and makers behind the work." },
      { property: "og:title", content: "Artists of Kala Ghoda — Artvalue" },
      { property: "og:description", content: "Behind every piece, a person." },
    ],
  }),
  component: Artists,
});

function Artists() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <p className="label-cat text-terracotta">Directory / Demonstration profiles</p>
      <h1 className="mt-3 text-6xl md:text-8xl">Behind every piece,<br />a person.</h1>
      <div className="mt-16 space-y-20">
        {artists.map((a, i) => (
          <Link key={a.slug} to="/artists/$slug" params={{ slug: a.slug }} className={`group grid items-center gap-8 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <img src={a.portrait} alt={`Portrait of ${a.name}`} loading="lazy" className="aspect-[4/5] w-full max-w-md object-cover" />
            <div>
              <p className="label-cat text-terracotta">{a.location} · {worksBy(a.slug).length} works</p>
              <h2 className="mt-2 font-serif text-5xl normal-case tracking-normal group-hover:text-terracotta">{a.name}</h2>
              <p className="mt-1 text-muted-foreground">{a.medium}</p>
              <p className="mt-4 max-w-md">{a.bio}</p>
              <span className="label-cat mt-6 inline-block underline">Open catalogue</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
