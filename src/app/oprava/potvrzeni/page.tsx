"use client";

import Link from "next/link";
import { useOrderStore } from "@/store/orderStore";

export default function PotvrzeniPage() {
  const { problem, shipping, orderId, reset } = useOrderStore((s) => s);

  if (!orderId || !problem || !shipping) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold">Objednávka přijata</h1>
        <p className="mt-4 text-slate-600">
          Děkujeme. Detaily zakázky už nejsou dostupné (nebo jste stránku otevřel napřímo).
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl border px-6 py-3 font-semibold"
        >
          Zpět na úvod
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">Objednávka přijata</h1>

      <p className="mt-4 text-slate-600">
        Děkujeme. Jakmile notebook dorazí, provedeme diagnostiku a ozveme se s přesnou cenou opravy.
      </p>

      <div className="mt-8 rounded-2xl border p-6 space-y-2">
        <div>
          <span className="text-slate-600">ID zakázky:</span>{" "}
          <strong>{orderId}</strong>
        </div>
        <div>
          <span className="text-slate-600">Problém:</span>{" "}
          <strong>{problem}</strong>
        </div>
        <div>
          <span className="text-slate-600">Doprava:</span>{" "}
          <strong>{shipping}</strong>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-xl border px-6 py-3 font-semibold"
        >
          Zpět na úvod
        </Link>
      </div>
    </main>
  );
}
