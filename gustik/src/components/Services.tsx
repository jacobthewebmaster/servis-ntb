export default function Services() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="mb-4 text-3xl font-bold">Naše služby</h2>

      <p className="mb-10 max-w-3xl text-lg">
        Poskytujeme kompletní servis notebooků a stolních počítačů. Pracujeme
        rychle, transparentně a s důrazem na kvalitu provedení.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ServiceItem
          title="Opravy notebooků a PC"
          text="Diagnostika a opravy všech běžných značek. Řešíme hardwarové i softwarové závady."
        />

        <ServiceItem
          title="Reinstalace Windows a software"
          text="Čistá instalace systému, ovladačů a základního softwaru. Počítač vracíme plně funkční."
        />

        <ServiceItem
          title="Výměna a upgrade komponent"
          text="Výměna disků, RAM, baterií, displejů a dalších dílů. Poradíme s nejlepším řešením."
        />

        <ServiceItem
          title="Záchrana a obnova dat"
          text="Obnova ztracených nebo smazaných dat z disků a paměťových médií, pokud je to technicky možné."
        />
      </div>
    </section>
  );
}

function ServiceItem({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border p-5">
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm">{text}</p>
    </div>
  );
}
