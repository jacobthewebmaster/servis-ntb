"use client";

import Link from "next/link";
import { useOrderStore } from "@/store/orderStore";
import { getProblemLabel } from "@/store/orderStore";

export default function PotvrzeniPage() {
  const { problem, name, email, phone, note, shipping } = useOrderStore();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">Objednávka přijata</h1>

      <p className="mt-3 text-slate-600">
        Děkujeme. Níže je shrnutí objednávky a informace, co bude následovat.
      </p>

      <div className="mt-8 grid gap-4 rounded-2xl border p-6">
        <div><strong>Problém:</strong> {problem ? getProblemLabel(problem) : "-"}</div>
        <div><strong>Jméno:</strong> {name}</div>
        <div><strong>E‑mail:</strong> {email}</div>
        {phone && <div><strong>Telefon:</strong> {phone}</div>}
        {note && <div><strong>Poznámka:</strong> {note}</div>}
        <div><strong>Doprava:</strong> {shipping}</div>
      </div>

      <div className="mt-8 rounded-2xl border p-6">
        <h2 className="font-semibold mb-2">Další kroky</h2>
        <ul className="list-disc pl-5 text-slate-600 space-y-1">
          <li>Notebook zašlete zvoleným způsobem dopravy.</li>
          <li>Po diagnostice vás budeme kontaktovat s cenovou nabídkou.</li>
          <li>Opravu provádíme vždy až po schválení ceny.</li>
        </ul>
      </div>

      <div className="mt-8">
        <Link href="/" className="underline">
          Zpět na úvodní stránku
        </Link>
      </div>
    </main>
  );
}
