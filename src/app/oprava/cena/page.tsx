"use client";

import { useState } from "react";
import Link from "next/link";
import { useOrderStore, getProblemLabel } from "@/store/orderStore";

const inputClass =
  "rounded-xl border bg-white px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10";

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
      <main className="mx-auto max-w-2xl px-6 py-12">
        <div className="rounded-3xl border bg-white p-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Nejdříve vyberte problém
          </h1>
          <p className="mt-3 text-slate-600">
            Pro nacenění potřebujeme vědět, s čím má notebook problém.
          </p>
          <Link
            href="/oprava/krok-1"
            className="mt-6 inline-flex rounded-xl bg-black px-6 py-3 font-semibold text-white"
          >
            Vybrat problém
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
        setErr(data?.error ?? "Nepodařilo se odeslat formulář.");
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
    <main className="mx-auto max-w-5xl px-6 py-12">
      <Link href="/oprava/krok-2" className="text-sm text-slate-600 underline">
        ← Zpět
      </Link>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h1 className="text-3xl font-bold tracking-tight">
              Orientační cena opravy
            </h1>

            <p className="mt-3 text-slate-600">
              Vybraný problém:{" "}
              <span className="font-semibold text-slate-950">
                {getProblemLabel(problem)}
              </span>
            </p>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
              <span>✔ Odpověď do 24 hodin</span>
              <span>✔ Nezávazně</span>
              <span>✔ Bez platby předem</span>
            </div>

            <form onSubmit={onSubmit} className="mt-8 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1">
                  <span className="text-sm font-medium text-slate-700">
                    Jméno / firma
                  </span>
                  <input
                    name="name"
                    required
                    className={inputClass}
                    placeholder="Např. Jakub Horák"
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-sm font-medium text-slate-700">
                    E-mail
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    className={inputClass}
                    placeholder="např. ja@email.cz"
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-sm font-medium text-slate-700">
                    Telefon
                  </span>
                  <input
                    name="phone"
                    required
                    className={inputClass}
                    placeholder="+420…"
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-sm font-medium text-slate-700">
                    Značka notebooku *
                  </span>
                  <input
                    name="brand"
                    required
                    className={inputClass}
                    placeholder="Např. Lenovo, HP, Dell, Asus, Acer..."
                  />
                  <span className="text-xs text-slate-500">
                    Apple zařízení neopravujeme.
                  </span>
                </label>
              </div>

              <label className="grid gap-1">
                <span className="text-sm font-medium text-slate-700">
                  Popište problém co nejpřesněji
                </span>
                <textarea
                  name="desc"
                  required
                  className={`${inputClass} min-h-[120px]`}
                  placeholder="Co přesně se děje, kdy problém začal a jak se projevuje?"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1">
                  <span className="text-sm font-medium text-slate-700">
                    SN / Serial Number *
                  </span>
                  <input
                    name="sn"
                    required
                    className={inputClass}
                    placeholder="např. S/N: …"
                  />
                  <span className="text-xs text-slate-500">
                    Bez SN nedokážeme spolehlivě nacenit.
                  </span>
                </label>

                <label className="grid gap-1">
                  <span className="text-sm font-medium text-slate-700">
                    PN / model
                  </span>
                  <input
                    name="pn"
                    className={inputClass}
                    placeholder="např. P/N nebo model"
                  />
                  <span className="text-xs text-slate-500">
                    Volitelné, ale pomůže s přesnějším naceněním.
                  </span>
                </label>
              </div>

              <label className="grid gap-1">
                <span className="text-sm font-medium text-slate-700">
                  Příloha
                </span>

                <label
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleAttachment(e.dataTransfer.files?.[0]);
                  }}
                  className={`flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border px-4 py-4 text-center text-sm font-semibold transition ${
                    attachmentName
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "bg-white text-slate-700 hover:border-black hover:bg-slate-50"
                  }`}
                >
                  {attachmentName ? (
                    <>
                      {attachmentPreview ? (
                        <img
                          src={attachmentPreview}
                          alt="Náhled přílohy"
                          className="mb-3 h-24 w-full rounded-lg object-cover"
                        />
                      ) : (
                        <div className="mb-3 text-3xl">📄</div>
                      )}

                      <span className="break-all text-xs">{attachmentName}</span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          removeAttachment();
                        }}
                        className="mt-2 rounded-lg bg-black px-3 py-1 text-xs text-white"
                      >
                        Odebrat
                      </button>
                    </>
                  ) : (
                    <>
                      📎 Přidat fotku nebo video
                      <span className="mt-1 text-xs font-normal text-slate-500">
                        Klikněte nebo přetáhněte soubor sem
                      </span>
                    </>
                  )}

                  <input
                    name="attachment"
                    type="file"
                    className="hidden"
                    accept="image/*,video/*,application/pdf"
                    onChange={(e) => handleAttachment(e.target.files?.[0])}
                  />
                </label>

                <span className="text-xs text-slate-500">
                  Volitelné, ale doporučené hlavně u mechanického poškození, prasklin, pantů nebo polití.
                </span>
              </label>

              <input name="problemKey" type="hidden" value={problem} />
              <input
                name="problemLabel"
                type="hidden"
                value={getProblemLabel(problem)}
              />

              {err && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
                  {err}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 rounded-xl bg-black px-6 py-3 font-semibold text-white disabled:opacity-60"
              >
                {loading ? "Odesílám…" : "Odeslat poptávku ceny"}
              </button>
            </form>
          </div>
        </section>

        <aside className="lg:col-span-2">
          <div className="rounded-3xl border bg-slate-50 p-6">
            <h2 className="font-semibold">Jak nacenění funguje</h2>
            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <div>✔ Odpovíme obvykle do 24 hodin</div>
              <div>✔ Oprava až po schválení ceny</div>
              <div>✔ Neplatíte nic předem</div>
              <div>✔ V případě dotazu volejte 608 711 223</div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}