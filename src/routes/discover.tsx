import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { artworks, artists, CATEGORIES, getArtist } from "@/lib/data";
import { ArtworkCard } from "@/components/site";

type Search = { q?: string; category?: string };

export const Route = createFileRoute("/discover")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "The Art Catalogue — Artvalue" },
      { name: "description", content: "Search and filter original works by independent artists of Kala Ghoda, Mumbai." },
      { property: "og:title", content: "The Art Catalogue — Artvalue" },
      { property: "og:description", content: "Independent artists. Original works. Stories waiting to be discovered." },
    ],
  }),
  component: Discover,
});

const PRICES = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under ₹2,000", min: 0, max: 1999 },
  { label: "₹2,000 – ₹4,000", min: 2000, max: 4000 },
  { label: "Over ₹4,000", min: 4001, max: Infinity },
];

function Discover() {
  const { q = "", category = "" } = Route.useSearch();
  const navigate = useNavigate({ from: "/discover" });
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [avail, setAvail] = useState("");
  const [sort, setSort] = useState("newest");
  const [open, setOpen] = useState(false);
  const setSearch = (patch: Search) => navigate({ search: (p) => ({ ...p, ...patch }), replace: true });

  const results = useMemo(() => {
    const t = q.toLowerCase().trim();
    const p = PRICES[price];
    const list = artworks.filter((a) => {
      const ar = getArtist(a.artist)!;
      if (t && ![a.title, ar.name, a.medium, a.description, a.category].join(" ").toLowerCase().includes(t)) return false;
      if (category && a.category !== category) return false;
      if (a.price < p.min || a.price > p.max) return false;
      if (location && ar.location !== location) return false;
      if (avail && a.availability !== avail) return false;
      return true;
    });
    return list.sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : b.added.localeCompare(a.added));
  }, [q, category, price, location, avail, sort]);

  const clear = () => { setSearch({ q: undefined, category: undefined }); setPrice(0); setLocation(""); setAvail(""); };
  const locations = [...new Set(artists.map((a) => a.location))];

  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <p className="label-cat text-terracotta">Catalogue / {results.length} works</p>
      <h1 className="mt-3 text-6xl md:text-8xl">The art catalogue</h1>
      <p className="mt-4 max-w-md text-muted-foreground">Independent artists. Original works. Stories waiting to be discovered.</p>

      <div className="mt-10 flex flex-wrap gap-3">
        <label className="flex-1 min-w-[240px]"><span className="sr-only">Search</span>
          <input className="field" placeholder="Search title, artist, medium, keyword…" value={q} onChange={(e) => setSearch({ q: e.target.value || undefined })} />
        </label>
        <select aria-label="Sort" className="field !w-auto" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
        </select>
        <button className="btn btn-ghost lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open}><SlidersHorizontal size={16} /> Filters</button>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className={`${open ? "block" : "hidden"} space-y-6 lg:block`} aria-label="Filters">
          <fieldset><legend className="label-cat mb-2">Category</legend>
            {["", ...CATEGORIES].map((c) => (
              <button key={c || "all"} onClick={() => setSearch({ category: c || undefined })} className={`block py-1 text-left text-sm hover:text-terracotta ${category === c ? "font-semibold text-terracotta" : ""}`}>{c || "All categories"}</button>
            ))}
          </fieldset>
          <fieldset><legend className="label-cat mb-2">Price</legend>
            <select className="field" value={price} onChange={(e) => setPrice(+e.target.value)}>{PRICES.map((p, i) => <option key={p.label} value={i}>{p.label}</option>)}</select>
          </fieldset>
          <fieldset><legend className="label-cat mb-2">Artist location</legend>
            <select className="field" value={location} onChange={(e) => setLocation(e.target.value)}><option value="">Anywhere</option>{locations.map((l) => <option key={l}>{l}</option>)}</select>
          </fieldset>
          <fieldset><legend className="label-cat mb-2">Availability</legend>
            <select className="field" value={avail} onChange={(e) => setAvail(e.target.value)}><option value="">All</option><option value="available">Available</option><option value="reserved">Reserved</option><option value="sold">Sold</option></select>
          </fieldset>
          <button onClick={clear} className="label-cat underline">Clear all filters</button>
        </aside>

        {results.length ? (
          <div className="columns-1 gap-8 sm:columns-2 xl:columns-3 [&>*]:mb-12 [&>*]:break-inside-avoid">
            {results.map((a, i) => <ArtworkCard key={a.id} art={a} index={i} />)}
          </div>
        ) : (
          <div className="border border-dashed border-ink p-12 text-center">
            <p className="hand text-3xl text-terracotta">Nothing here — yet.</p>
            <p className="mt-2 text-muted-foreground">No works match these filters. Try widening your search.</p>
            <button onClick={clear} className="btn btn-ghost mt-6">Clear filters</button>
          </div>
        )}
      </div>
      <p className="mt-10 text-xs text-muted-foreground">All listings are demonstration content. <Link to="/sell" className="underline">Artists can join here.</Link></p>
    </div>
  );
}
