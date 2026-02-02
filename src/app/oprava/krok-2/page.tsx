"use client";

import Link from "next/link";
import { useOrderStore } from "@/store/orderStore";
import { getProblemLabel } from "@/store/orderStore";

export default function Step2() {
  const problem = useOrderStore((s) => s.problem);

  // Guard: když někdo vleze napřímo
  if (!problem) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold">Nejdříve vyberte problém</h1>
        <p className="mt-2 text-slate-600">
          Abychom věděli, s čím vám pomoci, nejdřív prosím vyberte typ problému.
        </p>
        <div className="mt-6">
          <Link href="/oprava/krok-1" className="underline">
            Vybrat problém
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Co chcete udělat dál?</h1>

      <p className="mt-2 text-slate-600">
        Vybraný problém: <span className="font-semibold">{getProblemLabel(problem)}</span>
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link className="rounded-xl border p-6 hover:bg-slate-50" href="/oprava/cena">
          <div className="font-semibold">Chci znát orientační cenu</div>
          <div className="mt-2 text-sm text-slate-600">
            Vyplníte krátký formulář (včetně SN/PN) a po diagnostice vám pošleme cenovou nabídku.
          </div>
        </Link>

        <Link className="rounded-xl border p-6 hover:bg-slate-50" href="/oprava/formular">
          <div className="font-semibold">Chci objednat opravu</div>
          <div className="mt-2 text-sm text-slate-600">
            Vyplníte formulář a vyberete způsob dopravy. Platba probíhá až po schválení ceny opravy.
          </div>
        </Link>
      </div>

      <div className="mt-10">
        <Link href="/oprava/krok-1" className="underline text-slate-600">
          Zpět na výběr problému
        </Link>
      </div>
    </main>
  );
}
