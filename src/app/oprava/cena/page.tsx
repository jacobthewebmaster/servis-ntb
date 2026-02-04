"use client";

import { useState } from "react";
import Link from "next/link";
import { useOrderStore } from "@/store/orderStore";
import { getProblemLabel } from "@/store/orderStore";

export default function CenaFormPage() {
  const problem = useOrderStore((s) => s.problem);

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  if (!problem) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold">Nejdříve vyberte problém</h1>
        <p className="mt-2 text-slate-600">
          Pro nacenění potřebujeme vědět, s čím má notebook problém.
        </p>
        <div className="mt-6">
          <Link href="/oprava/krok-1" className="underline">
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
    setOk(null);
    setErr(null);

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/cena-form", {
        method: "POST",
        body: form,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErr(data?.error ?? "Nepodařilo se odeslat formulář.");
        return;
      }

      setOk("Odesláno ✅ Potvrzení jsme poslali na e‑mail.");
      (e.currentTarget as HTMLFormElement).reset();
    } catch {
      setErr("Chyba připojení. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Orientační cena – poptávka</h1>

      <p className="mt-2 text-slate-600">
        Vybraný problém:{" "}
        <span className="font-semibold">
          {getProblemLabel(problem)}
        </span>
      </p>

      <div className="mt-8 rounded-2xl border p-6">
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm text-slate-600">
                Iniciály / jméno
              </span>
              <input
                name="name"
                required
                className="rounded-xl border px-4 py-3"
                placeholder="Např. JH / Jakub Horák"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-slate-600">E‑mail</span>
              <input
                name="email"
                type="email"
                required
                className="rounded-xl border px-4 py-3"
                placeholder="např. ja@email.cz"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-slate-600">Telefon</span>
              <input
                name="phone"
                className="rounded-xl border px-4 py-3"
                placeholder="+420…"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-slate-600">
                Příloha (foto / video)
              </span>
              <input
                name="attachment"
                type="file"
                className="rounded-xl border px-4 py-3"
                accept="image/*,video/*,application/pdf"
              />
              <span className="text-xs text-slate-500">
                Doporučeno: foto štítku (SN/PN) + případně video závady.
              </span>
            </label>
          </div>

          <label className="grid gap-1">
            <span className="text-sm text-slate-600">
              Krátký popis vady
            </span>
            <textarea
              name="desc"
              required
              className="min-h-[110px] rounded-xl border px-4 py-3"
              placeholder="Co přesně se děje? Kdy to začalo?"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm text-slate-600">
                SN (Serial Number) *
              </span>
              <input
                name="sn"
                required
                className="rounded-xl border px-4 py-3"
                placeholder="např. S/N: …"
              />
              <span className="text-xs text-slate-500">
                Bez SN/PN nedokážeme spolehlivě nacenit.
              </span>
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-slate-600">
                PN (Part Number / Model) *
              </span>
              <input
                name="pn"
                required
                className="rounded-xl border px-4 py-3"
                placeholder="např. P/N: … nebo model"
              />
            </label>
          </div>

          <input name="problemKey" type="hidden" value={problem} />
          <input
            name="problemLabel"
            type="hidden"
            value={getProblemLabel(problem)}
          />

          <div className="mt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="inline-flex items-center justify-center rounded-xl border px-6 py-3 font-semibold disabled:opacity-60"
            >
              {loading ? "Odesílám…" : "Odeslat"}
            </button>

            <Link href="/oprava/krok-2" className="underline text-slate-600">
              Zpět
            </Link>
          </div>

          <p className="mt-3 text-sm text-slate-600">
            Odesláním souhlasíte s{" "}
            <a className="underline" href="/podminky">
              podmínkami služby
            </a>
            .
          </p>

          {ok && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
              {ok}
            </div>
          )}

          {!ok && err && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
              {err}
            </div>
          )}
        </form>
      </div>
            <div className="mt-8 border-t pt-4 text-sm text-slate-600">
  Odesláním formuláře souhlasíte s{" "}
  <Link href="/podminky" className="underline">
    podmínkami služby
  </Link>
  .
</div>

      <p className="mt-6 text-sm text-slate-600">
        Opravu provádíme vždy až po vašem schválení ceny. Pokud by oprava nebyla
        realizována, účtujeme poplatek dle podmínek.
      </p>
    </main>
  );
}
