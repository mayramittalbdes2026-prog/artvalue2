import { useEffect, useState, useCallback } from "react";

const KEY = "artvalue:saved";
const EVT = "artvalue:saved-change";

function read(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function useSaved() {
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setSaved(read());
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener(EVT, sync); window.removeEventListener("storage", sync); };
  }, []);
  const toggle = useCallback((id: string) => {
    const cur = read();
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [id, ...cur];
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVT));
    return next.includes(id);
  }, []);
  return { saved, toggle, isSaved: (id: string) => saved.includes(id) };
}

export type Request = { id: string; type: "enquiry" | "purchase"; artworkId: string; name: string; contact: string; message: string; createdAt: string };
const RKEY = "artvalue:requests";
export function saveRequest(r: Omit<Request, "id" | "createdAt">) {
  const list: Request[] = (() => { try { return JSON.parse(localStorage.getItem(RKEY) || "[]"); } catch { return []; } })();
  const full = { ...r, id: "AV-" + Math.random().toString(36).slice(2, 8).toUpperCase(), createdAt: new Date().toISOString() };
  localStorage.setItem(RKEY, JSON.stringify([full, ...list]));
  return full;
}
