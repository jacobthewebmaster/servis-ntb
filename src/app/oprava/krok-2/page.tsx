// src/app/oprava/krok-2/page.tsx
"use client";

import Link from "next/link";
import { useOrderStore, getProblemLabel } from "@/store/orderStore";

export default function Step2() {
  const problem = useOrderStore((s) => s.problem);

  if (!problem) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
        <div className="max-w-md text-center">
          <div className="mb-6 text-5xl">⚠️</div>
          <h1 className="text-3xl font-bold">Nejdříve vyberte problém</h1>
          <p className="mt-4 text-slate-600">
            Abychom vám mohli správně pomoci, vraťte se prosím na výběr problému.
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

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Progress Bar */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <div className="flex items-center justify-between text-sm">
            <Link
              href="/oprava/krok-1"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              ← Zpět
            </Link>
            
            <div className="flex items-center gap-3">
              <span className="font-medium text-emerald-600">Krok 2 z 4</span>
              <div className="h-1.5 w-28 rounded bg-slate-200">
                <div className="h-1.5 w-2/4 rounded bg-emerald-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700">
            2. krok – Co chcete udělat dál?
          </div>

          <h1 className="text-4xl font-black tracking-tighter">
            Vybrali jste: <span className="text-emerald-600">{getProblemLabel(problem)}</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600">
            Teď si vyberte, jak chcete pokračovat:
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {/* Možnost 1 - Orientační cena */}
          <Link
            href="/oprava/cena"
            className="group rounded-3xl border border-slate-200 bg-white p-8 text-left hover:border-emerald-600 hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-4xl mb-6 group-hover:scale-110 transition">
              🧮
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Chci znát orientační cenu</h3>
            <p className="mt-4 text-slate-600">
              Vyplníte krátký formulář a do 24 hodin vám pošleme předběžnou cenu opravy.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-emerald-600 font-medium">
              Pokračovat →
            </div>
          </Link>

          {/* Možnost 2 - Objednat opravu (hlavní CTA) */}
          <Link
            href="/oprava/formular"
            className="group rounded-3xl border-2 border-red-600 bg-red-600 p-8 text-left text-white hover:bg-red-700 hover:border-red-700 transition-all hover:-translate-y-1 shadow-xl shadow-red-300/30"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-4xl mb-6 group-hover:scale-110 transition">
              🔧
            </div>
            <h3 className="text-2xl font-bold">Chci rovnou objednat opravu</h3>
            <p className="mt-4 text-white/80">
              Vyplníte formulář, dostanete instrukce k zaslání notebooku a my se pustíme do práce po schválení ceny.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 font-medium">
              Začít objednávku →
            </div>
          </Link>
        </div>

        {/* Důvěra + kontakt */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-slate-600">
              Potřebujete poradit s výběrem? 
              Zavolejte nám hned:
            </p>
            <a
              href="tel:+420774506503"
              className="mt-3 inline-block text-2xl font-bold text-slate-900 hover:text-emerald-600 transition"
            >
              📞 774 506 503
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-slate-500">
            <span>✓ Nezávazné</span>
            <span>✓ Odpověď do 24 hodin</span>
            <span>✓ Oprava až po vašem souhlasu</span>
          </div>
        </div>
      </div>
    </main>
  );
}