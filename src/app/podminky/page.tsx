export default function PodminkyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
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
            Orientační doba nacenění je typicky do 24 hodin (v závislosti na
            vytíženosti a dostupnosti dílů).
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
            za diagnostiku / administrativu dle aktuálního ceníku.
          </p>
          <p className="text-slate-600">
            Notebook odesíláme zpět (nebo vydáváme) až po úhradě tohoto poplatku
            a souvisejících nákladů (např. zpáteční dopravy).
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
            Způsob dopravy volíte v objednávce. Dopravu zákazník typicky hradí
            sám, pokud není domluveno jinak.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">6) Data</h2>
          <p className="text-slate-600">
            Pokud je to možné, snažíme se data zachovat. Přesto doporučujeme
            mít zálohu. U některých závad nemusí být zachování dat možné.
          </p>
        </section>
      </div>

      <p className="mt-8 text-sm text-slate-600">
        Poslední aktualizace: doplň datum podle potřeby.
      </p>
    </main>
  );
}
