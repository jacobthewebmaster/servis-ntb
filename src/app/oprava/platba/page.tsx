"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useOrderStore } from "@/store/orderStore";

const DIAGNOSTIC_PRICE = 490;

// TODO: vyplň svoje údaje
const IBAN = "CZ6508000000001234567899"; // ← změň
const BIC = "GIBACZPX"; // ← volitelné
const RECEIVER = "Tvoje Firma s.r.o."; // ← volitelné

export default function PlatbaPage() {
  const problem = useOrderStore((s) => s.problem);
  const shipping = useOrderStore((s) => s.shipping);

  const orderId = useOrderStore((s) => s.orderId);
  const ensureOrderId = useOrderStore((s) => s.ensureOrderId);

  const paid = useOrderStore((s) => s.paid);
  const setPaid = useOrderStore((s) => s.setPaid);

  useEffect(() => {
    ensureOrderId();
  }, [ensureOrderId]);

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

  if (!shipping) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-slate-600">Nejdříve prosím vyberte dopravu.</p>
        <Link href="/oprava/doprava" className="underline">
          Vybrat dopravu
        </Link>
      </main>
    );
  }

  if (!orderId) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-slate-600">Generuji ID zakázky…</p>
      </main>
    );
  }

  // SPD payload (QR platba)
  const spd = [
    "SPD*1.0",
    `ACC:${IBAN}`,
    `AM:${DIAGNOSTIC_PRICE}`,
    "CC:CZK",
    `MSG:Diagnostika ${orderId}`,
    BIC ? `BIC:${BIC}` : "",
    RECEIVER ? `RN:${RECEIVER}` : "",
  ]
    .filter(Boolean)
    .join("*");

  // QR obrázek (jednoduché, bez knihoven)
  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=" +
    encodeURIComponent(spd);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">Platba diagnostiky</h1>
      <p className="mt-2 text-slate-600">
        Diagnostika slouží ke zjištění přesné závady. Opravu provádíme vždy až po vašem schválení ceny.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border p-6 space-y-3">
          <div>
            <div className="text-sm text-slate-600">ID zakázky</div>
            <div className="font-semibold">{orderId}</div>
          </div>

          <div>
            <div className="text-sm text-slate-600">Problém</div>
            <div className="font-semibold">{problem}</div>
          </div>

          <div>
            <div className="text-sm text-slate-600">Doprava</div>
            <div className="font-semibold">{shipping}</div>
          </div>

          <div className="pt-4 border-t">
            <div className="text-sm text-slate-600">Cena diagnostiky</div>
            <div className="text-2xl font-bold">{DIAGNOSTIC_PRICE} Kč</div>
          </div>
        </div>

        <div className="rounded-2xl border p-6 text-center">
          <div className="font-semibold">QR platba</div>
          <img src={qrUrl} alt="QR platba" className="mx-auto mt-3" />
          <p className="mt-2 text-sm text-slate-600">
            Do zprávy pro příjemce se vyplní ID zakázky.
          </p>

          <button
            type="button"
            onClick={() => setPaid(true)}
            className="mt-4 rounded-xl border px-6 py-3 font-semibold"
          >
            Zaplaceno (potvrdit)
          </button>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Link href="/oprava/doprava" className="underline text-slate-600">
          Zpět
        </Link>

        <Link
          href={paid ? "/oprava/potvrzeni" : "#"}
          className={[
            "inline-flex items-center justify-center rounded-xl border px-6 py-3 font-semibold",
            !paid && "pointer-events-none opacity-50",
          ].join(" ")}
        >
          Pokračovat
        </Link>
      </div>
    </main>
  );
}
