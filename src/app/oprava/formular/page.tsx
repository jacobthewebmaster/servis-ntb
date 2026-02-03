"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/store/orderStore";
import { getProblemLabel } from "@/store/orderStore";
import { useState } from "react";

export default function OrderFormPage() {
  const router = useRouter();
  const problem = useOrderStore((s) => s.problem);

  const { name, email, phone, note, setContact } = useOrderStore();
  const shipping = useOrderStore((s) => s.shipping);
  const setShipping = useOrderStore((s) => s.setShipping);

  const [err, setErr] = useState<string | null>(null);

  if (!problem) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold">Nejdříve vyberte problém</h1>
        <Link href="/oprava/krok-1" className="underline">
          Vybrat problém
        </Link>
      </main>
    );
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!name || !email) {
      setErr("Vyplňte prosím jméno a e‑mail.");
      return;
    }
    if (!shipping) {
      setErr("Vyberte prosím způsob dopravy.");
      return;
    }

    router.push("/oprava/potvrzeni");
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Objednávka opravy</h1>
      <p className="mt-2 text-slate-600">
        Problém: <span className="font-semibold">{getProblemLabel(problem)}</span>
      </p>

      <form onSubmit={submit} className="mt-8 grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-sm text-slate-600">Jméno *</span>
            <input
              className="rounded-xl border px-4 py-3"
              value={name}
              onChange={(e) => setContact({ name: e.target.value })}
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-slate-600">E‑mail *</span>
            <input
              type="email"
              className="rounded-xl border px-4 py-3"
              value={email}
              onChange={(e) => setContact({ email: e.target.value })}
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-slate-600">Telefon</span>
            <input
              className="rounded-xl border px-4 py-3"
              value={phone}
              onChange={(e) => setContact({ phone: e.target.value })}
            />
          </label>
        </div>

        <label className="grid gap-1">
          <span className="text-sm text-slate-600">Poznámka k opravě</span>
          <textarea
            className="min-h-[100px] rounded-xl border px-4 py-3"
            value={note}
            onChange={(e) => setContact({ note: e.target.value })}
            placeholder="Cokoliv důležitého (heslo, projevy závady, historie…) "
          />
        </label>

        <div>
          <div className="font-semibold mb-2">Způsob dopravy *</div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { k: "zasilkovna", t: "Zásilkovna" },
              { k: "kuryr", t: "Kurýr" },
              { k: "osobne", t: "Osobně" },
            ].map((m) => (
              <button
                type="button"
                key={m.k}
                onClick={() => setShipping(m.k as any)}
                className={`rounded-xl border p-4 text-left ${
                  shipping === m.k ? "border-blue-600 bg-blue-50" : "hover:bg-slate-50"
                }`}
              >
                {m.t}
              </button>
            ))}
          </div>
        </div>

        {err && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
            {err}
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-xl border px-6 py-3 font-semibold"
          >
            Odeslat objednávku
          </button>
          <Link href="/oprava/krok-2" className="underline text-slate-600">
            Zpět
          </Link>
        </div>
      </form>

      <p className="mt-6 text-sm text-slate-600">
        Platba probíhá až po schválení ceny opravy. V případě nerealizování opravy
        může být účtován administrativní poplatek dle podmínek.
      </p>
    </main>
  );
}
