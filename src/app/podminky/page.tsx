"use client";

import { useRouter } from "next/navigation";

export default function PodminkyPage() {
  const router = useRouter();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-8 rounded-xl border px-4 py-2 text-sm font-medium hover:bg-slate-50"
      >
        ← Zpět
      </button>

      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight">Podmínky služby</h1>

        <p className="mt-3 text-slate-600">
          Základní podmínky pro přijetí, diagnostiku a opravu notebooku.
        </p>

        <div className="mt-8 space-y-6">
          {[
            [
              "1) Diagnostika a nacenění",
              "Po přijetí notebooku provedeme diagnostiku a připravíme cenovou nabídku. Opravu provádíme vždy až po vašem schválení ceny.",
              "Orientační doba nacenění je obvykle do 24 hodin v závislosti na vytíženosti a dostupnosti dílů.",
            ],
            [
              "2) Oprava až po schválení",
              "Bez vašeho souhlasu s cenou opravy žádnou opravu nerealizujeme.",
            ],
            [
              "3) Pokud opravu nerealizujete",
              "Pokud se rozhodnete opravu nerealizovat, může být účtován poplatek za diagnostiku a administrativu ve výši 600–1000 Kč.",
              "Notebook odesíláme zpět nebo vydáváme až po úhradě tohoto poplatku a souvisejících nákladů, například zpáteční dopravy.",
            ],
            [
              "4) Platba a vrácení zařízení",
              "Platba za opravu probíhá až po dokončení opravy a před odesláním zařízení zpět.",
            ],
            [
              "5) Doprava",
              "Zařízení můžete doručit osobně nebo zaslat přepravní službou na naši adresu. Instrukce k zaslání zařízení obdržíte po odeslání formuláře.",
              "Dopravu k nám zákazník obvykle hradí sám, zpětné zaslání zařízení je při realizaci opravy zdarma.",
            ],
            [
              "6) Data",
              "Pokud je to možné, snažíme se data zachovat. Přesto doporučujeme mít vlastní zálohu. U některých závad nemusí být zachování dat technicky možné.",
            ],
          ].map(([title, ...texts]) => (
            <section key={title} className="border-t pt-6 first:border-t-0 first:pt-0">
              <h2 className="text-lg font-semibold">{title}</h2>
              <div className="mt-2 space-y-2">
                {texts.map((text) => (
                  <p key={text} className="text-slate-600">
                    {text}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <p className="mt-8 text-sm text-slate-600">
        Poslední aktualizace: 26. 3. 2026
      </p>
    </main>
  );
}