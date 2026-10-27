import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Menu, X, Search } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { type Artwork, getArtist, inr } from "@/lib/data";
import { useSaved } from "@/lib/saved";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-2xl uppercase tracking-tight ${className}`}>
      Art<span className="text-terracotta">value</span>
      <span className="ml-1 inline-block h-2 w-2 translate-y-[-0.6em] rounded-full bg-sindoor" aria-hidden />
    </span>
  );
}

const NAV = [
  { to: "/discover", label: "Discover Art" },
  { to: "/artists", label: "Artists" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
] as const;

export function MainNavigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { saved } = useSaved();
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm transition-all ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5">
        <Link to="/" aria-label="Artvalue home"><Wordmark /></Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="label-cat hover:text-terracotta" activeProps={{ className: "text-terracotta" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/discover" aria-label="Search art" className="hidden p-2 hover:text-terracotta sm:block"><Search size={20} /></Link>
          <Link to="/saved" aria-label={`Saved art, ${saved.length} items`} className="relative p-2 hover:text-terracotta">
            <Heart size={20} />
            {saved.length > 0 && <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-terracotta px-1 text-[10px] text-primary-foreground">{saved.length}</span>}
          </Link>
          <Link to="/sell" className="btn btn-primary hidden !py-2 !text-xs sm:inline-flex">Sell Your Art</Link>
          <button className="p-2 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border px-5 py-4 lg:hidden" aria-label="Mobile">
          {[...NAV, { to: "/saved", label: "Saved Art" }, { to: "/sell", label: "Sell Your Art" }].map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block border-b border-border py-4 font-display text-2xl uppercase">{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="section-dark mt-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Wordmark className="text-5xl" />
          <p className="mt-4 max-w-sm opacity-75">Art you discover. Value you take with you. A digital extension of Kala Ghoda's independent art culture.</p>
          <p className="hand mt-6 text-2xl text-haldi">Made in Mumbai.</p>
        </div>
        <div className="flex flex-col gap-3">
          <span className="label-cat opacity-60">Explore</span>
          <Link to="/discover">Discover Art</Link><Link to="/artists">Artists</Link><Link to="/how-it-works">How It Works</Link><Link to="/sell">Sell Your Art</Link><Link to="/about">About</Link>
        </div>
        <div className="flex flex-col gap-3">
          <span className="label-cat opacity-60">Info</span>
          <Link to="/privacy">Privacy policy</Link><Link to="/terms">Terms and conditions</Link>
          <span className="opacity-60">Contact: details coming soon</span>
        </div>
      </div>
      <div className="border-t border-current/20 px-5 py-5 text-center text-xs opacity-60">
        Artists, artworks and stories shown are fictional demonstration content.
      </div>
    </footer>
  );
}

export function Availability({ a }: { a: Artwork["availability"] }) {
  const map = { available: ["Available", "text-leaf"], reserved: ["Reserved", "text-haldi"], sold: ["Sold", "text-sindoor"] } as const;
  const [l, c] = map[a];
  return <span className={`label-cat ${c}`}>● {l}</span>;
}

export function SavedArtworkButton({ id, className = "" }: { id: string; className?: string }) {
  const { isSaved, toggle } = useSaved();
  const on = isSaved(id);
  return (
    <button
      onClick={(e) => { e.preventDefault(); const now = toggle(id); toast(now ? "Saved to your collection" : "Removed from saved"); }}
      aria-pressed={on}
      aria-label={on ? "Remove from saved" : "Save artwork"}
      className={`grid h-11 w-11 place-items-center border border-ink bg-background transition hover:bg-ink hover:text-background ${on ? "bg-terracotta text-primary-foreground border-terracotta" : ""} ${className}`}
    >
      <Heart size={18} fill={on ? "currentColor" : "none"} />
    </button>
  );
}

export function ArtworkCard({ art, index, tall }: { art: Artwork; index?: number; tall?: boolean }) {
  const artist = getArtist(art.artist);
  return (
    <article className="group animate-rise">
      <div className="relative">
        <Link to="/art/$id" params={{ id: art.id }} className="block art-frame">
          <img src={art.image} alt={`${art.title} by ${artist?.name}`} loading="lazy" width={art.w} height={art.h}
            className={`w-full object-cover transition duration-500 group-hover:scale-[1.01] ${tall ? "aspect-[4/5]" : ""} ${art.availability === "sold" ? "opacity-80" : ""}`} />
        </Link>
        <SavedArtworkButton id={art.id} className="absolute right-3 top-3" />
        {art.availability === "sold" && <span className="stamp absolute bottom-6 left-5 bg-background text-sindoor">Sold</span>}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          {index !== undefined && <span className="label-cat text-muted-foreground">No. {String(index + 1).padStart(3, "0")}</span>}
          <Link to="/art/$id" params={{ id: art.id }}><h3 className="font-serif text-xl normal-case tracking-normal leading-tight hover:text-terracotta">{art.title}</h3></Link>
          <Link to="/artists/$slug" params={{ slug: art.artist }} className="text-sm underline-offset-4 hover:underline">{artist?.name}</Link>
          <p className="text-sm text-muted-foreground">{art.medium}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-lg">{inr(art.price)}</p>
          <Availability a={art.availability} />
        </div>
      </div>
    </article>
  );
}

export function QRCard({ slug, thumb }: { slug: string; thumb?: string }) {
  const a = getArtist(slug)!;
  const [url, setUrl] = useState(`/artists/${slug}`);
  useEffect(() => setUrl(`${window.location.origin}/artists/${slug}`), [slug]);
  return (
    <div className="w-64 rotate-[-2deg] border border-ink bg-card p-4 text-ink shadow-[6px_6px_0_var(--ink)]">
      <div className="flex items-center justify-between"><Wordmark className="text-lg" /><span className="label-cat">Cat. 001</span></div>
      <div className="mt-3 flex gap-3">
        {thumb && <img src={thumb} alt="" className="h-20 w-16 object-cover" />}
        <div><p className="font-serif text-lg leading-tight">{a.name}</p><p className="text-xs text-muted-foreground">{a.medium}</p></div>
      </div>
      <div className="mt-3 bg-background p-2"><QRCodeSVG value={url} size={200} className="h-auto w-full" bgColor="transparent" fgColor="currentColor" /></div>
      <p className="label-cat mt-3 text-center">Scan to explore the collection</p>
    </div>
  );
}
