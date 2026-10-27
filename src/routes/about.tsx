import { createFileRoute } from "@tanstack/react-router";
import stall from "@/assets/street-stall.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Artvalue" },
      { name: "description", content: "Why Artvalue exists: making independent art in Kala Ghoda easier to discover, revisit and buy." },
      { property: "og:title", content: "About Artvalue" },
      { property: "og:description", content: "A bridge between street art and the digital world." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <p className="label-cat text-terracotta">About</p>
      <h1 className="mt-3 text-6xl md:text-8xl">Art + value.</h1>
      <div className="mt-12 grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <img src={stall} alt="A footpath art stall in Kala Ghoda" className="w-full object-cover" />
        <div className="space-y-5 text-lg">
          <p className="font-serif text-2xl">Around Kala Ghoda and the art gallery steps, independent artists line the pathways with paintings, drawings and handmade work.</p>
          <p>Visitors stop, admire — and often walk on. They want time to decide, to talk it over, to compare. Once they leave, the connection is usually lost.</p>
          <p>Artvalue gives every artist a digital catalogue and a QR card for their stall, so the art you notice on the street is easy to find again.</p>
          <p className="hand text-3xl text-terracotta">Value isn't only the price — it's the skill, the story and the person behind the work.</p>
        </div>
      </div>
    </div>
  );
}
