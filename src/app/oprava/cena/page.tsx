// src/app/oprava/cena/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useOrderStore, getProblemLabel } from "@/store/orderStore";

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200";

export default function CenaFormPage() {
  const problem = useOrderStore((s) => s.problem);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [attachmentPreview, setAttachmentPreview] = useState<string | null>(null);

  function handleAttachment(file: File | undefined) {
    if (!file) return;

    setAttachmentName(file.name);

    if (file.type.startsWith("image/")) {
      setAttachmentPreview(URL.createObjectURL(file));
    } else {
      setAttachmentPreview(null);
    }
  }

  function removeAttachment() {
    setAttachmentName(null);
    setAttachmentPreview(null);
    const input = document.querySelector<HTMLInputElement>('input[name="attachment"]');
    if (input) input.value = "";
  }

  if (!problem) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold">Nejdříve vyberte problém</h1>
          <p className="mt-4 text-slate-600">
            Pro nacenění potřebujeme vědět, s čím má váš notebook problém.
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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErr(null);

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/cena-form", {
        method: "POST",
        body: form,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        setErr(data?.error ?? "Nepodařilo se odeslat formulář. Zkuste to prosím znovu.");
        return;
      }

      window.location.href = "/oprava/potvrzeni?typ=cena";
    } catch {
      setErr("Chyba připojení. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Progress Bar */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <div className="flex items-center justify-between text-sm">
            <Link
              href="/oprava/krok-2"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              ← Zpět
            </Link>
            <div className="flex items-center gap-3">
              <span className="font-medium text-emerald-600">Krok 3 z 4 – Orientační cena</span>
              <div className="h-1.5 w-32 rounded bg-slate-200">
                <div className="h-1.5 w-3/4 rounded bg-emerald-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Formulář */}
          <section className="lg:col-span-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-8">
                <h1 className="text-4xl font-black tracking-tighter">Žádost o orientační cenu</h1>
                <p className="mt-3 text-lg text-slate-600">
                  Vybraný problém:{" "}
                  <span className="font-semibold text-emerald-700">
                    {getProblemLabel(problem)}
                  </span>
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Jméno / Firma
                    </label>
                    <input name="name" required className={inputClass} placeholder="Jan Novák" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      E-mail
                    </label>
                    <input name="email" type="email" required className={inputClass} placeholder="vas@email.cz" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Telefon
                    </label>
                    <input name="phone" required className={inputClass} placeholder="+420 774 506 503" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Značka notebooku
                    </label>
                    <input name="brand" required className={inputClass} placeholder="Lenovo, HP, Dell..." />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Popis problému
                  </label>
                  <textarea
                    name="desc"
                    required
                    rows={5}
                    className={`${inputClass} resize-y min-h-[130px]`}
                    placeholder="Popište co nejpřesněji, co se děje s notebookem..."
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Serial Number (SN) *
                    </label>
                    <input name="sn" required className={inputClass} placeholder="PF123ABC456" />
                    <p className="mt-1 text-xs text-slate-500">Najdete na spodní straně notebooku</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Model / PN (volitelné)
                    </label>
                    <input name="pn" className={inputClass} placeholder="Např. ThinkPad T480" />
                  </div>
                </div>

                {/* Příloha */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Příloha (fotky / video)
                  </label>
                  <label className={`flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition ${attachmentName ? "border-emerald-500 bg-emerald-50" : "border-slate-300 hover:border-slate-400"}`}>
                    {attachmentName ? (
                      <div className="text-center">
                        {attachmentPreview && <img src={attachmentPreview} alt="preview" className="mx-auto mb-3 max-h-32 rounded-lg" />}
                        <p className="font-medium text-emerald-700">{attachmentName}</p>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); removeAttachment(); }}
                          className="mt-3 text-sm text-red-600 hover:text-red-700"
                        >
                          Odebrat soubor
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-4xl mb-2">📎</div>
                        <p className="font-medium">Přidejte fotku nebo video</p>
                        <p className="text-xs text-slate-500 mt-1">Klikněte nebo přetáhněte</p>
                      </div>
                    )}
                    <input
                      name="attachment"
                      type="file"
                      className="hidden"
                      accept="image/*,video/*,application/pdf"
                      onChange={(e) => handleAttachment(e.target.files?.[0])}
                    />
                  </label>
                  <p className="mt-2 text-xs text-slate-500">
                    Velmi pomůže u prasklého displeje, pantů, polití atd.
                  </p>
                </div>

                <input name="problemKey" type="hidden" value={problem} />
                <input name="problemLabel" type="hidden" value={getProblemLabel(problem)} />

                {err && (
                  <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-red-700">
                    {err}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-red-600 py-4 text-lg font-bold text-white hover:bg-red-700 disabled:opacity-70 transition"
                >
                  {loading ? "Odesílám poptávku..." : "Odeslat žádost o cenu"}
                </button>
              </form>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-8">
              <h3 className="font-bold text-xl">Jak to probíhá?</h3>
              <div className="mt-6 space-y-5 text-sm">
                <div className="flex gap-3">
                  <div className="text-emerald-600">1.</div>
                  <div>Odešlete formulář</div>
                </div>
                <div className="flex gap-3">
                  <div className="text-emerald-600">2.</div>
                  <div>Do 24 hodin vám pošleme orientační cenu</div>
                </div>
                <div className="flex gap-3">
                  <div className="text-emerald-600">3.</div>
                  <div>Pokud budete souhlasit, zašlete nám notebook</div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t">
                <p className="text-sm text-slate-600">Máte otázku?</p>
                <a href="tel:+420774506503" className="mt-2 block text-2xl font-bold text-slate-900 hover:text-emerald-600">
                  📞 774 506 503
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}