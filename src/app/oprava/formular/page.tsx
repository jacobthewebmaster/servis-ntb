// src/app/oprava/formular/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useOrderStore, getProblemLabel, type ProblemKey } from "@/store/orderStore";

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200";

export default function OrderFormPage() {
  const router = useRouter();
  const rawProblem = useOrderStore((s) => s.problem);
  const problem = rawProblem as ProblemKey | null;

  const { name, email, phone, note, setContact } = useOrderStore();

  const [device, setDevice] = useState("");
  const [condition, setCondition] = useState("");
  const [conditionNote, setConditionNote] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [photoClosedPreview, setPhotoClosedPreview] = useState<string | null>(null);
  const [photoClosedName, setPhotoClosedName] = useState<string | null>(null);
  const [photoOpenPreview, setPhotoOpenPreview] = useState<string | null>(null);
  const [photoOpenName, setPhotoOpenName] = useState<string | null>(null);
  const [gdpr, setGdpr] = useState(false);

  function handleFile(file: File | undefined, type: "closed" | "open") {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    if (type === "closed") {
      setPhotoClosedPreview(preview);
      setPhotoClosedName(file.name);
    } else {
      setPhotoOpenPreview(preview);
      setPhotoOpenName(file.name);
    }
  }

  function removeFile(type: "closed" | "open") {
    if (type === "closed") {
      setPhotoClosedPreview(null);
      setPhotoClosedName(null);
    } else {
      setPhotoOpenPreview(null);
      setPhotoOpenName(null);
    }
  }

  if (!problem) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold">Nejdříve vyberte problém</h1>
          <p className="mt-4 text-slate-600">
            Pro objednávku opravy potřebujeme vědět, s čím má váš notebook problém.
          </p>
          <Link
            href="/oprava/krok-1"
            className="mt-8 inline-flex rounded-2xl bg-red-600 px-8 py-4 font-semibold text-white hover:bg-red-700 transition"
          >
            ← Vybrat problém
          </Link>
        </div>
      </main>
    );
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setErr(null);
    setLoading(true);

    if (!name || !email || !phone || !device || !condition) {
      setErr("Vyplňte prosím všechny povinné údaje.");
      setLoading(false);
      return;
    }

    if (!gdpr) {
      setErr("Musíte souhlasit se zpracováním osobních údajů.");
      setLoading(false);
      return;
    }

    const form = new FormData(e.currentTarget);

    // === FINÁLNÍ OPRAVA TYPŮ ===
    form.append("problem", String(problem));           // převedeme na string
    form.append("problemLabel", getProblemLabel(problem));

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        body: form,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        setErr(data?.error || "Nepodařilo se odeslat objednávku.");
        return;
      }

      router.push(`/oprava/potvrzeni?typ=objednavka&id=${data.orderId}`);
    } catch {
      setErr("Chyba připojení. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <div className="flex items-center justify-between text-sm">
            <Link href="/oprava/krok-2" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              ← Zpět
            </Link>
            <div className="flex items-center gap-3">
              <span className="font-medium text-emerald-600">Krok 4 z 4 – Objednávka</span>
              <div className="h-1.5 w-32 rounded bg-slate-200">
                <div className="h-1.5 w-full rounded bg-emerald-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-5">
          <section className="lg:col-span-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h1 className="text-4xl font-black tracking-tighter">Objednávka opravy</h1>
              <p className="mt-3 text-lg text-slate-600">
                Problém: <span className="font-semibold text-emerald-700">{getProblemLabel(problem)}</span>
              </p>

              <form onSubmit={submit} className="mt-10 space-y-8">
                {/* Kontakty */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Jméno *</label>
                    <input name="name" required className={inputClass} value={name} onChange={(e) => setContact({ name: e.target.value })} placeholder="Jan Novák" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">E-mail *</label>
                    <input name="email" type="email" required className={inputClass} value={email} onChange={(e) => setContact({ email: e.target.value })} placeholder="vas@email.cz" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Telefon *</label>
                    <input name="phone" required className={inputClass} value={phone} onChange={(e) => setContact({ phone: e.target.value })} placeholder="+420 774 506 503" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Značka a model notebooku *</label>
                  <input name="device" required className={inputClass} value={device} onChange={(e) => setDevice(e.target.value)} placeholder="Lenovo ThinkPad T480..." />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Stav zařízení *</label>
                  <select name="condition" required className={inputClass} value={condition} onChange={(e) => setCondition(e.target.value)}>
                    <option value="">Vyberte stav zařízení</option>
                    <option value="Jako nové / bez viditelného poškození">Jako nové / bez viditelného poškození</option>
                    <option value="Běžné známky používání">Běžné známky používání</option>
                    <option value="Lehké škrábance">Lehké škrábance</option>
                    <option value="Viditelné škrábance / oděrky">Viditelné škrábance / oděrky</option>
                    <option value="Praskliny / poškozené šasi">Praskliny / poškozené šasi</option>
                    <option value="Poškozené panty">Poškozené panty</option>
                    <option value="Po polití / známky vlhkosti">Po polití / známky vlhkosti</option>
                    <option value="Silně poškozené / nekompletní">Silně poškozené / nekompletní</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Poznámka ke stavu zařízení</label>
                  <textarea name="conditionNote" className={`${inputClass} min-h-[100px]`} value={conditionNote} onChange={(e) => setConditionNote(e.target.value)} placeholder="Další detaily..." />
                </div>

                {/* Fotky */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
                  <h2 className="font-semibold text-lg mb-2">Fotky notebooku (doporučeno)</h2>
                  <p className="text-sm text-slate-600 mb-6">Zavřený + otevřený notebook</p>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Zavřený notebook</label>
                      <label className={`flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition ${photoClosedPreview ? "border-emerald-500 bg-emerald-50" : "border-slate-300 hover:border-slate-400"}`}>
                        {photoClosedPreview ? (
                          <div className="text-center">
                            <img src={photoClosedPreview} alt="preview" className="mx-auto mb-3 max-h-32 rounded-lg" />
                            <p className="text-sm font-medium">{photoClosedName}</p>
                            <button type="button" onClick={() => removeFile("closed")} className="mt-3 text-red-600 text-sm">Odebrat</button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="text-4xl mb-2">📷</div>
                            <p className="font-medium">Přidat fotku zavřeného</p>
                          </div>
                        )}
                        <input name="photoClosed" type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0], "closed")} />
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Otevřený notebook</label>
                      <label className={`flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition ${photoOpenPreview ? "border-emerald-500 bg-emerald-50" : "border-slate-300 hover:border-slate-400"}`}>
                        {photoOpenPreview ? (
                          <div className="text-center">
                            <img src={photoOpenPreview} alt="preview" className="mx-auto mb-3 max-h-32 rounded-lg" />
                            <p className="text-sm font-medium">{photoOpenName}</p>
                            <button type="button" onClick={() => removeFile("open")} className="mt-3 text-red-600 text-sm">Odebrat</button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="text-4xl mb-2">📷</div>
                            <p className="font-medium">Přidat fotku otevřeného</p>
                          </div>
                        )}
                        <input name="photoOpen" type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0], "open")} />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Poznámka k opravě</label>
                  <textarea name="note" className={`${inputClass} min-h-[120px]`} value={note} onChange={(e) => setContact({ note: e.target.value })} placeholder="Další informace..." />
                </div>

                <label className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-6 cursor-pointer">
                  <input type="checkbox" checked={gdpr} onChange={(e) => setGdpr(e.target.checked)} className="mt-1 h-5 w-5 accent-emerald-600" />
                  <span className="text-sm text-slate-600">
                    Souhlasím se zpracováním osobních údajů.{" "}
                    <Link href="/ochrana-osobnich-udaju" className="text-emerald-700 underline">Ochrana osobních údajů</Link>
                  </span>
                </label>

                {err && <div className="rounded-2xl bg-red-50 border border-red-200 p-5 text-red-700">{err}</div>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-red-600 py-5 text-xl font-bold text-white hover:bg-red-700 disabled:opacity-70 transition shadow-xl shadow-red-300/40"
                >
                  {loading ? "Odesílám objednávku..." : "Odeslat objednávku opravy"}
                </button>
              </form>
            </div>
          </section>

          <aside className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <h3 className="font-bold text-xl">Co se stane po odeslání?</h3>
              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div>1. Obdržíte potvrzovací e-mail</div>
                <div>2. Do 24 hodin vám pošleme cenu a instrukce</div>
                <div>3. Po schválení ceny opravíme a pošleme zpět zdarma</div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <h3 className="font-bold">Máte otázku?</h3>
              <a href="tel:+420774506503" className="mt-4 block text-3xl font-bold text-slate-900 hover:text-emerald-600 transition">📞 774 506 503</a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}