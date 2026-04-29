"use client";

import Link from "next/link";
import { useOrderStore, getProblemLabel } from "@/store/orderStore";

export default function Step2() {
  const problem = useOrderStore((s) => s.problem);

  if (!problem) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-12">
        <Link href="/oprava/krok-1" className="text-sm text-slate-600 underline">
          ← Zpět na výběr problému
        </Link>

        <div className="mt-8 rounded-3xl border bg-white p-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Nejdříve vyberte problém
          </h1>

          <p className="mt-3 text-slate-600">
            Abychom věděli, s čím vám pomoci, nejdřív prosím vyberte typ problému.
          </p>

          <Link
            href="/oprava/krok-1"
            className="mt-6 inline-flex rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-black/90"
          >
            Vybrat problém
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/oprava/krok-1" className="text-sm text-slate-600 underline">
        ← Zpět na výběr problému
      </Link>

      <div className="mt-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Co chcete udělat dál?
        </h1>

        <p className="mt-3 text-slate-600">
          Vybraný problém:{" "}
          <span className="font-semibold text-slate-950">
            {getProblemLabel(problem)}
          </span>
        </p>

        <div className="mx-auto mt-5 flex max-w-xl flex-wrap justify-center gap-3 text-sm text-slate-600">
          <span>✔ Nezávazně</span>
          <span>✔ Odpověď do 24 hodin</span>
          <span>✔ Oprava až po schválení ceny</span>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          href="/oprava/cena"
          className="rounded-3xl border bg-white p-7 text-center transition hover:border-black hover:bg-slate-50"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
            🧮
          </div>

          <div className="text-lg font-semibold">
            Chci znát orientační cenu
          </div>

          <div className="mt-2 text-sm text-slate-600">
            Vyplníte krátký formulář a do 24 hodin vám pošleme orientační cenu.
          </div>
        </Link>

        <Link
          href="/oprava/formular"
          className="rounded-3xl bg-black p-7 text-center text-white transition hover:bg-black/90"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-2xl">
            🔧
          </div>

          <div className="text-lg font-semibold">
            Chci objednat opravu
          </div>

          <div className="mt-2 text-sm text-white/70">
            Vyplníte krátký formulář a obdržíte instrukce k zaslání zařízení.
          </div>
        </Link>
      </div>

      <div className="mt-8 rounded-2xl border bg-slate-50 p-5 text-center text-sm text-slate-600">
        Potřebujete poradit? Zavolejte nám:{" "}
        <a href="tel:+420608711223" className="font-semibold text-slate-950 underline">
          608 711 223
        </a>
      </div>
    </main>
  );
}