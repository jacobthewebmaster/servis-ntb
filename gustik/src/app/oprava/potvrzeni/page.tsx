"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useOrderStore, getProblemLabel } from "@/store/orderStore";

export default function PotvrzeniPage() {
  const params = useSearchParams();
  const typ = params.get("typ");
  const problem = useOrderStore((s) => s.problem);
  const reset = useOrderStore((s) => s.reset);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const isCena = typ === "cena";

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="rounded-2xl border p-8">
        <h1 className="text-3xl font-bold">
          {isCena
            ? "Děkujeme, poptávka orientační ceny byla odeslána"
            : "Děkujeme, objednávka opravy byla odeslána"}
        </h1>

        <p className="mt-3 text-slate-600">
          {isCena
            ? "Vaši poptávku jsme přijali a co nejdříve se vám ozveme s orientační cenou."
            : "Vaši objednávku jsme přijali a brzy se vám ozveme s dalším postupem."}
        </p>

        {!isCena && problem && (
          <div className="mt-6 text-sm text-slate-700">
            <span className="font-semibold">Nahlášený problém:</span>{" "}
            {getProblemLabel(problem)}
          </div>
        )}

        {!isCena && (
          <div className="mt-8 rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">📦 Jak poslat notebook</h2>

            <p className="mt-3 text-sm text-slate-600">
              Notebook můžete zaslat libovolným způsobem. Doporučujeme
              Zásilkovnu nebo PPL, případně jej můžete poslat přímo na naši
              adresu.
            </p>

            <div className="mt-5">
              <div className="font-semibold">📍 Naše adresa</div>
              <div className="mt-1 text-sm text-slate-700">
                HVservis
                <br />
                Hybešova 11
                <br />
                602 00 Brno
              </div>
            </div>

            <div className="mt-5">
              <div className="font-semibold">📦 Doporučené podání</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                <li>
                  <strong>Zásilkovna / PPL:</strong> The Candy Store, Nové sady 2, Brno
                </li>
                <li>
                  <strong>Z-BOX:</strong> Hybešova 258/20, Brno
                </li>
                <li>
                  <strong>AlzaBox:</strong> Hybešova 258/20, Brno
                </li>
              </ul>
            </div>

            <div className="mt-5">
              <div className="font-semibold">ℹ️ Důležité</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                <li>Do balíku přiložte jméno a telefonní číslo pro identifikaci zakázky</li>
                <li>Zařízení zabalte do bublinkové fólie</li>
                <li>Použijte pevnou krabici, pokud nemáte originální balení</li>
                <li>Zařízení v krabici dobře zajistěte proti pohybu</li>
                <li>Spolu se zařízením prosím zašlete také nabíječku</li>
                <li>Po odeslání nám můžete poslat sledovací číslo</li>
              </ul>

              <p className="mt-3 text-xs text-slate-500">
                Za poškození při přepravě bez dostatečného zabalení neneseme
                odpovědnost.
              </p>
            </div>
          </div>
        )}

        {isCena && (
          <div className="mt-8 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            Pokud budeme potřebovat doplnit další informace, ozveme se vám na
            e-mail nebo telefon uvedený ve formuláři.
          </div>
        )}

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