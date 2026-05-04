// src/app/oprava/krok-1/page.tsx
import Link from "next/link";
import ProblemGrid from "@/components/oprava/ProblemGrid";

export default function Krok1Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Progress bar */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <div className="flex items-center justify-between text-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              ← Zpět na hlavní stránku
            </Link>
            
            <div className="flex items-center gap-2 text-slate-500">
              <span className="font-medium text-emerald-600">Krok 1 z 4</span>
              <div className="h-1.5 w-24 rounded bg-slate-200">
                <div className="h-1.5 w-1/4 rounded bg-emerald-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="max-w-2xl">
          <div className="mb-8 inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700">
            1. krok – Výběr problému
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">
            S čím má váš notebook problém?
          </h1>

          <p className="mt-6 text-xl text-slate-600">
            Vyberte možnost, která nejlépe popisuje závadu. 
            Nemusíte znát přesný technický název.
          </p>

          <p className="mt-3 text-slate-500">
            Pokud si nejste jistí, vyberte <strong>„Jiný problém“</strong> a popište nám ho v dalším kroku.
          </p>
        </div>

        <div className="mt-12">
          <ProblemGrid />
        </div>

        {/* Důvěra pod gridem */}
        <div className="mt-16 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          <p>✓ Diagnostika je zdarma při realizaci opravy</p>
          <p className="mt-1">✓ Opravu provádíme až po vašem schválení ceny</p>
        </div>
      </div>
    </main>
  );
}