"use client";

import Link from "next/link";
import { useOrderStore } from "@/store/orderStore";
import { getProblemLabel } from "@/store/orderStore";

/* ---------- helpers ---------- */

function getShippingLabel(shipping: string | null) {
  if (!shipping) return "-";
  return (
    {
      zasilkovna: "Zásilkovna",
      kuryr: "Kurýr",
      osobne: "Osobně",
    } as Record<string, string>
  )[shipping] ?? shipping;
}

function getShippingInstructions(shipping: string | null) {
  if (shipping === "zasilkovna") {
    return (
      <>
        <p>
          Notebook zabalte do pevné krabice a odneste na jakékoliv podací místo
          Zásilkovny.
        </p>
        <p>
          <strong>Podací kód vám pošleme e‑mailem</strong> po přijetí objednávky.
        </p>
      </>
    );
  }

  if (shipping === "kuryr") {
    return (
      <>
        <p>
          Notebook odešlete kurýrem dle vlastní volby (PPL, DPD, GLS apod.).
        </p>
        <p>
          Adresu a doporučení k zabalení vám zašleme e‑mailem.
        </p>
      </>
    );
  }

  if (shipping === "osobne") {
    return (
      <>
        <p>Osobní předání je možné po předchozí domluvě.</p>
        <p>
          <strong>Ozveme se vám e‑mailem nebo telefonicky</strong> a domluvíme
          termín.
        </p>
      </>
    );
  }

  return null;
}

/* ---------- page ---------- */

export default function PotvrzeniPage() {
  const { problem, name, email, phone, note, shipping } = useOrderStore();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">Objednávka přijata</h1>

      {/* UX status */}
      <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
        Objednávka byla úspěšně odeslána.  
        Další informace vám zašleme e‑mailem.
      </div>

      <p className="mt-4 text-slate-600">
        Níže je shrnutí objednávky a informace, co bude následovat.
      </p>

      {/* Shrnutí */}
      <div className="mt-8 grid gap-4 rounded-2xl border p-6">
        <div>
          <strong>Problém:</strong>{" "}
          {problem ? getProblemLabel(problem) : "-"}
        </div>
        <div>
          <strong>Jméno:</strong> {name || "-"}
        </div>
        <div>
          <strong>E‑mail:</strong> {email || "-"}
        </div>
        {phone && (
          <div>
            <strong>Telefon:</strong> {phone}
          </div>
        )}
        {note && (
          <div>
            <strong>Poznámka:</strong> {note}
          </div>
        )}
        <div>
          <strong>Doprava:</strong> {getShippingLabel(shipping)}
        </div>
      </div>

      {/* Další kroky */}
      <div className="mt-8 rounded-2xl border p-6">
        <h2 className="mb-3 font-semibold">Jak postupovat dál</h2>

        <div className="space-y-3 text-slate-600">
          {getShippingInstructions(shipping)}

          <p>
            Po přijetí notebooku provedeme diagnostiku a ozveme se vám s cenovou
            nabídkou.
          </p>
          <p>
            <strong>Opravu provádíme vždy až po schválení ceny.</strong>
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/" className="underline">
          Zpět na úvodní stránku
        </Link>
      </div>
    </main>
  );
}
