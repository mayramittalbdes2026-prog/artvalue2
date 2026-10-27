import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES } from "@/lib/data";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell your art on Artvalue" },
      { name: "description", content: "Create your artist profile, upload your work and get a QR code for your stall." },
      { property: "og:title", content: "Sell your art on Artvalue" },
      { property: "og:description", content: "Your stall, open even after visitors walk away." },
    ],
  }),
  component: Sell,
});

const STEPS = ["About you", "Your art", "Upload artwork", "Review"];

function Sell() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setData({ ...data, [k]: e.target.value });
  const F = ({ k, label, type = "text", area }: { k: string; label: string; type?: string; area?: boolean }) => (
    <label className="block"><span className="label-cat">{label}</span>
      {area ? <textarea className="field mt-1 min-h-28" value={data[k] || ""} onChange={set(k)} /> : <input type={type} className="field mt-1" value={data[k] || ""} onChange={set(k)} />}
    </label>
  );

  if (done) return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <p className="stamp text-leaf">Received</p>
      <h1 className="mt-6 text-6xl">Thank you, {data.name || "artist"}.</h1>
      <p className="mt-4 text-muted-foreground">Artist accounts are still being set up. Your details were not stored online yet — once sign-up opens, your profile and QR code will be created from here.</p>
      <Link to="/" className="btn btn-primary mt-8">Back home</Link>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="label-cat text-terracotta">For artists</p>
      <h1 className="mt-3 text-6xl md:text-7xl">Sell your art.</h1>
      <p className="mt-4 text-lg text-muted-foreground">Four simple steps. You can add more works later.</p>
      <ol className="mt-10 grid grid-cols-4 gap-2" aria-label="Progress">
        {STEPS.map((s, i) => <li key={s} className={`border-t-4 pt-2 text-xs label-cat ${i <= step ? "border-terracotta" : "border-stone text-muted-foreground"}`} aria-current={i === step ? "step" : undefined}>{i + 1}. {s}</li>)}
      </ol>
      <form className="mt-10 space-y-5" onSubmit={(e) => { e.preventDefault(); step < 3 ? setStep(step + 1) : setDone(true); }}>
        {step === 0 && (<><F k="name" label="Your name" /><F k="phone" label="Phone (WhatsApp)" type="tel" /><F k="location" label="Where is your stall?" /><F k="bio" label="A few lines about you" area /></>)}
        {step === 1 && (<>
          <label className="block"><span className="label-cat">Main category</span>
            <select className="field mt-1" value={data.category || ""} onChange={set("category")}><option value="">Choose…</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></label>
          <F k="medium" label="Mediums you work with" /><F k="statement" label="What inspires your work?" area /></>)}
        {step === 2 && (<>
          <label className="block"><span className="label-cat">Photo of your artwork</span><input type="file" accept="image/*" className="field mt-1" /></label>
          <F k="title" label="Artwork title" /><F k="price" label="Price (₹)" type="number" /><F k="dims" label="Size (e.g. 30 × 40 cm)" /></>)}
        {step === 3 && (
          <dl className="grid grid-cols-[140px_1fr] gap-y-2 border border-ink bg-card p-5 text-sm">
            {Object.entries(data).map(([k, v]) => <><dt key={k} className="label-cat">{k}</dt><dd>{v}</dd></>)}
          </dl>
        )}
        <div className="flex gap-3">
          {step > 0 && <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)}>Back</button>}
          <button className="btn btn-primary">{step < 3 ? "Continue" : "Publish profile"}</button>
        </div>
      </form>
    </div>
  );
}
