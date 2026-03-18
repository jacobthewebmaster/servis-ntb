"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useOrderStore, getProblemLabel } from "@/store/orderStore";

export default function PotvrzeniPage() {
  const problem = useOrderStore((s) => s.problem);
  const shipping = useOrderStore((s) => s.shipping);
  const reset = useOrderStore((s) => s.reset);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="rounded-2xl border p-8">
        <h1 className="text-3xl font-bold">Děkujeme, objednávka byla odeslána</h1>

        <p className="mt-3 text-slate-600">
          Vaši poptávku jsme přijali a brzy se vám ozveme s dalším postupem.
        </p>

        <div className="mt-6 space-y-2 text-sm text-slate-700">
          {problem && (
            <div>
              <span className="font-semibold">Problém:</span>{" "}
              {getProblemLabel(problem)}
            </div>
          )}

          {shipping && (
            <div>
              <span className="font-semibold">Doprava:</span>{" "}
              {shipping === "zasilkovna"
                ? "Zásilkovna"
                : shipping === "kuryr"
                ? "Kurýr"
                : "Osobní předání"}
            </div>
          )}
        </div>

        <div className="mt-8 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Opravu provádíme vždy až po vašem schválení ceny. Diagnostika je zdarma při realizaci opravy.
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-xl border px-6 py-3 font-semibold"
          >
            Zpět na hlavní stránku
          </Link>

          <Link
            href="/oprava/krok-1"
            className="rounded-xl border px-6 py-3 font-semibold"
          >
            Nová poptávka
          </Link>
        </div>
      </div>
    </main>
  );
}