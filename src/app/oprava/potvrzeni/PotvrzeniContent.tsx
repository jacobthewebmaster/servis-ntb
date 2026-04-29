"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useOrderStore, getProblemLabel } from "@/store/orderStore";

export default function PotvrzeniPage() {
  const params = useSearchParams();
  const typ = params.get("typ");
  const id = params.get("id");
  const isCena = typ === "cena";

  const problem = useOrderStore((s) => s.problem);
  const reset = useOrderStore((s) => s.reset);
  const problemRef = useRef(problem);

  useEffect(() => {
    reset();
  }, [reset]);

  const problemLabel = problemRef.current
    ? getProblemLabel(problemRef.current)
    : "";

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <section className="rounded-3xl border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-3xl text-white">
          ✓
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          {isCena ? "Poptávka byla odeslána" : "Objednávka byla přijata"}
        </h1>

        {id && (
          <div className="mx-auto mt-5 max-w-md rounded-2xl border bg-slate-50 p-4">
            <div className="text-sm text-slate-600">Číslo zakázky</div>
            <div className="mt-1 text-2xl font-bold tracking-tight">{id}</div>
            <div className="mt-2 text-xs text-slate-500">
              Uveďte prosím toto číslo na balík.
            </div>
          </div>
        )}

        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          {isCena
            ? "Děkujeme. Ozveme se vám s orientační cenou opravy obvykle do 24 hodin."
            : "Děkujeme. Co nejdříve vám pošleme instrukce k zaslání notebooku."}
        </p>

        {problemLabel && (
          <p className="mt-3 text-sm text-slate-600">
            Nahlášený problém:{" "}
            <span className="font-semibold text-slate-950">{problemLabel}</span>
          </p>
        )}

        <div className="mt-8 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">✔ Odpověď do 24 hodin</div>
          <div className="rounded-2xl bg-slate-50 p-4">✔ Bez platby předem</div>
          <div className="rounded-2xl bg-slate-50 p-4">✔ Oprava až po schválení</div>
        </div>
      </section>

      {!isCena && (
        <section className="mt-8 rounded-3xl border bg-slate-50 p-6">
          <h2 className="text-xl font-semibold">📦 Jak poslat notebook</h2>

          <div className="mt-6 rounded-2xl border bg-white p-5">
            <h3 className="font-semibold">ℹ️ Důležité před odesláním</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
              {id && (
                <li>
                  Na balík napište číslo zakázky: <strong>{id}</strong>.
                </li>
              )}
              <li>Do balíku přiložte jméno a telefonní číslo.</li>
              <li>Notebook dobře zabalte do bublinkové fólie.</li>
              <li>Použijte pevnou krabici a zařízení zajistěte proti pohybu.</li>
              <li>Pošlete prosím i nabíječku.</li>
              <li>Po odeslání nám můžete poslat sledovací číslo.</li>
            </ul>
          </div>

          <div className="mt-6 rounded-2xl border bg-white p-5 text-sm text-slate-700">
            <strong>Důležité:</strong> Stav zařízení při převzetí bude porovnán
            s uvedenými informacemi a případnými fotografiemi.
            <br />
            Doporučujeme si zařízení před odesláním nafotit pro vlastní jistotu.
          </div>
        </section>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="rounded-xl bg-black px-6 py-3 text-center font-semibold text-white hover:bg-black/90"
        >
          Zpět na hlavní stránku
        </Link>

        <Link
          href="/oprava/krok-1"
          className="rounded-xl border px-6 py-3 text-center font-semibold hover:bg-slate-50"
        >
          Nová poptávka
        </Link>
      </div>
    </main>
  );
}