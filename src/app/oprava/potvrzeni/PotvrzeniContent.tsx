// src/app/oprava/potvrzeni/PotvrzeniContent.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useOrderStore, getProblemLabel } from "@/store/orderStore";
import { useEffect, useRef } from "react";

export default function PotvrzeniContent() {
  const params = useSearchParams();
  const typ = params.get("typ");
  const id = params.get("id");
  const isCena = typ === "cena";

  const problem = useOrderStore((s) => s.problem);
  const reset = useOrderStore((s) => s.reset);
  const problemRef = useRef(problem);

  // Vyresetujeme store po zobrazení potvrzení
  useEffect(() => {
    reset();
  }, [reset]);

  const problemLabel = problemRef.current
    ? getProblemLabel(problemRef.current)
    : "";

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm text-center">
          {/* Ikona úspěchu */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-5xl">
            🎉
          </div>

          <h1 className="mt-8 text-4xl font-black tracking-tighter">
            {isCena
              ? "Poptávka ceny byla odeslána"
              : "Objednávka byla úspěšně přijata"}
          </h1>

          {/* Číslo zakázky */}
          {id && (
            <div className="mx-auto mt-8 max-w-xs rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <div className="text-sm font-medium text-emerald-700">Číslo zakázky</div>
              <div className="mt-2 text-4xl font-bold tracking-tighter text-emerald-900">
                {id}
              </div>
              <p className="mt-3 text-xs text-emerald-600">
                Uveďte prosím toto číslo na balík při odeslání notebooku.
              </p>
            </div>
          )}

          <p className="mx-auto mt-8 max-w-xl text-lg text-slate-600">
            {isCena
              ? "Děkujeme! Ozveme se vám s orientační cenou opravy obvykle do 24 hodin na e-mail nebo telefon."
              : "Děkujeme! Co nejdříve vám pošleme e-mail s instrukcemi k zaslání notebooku."}
          </p>

          {problemLabel && (
            <p className="mt-6 text-slate-600">
              Nahlášený problém:{" "}
              <span className="font-semibold text-slate-900">{problemLabel}</span>
            </p>
          )}

          {/* Důvěra */}
          <div className="mt-10 grid grid-cols-3 gap-4 text-sm">
            <div className="rounded-2xl bg-slate-50 p-4">✔ Odpověď do 24 hodin</div>
            <div className="rounded-2xl bg-slate-50 p-4">✔ Bez platby předem</div>
            <div className="rounded-2xl bg-slate-50 p-4">✔ Oprava až po schválení</div>
          </div>
        </div>

        {/* Instrukce k odeslání (jen u objednávky) */}
        {!isCena && (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-bold">📦 Jak poslat notebook</h2>
            <div className="mt-6 space-y-6">
              <div className="rounded-2xl border bg-slate-50 p-6">
                <ul className="space-y-3 text-sm text-slate-700">
                  {id && (
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-600">•</span>
                      <span>Na balík napište číslo zakázky: <strong className="text-emerald-700">{id}</strong></span>
                    </li>
                  )}
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600">•</span>
                    <span>Do balíku přiložte jméno a telefonní číslo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600">•</span>
                    <span>Dobře zabalte notebook (bublinková fólie + pevná krabice)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600">•</span>
                    <span>Přiložte nabíječku</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Akce */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-2xl bg-slate-900 px-8 py-4 font-semibold text-white hover:bg-slate-800 transition"
          >
            ← Zpět na hlavní stránku
          </Link>

          <Link
            href="/oprava/krok-1"
            className="rounded-2xl border border-slate-300 px-8 py-4 font-semibold hover:bg-slate-50 transition"
          >
            Nová poptávka / objednávka
          </Link>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Máte otázku? Zavolejte nám: <a href="tel:+420774506503" className="font-semibold text-emerald-600">774 506 503</a>
        </p>
      </div>
    </main>
  );
}