"use client";

import Link from "next/link";
import { useOrderStore } from "@/store/orderStore";

export default function FormularPage() {
  const problem = useOrderStore((s) => s.problem);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Objednávka opravy</h1>

      <div className="mt-6 rounded-2xl border p-6">
        <div className="text-sm text-slate-600">Vybraný problém:</div>
        <div className="mt-1 text-lg font-semibold">
          {problem ?? "— nic (vrat se a vyber problém) —"}
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Link href="/oprava/krok-1" className="rounded-xl border px-5 py-3">
          Zpět
        </Link>

        <Link
          href="/oprava/doprava"
          className="rounded-xl border px-5 py-3 font-semibold"
        >
          Pokračovat (zatím placeholder)
        </Link>
      </div>
    </main>
  );
}
