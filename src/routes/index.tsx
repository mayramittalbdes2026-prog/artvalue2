import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowDownLeft } from "lucide-react";
import { artworks, artists, stories, CATEGORIES, getArtist, worksBy } from "@/lib/data";
import { ArtworkCard, QRCard } from "@/components/site";
import stall from "@/assets/street-stall.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Artvalue — The street is a gallery, too" },
      { name: "description", content: "Found a painting you love in Kala Ghoda? Meet the artist, explore their collection, and buy when you're ready." },
      { property: "og:title", content: "Artvalue — The street is a gallery, too" },
      { property: "og:description", content: "Discover it on the street. Explore it online. Buy it when you're ready." },
    ],
  }),
  component: Home,
});

const featured = ["monsoon-at-dadar", "the-flower-seller", "fragments-of-home", "a-city-in-blue", "sunday-on-the-footpath", "quiet-temple-morning"].map((id) => artworks.find((a) => a.id === id)!);
const sample = (c: string) => artworks.find((a) => a.category === c);

function Home() {
  const hero = featured[0];
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-10 lg:grid-cols-12">
        <div className="lg:col-span-6 lg:pt-12">
          <p className="label-cat text-terracotta">Kala Ghoda, Mumbai / Field Notes 001</p>
          <h1 className="mt-6 text-[clamp(3.5rem,9vw,8.5rem)] font-bold">The street<br />is a gallery,<br /><span className="text-terracotta">too.</span></h1>
          <p className="mt-8 max-w-md text-lg">Found a painting you love? Discover the artist behind it, explore their collection, and take your time deciding what belongs on your wall.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/discover" className="btn btn-primary">Explore Art <ArrowRight size={16} /></Link>
            <Link to="/how-it-works" className="btn btn-ghost">How It Works</Link>
          </div>
        </div>
        <div className="relative lg:col-span-6">
          <Link to="/art/$id" params={{ id: hero.id }} className="art-frame ml-auto block w-[82%] rotate-[1deg]">
            <img src={hero.image} alt={`${hero.title}, watercolour`} width={hero.w} height={hero.h} className="w-full" />
          </Link>
          <img src={stall} alt="An artist's stall on a Kala Ghoda footpath" width={1280} height={896} loading="lazy" className="absolute -bottom-10 left-0 w-[48%] border-8 border-background object-cover shadow-lg" />
          <div className="absolute right-2 top-[42%] hidden max-w-[10rem] bg-background p-3 text-xs md:block">
            <p className="label-cat">Cat. 001</p>
            <p className="font-serif text-base">{hero.title}</p>
            <p className="text-muted-foreground">{getArtist(hero.artist)?.name} · ₹2,400</p>
          </div>
          <p className="hand absolute -left-2 top-6 hidden -rotate-6 text-2xl text-terracotta md:flex items-center gap-1">Made in Mumbai <ArrowRight size={18} /></p>
        </div>
      </section>

      {/* Core idea */}
      <section className="section-dark">
        <div className="mx-auto max-w-7xl px-5 py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="text-5xl md:text-7xl">Love the art. <span className="text-haldi">Don't rush</span> the decision.</h2>
            <div>
              <p className="font-serif text-2xl leading-snug">Sometimes the artwork that stays with you is the one you didn't buy. Artvalue helps you find it again.</p>
              <ol className="mt-12 grid gap-px border-t border-current/20 sm:grid-cols-5">
                {["Notice a piece at a street stall", "Scan the artist's QR code", "Their catalogue opens on your phone", "Save the artwork", "Come back to enquire or buy"].map((s, i) => (
                  <li key={s} className="border-b border-current/20 py-5 sm:border-b-0 sm:border-r sm:pr-4">
                    <span className="font-display text-4xl text-terracotta">0{i + 1}</span>
                    <p className="mt-2 text-sm opacity-80">{s}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6 rule-ink pt-6">
          <h2 className="text-5xl md:text-7xl">Art worth<br />stopping for.</h2>
          <p className="max-w-xs text-muted-foreground">Original works, independent voices, and stories waiting to be discovered.</p>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-6">
          {featured.map((a, i) => (
            <div key={a.id} className={["md:col-span-3", "md:col-span-3 md:mt-24", "md:col-span-2", "md:col-span-4", "md:col-span-4", "md:col-span-2 md:-mt-12"][i]}>
              <ArtworkCard art={a} index={i} />
            </div>
          ))}
        </div>
        <Link to="/discover" className="btn btn-ghost mt-14">See the full catalogue <ArrowRight size={16} /></Link>
      </section>

      {/* Artists */}
      <section className="bg-stone/60">
        <div className="mx-auto max-w-7xl px-5 py-24">
          <h2 className="text-5xl md:text-7xl">Behind every piece,<br />a person.</h2>
          <p className="label-cat mt-4 text-muted-foreground">Demonstration profiles — not verified real artists</p>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {artists.map((a, i) => {
              const w = worksBy(a.slug)[0];
              return (
                <Link key={a.slug} to="/artists/$slug" params={{ slug: a.slug }} className={`group block ${i === 1 ? "md:mt-20" : ""}`}>
                  <div className="relative">
                    <img src={a.portrait} alt={`Portrait of ${a.name}`} loading="lazy" width={896} height={1152} className="aspect-[4/5] w-full object-cover" />
                    <img src={w.image} alt="" loading="lazy" className="absolute -bottom-6 -right-3 w-28 border-4 border-background" />
                  </div>
                  <p className="label-cat mt-8 text-terracotta">{a.location}</p>
                  <h3 className="mt-1 font-serif text-3xl normal-case tracking-normal group-hover:text-terracotta">{a.name}</h3>
                  <p className="text-sm text-muted-foreground">{a.medium}</p>
                  <p className="mt-3 text-sm">{a.bio}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <h2 className="text-5xl md:text-7xl">Find your kind of art.</h2>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {CATEGORIES.map((c, i) => {
            const s = sample(c);
            return (
              <Link key={c} to="/discover" search={{ category: c }} className={`group relative block overflow-hidden ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"} ${s ? "" : "bg-indigo-dye"}`}>
                {s && <img src={s.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />}
                <div className="absolute inset-x-0 bottom-0 bg-ink/80 p-3 text-paper">
                  <span className="font-display uppercase">{c}</span>
                  {!s && <span className="block text-xs opacity-70">Coming soon</span>}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* QR */}
      <section className="bg-terracotta text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 lg:grid-cols-2">
          <div>
            <p className="label-cat opacity-80">The signature feature</p>
            <h2 className="mt-4 text-6xl md:text-8xl">Scan now.<br />Discover later.</h2>
            <p className="mt-6 max-w-md text-lg">That painting you noticed on the street doesn't have to remain a memory. Scan the artist's code, save the artwork, and return whenever you're ready.</p>
            <p className="hand mt-6 flex items-center gap-2 text-2xl"><ArrowDownLeft /> Try it — this code opens a real profile (demo artist)</p>
          </div>
          <div className="relative flex justify-center">
            <img src={stall} alt="Paintings leaning against a stone wall at a street stall" loading="lazy" className="w-full max-w-lg border-8 border-paper object-cover" />
            <div className="absolute -bottom-10 right-0 md:right-6"><QRCard slug="raghav-kulkarni" thumb={featured[0].image} /></div>
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="mx-auto max-w-7xl px-5 py-28">
        <h2 className="text-5xl md:text-7xl">More than what<br />meets the eye.</h2>
        <p className="label-cat mt-4 text-muted-foreground">Illustrative stories — fictional demonstration content</p>
        <div className="mt-12 grid gap-10 md:grid-cols-[1.5fr_1fr]">
          {stories.map((s, i) => (
            <Link key={s.slug} to="/artists/$slug" params={{ slug: s.artist }} className={`group block ${i === 0 ? "md:row-span-2" : "grid grid-cols-[120px_1fr] gap-4"}`}>
              <img src={s.image} alt="" loading="lazy" className={`w-full object-cover ${i === 0 ? "aspect-[4/3]" : "aspect-square"}`} />
              <div>
                <p className="label-cat mt-3 text-terracotta">{getArtist(s.artist)?.name}</p>
                <h3 className={`mt-1 font-serif normal-case tracking-normal leading-tight group-hover:text-terracotta ${i === 0 ? "text-4xl" : "text-xl"}`}>{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.excerpt}</p>
                <span className="label-cat mt-2 inline-block underline">Meet the artist</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="mx-auto max-w-5xl px-5 text-center">
        <h2 className="text-5xl md:text-7xl">The art you love should be easy to find again.</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">Explore the artists of Kala Ghoda. Discover something unexpected. Take the story home when you're ready.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/discover" className="btn btn-primary">Explore the Catalogue</Link>
          <Link to="/artists" className="btn btn-ghost">Meet the Artists</Link>
          <Link to="/sell" className="btn btn-ghost">Sell Your Art</Link>
        </div>
      </section>
    </>
  );
}
