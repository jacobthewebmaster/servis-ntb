"use client";

import { useRouter } from "next/navigation";

export default function PodminkyPage() {
  const router = useRouter();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-6 rounded-xl border px-4 py-2 text-sm font-medium hover:bg-slate-50"
      >
        ← Zpět
      </button>

      <h1 className="text-3xl font-bold">Podmínky služby</h1>
      <p className="mt-3 text-slate-600">
        Níže jsou základní podmínky pro přijetí a opravu notebooku. Pokud máte
        dotaz, napište nám.
      </p>

      <div className="mt-8 space-y-6 rounded-2xl border p-6">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">1) Diagnostika a nacenění</h2>
          <p className="text-slate-600">
            Po přijetí notebooku provedeme diagnostiku a připravíme cenovou
            nabídku. Opravu provádíme vždy až po vašem schválení ceny.
          </p>
          <p className="text-slate-600">
            Orientační doba nacenění je typicky do 24 hodin v závislosti na
            vytíženosti a dostupnosti dílů.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">2) Oprava až po schválení</h2>
          <p className="text-slate-600">
            Bez vašeho souhlasu s cenou opravy žádnou opravu nerealizujeme.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">
            3) Pokud opravu nerealizujete
          </h2>
          <p className="text-slate-600">
            Pokud se rozhodnete opravu nerealizovat, může být účtován poplatek
            za diagnostiku a administrativu ve výši 600–1000 Kč.
          </p>
          <p className="text-slate-600">
            Notebook odesíláme zpět nebo vydáváme až po úhradě tohoto poplatku a
            souvisejících nákladů, například zpáteční dopravy.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">4) Platba a vrácení zařízení</h2>
          <p className="text-slate-600">
            Platba za opravu probíhá až po dokončení opravy a před odesláním
            zařízení zpět. Opravený notebook odesíláme až po úhradě.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">5) Doprava</h2>
          <p className="text-slate-600">
            Zařízení můžete doručit osobně nebo zaslat přepravní službou na naši
            adresu. Instrukce k zaslání zařízení obdržíte po odeslání formuláře.
          </p>
          <p className="text-slate-600">
            Dopravu k nám zákazník obvykle hradí sám, zpětné zaslání zařízení je
            při realizaci opravy zdarma.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">6) Data</h2>
          <p className="text-slate-600">
            Pokud je to možné, snažíme se data zachovat. Přesto doporučujeme
            mít vlastní zálohu. U některých závad nemusí být zachování dat
            technicky možné.
          </p>
        </section>
      </div>

      <p className="mt-8 text-sm text-slate-600">
        Poslední aktualizace: 26. 3. 2026
      </p>
    </main>
  );
}