"use client";

import Link from "next/link";
import { useOrderStore } from "@/store/orderStore";

export default function CenaPage() {
  const problem = useOrderStore((s) => s.problem);

  if (!problem) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-slate-600">Nejdříve prosím vyberte problém.</p>
        <Link href="/oprava/krok-1" className="underline">
          Vybrat problém
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">Orientační cena opravy</h1>

      <p className="mt-2 text-slate-600">
        Cena se může lišit podle konkrétní závady. Přesnou částku vždy potvrdíme
        až po diagnostice zařízení.
      </p>

      <div className="mt-8 rounded-2xl border p-6">
        <div className="text-sm text-slate-600">Zvolený problém:</div>
        <div className="mt-1 text-lg font-semibold">{problem}</div>

        <div className="mt-6 text-sm text-slate-600">Typická cena opravy:</div>
        <div className="mt-1 text-2xl font-bold">— Kč</div>

        <div className="mt-6">
          <Link
            href="/oprava/formular"
            className="inline-flex items-center justify-center rounded-xl border px-6 py-3 font-semibold"
          >
            Objednat opravu
          </Link>
        </div>
      </div>
    </main>
  );
}