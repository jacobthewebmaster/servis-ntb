"use client";

import Link from "next/link";
import { useOrderStore } from "@/store/orderStore";

export default function DopravaPage() {
  const shipping = useOrderStore((s) => s.shipping);
  const setShipping = useOrderStore((s) => s.setShipping);
  const problem = useOrderStore((s) => s.problem);

  if (!problem) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-slate-600">Nejdříve prosím vyberte problém.</p>
        <Link href="/oprava/krok-1" className="underline">
          Vybrat problém
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">Způsob doručení notebooku</h1>
      <p className="mt-2 text-slate-600">Vyberte, jakým způsobem nám notebook předáte.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => setShipping("zasilkovna")}
          className={[
            "rounded-2xl border p-6 text-left transition",
            shipping === "zasilkovna"
              ? "bg-blue-50 border-blue-600 ring-2 ring-blue-600"
              : "hover:bg-slate-50",
          ].join(" ")}
        >
          <div className="font-semibold">Zásilkovna</div>
          <div className="mt-2 text-sm text-slate-600">
            Nejrychlejší a doporučená varianta. Podací kód pošleme e‑mailem.
          </div>
        </button>

        <button
          type="button"
          onClick={() => setShipping("kuryr")}
          className={[
            "rounded-2xl border p-6 text-left transition",
            shipping === "kuryr"
              ? "bg-blue-50 border-blue-600 ring-2 ring-blue-600"
              : "hover:bg-slate-50",
          ].join(" ")}
        >
          <div className="font-semibold">Kurýr</div>
          <div className="mt-2 text-sm text-slate-600">
            Notebook odešlete kurýrem dle vlastní volby (PPL, DPD apod.).
          </div>
        </button>

        <button
          type="button"
          onClick={() => setShipping("osobne")}
          className={[
            "rounded-2xl border p-6 text-left transition",
            shipping === "osobne"
              ? "bg-blue-50 border-blue-600 ring-2 ring-blue-600"
              : "hover:bg-slate-50",
          ].join(" ")}
        >
          <div className="font-semibold">Osobní předání</div>
          <div className="mt-2 text-sm text-slate-600">
            Předání po domluvě – budeme vás kontaktovat.
          </div>
        </button>
      </div>

      {/* debug – klidně pak smaž */}
      <div className="mt-4 text-sm text-slate-600">
  Vybraná doprava:{" "}
  <span className="font-semibold">
    {shipping === "zasilkovna"
      ? "Zásilkovna"
      : shipping === "kuryr"
      ? "Kurýr"
      : shipping === "osobne"
      ? "Osobně"
      : "nic"}
  </span>
</div>


      <div className="mt-10 flex items-center justify-between">
        <Link href="/oprava/formular" className="underline text-slate-600">
          Zpět
        </Link>

        <Link
          href={shipping ? "/oprava/potvrzeni" : "#"}
          className={[
            "inline-flex items-center justify-center rounded-xl border px-6 py-3 font-semibold",
            !shipping && "pointer-events-none opacity-50",
          ].join(" ")}
        >
          Pokračovat
        </Link>
      </div>
    </main>
  );
}
