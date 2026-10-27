import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Artvalue works" },
      { name: "description", content: "Discover, scan, explore, save, connect — for visitors and for artists." },
      { property: "og:title", content: "How Artvalue works" },
      { property: "og:description", content: "Discover it on the street. Explore it online. Buy it when you're ready." },
    ],
  }),
  component: How,
});

const visitors = [["Discover", "Find an artwork while exploring Kala Ghoda."], ["Scan", "Scan the artist's QR code."], ["Explore", "Browse the collection and learn about each piece."], ["Save", "Save an artwork and revisit it later."], ["Connect", "Enquire about the artwork or purchase it when ready."]];
const makers = [["Sign up", "Create a profile."], ["Upload", "Add photographs and details of artwork."], ["Share", "Generate a QR code and display it at the stall."], ["Connect", "Receive buyer interest and manage enquiries or purchase requests."]];

function Timeline({ title, steps, dark }: { title: string; steps: string[][]; dark?: boolean }) {
  return (
    <section className={dark ? "section-dark" : ""}>
      <div className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-5xl md:text-7xl">{title}</h2>
        <ol className="mt-12">
          {steps.map(([t, d], i) => (
            <li key={t} className="grid grid-cols-[80px_1fr] items-baseline gap-6 border-t border-current/20 py-6 md:grid-cols-[140px_240px_1fr]">
              <span className="font-display text-5xl text-terracotta">0{i + 1}</span>
              <span className="font-display text-3xl uppercase">{t}</span>
              <p className="col-span-2 max-w-md opacity-80 md:col-span-1">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function How() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pt-14">
        <p className="label-cat text-terracotta">Field guide</p>
        <h1 className="mt-3 text-6xl md:text-8xl">Discover it on the street.<br /><span className="text-terracotta">Buy it when you're ready.</span></h1>
      </div>
      <Timeline title="For visitors" steps={visitors} />
      <Timeline title="For artists" steps={makers} dark />
      <div className="mx-auto max-w-7xl px-5 pt-16"><Link to="/sell" className="btn btn-primary">Sell your art</Link></div>
    </>
  );
}
